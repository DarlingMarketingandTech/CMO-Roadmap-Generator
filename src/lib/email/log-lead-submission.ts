export type RoadmapEmailLeadPayload = {
  email: string;
  name?: string;
  company?: string;
  resendMessageId?: string;
};

/**
 * Hook for future lead storage (Google Sheets, Airtable webhook, Apps Script, etc.).
 * Default: no persistence. Set LEAD_LOG_VERBOSE=1 to log full payload (including email) server-side.
 */
export function logLeadSubmission(payload: RoadmapEmailLeadPayload): void {
  // Extend: await fetch(process.env.LEAD_WEBHOOK_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })

  const at = new Date().toISOString();

  if (process.env.LEAD_LOG_VERBOSE === '1') {
    console.info('[lead]', JSON.stringify({ ...payload, at }));
    return;
  }

  if (process.env.NODE_ENV === 'development') {
    console.info('[lead] roadmap_email_sent', {
      hasName: Boolean(payload.name?.trim()),
      hasCompany: Boolean(payload.company?.trim()),
      id: payload.resendMessageId,
      at,
    });
  }
}
