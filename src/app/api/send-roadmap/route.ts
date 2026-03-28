import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { render } from '@react-email/render';
import RoadmapEmail from '@/emails/RoadmapEmail';
import { resolveBookingUrl } from '@/lib/booking-url';
import { composeRoadmap } from '@/lib/compose-roadmap';
import { decodeRoadmapToken } from '@/lib/email/decode-roadmap-token';
import { logLeadSubmission } from '@/lib/email/log-lead-submission';
import { roadmapToEmailModel } from '@/lib/email/roadmap-email-model';
import { sendRoadmapRequestSchema } from '@/lib/email/send-roadmap-schema';

export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY?.trim()) {
    return NextResponse.json(
      { error: 'Email delivery is not configured (missing RESEND_API_KEY).' },
      { status: 503 },
    );
  }

  const from = process.env.RESEND_FROM?.trim();
  if (!from) {
    return NextResponse.json(
      { error: 'Email delivery is not configured (missing RESEND_FROM).' },
      { status: 503 },
    );
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
    return NextResponse.json({ error: 'Invalid or expired roadmap link data' }, { status: 400 });
  }

  const roadmap = composeRoadmap(answers);
  const model = roadmapToEmailModel(roadmap, name, company || undefined);
  const cta = resolveBookingUrl();

  let html: string;
  try {
    html = await render(
      RoadmapEmail({
        ...model,
        strategyCtaUrl: cta,
      }),
    );
  } catch (e) {
    console.error('[send-roadmap] render failed', e);
    return NextResponse.json({ error: 'Could not build email' }, { status: 500 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const replyTo = process.env.RESEND_REPLY_TO?.trim();

  const { data, error } = await resend.emails.send({
    from,
    to: email,
    subject: 'Your 90-day marketing roadmap',
    html,
    replyTo: replyTo || undefined,
  });

  if (error) {
    console.error('[send-roadmap] Resend error', error);
    return NextResponse.json({ error: 'Could not send email. Try again shortly.' }, { status: 502 });
  }

  if (process.env.NODE_ENV === 'development') {
    console.info('[send-roadmap] sent', { to: email, id: data?.id });
  }

  logLeadSubmission({
    email,
    name,
    company: company || undefined,
    resendMessageId: data?.id,
  });

  return NextResponse.json({ ok: true, id: data?.id });
}
