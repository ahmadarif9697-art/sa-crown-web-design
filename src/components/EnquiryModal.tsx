import React, { useState, useEffect } from 'react';
import { X, Copy, Check, Mail, MessageCircle, AlertCircle } from 'lucide-react';
import { buildGmailComposeUrl, buildWhatsAppUrl, siteConfig } from '../config/siteConfig';
import { CrownMark } from './CrownLogo';

interface EnquiryModalProps {
  isOpen: boolean;
  subjectHint?: string;
  onClose: () => void;
}

interface FormState {
  fullName: string;
  email: string;
  businessName: string;
  projectType: string;
  timeline: string;
  details: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  details?: string;
}

const PROJECT_TYPES = [
  'Bespoke Business Website',
  'Hospitality / Brand Flagship Concept',
  'Multi-Viewport Redesign',
  'Portfolio or Service Showcase',
];

const TIMELINES = [
  'Flexible / Exploring Options',
  'Within 4–6 Weeks',
  'Within 2–3 Months',
];

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  subjectHint,
  onClose,
}) => {
  const [form, setForm] = useState<FormState>({
    fullName: '',
    email: '',
    businessName: '',
    projectType: PROJECT_TYPES[0],
    timeline: TIMELINES[0],
    details: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [preparedBrief, setPreparedBrief] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setPreparedBrief(null);
      setErrors({});
      setCopied(false);
      setForm((prev) => ({
        ...prev,
        projectType: subjectHint?.includes('Alpine Sanctuary')
          ? 'Hospitality / Brand Flagship Concept'
          : subjectHint
          ? PROJECT_TYPES[0]
          : prev.projectType,
        details: subjectHint
          ? `I would like to discuss a project inspired by ${subjectHint}.`
          : prev.details.startsWith('I would like to discuss a project inspired by ')
          ? ''
          : prev.details,
      }));
    }
  }, [isOpen, subjectHint]);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};
    if (form.fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter your full name (at least 2 characters).';
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(form.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (form.details.trim().length < 15) {
      nextErrors.details =
        'Please share a short outline of your project goals (at least 15 characters).';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handlePrepareBrief = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const lines = [
      `Project Enquiry — ${siteConfig.brandName}`,
      `Name: ${form.fullName.trim()}`,
      `Email: ${form.email.trim()}`,
      `Business / Organization: ${form.businessName.trim() || 'Not specified'}`,
      `Project Focus: ${form.projectType}`,
      `Target Timeline: ${form.timeline}`,
      '',
      'Project Summary:',
      form.details.trim(),
    ];
    setPreparedBrief(lines.join('\n'));
  };

  const handleCopyBrief = async () => {
    if (!preparedBrief) return;
    try {
      await navigator.clipboard.writeText(preparedBrief);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard API unavailable in restricted contexts
    }
  };

  const gmailHref = preparedBrief
    ? buildGmailComposeUrl(
        `Project Enquiry: ${form.projectType} (${form.fullName.trim()})`,
        preparedBrief
      )
    : buildGmailComposeUrl();

  const whatsappHref = preparedBrief ? buildWhatsAppUrl(preparedBrief) : buildWhatsAppUrl();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0B1F1B]/80 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-xl bg-[#FAF4E8] text-[#202522] border border-[#D6B66F]/40 rounded-sm shadow-2xl my-auto">
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 px-6 py-5 bg-[#102B25] text-[#F5EBD7] border-b border-[#D6B66F]/30">
          <div className="flex items-center gap-3">
            <CrownMark className="w-6 h-5 shrink-0" />
            <div>
              <h2
                id="enquiry-modal-title"
                className="font-display text-xl sm:text-2xl font-semibold text-[#F5EBD7]"
              >
                Discuss a Similar Project
              </h2>
              <p className="text-xs text-[#F5EBD7]/75 mt-0.5">
                Prepare a validated project brief to send via email or WhatsApp.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close project enquiry modal"
            className="w-10 h-10 inline-flex items-center justify-center text-[#F5EBD7]/80 hover:text-[#D6B66F] border border-[#F5EBD7]/15 rounded-sm transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form or Prepared Brief Dispatch */}
        {!preparedBrief ? (
          <form onSubmit={handlePrepareBrief} noValidate className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="modal-name"
                  className="block text-xs font-semibold text-[#102B25] mb-1.5"
                >
                  Full Name *
                </label>
                <input
                  id="modal-name"
                  type="text"
                  value={form.fullName}
                  onChange={(e) => {
                    setForm({ ...form, fullName: e.target.value });
                    if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
                  }}
                  placeholder="Your name"
                  aria-invalid={Boolean(errors.fullName)}
                  className="w-full px-3.5 py-2.5 bg-[#FFFDF8] border border-[#102B25]/25 rounded-sm text-sm text-[#202522] placeholder:text-[#202522]/45 focus:border-[#102B25] focus:outline-none min-h-[42px]"
                />
                {errors.fullName && (
                  <p className="mt-1 text-xs text-red-700 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.fullName}</span>
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="modal-email"
                  className="block text-xs font-semibold text-[#102B25] mb-1.5"
                >
                  Email Address *
                </label>
                <input
                  id="modal-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => {
                    setForm({ ...form, email: e.target.value });
                    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  placeholder="name@company.example"
                  aria-invalid={Boolean(errors.email)}
                  className="w-full px-3.5 py-2.5 bg-[#FFFDF8] border border-[#102B25]/25 rounded-sm text-sm text-[#202522] placeholder:text-[#202522]/45 focus:border-[#102B25] focus:outline-none min-h-[42px]"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-700 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="modal-business"
                  className="block text-xs font-semibold text-[#102B25] mb-1.5"
                >
                  Business / Brand
                </label>
                <input
                  id="modal-business"
                  type="text"
                  value={form.businessName}
                  onChange={(e) => setForm({ ...form, businessName: e.target.value })}
                  placeholder="Optional"
                  className="w-full px-3.5 py-2.5 bg-[#FFFDF8] border border-[#102B25]/25 rounded-sm text-sm text-[#202522] placeholder:text-[#202522]/45 focus:border-[#102B25] focus:outline-none min-h-[42px]"
                />
              </div>

              <div>
                <label
                  htmlFor="modal-project-type"
                  className="block text-xs font-semibold text-[#102B25] mb-1.5"
                >
                  Project Scope
                </label>
                <select
                  id="modal-project-type"
                  value={form.projectType}
                  onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FFFDF8] border border-[#102B25]/25 rounded-sm text-sm text-[#202522] placeholder:text-[#202522]/45 focus:border-[#102B25] focus:outline-none min-h-[42px]"
                >
                  {PROJECT_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="modal-timeline"
                className="block text-xs font-semibold text-[#102B25] mb-1.5"
              >
                Preferred Timeline
              </label>
              <select
                id="modal-timeline"
                value={form.timeline}
                onChange={(e) => setForm({ ...form, timeline: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#FFFDF8] border border-[#102B25]/25 rounded-sm text-sm text-[#202522] placeholder:text-[#202522]/45 focus:border-[#102B25] focus:outline-none min-h-[42px]"
              >
                {TIMELINES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="modal-details"
                className="block text-xs font-semibold text-[#102B25] mb-1.5"
              >
                Project Overview *
              </label>
              <textarea
                id="modal-details"
                rows={4}
                value={form.details}
                onChange={(e) => {
                  setForm({ ...form, details: e.target.value });
                  if (errors.details) setErrors((prev) => ({ ...prev, details: undefined }));
                }}
                placeholder="Tell us about your business, key pages needed, and visual direction..."
                aria-invalid={Boolean(errors.details)}
                className="w-full px-3.5 py-2.5 bg-[#FFFDF8] border border-[#102B25]/25 rounded-sm text-sm text-[#202522] placeholder:text-[#202522]/45 focus:border-[#102B25] focus:outline-none resize-y"
              />
              {errors.details && (
                <p className="mt-1 text-xs text-red-700 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.details}</span>
                </p>
              )}
            </div>

            <p className="text-xs text-[#202522]/70 leading-relaxed">
              This studio website validates your brief locally and creates a ready-to-send message
              for your email app or WhatsApp—no automated server storage is claimed.
            </p>

            <div className="pt-2 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 border border-[#102B25]/25 text-[#102B25] text-xs font-semibold rounded-sm hover:bg-[#102B25]/5 transition-colors cursor-pointer min-h-[42px]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#102B25] text-[#F5EBD7] text-xs font-semibold rounded-sm hover:bg-[#1A4239] transition-colors cursor-pointer min-h-[42px]"
              >
                Prepare Project Brief
              </button>
            </div>
          </form>
        ) : (
          <div className="p-6 space-y-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#102B25]">
                Brief Ready to Dispatch
              </p>
              <p className="text-sm text-[#202522]/80 mt-1">
                Your enquiry details passed validation. Choose how you would like to send this
                brief directly:
              </p>
            </div>

            <pre className="p-4 bg-[#F5EBD7]/60 border border-[#102B25]/15 rounded-sm text-xs text-[#202522] whitespace-pre-wrap font-sans leading-relaxed max-h-52 overflow-y-auto">
              {preparedBrief}
            </pre>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <a
                href={gmailHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#102B25] text-[#F5EBD7] text-xs font-semibold rounded-sm hover:bg-[#1A4239] transition-colors min-h-[42px]"
              >
                <Mail className="w-4 h-4 text-[#D6B66F]" />
                <span>Compose in Gmail</span>
              </a>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#D6B66F] text-[#102B25] text-xs font-semibold rounded-sm hover:bg-[#E5CD96] transition-colors min-h-[42px]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send via WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={handleCopyBrief}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-[#102B25]/25 text-[#102B25] text-xs font-semibold rounded-sm hover:bg-[#102B25]/5 transition-colors cursor-pointer min-h-[42px]"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-[#102B25]" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Brief</span>
                  </>
                )}
              </button>
            </div>

            <div className="pt-2 border-t border-[#102B25]/10 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setPreparedBrief(null)}
                className="text-xs font-medium text-[#102B25] underline underline-offset-4 cursor-pointer"
              >
                Edit Brief Details
              </button>
              <button
                type="button"
                onClick={onClose}
                className="text-xs font-semibold text-[#202522]/75 hover:text-[#202522] cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
