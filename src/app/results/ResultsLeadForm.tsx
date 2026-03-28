'use client';

import { useState, type FormEvent } from 'react';
import type { Roadmap } from '@/lib/types';
import { getClientBookingPrimaryHref } from '@/lib/booking-url';
import { buildMailtoHref } from '@/lib/rules';
import styles from './page.module.css';

type Intent = 'email-roadmap' | 'full-version' | 'book-call';

const STUB_NOTE =
  'This option is not wired to email yet — use “Send my roadmap” for delivery, or book via the strategy CTA below.';

interface ResultsLeadFormProps {
  roadmap: Roadmap;
  /** Compact or legacy token so the API can recompute the same roadmap server-side. */
  roadmapToken: string;
}

export default function ResultsLeadForm({ roadmap, roadmapToken }: ResultsLeadFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [intent, setIntent] = useState<Intent>('email-roadmap');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [stubMessage, setStubMessage] = useState<string | null>(null);

  const followUpMailto = buildMailtoHref(roadmap.primaryCta, [
    'Following up after receiving my roadmap by email.',
  ]);
  const bookingHref = getClientBookingPrimaryHref(followUpMailto);
  const bookingIsHttp = /^https?:\/\//i.test(bookingHref);

  async function sendRoadmapEmail(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus('sending');
    setErrorMessage(null);

    try {
      const res = await fetch('/api/send-roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...(name.trim() ? { name: name.trim() } : {}),
          email: email.trim(),
          company: company.trim() || undefined,
          roadmapToken,
          _hp: honeypot,
        }),
      });

      const data = (await res.json().catch(() => ({}))) as { error?: string; fieldErrors?: unknown };

      if (!res.ok) {
        setStatus('error');
        setErrorMessage(data.error || 'Something went wrong. Please try again.');
        return;
      }

      setStatus('success');
    } catch {
      setStatus('error');
      setErrorMessage('Network error. Check your connection and try again.');
    }
  }

  function handleStubSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    console.info(STUB_NOTE, { intent, name, email, company });
    setStubMessage(
      'Thanks — your details are noted. This path is not automated yet; use “Send my roadmap” for instant email delivery, or the strategy CTA below.',
    );
  }

  if (status === 'success') {
    return (
      <section className={styles.leadSection} aria-labelledby="lead-heading">
        <span className={styles.sectionTag}>Delivered</span>
        <h2 id="lead-heading" className={styles.sectionTitle}>
          Check your inbox
        </h2>
        <div className={styles.leadSuccessPanel} role="status">
          <p className={styles.leadSuccessText}>
            We sent your roadmap summary to <strong>{email.trim()}</strong>. If it does not arrive in
            a few minutes, check spam or promotions — then reply to that message so we know it
            reached you.
          </p>
          <p className={styles.leadSuccessSub}>Best next step</p>
          <a href={bookingHref} className={styles.leadSuccessCta}>
            Book a strategy conversation
          </a>
          <p className={styles.leadSuccessBookSub}>
            Walk through your roadmap with us — calendar, budget, and sequencing in one conversation.
          </p>
          {bookingIsHttp && (
            <a href={followUpMailto} className={styles.leadSuccessMailto}>
              {roadmap.primaryCta.buttonLabel} (email)
            </a>
          )}
          <p className={styles.leadSuccessHint}>
            You can also use <strong>Copy share link</strong> above to send the full on-page roadmap
            to a colleague.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.leadSection} aria-labelledby="lead-heading">
      <span className={styles.sectionTag}>Stay in touch</span>
      <h2 id="lead-heading" className={styles.sectionTitle}>
        Get this roadmap in your inbox
      </h2>
      <p className={styles.leadIntro}>
        Enter your details and we will email a branded summary: priorities, phases, services, and
        engagement path — built from the same deterministic output you see on this page.
      </p>

      <form
        className={styles.leadForm}
        onSubmit={intent === 'email-roadmap' ? sendRoadmapEmail : handleStubSubmit}
      >
        {/* Honeypot — leave hidden; bots often fill it. */}
        <input
          type="text"
          name="_hp"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          className={styles.leadHoneypot}
        />

        <div className={styles.leadFields}>
          <label className={styles.leadLabel}>
            Name <span className={styles.leadOptional}>(optional)</span>
            <input
              className={styles.leadInput}
              name="name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={status === 'sending'}
              placeholder="Alex Rivera"
            />
          </label>
          <label className={styles.leadLabel}>
            Email
            <input
              className={styles.leadInput}
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={status === 'sending'}
              placeholder="you@company.com"
            />
          </label>
          <label className={styles.leadLabel}>
            Company <span className={styles.leadOptional}>(optional)</span>
            <input
              className={styles.leadInput}
              name="company"
              autoComplete="organization"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              disabled={status === 'sending'}
              placeholder="Acme Co."
            />
          </label>
        </div>

        <fieldset className={styles.leadIntentFieldset}>
          <legend className={styles.leadIntentLegend}>What would you like?</legend>
          <div className={styles.leadIntentRow}>
            <label className={styles.leadRadio}>
              <input
                type="radio"
                name="intent"
                checked={intent === 'email-roadmap'}
                onChange={() => {
                  setIntent('email-roadmap');
                  setStubMessage(null);
                }}
                disabled={status === 'sending'}
              />
              Email me this roadmap
            </label>
            <label className={styles.leadRadio}>
              <input
                type="radio"
                name="intent"
                checked={intent === 'full-version'}
                onChange={() => {
                  setIntent('full-version');
                  setStubMessage(null);
                }}
                disabled={status === 'sending'}
              />
              Get the full version
            </label>
            <label className={styles.leadRadio}>
              <input
                type="radio"
                name="intent"
                checked={intent === 'book-call'}
                onChange={() => {
                  setIntent('book-call');
                  setStubMessage(null);
                }}
                disabled={status === 'sending'}
              />
              Book a strategy conversation
            </label>
          </div>
        </fieldset>

        <button
          type="submit"
          className={styles.leadSubmit}
          disabled={status === 'sending'}
        >
          {status === 'sending' && 'Sending…'}
          {status !== 'sending' && intent === 'email-roadmap' && 'Send my roadmap'}
          {status !== 'sending' && intent === 'full-version' && 'Request the full version'}
          {status !== 'sending' && intent === 'book-call' && 'Request a strategy call'}
        </button>
      </form>

      {stubMessage && (
        <p className={styles.leadStubNote} role="status">
          {stubMessage}
        </p>
      )}

      {status === 'error' && errorMessage && (
        <p className={styles.leadError} role="alert">
          {errorMessage}
        </p>
      )}

      {intent !== 'email-roadmap' && (
        <p className={styles.leadIntegrationHint}>{STUB_NOTE}</p>
      )}

      {intent === 'email-roadmap' && (
        <p className={styles.leadIntegrationHint}>
          Requires <code className={styles.toolbarCode}>RESEND_API_KEY</code> and{' '}
          <code className={styles.toolbarCode}>RESEND_FROM</code> in production. See README.
        </p>
      )}
    </section>
  );
}
