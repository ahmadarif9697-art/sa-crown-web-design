import React from 'react';
import { MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl } from '../config/siteConfig';

export const WhatsAppButton: React.FC = () => {
  return (
    <a
      href={buildWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact SA Crown Web Design on WhatsApp"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 inline-flex items-center justify-center gap-2.5 h-11 px-4 bg-[#102B25] text-[#F5EBD7] border border-[#D6B66F]/60 rounded-sm shadow-lg hover:bg-[#173D34] hover:border-[#D6B66F] transition-all duration-200 whitespace-nowrap"
    >
      <MessageCircle className="w-4 h-4 text-[#D6B66F] shrink-0" />
      <span className="hidden sm:inline text-xs font-semibold tracking-wide">
        WhatsApp Studio
      </span>
    </a>
  );
};
