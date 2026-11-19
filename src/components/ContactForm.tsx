import React, { useState } from 'react';
import { z } from 'zod';
import { AlertCircle, CheckCircle2, Send } from 'lucide-react';

const ContactFormSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name (at least 2 characters).').max(120),
  email: z.string().trim().email('Please enter a valid email address.').max(160),
  subject: z.string().trim().min(3, 'Please provide a brief subject.').max(180),
  message: z.string().trim().min(10, 'Message must be at least 10 characters.').max(4000),
});

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string; // honeypot
}

export function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
    website: '',
  });
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState<string>('');
  const [submissionId, setSubmissionId] = useState<string>('');

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('idle');
    setFeedback('');

    const parsed = ContactFormSchema.safeParse(form);
    if (!parsed.success) {
      const nextErrors: Partial<Record<keyof FormState, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FormState;
        if (!nextErrors[key]) nextErrors[key] = issue.message;
      }
      setFieldErrors(nextErrors);
      setStatus('error');
      setFeedback('Please correct the highlighted fields before sending.');
      return;
    }

    setStatus('submitting');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.ok) {
        setStatus('error');
        setFeedback(
          data.error ||
            'Unable to submit your message right now. Please email darshuachar4@gmail.com directly.',
        );
        return;
      }

      setStatus('success');
      setSubmissionId(data.id || '');
      setFeedback(data.message || 'Your message was received and validated by the server.');
      setForm({ name: '', email: '', subject: '', message: '', website: '' });
      setFieldErrors({});
    } catch {
      setStatus('error');
      setFeedback(
        'Network error reaching the contact endpoint. You can also reach out directly at darshuachar4@gmail.com.',
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#20232B] p-6 sm:p-8"
    >
      {/* Honeypot anti-spam field */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="contact-website">Leave this field empty</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(e) => handleChange('website', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-name"
            className="block text-xs font-medium text-[#111318] dark:text-[#F5F5F5]"
          >
            Name
          </label>
          <input
            id="contact-name"
            type="text"
            required
            placeholder="Your full name"
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="mt-2 w-full rounded-lg border border-black/12 dark:border-white/12 bg-[#F7F8FA] dark:bg-[#101114] px-3.5 py-2.5 text-sm text-[#111318] dark:text-[#F5F5F5] placeholder:text-[#4E5565]/70 dark:placeholder:text-[#A0A5B1]/60 focus:border-[#456DFF] focus:outline-none"
          />
          {fieldErrors.name && (
            <p className="mt-1.5 text-xs text-rose-500">{fieldErrors.name}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="block text-xs font-medium text-[#111318] dark:text-[#F5F5F5]"
          >
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            required
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="mt-2 w-full rounded-lg border border-black/12 dark:border-white/12 bg-[#F7F8FA] dark:bg-[#101114] px-3.5 py-2.5 text-sm text-[#111318] dark:text-[#F5F5F5] placeholder:text-[#4E5565]/70 dark:placeholder:text-[#A0A5B1]/60 focus:border-[#456DFF] focus:outline-none"
          />
          {fieldErrors.email && (
            <p className="mt-1.5 text-xs text-rose-500">{fieldErrors.email}</p>
          )}
        </div>
      </div>

      <div className="mt-5">
        <label
          htmlFor="contact-subject"
          className="block text-xs font-medium text-[#111318] dark:text-[#F5F5F5]"
        >
          Subject
        </label>
        <input
          id="contact-subject"
          type="text"
          required
          placeholder="Project inquiry, engineering role, or collaboration"
          value={form.subject}
          onChange={(e) => handleChange('subject', e.target.value)}
          className="mt-2 w-full rounded-lg border border-black/12 dark:border-white/12 bg-[#F7F8FA] dark:bg-[#101114] px-3.5 py-2.5 text-sm text-[#111318] dark:text-[#F5F5F5] placeholder:text-[#4E5565]/70 dark:placeholder:text-[#A0A5B1]/60 focus:border-[#456DFF] focus:outline-none"
        />
        {fieldErrors.subject && (
          <p className="mt-1.5 text-xs text-rose-500">{fieldErrors.subject}</p>
        )}
      </div>

      <div className="mt-5">
        <label
          htmlFor="contact-message"
          className="block text-xs font-medium text-[#111318] dark:text-[#F5F5F5]"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          rows={5}
          required
          placeholder="Share a brief overview of what you're looking to build or discuss..."
          value={form.message}
          onChange={(e) => handleChange('message', e.target.value)}
          className="mt-2 w-full rounded-lg border border-black/12 dark:border-white/12 bg-[#F7F8FA] dark:bg-[#101114] px-3.5 py-2.5 text-sm text-[#111318] dark:text-[#F5F5F5] placeholder:text-[#4E5565]/70 dark:placeholder:text-[#A0A5B1]/60 focus:border-[#456DFF] focus:outline-none"
        />
        {fieldErrors.message && (
          <p className="mt-1.5 text-xs text-rose-500">{fieldErrors.message}</p>
        )}
      </div>

      {status === 'success' && (
        <div
          role="status"
          className="mt-5 flex items-start gap-3 rounded-xl border border-[#189C68]/30 dark:border-[#35C58A]/30 bg-[#189C68]/10 dark:bg-[#35C58A]/10 p-4 text-xs text-[#111318] dark:text-[#F5F5F5]"
        >
          <CheckCircle2 className="w-4 h-4 shrink-0 text-[#189C68] dark:text-[#35C58A] mt-0.5" aria-hidden="true" />
          <div>
            <p className="font-medium">{feedback}</p>
            {submissionId && (
              <p className="mt-1 font-mono text-[11px] text-[#4E5565] dark:text-[#A0A5B1]">
                Reference ID: {submissionId}
              </p>
            )}
          </div>
        </div>
      )}

      {status === 'error' && feedback && (
        <div
          role="alert"
          className="mt-5 flex items-start gap-3 rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs text-[#111318] dark:text-[#F5F5F5]"
        >
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-500 mt-0.5" aria-hidden="true" />
          <p>{feedback}</p>
        </div>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-[#4E5565] dark:text-[#A0A5B1]">
          Validated server-side with rate limiting & spam protection.
        </p>
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#3458EB] dark:bg-[#456DFF] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#2746CE] dark:hover:bg-[#375CE6] disabled:opacity-60 transition-colors whitespace-nowrap shrink-0"
        >
          <Send className="w-4 h-4" aria-hidden="true" />
          <span>{status === 'submitting' ? 'Sending...' : 'Send Message'}</span>
        </button>
      </div>
    </form>
  );
}
