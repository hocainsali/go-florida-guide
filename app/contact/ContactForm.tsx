"use client";

import { useEffect, useRef, useState } from "react";

const topics = ["Planning a Florida holiday", "Theme parks & family days", "Flights, budgets & accommodation", "Beaches & road trips", "Feedback on a guide", "Partnerships & other enquiries"];
type Field = "name" | "email" | "topic" | "message";
type Draft = Record<Field, string>;

export default function ContactForm() {
  const [draft, setDraft] = useState<Draft>({ name: "", email: "", topic: "", message: "" });
  const [errors, setErrors] = useState<Partial<Draft>>({});
  const [reviewing, setReviewing] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const reviewHeading = useRef<HTMLHeadingElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (reviewing) reviewHeading.current?.focus();
  }, [reviewing]);

  function update(field: Field, value: string) {
    setDraft((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({ ...previous, [field]: undefined }));
  }

  function review(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: Partial<Draft> = {};
    if (!draft.name.trim()) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email.trim())) next.email = "Please enter a valid email address.";
    if (!topics.includes(draft.topic)) next.topic = "Please choose a topic.";
    if (draft.message.trim().length < 10) next.message = "Please add a little more detail (at least 10 characters).";
    setErrors(next);
    const first = (Object.keys(next) as Field[])[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setCopyStatus("");
    setReviewing(true);
  }

  async function copyDraft() {
    try {
      await navigator.clipboard.writeText(`Name: ${draft.name.trim()}\nEmail: ${draft.email.trim()}\nTopic: ${draft.topic}\n\n${draft.message.trim()}`);
      setCopyStatus("Message copied. Nothing has been sent.");
    } catch {
      setCopyStatus("Copy isn’t available here. You can select and copy the message above.");
    }
  }

  return (
    <section className="contact-form-panel" id="contact-form" aria-labelledby="contact-form-title">
      <div className="contact-form-heading">
        <div className="contact-envelope" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m4 7 8 6 8-6" /></svg></div>
        <span className="contact-form-step type-body">{reviewing ? "REVIEW" : "SAY HELLO"}</span>
      </div>
      <h2 className="type-card-title" id="contact-form-title">A good trip starts with a conversation.</h2>
      <p className="contact-form-intro type-body">Tell us a little about what you have in mind.</p>

      {reviewing ? (
        <div className="contact-review">
          <h3 ref={reviewHeading} tabIndex={-1} className="type-card-title">Your message, ready to review.</h3>
          <p className="contact-preview-note type-body">Preview only: message delivery is not connected yet. Nothing has been sent.</p>
          <dl className="contact-review-details type-body">
            <div><dt>Name</dt><dd>{draft.name.trim()}</dd></div>
            <div><dt>Email</dt><dd>{draft.email.trim()}</dd></div>
            <div><dt>Topic</dt><dd>{draft.topic}</dd></div>
          </dl>
          <p className="contact-review-message type-body">{draft.message.trim()}</p>
          <div className="contact-review-actions">
            <button className="contact-submit site-cta type-body" type="button" onClick={copyDraft}>Copy message</button>
            <button className="contact-edit site-cta type-body" type="button" onClick={() => { setReviewing(false); setTimeout(() => nameRef.current?.focus(), 0); }}>Edit message</button>
          </div>
          <p className="contact-copy-status type-body" role="status">{copyStatus}</p>
        </div>
      ) : (
        <form ref={formRef} onSubmit={review} noValidate>
          <div className="contact-fields-pair">
            <div className="contact-field">
              <label htmlFor="contact-name">Your name</label>
              <input ref={nameRef} id="contact-name" name="name" autoComplete="name" placeholder="Alex Smith" maxLength={80} required value={draft.name} onChange={(event) => update("name", event.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? "contact-name-error" : undefined} />
              {errors.name && <p className="contact-error" id="contact-name-error">{errors.name}</p>}
            </div>
            <div className="contact-field">
              <label htmlFor="contact-email">Email address</label>
              <input id="contact-email" name="email" type="email" autoComplete="email" inputMode="email" placeholder="alex@example.com" maxLength={254} required value={draft.email} onChange={(event) => update("email", event.target.value)} aria-invalid={!!errors.email} aria-describedby={errors.email ? "contact-email-error" : undefined} />
              {errors.email && <p className="contact-error" id="contact-email-error">{errors.email}</p>}
            </div>
          </div>
          <div className="contact-field">
            <label htmlFor="contact-topic">What’s on your mind?</label>
            <select id="contact-topic" name="topic" required value={draft.topic} onChange={(event) => update("topic", event.target.value)} aria-invalid={!!errors.topic} aria-describedby={errors.topic ? "contact-topic-error" : undefined}>
              <option value="" disabled>Choose a topic</option>
              {topics.map((topic) => <option key={topic} value={topic}>{topic}</option>)}
            </select>
            {errors.topic && <p className="contact-error" id="contact-topic-error">{errors.topic}</p>}
          </div>
          <div className="contact-field">
            <label htmlFor="contact-message">Your message</label>
            <textarea id="contact-message" name="message" rows={4} maxLength={2000} minLength={10} required placeholder="The big plans, the little questions—we’re listening." value={draft.message} onChange={(event) => update("message", event.target.value)} aria-invalid={!!errors.message} aria-describedby={`contact-message-hint${errors.message ? " contact-message-error" : ""}`} />
            <div className="contact-message-meta"><span id="contact-message-hint">Please leave out sensitive or payment details.</span><span>{draft.message.length}/2000</span></div>
            {errors.message && <p className="contact-error" id="contact-message-error">{errors.message}</p>}
          </div>
          <button className="contact-submit site-cta type-body" type="submit">Review your message</button>
        </form>
      )}
    </section>
  );
}
