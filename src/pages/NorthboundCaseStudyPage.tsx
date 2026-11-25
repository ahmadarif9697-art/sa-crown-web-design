import React from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Info,
  Compass,
  Mountain,
  Layers,
  Map,
  Check,
} from 'lucide-react';
import { PageRoute } from '../types/navigation';
import { SafeImage } from '../components/SafeImage';
import { NorthboundShowcase } from '../components/NorthboundShowcase';
import { siteConfig } from '../config/siteConfig';

interface NorthboundCaseStudyPageProps {
  onNavigate: (page: PageRoute) => void;
  onOpenEnquiry: (subjectHint?: string) => void;
}

const HIMALAYAN_HERO_IMG = '/src/assets/images/northbound_himalayan_hero_1795585871012.jpg';
const LADAKH_IMG = '/src/assets/images/northbound_ladakh_monastery_1795585871549.jpg';
const BHUTAN_IMG = '/src/assets/images/northbound_bhutan_trail_1795585871484.jpg';
const CAMP_IMG = '/src/assets/images/northbound_expedition_camp_1795585871566.jpg';

const DESTINATION_CARDS = [
  {
    region: 'Kashmir & Ladakh',
    focus: 'Glacial Lakes · High Mountain Passes · Stone Monasteries',
    description:
      'Editorial destination modules highlight high-altitude routes, seasonal access windows, and quiet valley architecture without crowded tour-operator clutter.',
    src: LADAKH_IMG,
    alt: 'Sunlit high-altitude monastery valley in Ladakh below snow-capped Himalayan peaks',
  },
  {
    region: 'Bhutan & Nepal',
    focus: 'Sacred Trails · Cedar Ridges · Heritage Lodges',
    description:
      'Atmospheric misty trail photography pairs with calm typography to frame private cultural crossings and bespoke ridge sanctuaries.',
    src: BHUTAN_IMG,
    alt: 'Misty Himalayan cedar valley and stone mountain trail overlooking timber pavilion in Bhutan and Nepal',
  },
  {
    region: 'Himachal Highlands',
    focus: 'Timber Terraces · Twilight Retreats · Private Guides',
    description:
      'Warm architectural retreat scenes illustrate restful evening pacing after alpine crossings—grounded in forest, cedar, and brass accents.',
    src: CAMP_IMG,
    alt: 'Luxury Himalayan timber expedition terrace in Himachal overlooking twilight snow peaks',
  },
];

const KEY_FEATURES = [
  {
    number: '01.',
    icon: Compass,
    title: 'Editorial Positioning & Tagline',
    description:
      'Opens directly with NORTHBOUND JOURNEYS and “Beyond the Ordinary. Into the Extraordinary.”—communicating bespoke expedition authority within seconds.',
  },
  {
    number: '02.',
    icon: Map,
    title: 'Regional Himalayan Curation',
    description:
      'Structured route presentation across Kashmir, Ladakh, Himachal, Bhutan, and Nepal so travellers compare terrain, atmosphere, and cadence effortlessly.',
  },
  {
    number: '03.',
    icon: Layers,
    title: 'Calm Luxury Colour & Type System',
    description:
      'Replaces loud tourist agency templates with high-contrast forest green, warm ivory prose surfaces, champagne-gold navigation cues, and editorial serif headlines.',
  },
  {
    number: '04.',
    icon: Mountain,
    title: 'Focused Expedition Brief Experience',
    description:
      'Guides prospective explorers through corridor preferences and travel timing cleanly without aggressive popups or fabricated live availability tickers.',
  },
];

const RESPONSIVE_HIGHLIGHTS = [
  {
    viewport: '360px – 430px',
    category: 'Mobile Handset',
    behavior: 'Single-column expedition storytelling, 16:10 hero crop, stacked regional cards',
    craft: 'Touch targets ≥ 44px and full-width primary actions with zero horizontal clipping',
  },
  {
    viewport: '768px',
    category: 'Tablet Portrait',
    behavior: 'Two-column regional cards and balanced hero vertical stack',
    craft: 'Drawer navigation + comfortable reading margins across landscape/portrait',
  },
  {
    viewport: '1024px – 1440px+',
    category: 'Laptop & Desktop',
    behavior: '12-column editorial split hero and 3-column regional expedition cards',
    craft: 'Single-line navigation bar and 1440px max container measure for crisp legibility',
  },
];

export const NorthboundCaseStudyPage: React.FC<NorthboundCaseStudyPageProps> = ({
  onNavigate,
  onOpenEnquiry,
}) => {
  const liveUrl = siteConfig.projects.northboundJourneys.publicDemoUrl;

  return (
    <div>
      {/* 1. Hero Header */}
      <section className="bg-[#102B25] text-[#F5EBD7] py-16 sm:py-20 border-b border-[#D6B66F]/20">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <button
            type="button"
            onClick={() => onNavigate('work')}
            className="inline-flex items-center gap-2 text-xs font-medium text-[#D6B66F] hover:text-[#E5CD96] transition-colors cursor-pointer mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Portfolio / Our Work</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
            <div className="lg:col-span-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D6B66F]">
                Case Study 03 · {siteConfig.projects.northboundJourneys.category} ·{' '}
                {siteConfig.projects.northboundJourneys.classification}
              </p>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-[54px] font-semibold text-[#F5EBD7] mt-3 leading-tight text-balance">
                Northbound Journeys
              </h1>
              <p className="font-display italic text-lg sm:text-xl text-[#D6B66F] mt-2">
                {siteConfig.projects.northboundJourneys.tagline}
              </p>
              <p className="text-base sm:text-lg text-[#F5EBD7]/80 leading-relaxed mt-4 max-w-2xl">
                A bespoke luxury travel and Himalayan expedition website concept designed and
                developed by SA Crown Web Design—highlighting curated journeys across Kashmir,
                Ladakh, Himachal, Bhutan, and Nepal.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-3">
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#D6B66F] text-[#102B25] text-sm font-semibold rounded-sm hover:bg-[#E5CD96] transition-colors min-h-[46px] whitespace-nowrap"
              >
                <span>Live Website</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={() => onOpenEnquiry('Northbound Journeys Luxury Travel Concept')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-[#F5EBD7]/30 text-[#F5EBD7] text-xs font-medium rounded-sm hover:border-[#D6B66F] hover:text-[#D6B66F] transition-colors cursor-pointer min-h-[46px] whitespace-nowrap"
              >
                <span>Discuss a Similar Project</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Honest Fictional Brand Disclosure */}
      <section className="bg-[#0B1F1B] text-[#F5EBD7] py-4 border-b border-[#D6B66F]/15">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 flex items-start sm:items-center gap-3 text-xs text-[#F5EBD7]/85">
          <Info className="w-4 h-4 text-[#D6B66F] shrink-0 mt-0.5 sm:mt-0" />
          <p>
            <strong className="text-[#F5EBD7]">Portfolio Concept Disclosure:</strong> Northbound
            Journeys is a fictional luxury travel brand and portfolio concept created by SA Crown
            Web Design—not a commercial client operator. No real traveller testimonials, awards,
            expedition bookings, or business performance results are claimed.
          </p>
        </div>
      </section>

      {/* 3. Project Overview, Design Direction & Target Audience */}
      <section className="bg-[#F5EBD7] text-[#202522] py-16 sm:py-24 border-b border-[#102B25]/12">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7">
            <div className="aspect-[16/10] rounded-sm overflow-hidden border border-[#102B25]/20 bg-[#102B25]">
              <SafeImage
                src={HIMALAYAN_HERO_IMG}
                alt="Golden dawn light reflecting across a tranquil Himalayan mountain lake framed by evergreen ridges"
                className="w-full h-full object-cover object-center"
                fallbackTitle="Northbound Journeys Concept"
                eager
              />
            </div>
          </div>

          <div className="lg:col-span-5 space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#102B25]/70">
              Project Overview &amp; Design Direction
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#102B25] leading-snug text-balance">
              Quiet Editorial Authority for High-Altitude Himalayan Travel
            </h2>
            <p className="text-sm sm:text-base text-[#202522]/85 leading-relaxed">
              Mass-market travel sites rely on countdown banners, discount badges, and cluttered
              multi-filter widgets. Northbound Journeys takes the opposite path—treating each
              Himalayan corridor across Kashmir, Ladakh, Himachal, Bhutan, and Nepal like a curated
              editorial chapter.
            </p>
            <p className="text-sm sm:text-base text-[#202522]/85 leading-relaxed">
              <strong className="text-[#102B25] font-semibold">Target Audience:</strong> Designed
              for discerning independent travellers, private group planners, and boutique hospitality
              seekers looking for tailored cultural and mountain expeditions rather than packaged
              tours.
            </p>
            <div className="pt-4 border-t border-[#102B25]/15 text-xs text-[#202522]/75 space-y-1.5">
              <p>
                <strong className="text-[#102B25] font-semibold">Brand Identity:</strong> NORTHBOUND
                JOURNEYS · Luxury Travel &amp; Expeditions
              </p>
              <p>
                <strong className="text-[#102B25] font-semibold">Regions Featured:</strong> Kashmir,
                Ladakh, Himachal, Bhutan, and Nepal
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Regional Visual Previews */}
      <section className="bg-[#FAF4E8] text-[#202522] py-16 sm:py-24 border-b border-[#102B25]/12">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl pb-8 border-b border-[#102B25]/15">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#102B25]/70">
              Destination Storytelling &amp; Visuals
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#102B25] mt-2 text-balance">
              Five Himalayan Regions Framed With Cohesive Atmosphere
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 md:auto-rows-fr gap-6 items-stretch">
            {DESTINATION_CARDS.map((card) => (
              <article
                key={card.region}
                className="bg-[#102B25] text-[#F5EBD7] border border-[#D6B66F]/20 rounded-sm overflow-hidden flex flex-col h-full"
              >
                <div className="aspect-[4/3] overflow-hidden border-b border-[#D6B66F]/20 bg-[#0B1F1B]">
                  <SafeImage
                    src={card.src}
                    alt={card.alt}
                    className="w-full h-full object-cover"
                    fallbackTitle={card.region}
                  />
                </div>
                <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#D6B66F]">
                      {card.focus}
                    </p>
                    <h3 className="font-display text-2xl font-semibold text-[#F5EBD7] mt-2">
                      {card.region}
                    </h3>
                    <p className="text-sm text-[#F5EBD7]/80 leading-relaxed mt-3">
                      {card.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Interactive Breakpoint & Screen Explorer */}
      <section className="bg-[#F5EBD7] text-[#202522] py-16 sm:py-24 border-b border-[#102B25]/12">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl pb-8 border-b border-[#102B25]/15 mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#102B25]/70">
              Interactive Preview Explorer
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#102B25] mt-2 text-balance">
              Inspect Northbound Journeys Across Desktop, Tablet &amp; Mobile
            </h2>
            <p className="text-sm sm:text-base text-[#202522]/80 leading-relaxed mt-3">
              Toggle viewport widths and concept screens below, or open the published live demo to
              experience the complete interactive build directly.
            </p>
          </div>

          <NorthboundShowcase />
        </div>
      </section>

      {/* 6. Key Website Features & Responsive Highlights */}
      <section className="bg-[#FAF4E8] text-[#202522] py-16 sm:py-24 border-b border-[#102B25]/12">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 space-y-16">
          <div>
            <div className="max-w-2xl pb-8 border-b border-[#102B25]/15 mb-10">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#102B25]/70">
                Key Website Features
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#102B25] mt-2 text-balance">
                Purpose-Built Experience for Luxury Expeditions
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 md:auto-rows-fr gap-6 items-stretch">
              {KEY_FEATURES.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.number}
                    className="p-7 sm:p-9 bg-[#102B25] text-[#F5EBD7] border border-[#D6B66F]/20 rounded-sm flex flex-col justify-between h-full"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-xs font-semibold text-[#D6B66F] tabular-nums">
                          {feature.number}
                        </p>
                        <Icon className="w-4 h-4 text-[#D6B66F]" />
                      </div>
                      <h3 className="font-display text-2xl font-semibold text-[#F5EBD7] mt-2">
                        {feature.title}
                      </h3>
                      <p className="text-sm sm:text-base text-[#F5EBD7]/80 leading-relaxed mt-4">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <div className="max-w-2xl pb-8 border-b border-[#102B25]/15 mb-10">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#102B25]/70">
                Responsive Design Highlights
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#102B25] mt-2 text-balance">
                Engineered for Mobile, Tablet &amp; Desktop Displays
              </h2>
            </div>

            <div className="overflow-x-auto bg-[#102B25] text-[#F5EBD7] border border-[#D6B66F]/25 rounded-sm">
              <table className="w-full text-left border-collapse min-w-[640px]">
                <thead>
                  <tr className="bg-[#0B1F1B] text-[#D6B66F] text-xs uppercase tracking-wider border-b border-[#D6B66F]/20">
                    <th className="py-4 px-5 font-semibold">Viewport</th>
                    <th className="py-4 px-5 font-semibold">Device Class</th>
                    <th className="py-4 px-5 font-semibold">Layout Structure</th>
                    <th className="py-4 px-5 font-semibold">Usability Highlight</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D6B66F]/15 text-sm">
                  {RESPONSIVE_HIGHLIGHTS.map((row) => (
                    <tr key={row.viewport} className="hover:bg-[#173D34]/60 transition-colors">
                      <td className="py-4 px-5 font-semibold text-[#D6B66F] tabular-nums whitespace-nowrap">
                        {row.viewport}
                      </td>
                      <td className="py-4 px-5 font-medium text-[#F5EBD7] whitespace-nowrap">
                        {row.category}
                      </td>
                      <td className="py-4 px-5 text-[#F5EBD7]/80">{row.behavior}</td>
                      <td className="py-4 px-5 text-[#F5EBD7]/80">{row.craft}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 p-6 sm:p-8 bg-[#102B25] text-[#F5EBD7] border border-[#D6B66F]/20 rounded-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D6B66F] mb-4">
                Craftsmanship Pillars Applied
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  'Cohesive forest-green, ivory, and champagne-gold editorial system',
                  'Dedicated regional route clarity across five Himalayan destinations',
                  'Accessible semantic markup verified across compact mobile to widescreen',
                ].map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2.5 text-sm text-[#F5EBD7]/85 leading-relaxed"
                  >
                    <Check className="w-4 h-4 text-[#D6B66F] shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Bottom Prominent Live Website CTA Band */}
      <section className="bg-[#102B25] text-[#F5EBD7] py-16 sm:py-20">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D6B66F]">
              Live Concept Website
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#F5EBD7] mt-2">
              Explore the Published Northbound Journeys Demo Live
            </h2>
            <p className="text-sm sm:text-base text-[#F5EBD7]/80 mt-2 max-w-2xl">
              Visit the live Workers deployment to inspect interactions firsthand, or contact SA
              Crown Web Design to commission a bespoke travel or hospitality flagship.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#D6B66F] text-[#102B25] text-sm font-semibold rounded-sm hover:bg-[#E5CD96] transition-colors whitespace-nowrap min-h-[46px]"
            >
              <span>Visit Live Website</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={() => onOpenEnquiry('Northbound Journeys Luxury Travel Concept')}
              className="inline-flex items-center gap-2 px-5 py-3.5 border border-[#F5EBD7]/30 text-[#F5EBD7] text-sm font-medium rounded-sm hover:border-[#D6B66F] hover:text-[#D6B66F] transition-colors cursor-pointer whitespace-nowrap min-h-[46px]"
            >
              <span>Discuss a Similar Project</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
