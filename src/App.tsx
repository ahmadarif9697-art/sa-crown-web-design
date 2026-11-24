/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { EnquiryModal } from './components/EnquiryModal';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { CaseStudyPage } from './pages/CaseStudyPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PageRoute, EnquiryContext } from './types/navigation';

const HASH_TO_PAGE: Record<string, PageRoute> = {
  '#home': 'home',
  '#services': 'services',
  '#work': 'work',
  '#alpine-sanctuary': 'case-study',
  '#about': 'about',
  '#contact': 'contact',
};

const PAGE_TO_HASH: Record<PageRoute, string> = {
  home: '#home',
  services: '#services',
  work: '#work',
  'case-study': '#alpine-sanctuary',
  about: '#about',
  contact: '#contact',
};

function getInitialPage(): PageRoute {
  if (typeof window === 'undefined') return 'home';
  return HASH_TO_PAGE[window.location.hash] || 'home';
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageRoute>(getInitialPage);
  const [enquiry, setEnquiry] = useState<EnquiryContext>({
    isOpen: false,
  });

  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash;
      if (!hash || hash === '#') {
        setCurrentPage('home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const matched = HASH_TO_PAGE[hash];
      if (matched) {
        setCurrentPage(matched);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    window.addEventListener('hashchange', syncFromHash);
    window.addEventListener('popstate', syncFromHash);
    return () => {
      window.removeEventListener('hashchange', syncFromHash);
      window.removeEventListener('popstate', syncFromHash);
    };
  }, []);

  const handleNavigate = (page: PageRoute) => {
    setCurrentPage(page);
    const targetHash = PAGE_TO_HASH[page];
    if (window.location.hash !== targetHash) {
      window.history.pushState(null, '', targetHash);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenEnquiry = (subjectHint?: string) => {
    setEnquiry({
      isOpen: true,
      subjectHint,
    });
  };

  const handleCloseEnquiry = () => {
    setEnquiry({ isOpen: false });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5EBD7] text-[#202522] overflow-x-clip">
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenEnquiry={handleOpenEnquiry}
      />

      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenEnquiry={handleOpenEnquiry}
          />
        )}
        {currentPage === 'services' && (
          <ServicesPage
            onNavigate={handleNavigate}
            onOpenEnquiry={handleOpenEnquiry}
          />
        )}
        {currentPage === 'work' && (
          <PortfolioPage
            onNavigate={handleNavigate}
            onOpenEnquiry={handleOpenEnquiry}
          />
        )}
        {currentPage === 'case-study' && (
          <CaseStudyPage
            onNavigate={handleNavigate}
            onOpenEnquiry={handleOpenEnquiry}
          />
        )}
        {currentPage === 'about' && (
          <AboutPage
            onNavigate={handleNavigate}
            onOpenEnquiry={handleOpenEnquiry}
          />
        )}
        {currentPage === 'contact' && <ContactPage />}
      </main>

      <Footer
        onNavigate={handleNavigate}
        onOpenEnquiry={handleOpenEnquiry}
      />

      <WhatsAppButton />

      <EnquiryModal
        isOpen={enquiry.isOpen}
        subjectHint={enquiry.subjectHint}
        onClose={handleCloseEnquiry}
      />
    </div>
  );
}
