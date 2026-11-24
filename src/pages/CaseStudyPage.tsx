import React from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Info } from 'lucide-react';
import { PageRoute } from '../types/navigation';
import { AlpineViewportShowcase } from '../components/AlpineViewportShowcase';
import { siteConfig } from '../config/siteConfig';

interface CaseStudyPageProps {
  onNavigate: (page: PageRoute) => void;
  onOpenEnquiry: (subjectHint?: string) => void;
}

const BREAKPOINT_MATRIX = [
  {
    width: '360px',
    category: 'Compact Mobile',
    containerPadding: '16px',
    gridBehavior: 'Single-column linear flow, full-width buttons',
    navigation: 'Compact bar + full-screen mobile menu drawer',
  },
  {
    width: '390px',
    category: 'Standard Mobile',
    containerPadding: '20px',
    gridBehavior: 'Single-column editorial pacing, 4:3 media crops',
    navigation: 'Compact bar + full-screen mobile menu drawer',
  },
  {
    width: '430px',
    category: 'Large Mobile',
    containerPadding: '20px',
    gridBehavior: 'Single-column flow with balanced horizontal action pairs',
    navigation: 'Compact bar + full-screen mobile menu drawer',
  },
  {
    width: '768px',
    category: 'Tablet Portrait',
    containerPadding: '32px',
    gridBehavior: '2-column suite cards & stacked feature split',
    navigation: 'Sticky top bar + drawer menu trigger',
  },
  {
    width: '1024px',
    category: 'Compact Laptop',
    containerPadding: '32px',
    gridBehavior: '12-column split hero (6/6 ratio), 3-column suite grid',
    navigation: 'Full 3-zone single-line top bar',
  },
  {
    width: '1440px',
    category: 'Desktop Baseline',
    containerPadding: '48px',
    gridBehavior: '12-column editorial grid (5/7 hero split)',
    navigation: 'Full 3-zone single-line top bar',
  },
  {
    width: '1920px',
    category: 'Widescreen Display',
    containerPadding: '48px (1440px inner max)',
    gridBehavior: 'Centered 1440px measure preventing over-wide prose lines',
    navigation: 'Full 3-zone top bar anchored to 1440px grid',
  },
];

export const CaseStudyPage: React.FC<CaseStudyPageProps> = ({
  onNavigate,
  onOpenEnquiry,
}) => {
  const demoUrl = siteConfig.projects.alpineSanctuary.publicDemoUrl;

  return (
    <div>
      {/* Case Study Hero Header */}
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
                Case Study 01 · {siteConfig.projects.alpineSanctuary.classification}
              </p>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-[54px] font-semibold text-[#F5EBD7] mt-3 leading-tight text-balance">
                Alpine Sanctuary
              </h1>
              <p className="text-base sm:text-lg text-[#F5EBD7]/80 leading-relaxed mt-4 max-w-2xl">
                A fictional luxury mountain hotel concept designed by SA Crown Web Design to
                demonstrate disciplined hospitality storytelling and responsive precision across five
                core device viewports.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-3">
              <button
                type="button"
                onClick={() => onOpenEnquiry('Alpine Sanctuary Case Study')}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#D6B66F] text-[#102B25] text-sm font-semibold rounded-sm hover:bg-[#E5CD96] transition-colors cursor-pointer min-h-[46px] whitespace-nowrap"
              >
                <span>Discuss a Similar Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {demoUrl && (
                <a
                  href={demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-[#F5EBD7]/30 text-[#F5EBD7] text-xs font-medium rounded-sm hover:border-[#D6B66F] hover:text-[#D6B66F] transition-colors min-h-[46px] whitespace-nowrap"
                >
                  <span>Open Live Demo</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Honest Concept Scope Disclosure */}
      <section className="bg-[#0B1F1B] text-[#F5EBD7] py-4 border-b border-[#D6B66F]/15">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 flex items-start sm:items-center gap-3 text-xs text-[#F5EBD7]/80">
          <Info className="w-4 h-4 text-[#D6B66F] shrink-0 mt-0.5 sm:mt-0" />
          <p>
            <strong className="text-[#F5EBD7]">Concept Disclosure:</strong> Alpine Sanctuary is a
            fictional luxury hotel design concept created by SA Crown Web Design. No live hotel
            booking engine, PMS integration, or fabricated conversion figures are claimed.
            {!demoUrl &&
              ' Its standalone public demo URL is not yet published; all five interactive viewports can be inspected below.'}
          </p>
        </div>
      </section>

      {/* Interactive 5-Viewport Explorer */}
      <section className="bg-[#F5EBD7] text-[#202522] py-16 sm:py-24 border-b border-[#102B25]/12">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl pb-8 border-b border-[#102B25]/15 mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#102B25]/70">
              Interactive Viewport Study
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#102B25] mt-2 text-balance">
              Explore the Five Alpine Sanctuary Viewports
            </h2>
            <p className="text-sm sm:text-base text-[#202522]/80 leading-relaxed mt-3">
              Select any viewport tab below to inspect how navigation, grid columns, image crops,
              and Playfair Display type hierarchy adapt across widescreen, desktop, laptop, tablet,
              and mobile frames.
            </p>
          </div>

          <AlpineViewportShowcase />
        </div>
      </section>

      {/* Complete 7-Breakpoint Specification Matrix */}
      <section className="bg-[#FAF4E8] text-[#202522] py-16 sm:py-24 border-b border-[#102B25]/12">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="max-w-2xl pb-8 border-b border-[#102B25]/15 mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#102B25]/70">
              Responsive Engineering Matrix
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#102B25] mt-2 text-balance">
              Layout Specifications Across 360px to 1920px
            </h2>
          </div>

          <div className="overflow-x-auto bg-[#102B25] text-[#F5EBD7] border border-[#D6B66F]/25 rounded-sm">
            <table className="w-full text-left border-collapse min-w-[680px]">
              <thead>
                <tr className="bg-[#0B1F1B] text-[#D6B66F] text-xs uppercase tracking-wider border-b border-[#D6B66F]/20">
                  <th className="py-4 px-5 font-semibold">Viewport</th>
                  <th className="py-4 px-5 font-semibold">Device Class</th>
                  <th className="py-4 px-5 font-semibold">Outer Padding</th>
                  <th className="py-4 px-5 font-semibold">Grid Behavior</th>
                  <th className="py-4 px-5 font-semibold">Navigation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D6B66F]/15 text-sm">
                {BREAKPOINT_MATRIX.map((row) => (
                  <tr key={row.width} className="hover:bg-[#173D34]/60 transition-colors">
                    <td className="py-4 px-5 font-semibold text-[#D6B66F] tabular-nums whitespace-nowrap">
                      {row.width}
                    </td>
                    <td className="py-4 px-5 font-medium text-[#F5EBD7] whitespace-nowrap">
                      {row.category}
                    </td>
                    <td className="py-4 px-5 text-[#F5EBD7]/80 tabular-nums whitespace-nowrap">
                      {row.containerPadding}
                    </td>
                    <td className="py-4 px-5 text-[#F5EBD7]/80">{row.gridBehavior}</td>
                    <td className="py-4 px-5 text-[#F5EBD7]/80">{row.navigation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Bottom Case Study CTA */}
      <section className="bg-[#102B25] text-[#F5EBD7] py-16 sm:py-20">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#F5EBD7]">
              Want This Level of Editorial Craft for Your Business?
            </h2>
            <p className="text-sm sm:text-base text-[#F5EBD7]/80 mt-2 max-w-xl">
              Tell us about your industry, content goals, and target audience to prepare a custom
              project brief.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpenEnquiry('Alpine Sanctuary Case Study')}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#D6B66F] text-[#102B25] text-sm font-semibold rounded-sm hover:bg-[#E5CD96] transition-colors cursor-pointer whitespace-nowrap shrink-0 min-h-[46px]"
          >
            <span>Discuss a Similar Project</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
