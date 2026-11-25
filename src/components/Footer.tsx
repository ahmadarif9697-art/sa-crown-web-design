import React from 'react';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { CrownMark } from './CrownLogo';
import { PageRoute } from '../types/navigation';
import { buildGmailComposeUrl, buildWhatsAppUrl, siteConfig } from '../config/siteConfig';

interface FooterProps {
  onNavigate: (page: PageRoute) => void;
  onOpenEnquiry: (subjectHint?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenEnquiry }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#102B25] text-[#F5EBD7] border-t border-[#D6B66F]/20">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-14 lg:py-18">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-[#F5EBD7]/15">
          {/* Studio Identity */}
          <div className="lg:col-span-5">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="inline-flex items-center gap-3 text-left cursor-pointer group"
            >
              <CrownMark className="w-8 h-7 shrink-0" />
              <span className="font-display text-2xl font-semibold text-[#F5EBD7] group-hover:text-[#D6B66F] transition-colors">
                {siteConfig.brandName}
              </span>
            </button>
            <p className="font-display italic text-lg text-[#D6B66F] mt-4">
              {siteConfig.tagline}
            </p>
            <p className="text-sm text-[#F5EBD7]/75 leading-relaxed mt-3 max-w-md">
              Independent web design studio crafting bespoke, responsive editorial websites built
              to look intentional across every viewport from 360px mobile to 1920px widescreen.
            </p>
          </div>

          {/* Navigation Mirror */}
          <div className="lg:col-span-3">
            <h2 className="text-xs font-semibold tracking-widest uppercase text-[#D6B66F] mb-4">
              Navigation
            </h2>
            <ul className="space-y-2.5 text-sm">
              {(
                [
                  { id: 'home', label: 'Homepage' },
                  { id: 'services', label: 'Services' },
                  { id: 'work', label: 'Portfolio / Our Work' },
                  { id: 'case-study', label: 'Alpine Sanctuary Case Study' },
                  { id: 'ivory-table-study', label: 'The Ivory Table Case Study' },
                  { id: 'about', label: 'About the Studio' },
                  { id: 'contact', label: 'Contact' },
                ] as { id: PageRoute; label: string }[]
              ).map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => onNavigate(link.id)}
                    className="text-[#F5EBD7]/80 hover:text-[#D6B66F] transition-colors cursor-pointer text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Configurable Contact Details */}
          <div className="lg:col-span-4">
            <h2 className="text-xs font-semibold tracking-widest uppercase text-[#D6B66F] mb-4">
              Studio Contact
            </h2>
            <div className="space-y-2.5 text-sm text-[#F5EBD7]/80">
              <p>
                <span className="text-[#F5EBD7]/55">Email: </span>
                <a
                  href={buildGmailComposeUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#D6B66F] underline underline-offset-4 decoration-[#D6B66F]/40"
                >
                  {siteConfig.contact.email}
                </a>
              </p>
              <p>
                <span className="text-[#F5EBD7]/55">WhatsApp: </span>
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#D6B66F] underline underline-offset-4 decoration-[#D6B66F]/40"
                >
                  {siteConfig.contact.whatsappDisplay}
                </a>
              </p>
              <p>
                <span className="text-[#F5EBD7]/55">Service Area: </span>
                <span>{siteConfig.contact.serviceArea}</span>
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onOpenEnquiry()}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#D6B66F] text-[#102B25] text-xs font-semibold rounded-sm hover:bg-[#E5CD96] transition-colors cursor-pointer whitespace-nowrap min-h-[40px]"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 border border-[#F5EBD7]/25 text-[#F5EBD7] text-xs font-medium rounded-sm hover:border-[#D6B66F] hover:text-[#D6B66F] transition-colors whitespace-nowrap min-h-[40px]"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#D6B66F]" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#F5EBD7]/60">
          <p>
            © {currentYear} {siteConfig.brandName}. All rights reserved.
          </p>
          <p>
            Designed for 360px, 390px, 430px, 768px, 1024px, 1440px &amp; 1920px viewports.
          </p>
        </div>
      </div>
    </footer>
  );
};
