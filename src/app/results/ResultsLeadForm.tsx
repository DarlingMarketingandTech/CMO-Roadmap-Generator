'use client';

import { useState, type FormEvent } from 'react';
import type { ContactConversation } from '@/lib/contact-cta';
import styles from './page.module.css';

interface ResultsLeadFormProps {
  /** Compact or legacy token so the API can recompute the same roadmap server-side. */
  roadmapToken: string;
  contact: ContactConversation;
  /** Recommended work streams in the full plan. */
  moduleCount: number;
  /** True when Darling MarTech receives a copy of each request. */
  ownerGetsCopy: boolean;
}

export default function ResultsLeadForm({
  roadmapToken,
  contact,
  moduleCount,
  ownerGetsCopy,
}: ResultsLeadFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

  if (status === 'success') {
    return (
      <section className={styles.leadSection} aria-labelledby="lead-heading">
        <span className={styles.sectionTag}>Sent</span>
        <h2 id="lead-heading" className={styles.sectionTitle}>
          Your plan is on its way
        </h2>
        <div className={styles.leadSuccessPanel} role="status">
          <p className={styles.leadSuccessText}>
            Our email service accepted your full plan for <strong>{email.trim()}</strong>. It
            usually arrives within a few minutes. If it does not, check your spam or promotions
            folder.
          </p>
          <p className={styles.leadSuccessSub}>Want to talk it through?</p>
          <a href={contact.href} className={styles.leadSuccessCta}>
            {contact.label}
          </a>
          <p className={styles.leadSuccessBookSub}>{contact.purpose}</p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.leadSection} aria-labelledby="lead-heading">
      <span className={styles.sectionTag}>Full plan</span>
      <h2 id="lead-heading" className={styles.sectionTitle}>
        Get your full plan by email
      </h2>
      <p className={styles.leadIntro}>The full plan adds:</p>
      <ul className={styles.leadIncludes}>
        <li>
          All {moduleCount} recommended {moduleCount === 1 ? 'area' : 'areas'} of work, placed in
          three 30-day phases
        </li>
        <li>What each one involves and what done looks like</li>
        <li>Why the plan fits your answers, the services that match, and common mistakes to avoid</li>
      </ul>
      <p className={styles.leadPrivacy}>
        {ownerGetsCopy
          ? 'Darling MarTech also receives a copy of your request and answers so we can follow up if you want help.'
          : 'Your email address is only used to send the plan.'}
      </p>

      <form className={styles.leadForm} onSubmit={sendRoadmapEmail}>
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
            />
          </label>
          <label className={styles.leadLabel}>
            Business name <span className={styles.leadOptional}>(optional)</span>
            <input
              className={styles.leadInput}
              name="company"
              autoComplete="organization"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              disabled={status === 'sending'}
            />
          </label>
        </div>

        <button type="submit" className={styles.leadSubmit} disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Email my plan'}
        </button>
      </form>

      {status === 'error' && errorMessage && (
        <p className={styles.leadError} role="alert">
          {errorMessage}
        </p>
      )}
    </section>
  );
}
