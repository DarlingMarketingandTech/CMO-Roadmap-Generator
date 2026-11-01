import { Resend } from 'resend';
import { handleSendRoadmap, type EmailTransport } from './handler';

function resendTransport(apiKey: string): EmailTransport {
  const resend = new Resend(apiKey);
  return async (message) => {
    const { data, error } = await resend.emails.send(message);
    return error ? { ok: false, error } : { ok: true, id: data?.id };
  };
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  return handleSendRoadmap(request, {
    transport: apiKey ? resendTransport(apiKey) : null,
    from: process.env.RESEND_FROM?.trim(),
    replyTo: process.env.RESEND_REPLY_TO?.trim(),
    leadNotifyEmail: process.env.LEAD_NOTIFY_EMAIL?.trim() || undefined,
  });
}
