import React, { useState } from 'react';
import {
  Mail,
  MessageCircle,
  Globe,
  Clock,
  Copy,
  Check,
  AlertCircle,
} from 'lucide-react';
import { buildGmailComposeUrl, buildWhatsAppUrl, siteConfig } from '../config/siteConfig';
import { SafeImage } from '../components/SafeImage';

const CONTACT_SALON_IMG = '/src/assets/images/architectural_studio_salon_1795494369212.jpg';

interface ContactFormState {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
}

interface ContactFormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const SERVICE_OPTIONS = [
  'Bespoke Business Website',
  'Website Redesign & Responsive Upgrade',
  'Hospitality / Flagship Brand Concept',
  'Front-End Architecture Consultation',
];

export const ContactPage: React.FC = () => {
  const [form, setForm] = useState<ContactFormState>({
    name: '',
    email: '',
    company: '',
    service: SERVICE_OPTIONS[0],
    message: '',
  });
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [preparedDraft, setPreparedDraft] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const validate = (): boolean => {
    const nextErrors: ContactFormErrors = {};
    if (form.name.trim().length < 2) {
      nextErrors.name = 'Please enter your name (at least 2 characters).';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (form.message.trim().length < 15) {
      nextErrors.message =
        'Please include a brief description of your project (at least 15 characters).';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const draft = [
      `Contact Enquiry — ${siteConfig.brandName}`,
      `Name: ${form.name.trim()}`,
      `Email: ${form.email.trim()}`,
      `Company / Business: ${form.company.trim() || 'Not specified'}`,
      `Service Interest: ${form.service}`,
      '',
      'Message:',
      form.message.trim(),
    ].join('\n');

    setPreparedDraft(draft);
  };

  const handleCopy = async () => {
    if (!preparedDraft) return;
    try {
      await navigator.clipboard.writeText(preparedDraft);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard API unavailable
    }
  };

  const gmailComposeUrl = preparedDraft
    ? buildGmailComposeUrl(
        `Website Enquiry from ${form.name.trim()} — ${form.service}`,
        preparedDraft
      )
    : buildGmailComposeUrl();

  return (
    <div>
      {/* Header */}
      <section className="bg-[#102B25] text-[#F5EBD7] py-16 sm:py-20 border-b border-[#D6B66F]/20">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D6B66F]">
            Contact {siteConfig.brandName}
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[#F5EBD7] mt-3 max-w-3xl text-balance">
            Start a Conversation About Your Next Website.
          </h1>
          <p className="text-base sm:text-lg text-[#F5EBD7]/80 leading-relaxed mt-5 max-w-2xl">
            Validate your project brief below to open a formatted email draft or start a direct
            WhatsApp conversation.
          </p>
        </div>
      </section>

      {/* Contact Split */}
      <section className="bg-[#F5EBD7] text-[#202522] py-16 sm:py-24">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Configurable Studio Details */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="p-7 sm:p-9 bg-[#102B25] text-[#F5EBD7] rounded-sm border border-[#D6B66F]/25 flex flex-col justify-between h-full gap-6">
              <div className="space-y-6">
                <div className="aspect-[16/9] rounded-sm overflow-hidden border border-[#D6B66F]/25 bg-[#0B1F1B]">
                  <SafeImage
                    src={CONTACT_SALON_IMG}
                    alt="Minimalist architectural reception salon featuring a monolithic forest-green veined stone desk, warm limewash plaster walls, and subtle champagne cove lighting"
                    className="w-full h-full object-cover object-center"
                    fallbackTitle="SA Crown Studio Salon"
                  />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D6B66F]">
                    Direct Channels
                  </p>
                  <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#F5EBD7] mt-2">
                    Studio Details
                  </h2>
                  <p className="text-sm text-[#F5EBD7]/80 mt-2 leading-relaxed">
                    Reach out directly via email or WhatsApp, or prepare a project brief using the
                    enquiry form.
                  </p>
                </div>

                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-[#D6B66F] shrink-0 mt-1" />
                    <div>
                      <p className="text-xs text-[#F5EBD7]/60">Email Address</p>
                      <a
                        href={buildGmailComposeUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#F5EBD7] hover:text-[#D6B66F] underline underline-offset-4 decoration-[#D6B66F]/40 break-all"
                      >
                        {siteConfig.contact.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MessageCircle className="w-4 h-4 text-[#D6B66F] shrink-0 mt-1" />
                    <div>
                      <p className="text-xs text-[#F5EBD7]/60">Business WhatsApp</p>
                      <a
                        href={buildWhatsAppUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#F5EBD7] hover:text-[#D6B66F] underline underline-offset-4 decoration-[#D6B66F]/40"
                      >
                        {siteConfig.contact.whatsappDisplay}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Globe className="w-4 h-4 text-[#D6B66F] shrink-0 mt-1" />
                    <div>
                      <p className="text-xs text-[#F5EBD7]/60">Service Area</p>
                      <p className="text-[#F5EBD7]">{siteConfig.contact.serviceArea}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-[#D6B66F] shrink-0 mt-1" />
                    <div>
                      <p className="text-xs text-[#F5EBD7]/60">Availability</p>
                      <p className="text-[#F5EBD7]">{siteConfig.contact.studioHours}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-5 border-t border-[#D6B66F]/20">
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-5 py-3.5 bg-[#D6B66F] text-[#102B25] text-xs font-semibold rounded-sm hover:bg-[#E5CD96] transition-colors min-h-[44px]"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Message Studio on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Validated Form */}
          <div className="lg:col-span-7 bg-[#102B25] text-[#F5EBD7] border border-[#D6B66F]/25 rounded-sm p-7 sm:p-9 h-full">
            {!preparedDraft ? (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D6B66F]">
                    Structured Brief
                  </p>
                  <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#F5EBD7] mt-2">
                    Project Enquiry Form
                  </h2>
                  <p className="text-sm text-[#F5EBD7]/80 mt-2">
                    Fill in your details below. Submitting validates your inputs and prepares a
                    ready-to-send draft for your email app, WhatsApp, or clipboard.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-semibold text-[#D6B66F] mb-1.5"
                    >
                      Your Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={form.name}
                      onChange={(e) => {
                        setForm({ ...form, name: e.target.value });
                        if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                      }}
                      placeholder="Full name"
                      aria-invalid={Boolean(errors.name)}
                      className="w-full px-3.5 py-2.5 bg-[#FAF4E8] border border-[#D6B66F]/35 rounded-sm text-sm text-[#202522] placeholder:text-[#202522]/45 focus:border-[#D6B66F] focus:bg-[#FFFDF8] focus:outline-none min-h-[44px]"
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-xs text-[#F5B7B1] flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-semibold text-[#D6B66F] mb-1.5"
                    >
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => {
                        setForm({ ...form, email: e.target.value });
                        if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                      }}
                      placeholder="you@business.example"
                      aria-invalid={Boolean(errors.email)}
                      className="w-full px-3.5 py-2.5 bg-[#FAF4E8] border border-[#D6B66F]/35 rounded-sm text-sm text-[#202522] placeholder:text-[#202522]/45 focus:border-[#D6B66F] focus:bg-[#FFFDF8] focus:outline-none min-h-[44px]"
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-[#F5B7B1] flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="contact-company"
                      className="block text-xs font-semibold text-[#D6B66F] mb-1.5"
                    >
                      Business Name
                    </label>
                    <input
                      id="contact-company"
                      type="text"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      placeholder="Optional"
                      className="w-full px-3.5 py-2.5 bg-[#FAF4E8] border border-[#D6B66F]/35 rounded-sm text-sm text-[#202522] placeholder:text-[#202522]/45 focus:border-[#D6B66F] focus:bg-[#FFFDF8] focus:outline-none min-h-[44px]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-service"
                      className="block text-xs font-semibold text-[#D6B66F] mb-1.5"
                    >
                      Service Interest
                    </label>
                    <select
                      id="contact-service"
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF4E8] border border-[#D6B66F]/35 rounded-sm text-sm text-[#202522] focus:border-[#D6B66F] focus:bg-[#FFFDF8] focus:outline-none min-h-[44px]"
                    >
                      {SERVICE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-semibold text-[#D6B66F] mb-1.5"
                  >
                    Project Details *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    value={form.message}
                    onChange={(e) => {
                      setForm({ ...form, message: e.target.value });
                      if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                    }}
                    placeholder="Share your business context, pages needed, or reference concepts..."
                    aria-invalid={Boolean(errors.message)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF4E8] border border-[#D6B66F]/35 rounded-sm text-sm text-[#202522] placeholder:text-[#202522]/45 focus:border-[#D6B66F] focus:bg-[#FFFDF8] focus:outline-none resize-y"
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-xs text-[#F5B7B1] flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t border-[#D6B66F]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <p className="text-xs text-[#F5EBD7]/70 max-w-sm">
                    Client-side validation only—no fake email-delivery confirmation is shown.
                  </p>
                  <button
                    type="submit"
                    className="px-6 py-3.5 bg-[#D6B66F] text-[#102B25] text-xs font-semibold rounded-sm hover:bg-[#E5CD96] transition-colors cursor-pointer min-h-[44px] whitespace-nowrap"
                  >
                    Validate &amp; Prepare Message
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D6B66F]">
                    Validated Brief Ready
                  </p>
                  <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#F5EBD7] mt-1">
                    Send Your Enquiry Directly
                  </h2>
                  <p className="text-sm text-[#F5EBD7]/80 mt-1">
                    Choose your preferred method below to dispatch your validated enquiry:
                  </p>
                </div>

                <pre className="p-4 bg-[#0B1F1B] border border-[#D6B66F]/25 rounded-sm text-xs text-[#F5EBD7]/90 whitespace-pre-wrap font-sans leading-relaxed">
                  {preparedDraft}
                </pre>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <a
                    href={gmailComposeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#D6B66F] text-[#102B25] text-xs font-semibold rounded-sm hover:bg-[#E5CD96] transition-colors min-h-[44px]"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Compose in Gmail</span>
                  </a>

                  <a
                    href={buildWhatsAppUrl(preparedDraft)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#0B1F1B] border border-[#D6B66F]/45 text-[#F5EBD7] text-xs font-semibold rounded-sm hover:border-[#D6B66F] hover:text-[#D6B66F] transition-colors min-h-[44px]"
                  >
                    <MessageCircle className="w-4 h-4 text-[#D6B66F]" />
                    <span>Send via WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 border border-[#F5EBD7]/30 text-[#F5EBD7] text-xs font-semibold rounded-sm hover:border-[#D6B66F] hover:text-[#D6B66F] transition-colors cursor-pointer min-h-[44px]"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-[#D6B66F]" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Text</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="pt-4 border-t border-[#D6B66F]/20">
                  <button
                    type="button"
                    onClick={() => setPreparedDraft(null)}
                    className="text-xs font-semibold text-[#D6B66F] hover:text-[#E5CD96] underline underline-offset-4 cursor-pointer"
                  >
                    Edit Form Details
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
