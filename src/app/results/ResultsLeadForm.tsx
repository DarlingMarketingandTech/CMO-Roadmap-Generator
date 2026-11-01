'use client';

import { useState, type FormEvent } from 'react';
import type { ContactConversation } from '@/lib/contact-cta';
import styles from './page.module.css';

interface ResultsLeadFormProps {
  /** Compact or legacy token so the API can recompute the same roadmap server-side. */
  roadmapToken: string;
  contact: ContactConversation;
}

export default function ResultsLeadForm({ roadmapToken, contact }: ResultsLeadFormProps) {
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
            Our email service accepted your plan summary for <strong>{email.trim()}</strong>. It
            usually arrives within a few minutes. If it does not, check your spam or promotions
            folder.
          </p>
          <p className={styles.leadSuccessSub}>Want to talk it through?</p>
          <a href={contact.href} className={styles.leadSuccessCta}>
            {contact.label}
          </a>
          <p className={styles.leadSuccessBookSub}>{contact.purpose}</p>
          <p className={styles.leadSuccessHint}>
            You can also use <strong>Copy share link</strong> above to send the full plan to a
            colleague.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.leadSection} aria-labelledby="lead-heading">
      <span className={styles.sectionTag}>Keep a copy</span>
      <h2 id="lead-heading" className={styles.sectionTitle}>
        Email my plan
      </h2>
      <p className={styles.leadIntro}>
        We will email you a summary of this plan: your priorities, the order to tackle them, and the
        suggested services. Your email address is only used to send it.
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
