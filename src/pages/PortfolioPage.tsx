import React from 'react';
import { ArrowRight, ArrowUpRight, Info } from 'lucide-react';
import { PageRoute } from '../types/navigation';
import { SafeImage } from '../components/SafeImage';
import { siteConfig } from '../config/siteConfig';

interface PortfolioPageProps {
  onNavigate: (page: PageRoute) => void;
  onOpenEnquiry: (subjectHint?: string) => void;
}

const ALPINE_HERO_IMG = '/src/assets/images/alpine_resort_panorama_1795494665477.jpg';

export const PortfolioPage: React.FC<PortfolioPageProps> = ({
  onNavigate,
  onOpenEnquiry,
}) => {
  const demoUrl = siteConfig.projects.alpineSanctuary.publicDemoUrl;

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

      {/* Featured Project 01: Alpine Sanctuary */}
      <section className="bg-[#F5EBD7] text-[#202522] py-16 sm:py-24 border-b border-[#102B25]/12">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="bg-[#102B25] text-[#F5EBD7] border border-[#D6B66F]/25 rounded-sm overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              <div className="lg:col-span-7 aspect-[16/10] lg:aspect-auto lg:min-h-[440px] bg-[#0B1F1B] overflow-hidden border-b lg:border-b-0 lg:border-r border-[#D6B66F]/20">
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

                <div className="mt-8 space-y-3">
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => onNavigate('case-study')}
                      className="inline-flex items-center gap-2 px-5 py-3 bg-[#D6B66F] text-[#102B25] text-xs font-semibold rounded-sm hover:bg-[#E5CD96] transition-colors cursor-pointer min-h-[44px]"
                    >
                      <span>Open Interactive Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onOpenEnquiry('Alpine Sanctuary Hospitality Concept')}
                      className="inline-flex items-center gap-2 px-5 py-3 border border-[#F5EBD7]/30 text-[#F5EBD7] text-xs font-medium rounded-sm hover:border-[#D6B66F] hover:text-[#D6B66F] transition-colors cursor-pointer min-h-[44px]"
                    >
                      <span>Discuss a Similar Project</span>
                    </button>
                  </div>

                  {demoUrl ? (
                    <a
                      href={demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D6B66F] hover:text-[#E5CD96] underline underline-offset-4 decoration-[#D6B66F]/60 transition-colors"
                    >
                      <span>Visit Published Alpine Sanctuary Demo</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <div className="flex items-start gap-2 pt-2 text-xs text-[#F5EBD7]/70">
                      <Info className="w-4 h-4 text-[#D6B66F] shrink-0 mt-0.5" />
                      <span>
                        External Alpine Sanctuary demo link will appear here once its public URL is
                        published. Full 5-viewport interactive previews are available inside the
                        Case Study.
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Honest Next-Commission Card */}
          <div className="mt-10 p-7 sm:p-10 bg-[#102B25] text-[#F5EBD7] rounded-sm border border-[#D6B66F]/25 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
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
