import React, { useState, useEffect } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';
import { CrownMark } from './CrownLogo';
import { PageRoute, NavItem } from '../types/navigation';
import { buildWhatsAppUrl, siteConfig } from '../config/siteConfig';

interface NavbarProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
  onOpenEnquiry: (subjectHint?: string) => void;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'work', label: 'Our Work' },
  { id: 'case-study', label: 'Case Study' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenEnquiry,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [currentPage]);

  const handleLinkClick = (page: PageRoute) => {
    setMobileOpen(false);
    onNavigate(page);
  };

  return (
    <header className="md:sticky md:top-0 z-40 bg-[#102B25]/95 backdrop-blur-md border-b border-[#D6B66F]/20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 h-16 md:h-[72px] flex items-center justify-between gap-3 sm:gap-6 xl:gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <button
          type="button"
          onClick={() => handleLinkClick('home')}
          className="flex items-center gap-3 text-left whitespace-nowrap shrink-0 group cursor-pointer"
          aria-label="SA Crown Web Design — Return to Homepage"
        >
          <CrownMark className="w-7 h-6 shrink-0 transition-transform duration-200 group-hover:scale-105" />
          <span className="font-display text-lg sm:text-xl font-semibold tracking-tight text-[#F5EBD7] whitespace-nowrap">
            {siteConfig.brandName}
          </span>
        </button>

        {/* Zone 2: 6 concise single-line navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-6 xl:gap-7"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleLinkClick(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-2 text-sm font-medium tracking-wide transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'text-[#D6B66F]'
                    : 'text-[#F5EBD7]/85 hover:text-[#F5EBD7]'
                }`}
              >
                {item.label}
                <span
                  className={`absolute left-0 right-0 bottom-0.5 h-px bg-[#D6B66F] transition-transform duration-200 origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                  aria-hidden="true"
                />
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Single primary action on desktop + mobile drawer trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              onOpenEnquiry();
            }}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 bg-[#D6B66F] text-[#102B25] text-xs font-semibold tracking-wide rounded-sm hover:bg-[#E5CD96] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer min-h-[40px]"
          >
            Start a Project
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 text-[#F5EBD7] border border-[#F5EBD7]/20 rounded-sm hover:border-[#D6B66F] hover:text-[#D6B66F] transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div
          id="mobile-navigation-drawer"
          className="lg:hidden bg-[#0B1F1B] border-t border-[#D6B66F]/20 px-5 py-6"
        >
          <nav aria-label="Mobile Navigation" className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleLinkClick(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`w-full text-left px-3 py-3 text-base font-medium rounded-sm transition-colors cursor-pointer min-h-[44px] ${
                    isActive
                      ? 'text-[#D6B66F] bg-[#102B25]'
                      : 'text-[#F5EBD7] hover:bg-[#102B25]/70'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="mt-5 pt-5 border-t border-[#F5EBD7]/15 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenEnquiry();
              }}
              className="w-full py-3 px-5 bg-[#D6B66F] text-[#102B25] text-sm font-semibold rounded-sm hover:bg-[#E5CD96] transition-colors cursor-pointer min-h-[44px]"
            >
              Discuss a Similar Project
            </button>
            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-5 border border-[#D6B66F]/40 text-[#F5EBD7] text-sm font-medium rounded-sm flex items-center justify-center gap-2 hover:border-[#D6B66F] transition-colors min-h-[44px]"
            >
              <MessageCircle className="w-4 h-4 text-[#D6B66F]" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
