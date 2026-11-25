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
import { TheIvoryTableCaseStudyPage } from './pages/TheIvoryTableCaseStudyPage';
import { NorthboundCaseStudyPage } from './pages/NorthboundCaseStudyPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PageRoute, EnquiryContext } from './types/navigation';
import { isObsoleteShopifyPath, isValidAppDocumentPath } from './utils/routePaths';

const HASH_TO_PAGE: Record<string, PageRoute> = {
  '#home': 'home',
  '#services': 'services',
  '#work': 'work',
  '#alpine-sanctuary': 'case-study',
  '#the-ivory-table': 'ivory-table-study',
  '#northbound-journeys': 'northbound-study',
  '#about': 'about',
  '#contact': 'contact',
};

const PAGE_TO_HASH: Record<PageRoute, string> = {
  home: '#home',
  services: '#services',
  work: '#work',
  'case-study': '#alpine-sanctuary',
  'ivory-table-study': '#the-ivory-table',
  'northbound-study': '#northbound-journeys',
  about: '#about',
  contact: '#contact',
};

function getInitialPathname(): string {
  if (typeof window === 'undefined') return '/';
  return window.location.pathname || '/';
}

function getInitialPage(): PageRoute {
  if (typeof window === 'undefined') return 'home';
  return HASH_TO_PAGE[window.location.hash] || 'home';
}

export default function App() {
  const [pathname, setPathname] = useState<string>(getInitialPathname);
  const [currentPage, setCurrentPage] = useState<PageRoute>(getInitialPage);
  const [enquiry, setEnquiry] = useState<EnquiryContext>({
    isOpen: false,
  });

  const isNotFound = !isValidAppDocumentPath(pathname) || isObsoleteShopifyPath(pathname);

  useEffect(() => {
    const syncFromLocation = () => {
      setPathname(window.location.pathname || '/');
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
    window.addEventListener('hashchange', syncFromLocation);
    window.addEventListener('popstate', syncFromLocation);
    return () => {
      window.removeEventListener('hashchange', syncFromLocation);
      window.removeEventListener('popstate', syncFromLocation);
    };
  }, []);

  const handleNavigate = (page: PageRoute) => {
    setCurrentPage(page);
    setPathname('/');
    const targetHash = PAGE_TO_HASH[page];
    const targetUrl = `/${targetHash}`;
    if (window.location.pathname !== '/' || window.location.hash !== targetHash) {
      window.history.pushState(null, '', targetUrl);
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
        {isNotFound ? (
          <NotFoundPage pathname={pathname} onReturnHome={(page = 'home') => handleNavigate(page)} />
        ) : (
          <>
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
            {currentPage === 'ivory-table-study' && (
              <TheIvoryTableCaseStudyPage
                onNavigate={handleNavigate}
                onOpenEnquiry={handleOpenEnquiry}
              />
            )}
            {currentPage === 'northbound-study' && (
              <NorthboundCaseStudyPage
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
          </>
        )}
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
