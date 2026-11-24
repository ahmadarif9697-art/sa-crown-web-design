import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight, Layers, MonitorSmartphone, Compass, ShieldCheck, MessageCircle } from 'lucide-react';
import { PageRoute } from '../types/navigation';
import { SafeImage } from '../components/SafeImage';
import { CrownMark } from '../components/CrownLogo';
import { buildWhatsAppUrl, siteConfig } from '../config/siteConfig';

interface HomePageProps {
  onNavigate: (page: PageRoute) => void;
  onOpenEnquiry: (subjectHint?: string) => void;
}

const STUDIO_HERO_IMG = '/src/assets/images/luxury_hospitality_hero_1795494366728.jpg';
const ALPINE_HERO_IMG = '/src/assets/images/alpine_resort_panorama_1795494665477.jpg';
const STUDIO_CRAFT_IMG = '/src/assets/images/luxury_atelier_craft_1795494366171.jpg';

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenEnquiry,
}) => {
  return (
    <div>
      {/* 1. Split Editorial Hero */}
      <section className="bg-[#102B25] text-[#F5EBD7] border-b border-[#D6B66F]/20">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-6 px-5 sm:px-8 lg:px-12 py-14 sm:py-20 lg:py-24 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#D6B66F]">
                <CrownMark className="w-5 h-4 shrink-0" />
                <span>{siteConfig.brandName}</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl xl:text-[58px] font-semibold leading-[1.08] tracking-tight text-[#F5EBD7] mt-5 text-balance">
                Your Business Deserves a Better Website.
              </h1>

              <p className="text-base sm:text-lg text-[#F5EBD7]/80 leading-relaxed mt-6 max-w-xl">
                We design and build tailored digital flagships with restrained luxury typography,
                deliberate visual pacing, and verified responsiveness from compact 360px phones to
                1920px desktop displays.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onOpenEnquiry()}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#D6B66F] text-[#102B25] text-sm font-semibold rounded-sm hover:bg-[#E5CD96] transition-colors cursor-pointer min-h-[46px] whitespace-nowrap"
                >
                  <span>Discuss a Similar Project</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('case-study')}
                  className="inline-flex items-center gap-2 px-5 py-3.5 border border-[#F5EBD7]/30 text-[#F5EBD7] text-sm font-medium rounded-sm hover:border-[#D6B66F] hover:text-[#D6B66F] transition-colors cursor-pointer min-h-[46px] whitespace-nowrap"
                >
                  <span>Explore Alpine Sanctuary Concept</span>
                </button>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-6 aspect-[4/3] lg:aspect-auto lg:min-h-[560px] relative overflow-hidden border-t lg:border-t-0 lg:border-l border-[#D6B66F]/20">
            <SafeImage
              src={STUDIO_HERO_IMG}
              alt="Luxury boutique hospitality salon with fluted forest-green timber paneling, travertine stone arches, and warm brass pendant lights"
              className="w-full h-full object-cover object-center"
              fallbackTitle="SA Crown Web Design"
              fallbackSubtitle="Luxury hospitality and architectural digital craft"
              eager
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#102B25]/40 via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#102B25]/30 lg:via-transparent"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Full-Width 4-Column Studio Pillars Strip Below Hero Split */}
        <div className="border-t border-[#F5EBD7]/15 bg-[#0B1F1B]">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#F5EBD7]/10">
            {[
              {
                icon: MonitorSmartphone,
                title: '7-Breakpoint Precision',
                detail: 'Crafted across 360px, 390px, 430px, 768px, 1024px, 1440px & 1920px.',
              },
              {
                icon: Layers,
                title: 'Editorial Hierarchy',
                detail: 'Playfair Display headlines paired with clean geometric sans-serif prose.',
              },
              {
                icon: ShieldCheck,
                title: 'Honest Engineering',
                detail: 'Zero invented claims, bloated scripts, or fabricated testimonials.',
              },
              {
                icon: Compass,
                title: 'Direct Studio Access',
                detail: 'Clear scoping and direct collaboration from brief through launch.',
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="py-6 sm:px-6 first:sm:pl-0 last:sm:pr-0">
                  <div className="flex items-center gap-2.5 text-[#D6B66F]">
                    <Icon className="w-4 h-4 shrink-0" />
                    <h2 className="font-sans text-sm font-semibold tracking-wide text-[#F5EBD7]">
                      {item.title}
                    </h2>
                  </div>
                  <p className="text-xs text-[#F5EBD7]/70 leading-relaxed mt-2">
                    {item.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. Featured Concept Case Study Spotlight */}
      <section className="bg-[#F5EBD7] text-[#202522] py-16 sm:py-24 border-b border-[#102B25]/12">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#102B25]/15">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#102B25]/70">
                Featured Design Case Study
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#102B25] mt-2 text-balance">
                Alpine Sanctuary
              </h2>
              <p className="text-sm text-[#202522]/75 mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="font-semibold text-[#102B25]">
                  Fictional Luxury Hotel Design Concept
                </span>
                <span aria-hidden="true">·</span>
                <span>5 Interactive Viewport Studies</span>
                <span aria-hidden="true">·</span>
                <span>Hospitality Art Direction</span>
              </p>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('case-study')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#102B25] hover:text-[#102B25]/75 underline underline-offset-4 decoration-[#D6B66F] cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>Inspect All 5 Viewports</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7">
              <button
                type="button"
                onClick={() => onNavigate('case-study')}
                className="group block w-full text-left border border-[#102B25]/15 rounded-sm overflow-hidden bg-[#102B25] cursor-pointer"
                aria-label="Open Alpine Sanctuary Case Study"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <SafeImage
                    src={ALPINE_HERO_IMG}
                    alt="Alpine Sanctuary fictional luxury hotel architectural twilight concept"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    fallbackTitle="Alpine Sanctuary Concept"
                  />
                </div>
              </button>
            </div>

            <div className="lg:col-span-5 space-y-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#102B25]/65">
                Concept Scope &amp; Intent
              </p>
              <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#102B25] leading-snug">
                Calm Editorial Hospitality Across Every Screen Size
              </h3>
              <p className="text-sm sm:text-base text-[#202522]/80 leading-relaxed">
                Alpine Sanctuary is a self-initiated fictional luxury hotel design concept created
                to demonstrate how calm atmospheric photography, disciplined typographic hierarchy,
                and responsive grid engineering translate from a 390px handset to a 1920px desktop.
              </p>
              <p className="text-xs text-[#202522]/70 leading-relaxed border-t border-[#102B25]/10 pt-4">
                Note: Alpine Sanctuary is a visual and responsive layout concept—no live property
                booking system or fabricated hotel metrics are claimed.
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate('case-study')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#102B25] text-[#F5EBD7] text-xs font-semibold rounded-sm hover:bg-[#1A4239] transition-colors cursor-pointer min-h-[44px]"
                >
                  <span>View 5-Viewport Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D6B66F]" />
                </button>

                {siteConfig.projects.alpineSanctuary.publicDemoUrl && (
                  <a
                    href={siteConfig.projects.alpineSanctuary.publicDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3.5 border border-[#102B25]/25 text-[#102B25] text-xs font-semibold rounded-sm hover:border-[#102B25] transition-colors min-h-[44px] whitespace-nowrap"
                  >
                    <span>Open Live Concept Demo</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Services Asymmetric Bento Overview */}
      <section className="bg-[#FAF4E8] text-[#202522] py-16 sm:py-24 border-b border-[#102B25]/12">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#102B25]/15">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#102B25]/70">
                Studio Capabilities
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#102B25] mt-2 text-balance">
                Focused Web Design Services
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('services')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#102B25] hover:text-[#102B25]/75 underline underline-offset-4 decoration-[#D6B66F] cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>Explore All Services</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 md:auto-rows-fr gap-6 items-stretch">
            {/* Marquee Service Card */}
            <div className="p-7 sm:p-9 bg-[#102B25] text-[#F5EBD7] border border-[#D6B66F]/20 rounded-sm flex flex-col justify-between h-full min-h-[260px] md:min-h-[320px]">
              <div>
                <p className="text-xs font-semibold text-[#D6B66F] tabular-nums">01.</p>
                <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#F5EBD7] mt-2">
                  Bespoke Brand &amp; Business Websites
                </h3>
                <p className="text-sm sm:text-base text-[#F5EBD7]/80 leading-relaxed mt-4">
                  Custom-designed websites tailored around your positioning, written with clear
                  hierarchy, and stripped of generic template clutter so prospective customers
                  immediately trust your business.
                </p>
              </div>
              <div className="mt-8 pt-5 border-t border-[#D6B66F]/20 flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs text-[#F5EBD7]/70">
                  Design System · Copy Hierarchy · Production Front-End
                </span>
                <button
                  type="button"
                  onClick={() => onOpenEnquiry('Bespoke Brand & Business Website')}
                  className="text-xs font-semibold text-[#D6B66F] hover:text-[#E5CD96] transition-colors cursor-pointer whitespace-nowrap"
                >
                  Enquire →
                </button>
              </div>
            </div>

            {/* Secondary Service Card */}
            <div className="p-7 sm:p-9 bg-[#102B25] text-[#F5EBD7] border border-[#D6B66F]/20 rounded-sm flex flex-col justify-between h-full min-h-[260px] md:min-h-[320px]">
              <div>
                <p className="text-xs font-semibold text-[#D6B66F] tabular-nums">02.</p>
                <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#F5EBD7] mt-2">
                  Multi-Viewport Responsive Craft
                </h3>
                <p className="text-sm sm:text-base text-[#F5EBD7]/80 leading-relaxed mt-4">
                  Every page is engineered for intentional legibility across 360px, 390px, 430px,
                  768px, 1024px, 1440px, and 1920px viewports—never squeezed or clipped.
                </p>
              </div>
              <div className="mt-8 pt-5 border-t border-[#D6B66F]/20 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => onNavigate('case-study')}
                  className="text-xs font-semibold text-[#D6B66F] hover:text-[#E5CD96] underline underline-offset-4 decoration-[#D6B66F]/60 transition-colors cursor-pointer"
                >
                  See Multi-Viewport Example
                </button>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="p-7 sm:p-9 bg-[#102B25] text-[#F5EBD7] border border-[#D6B66F]/20 rounded-sm flex flex-col justify-between h-full min-h-[260px] md:min-h-[320px]">
              <div>
                <p className="text-xs font-semibold text-[#D6B66F] tabular-nums">03.</p>
                <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#F5EBD7] mt-2">
                  Website Redesign &amp; Refinement
                </h3>
                <p className="text-sm sm:text-base text-[#F5EBD7]/80 leading-relaxed mt-4">
                  Modernize dated layouts, elevate typography, and establish consistent color
                  contrast while keeping your core business message front and center.
                </p>
              </div>
            </div>

            <div className="p-7 sm:p-9 bg-[#102B25] text-[#F5EBD7] border border-[#D6B66F]/20 rounded-sm flex flex-col justify-between h-full min-h-[260px] md:min-h-[320px]">
              <div>
                <p className="text-xs font-semibold text-[#D6B66F] tabular-nums">04.</p>
                <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#F5EBD7] mt-2">
                  Clean Front-End Architecture
                </h3>
                <p className="text-sm sm:text-base text-[#F5EBD7]/80 leading-relaxed mt-4">
                  Maintainable semantic HTML, modular TypeScript components, accessible focus
                  navigation, and crisp asset discipline without unnecessary runtime weight.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Studio Craft & Direct Conversion Band */}
      <section className="bg-[#102B25] text-[#F5EBD7] py-16 sm:py-24">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-5">
            <div className="aspect-[3/4] max-w-md mx-auto lg:mx-0 border border-[#D6B66F]/25 rounded-sm overflow-hidden">
              <SafeImage
                src={STUDIO_CRAFT_IMG}
                alt="Curved warm travertine plaster wall with honed forest-green marble plinth and brushed champagne-brass wall sconce"
                className="w-full h-full object-cover object-center"
                fallbackTitle="SA Crown Craftsmanship"
              />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D6B66F]">
              The SA Crown Approach
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-[#F5EBD7] text-balance">
              Restraint, Clarity, and Craft That Respects Your Visitor.
            </h2>
            <p className="text-base text-[#F5EBD7]/80 leading-relaxed max-w-2xl">
              Great business websites do not rely on loud gimmicks or inflated vanity claims. They
              guide the reader naturally with deliberate contrast, balanced whitespace, and crisp
              navigation so your value is unmistakable within seconds.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => onOpenEnquiry()}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#D6B66F] text-[#102B25] text-sm font-semibold rounded-sm hover:bg-[#E5CD96] transition-colors cursor-pointer min-h-[46px]"
              >
                <span>Discuss a Similar Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('about')}
                className="inline-flex items-center gap-2 px-5 py-3.5 border border-[#F5EBD7]/25 text-[#F5EBD7] text-sm font-medium rounded-sm hover:border-[#D6B66F] hover:text-[#D6B66F] transition-colors cursor-pointer min-h-[46px]"
              >
                <span>About Our Studio</span>
              </button>
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 border border-[#D6B66F]/40 text-[#F5EBD7] text-sm font-medium rounded-sm hover:border-[#D6B66F] hover:text-[#D6B66F] transition-colors min-h-[46px]"
              >
                <MessageCircle className="w-4 h-4 text-[#D6B66F]" />
                <span>WhatsApp Studio</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
