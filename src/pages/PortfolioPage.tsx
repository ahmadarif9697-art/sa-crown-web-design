import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { PageRoute } from '../types/navigation';
import { SafeImage } from '../components/SafeImage';
import { siteConfig } from '../config/siteConfig';

interface PortfolioPageProps {
  onNavigate: (page: PageRoute) => void;
  onOpenEnquiry: (subjectHint?: string) => void;
}

const ALPINE_HERO_IMG = '/src/assets/images/alpine_resort_panorama_1795494665477.jpg';
const IVORY_TABLE_HERO_IMG = '/src/assets/images/ivory_table_dining_hero_1795527375285.jpg';
const NORTHBOUND_HERO_IMG = '/src/assets/images/northbound_himalayan_hero_1795585871012.jpg';

export const PortfolioPage: React.FC<PortfolioPageProps> = ({
  onNavigate,
  onOpenEnquiry,
}) => {
  const demoUrl = siteConfig.projects.alpineSanctuary.publicDemoUrl;
  const ivoryDemoUrl = siteConfig.projects.theIvoryTable.publicDemoUrl;
  const northboundDemoUrl = siteConfig.projects.northboundJourneys.publicDemoUrl;

  return (
    <div>
      {/* Header */}
      <section className="bg-[#102B25] text-[#F5EBD7] py-16 sm:py-20 border-b border-[#D6B66F]/20">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D6B66F]">
            Portfolio &amp; Our Work
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[#F5EBD7] mt-3 max-w-3xl text-balance">
            Selected Design Architecture &amp; Concept Studies.
          </h1>
          <p className="text-base sm:text-lg text-[#F5EBD7]/80 leading-relaxed mt-5 max-w-2xl">
            We present only genuine work and clearly labeled studio design concepts—never
            fabricated client logos or invented business metrics.
          </p>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="bg-[#F5EBD7] text-[#202522] py-16 sm:py-24 border-b border-[#102B25]/12">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 space-y-10">
          {/* Featured Project 01: Alpine Sanctuary */}
          <div className="bg-[#102B25] text-[#F5EBD7] border border-[#D6B66F]/25 rounded-sm overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              <div className="lg:col-span-7 aspect-[16/10] lg:aspect-auto lg:min-h-[480px] bg-[#0B1F1B] overflow-hidden border-b lg:border-b-0 lg:border-r border-[#D6B66F]/20">
                <SafeImage
                  src={ALPINE_HERO_IMG}
                  alt="Alpine Sanctuary twilight architectural concept showing contemporary basalt stone and timber resort with warm illuminated lounge interiors and snow-covered mountain peaks"
                  className="w-full h-full object-cover object-center"
                  fallbackTitle="Alpine Sanctuary Concept"
                  eager
                />
              </div>

              <div className="lg:col-span-5 p-7 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs uppercase tracking-[0.14em] text-[#D6B66F]">
                    <span className="font-semibold tabular-nums">Project 01</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-semibold">
                      {siteConfig.projects.alpineSanctuary.classification}
                    </span>
                  </div>

                  <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#F5EBD7] mt-3">
                    Alpine Sanctuary
                  </h2>

                  <p className="text-sm sm:text-base text-[#F5EBD7]/80 leading-relaxed mt-4">
                    A comprehensive hospitality web design concept created for a fictional luxury
                    alpine hotel. Engineered to demonstrate restrained luxury typography, twilight
                    palette contrast, and seamless adaptation across five responsive viewports.
                  </p>

                  <div className="mt-6 pt-5 border-t border-[#D6B66F]/20 space-y-2 text-xs text-[#F5EBD7]/80">
                    <p>
                      <strong className="text-[#D6B66F] font-semibold">Deliverables:</strong> Brand Art Direction,
                      Multi-Viewport Layout System, Interactive Prototype Screens
                    </p>
                    <p>
                      <strong className="text-[#D6B66F] font-semibold">Viewports Covered:</strong> 390px, 768px,
                      1024px, 1440px, and 1920px (with 360px–430px mobile support)
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3">
                  <a
                    href={demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#D6B66F] text-[#102B25] border border-[#D6B66F] text-xs font-semibold rounded-sm hover:bg-[#E5CD96] hover:border-[#E5CD96] transition-colors min-h-[44px] whitespace-nowrap"
                  >
                    <span>Visit Live Website</span>
                    <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                  </a>

                  <button
                    type="button"
                    onClick={() => onNavigate('case-study')}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-[#F5EBD7]/35 text-[#F5EBD7] text-xs font-semibold rounded-sm hover:border-[#D6B66F] hover:text-[#D6B66F] transition-colors cursor-pointer min-h-[44px] whitespace-nowrap"
                  >
                    <span>Explore Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenEnquiry('Alpine Sanctuary (Luxury Hotel Concept)')}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-[#F5EBD7]/35 text-[#F5EBD7] text-xs font-semibold rounded-sm hover:border-[#D6B66F] hover:text-[#D6B66F] transition-colors cursor-pointer min-h-[44px] whitespace-nowrap"
                  >
                    <span>Discuss a Similar Project</span>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Project 02: The Ivory Table */}
          <div className="bg-[#102B25] text-[#F5EBD7] border border-[#D6B66F]/25 rounded-sm overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              <div className="lg:col-span-7 aspect-[16/10] lg:aspect-auto lg:min-h-[480px] bg-[#0B1F1B] overflow-hidden border-b lg:border-b-0 lg:border-r border-[#D6B66F]/20">
                <SafeImage
                  src={IVORY_TABLE_HERO_IMG}
                  alt="The Ivory Table luxury fine-dining restaurant interior with candlelit ivory linen tables, fluted forest-green oak paneling, and travertine arches"
                  className="w-full h-full object-cover object-center"
                  fallbackTitle="The Ivory Table Concept"
                />
              </div>

              <div className="lg:col-span-5 p-7 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs uppercase tracking-[0.14em] text-[#D6B66F]">
                    <span className="font-semibold tabular-nums">Project 02</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-semibold">
                      {siteConfig.projects.theIvoryTable.category}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="font-semibold">
                      {siteConfig.projects.theIvoryTable.classification}
                    </span>
                  </div>

                  <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#F5EBD7] mt-3">
                    {siteConfig.projects.theIvoryTable.title}
                  </h2>

                  <p className="text-sm sm:text-base text-[#F5EBD7]/80 leading-relaxed mt-4">
                    An elegant digital experience for a fictional luxury restaurant, featuring an
                    editorial menu, culinary photography, restaurant storytelling and interactive
                    reservation interface.
                  </p>

                  <div className="mt-6 pt-5 border-t border-[#D6B66F]/20 space-y-2 text-xs text-[#F5EBD7]/80">
                    <p>
                      <strong className="text-[#D6B66F] font-semibold">Services:</strong> Website
                      Design, UI/UX Design, Responsive Development, Interactive Forms
                    </p>
                    <p>
                      <strong className="text-[#D6B66F] font-semibold">Concept Note:</strong>{' '}
                      Fictional portfolio project — reservations are a front-end UI demonstration
                      not connected to a live booking system.
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3">
                  <a
                    href={ivoryDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#D6B66F] text-[#102B25] border border-[#D6B66F] text-xs font-semibold rounded-sm hover:bg-[#E5CD96] hover:border-[#E5CD96] transition-colors min-h-[44px] whitespace-nowrap"
                  >
                    <span>Visit Live Website</span>
                    <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                  </a>

                  <button
                    type="button"
                    onClick={() => onNavigate('ivory-table-study')}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-[#F5EBD7]/35 text-[#F5EBD7] text-xs font-semibold rounded-sm hover:border-[#D6B66F] hover:text-[#D6B66F] transition-colors cursor-pointer min-h-[44px] whitespace-nowrap"
                  >
                    <span>Explore Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      onOpenEnquiry('The Ivory Table (Fine Dining & Hospitality Concept)')
                    }
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-[#F5EBD7]/35 text-[#F5EBD7] text-xs font-semibold rounded-sm hover:border-[#D6B66F] hover:text-[#D6B66F] transition-colors cursor-pointer min-h-[44px] whitespace-nowrap"
                  >
                    <span>Discuss a Similar Project</span>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Project 03: Northbound Journeys */}
          <div className="bg-[#102B25] text-[#F5EBD7] border border-[#D6B66F]/25 rounded-sm overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              <div className="lg:col-span-7 aspect-[16/10] lg:aspect-auto lg:min-h-[480px] bg-[#0B1F1B] overflow-hidden border-b lg:border-b-0 lg:border-r border-[#D6B66F]/20">
                <SafeImage
                  src={NORTHBOUND_HERO_IMG}
                  alt="Northbound Journeys Himalayan expedition concept featuring golden dawn over glacial mountain lake and snow-covered peaks"
                  className="w-full h-full object-cover object-center"
                  fallbackTitle="Northbound Journeys Concept"
                />
              </div>

              <div className="lg:col-span-5 p-7 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs uppercase tracking-[0.14em] text-[#D6B66F]">
                    <span className="font-semibold tabular-nums">Project 03</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-semibold">
                      {siteConfig.projects.northboundJourneys.category}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="font-semibold">
                      {siteConfig.projects.northboundJourneys.classification}
                    </span>
                  </div>

                  <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#F5EBD7] mt-3">
                    {siteConfig.projects.northboundJourneys.title}
                  </h2>

                  <p className="font-display italic text-sm text-[#D6B66F] mt-1.5">
                    {siteConfig.projects.northboundJourneys.tagline}
                  </p>

                  <p className="text-sm sm:text-base text-[#F5EBD7]/80 leading-relaxed mt-4">
                    A bespoke luxury travel and expedition website concept featuring curated
                    Himalayan journeys across Kashmir, Ladakh, Himachal, Bhutan, and Nepal.
                  </p>

                  <div className="mt-6 pt-5 border-t border-[#D6B66F]/20 space-y-2 text-xs text-[#F5EBD7]/80">
                    <p>
                      <strong className="text-[#D6B66F] font-semibold">Regions Featured:</strong>{' '}
                      Kashmir, Ladakh, Himachal, Bhutan &amp; Nepal
                    </p>
                    <p>
                      <strong className="text-[#D6B66F] font-semibold">Concept Note:</strong>{' '}
                      Fictional travel brand designed by SA Crown Web Design — no real bookings,
                      client awards, or claimed expedition metrics.
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3">
                  <a
                    href={northboundDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#D6B66F] text-[#102B25] border border-[#D6B66F] text-xs font-semibold rounded-sm hover:bg-[#E5CD96] hover:border-[#E5CD96] transition-colors min-h-[44px] whitespace-nowrap"
                  >
                    <span>Visit Live Website</span>
                    <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                  </a>

                  <button
                    type="button"
                    onClick={() => onNavigate('northbound-study')}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-[#F5EBD7]/35 text-[#F5EBD7] text-xs font-semibold rounded-sm hover:border-[#D6B66F] hover:text-[#D6B66F] transition-colors cursor-pointer min-h-[44px] whitespace-nowrap"
                  >
                    <span>Explore Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      onOpenEnquiry('Northbound Journeys (Luxury Travel & Expeditions Concept)')
                    }
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-[#F5EBD7]/35 text-[#F5EBD7] text-xs font-semibold rounded-sm hover:border-[#D6B66F] hover:text-[#D6B66F] transition-colors cursor-pointer min-h-[44px] whitespace-nowrap"
                  >
                    <span>Discuss a Similar Project</span>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Honest Next-Commission Card */}
          <div className="p-7 sm:p-10 bg-[#102B25] text-[#F5EBD7] rounded-sm border border-[#D6B66F]/25 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D6B66F]">
                Commission Availability
              </p>
              <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#F5EBD7] mt-2">
                Your Business Could Be Our Next Featured Case Study.
              </h3>
              <p className="text-sm text-[#F5EBD7]/80 leading-relaxed mt-3">
                Rather than padding our portfolio with invented clients, we keep this space focused
                on verified work and dedicated studio builds. Reach out to plan your website.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onOpenEnquiry()}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#D6B66F] text-[#102B25] text-sm font-semibold rounded-sm hover:bg-[#E5CD96] transition-colors cursor-pointer whitespace-nowrap shrink-0 min-h-[46px]"
            >
              <span>Start a Project Brief</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
