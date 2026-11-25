export function resolvePublicDemoUrl(raw: unknown): string | null {
  if (typeof raw !== 'string') return null;
  const trimmed = raw.trim();
  if (!trimmed || trimmed === 'undefined' || trimmed === 'null' || trimmed === 'false') {
    return null;
  }

  const hasScheme = /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(trimmed);
  const candidate = hasScheme ? trimmed : `https://${trimmed}`;

  try {
    const parsed = new URL(candidate);
    if ((parsed.protocol === 'https:' || parsed.protocol === 'http:') && parsed.hostname) {
      return candidate;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Central configuration for SA Crown Web Design.
 * Replace placeholder contact values and optional public demo URLs below before deployment.
 */
export const siteConfig = {
  brandName: 'SA Crown Web Design',
  tagline: 'Your Business Deserves a Better Website.',
  contact: {
    // Business contact email
    email: 'sales.sacrown@gmail.com',
    // Official business WhatsApp display and international digits-only format (no '+' or spaces).
    // Configurable via VITE_WHATSAPP_NUMBER or directly here.
    whatsappDisplay: '+91 60065 06680',
    whatsappNumber: import.meta.env?.VITE_WHATSAPP_NUMBER || '916006506680',
    whatsappDefaultMessage:
      'Hello SA Crown Web Design, I would like to discuss a custom website for my business. Please share your availability for a brief consultation.',
    serviceArea: 'Serving clients across India and worldwide.',
    studioHours: 'Monday – Friday · Consultations by Appointment',
  },
  projects: {
    alpineSanctuary: {
      title: 'Alpine Sanctuary',
      classification: 'Fictional Luxury Hotel Design Concept',
      // Driven by VITE_ALPINE_DEMO_URL; resolves to null when unavailable or invalid.
      publicDemoUrl: resolvePublicDemoUrl(import.meta.env?.VITE_ALPINE_DEMO_URL),
    },
    theIvoryTable: {
      title: 'The Ivory Table',
      category: 'Fine Dining & Hospitality',
      classification: 'Fictional Luxury Restaurant Design Concept',
      publicDemoUrl: 'https://the-ivory-table.ahmadarif9697.workers.dev',
    },
  },
} as const;

export function buildWhatsAppUrl(customMessage?: string): string {
  const digits = String(siteConfig.contact.whatsappNumber).replace(/\D/g, '');
  const text = encodeURIComponent(
    customMessage ?? siteConfig.contact.whatsappDefaultMessage
  );
  return `https://wa.me/${digits}?text=${text}`;
}

export function buildGmailComposeUrl(subject?: string, body?: string): string {
  let url = `https://mail.google.com/mail/?view=cm&fs=1&to=${siteConfig.contact.email}`;
  if (subject) {
    url += `&su=${encodeURIComponent(subject)}`;
  }
  if (body) {
    url += `&body=${encodeURIComponent(body)}`;
  }
  return url;
}
