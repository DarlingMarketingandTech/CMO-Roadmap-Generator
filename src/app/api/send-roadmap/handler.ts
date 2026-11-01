import { NextResponse } from 'next/server';
import { render } from '@react-email/render';
import RoadmapEmail from '@/emails/RoadmapEmail';
import LeadNotificationEmail from '@/emails/LeadNotificationEmail';
import { composeRoadmap } from '@/lib/compose-roadmap';
import { CONSULT_CTA_LABEL, CONSULT_CTA_PURPOSE, contactForRoadmap } from '@/lib/contact-cta';
import { decodeRoadmapToken } from '@/lib/email/decode-roadmap-token';
import { logLeadSubmission } from '@/lib/email/log-lead-submission';
import { roadmapToEmailModel } from '@/lib/email/roadmap-email-model';
import { sendRoadmapRequestSchema } from '@/lib/email/send-roadmap-schema';

export interface OutgoingEmail {
  from: string;
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

export type SendOutcome = { ok: true; id?: string } | { ok: false; error: unknown };

/** Delivery adapter. Production uses Resend; tests pass a fake. */
export type EmailTransport = (message: OutgoingEmail) => Promise<SendOutcome>;

export interface SendRoadmapConfig {
  /** Null when no provider key is configured. */
  transport: EmailTransport | null;
  from?: string;
  replyTo?: string;
  /** Owner inbox for a copy of each request. Unset means no copy. */
  leadNotifyEmail?: string;
}

export const ROADMAP_EMAIL_SUBJECT = 'Your full 90-day marketing plan from Darling MarTech';

const UNAVAILABLE_MESSAGE =
  'Email delivery is temporarily unavailable. Please try again later, or use the contact link on this page.';

export async function handleSendRoadmap(
  request: Request,
  config: SendRoadmapConfig,
): Promise<NextResponse> {
  if (!config.transport || !config.from) {
    // Name the missing setting in server logs only, never in the visitor response.
    console.error('[send-roadmap] not configured', {
      hasTransport: Boolean(config.transport),
      hasFrom: Boolean(config.from),
    });
    return NextResponse.json({ error: UNAVAILABLE_MESSAGE }, { status: 503 });
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const parsed = sendRoadmapRequestSchema.safeParse(json);
  if (!parsed.success) {
    const flat = parsed.error.flatten();
    return NextResponse.json(
      { error: 'Validation failed', fieldErrors: flat.fieldErrors },
      { status: 400 },
    );
  }

  const { name, email, company, roadmapToken } = parsed.data;

  const answers = decodeRoadmapToken(roadmapToken);
  if (!answers) {
    return NextResponse.json({ error: 'Invalid or incomplete roadmap link data' }, { status: 400 });
  }

  // Recompute from the validated answers; never trust client-supplied plan content.
  const roadmap = composeRoadmap(answers);
  const model = roadmapToEmailModel(roadmap, name, company || undefined);
  const contact = contactForRoadmap(roadmap);

  let html: string;
  let leadHtml: string | null = null;
  try {
    html = await render(
      RoadmapEmail({
        ...model,
        strategyCtaUrl: contact.href,
        strategyCtaLabel: CONSULT_CTA_LABEL,
        strategyCtaPurpose: CONSULT_CTA_PURPOSE,
      }),
    );
    if (config.leadNotifyEmail) {
      leadHtml = await render(
        LeadNotificationEmail({
          name: name ?? null,
          email,
          company: company || null,
          answers: [
            { label: 'Business type and stage', value: roadmap.businessSummary.headline },
            ...roadmap.businessSummary.details,
          ],
          topPriorities: roadmap.topPriorities,
        }),
      );
    }
  } catch (e) {
    console.error('[send-roadmap] render failed', e);
    return NextResponse.json({ error: 'Could not build email' }, { status: 500 });
  }

  const sent = await config.transport({
    from: config.from,
    to: email,
    subject: ROADMAP_EMAIL_SUBJECT,
    html,
    replyTo: config.replyTo || undefined,
  });

  if (!sent.ok) {
    console.error('[send-roadmap] provider error', sent.error);
    return NextResponse.json({ error: 'Could not send email. Try again shortly.' }, { status: 502 });
  }

  if (config.leadNotifyEmail && leadHtml) {
    // The visitor already has their plan; a failed copy is logged, not surfaced to them.
    const copy = await config.transport({
      from: config.from,
      to: config.leadNotifyEmail,
      subject: `New roadmap request: ${company?.trim() || name || 'website visitor'}`,
      html: leadHtml,
      replyTo: email,
    });
    if (!copy.ok) console.error('[send-roadmap] lead copy failed', copy.error);
  }

  logLeadSubmission({
    email,
    name,
    company: company || undefined,
    resendMessageId: sent.id,
  });

  return NextResponse.json({ ok: true, id: sent.id });
}
