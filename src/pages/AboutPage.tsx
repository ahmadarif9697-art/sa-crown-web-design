import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PageRoute } from '../types/navigation';
import { SafeImage } from '../components/SafeImage';
import { CrownMark } from '../components/CrownLogo';
import { siteConfig } from '../config/siteConfig';

interface AboutPageProps {
  onNavigate: (page: PageRoute) => void;
  onOpenEnquiry: (subjectHint?: string) => void;
}

const STUDIO_CRAFT_IMG = '/src/assets/images/studio_architecture_detail_1795494367957.jpg';

const STUDIO_PRINCIPLES = [
  {
    number: '01.',
    title: 'Design Clarity Before Decoration',
    text: 'Every headline, button, and image earns its place. We avoid cluttered dashboards, noisy widgets, and meaningless decorative badges so visitors immediately grasp what your business does.',
  },
  {
    number: '02.',
    title: 'Every Screen Is First-Class',
    text: 'Too many business sites are designed only on a 1440px monitor and hastily shrunk for phones. We deliberately verify proportions across 360px, 390px, 430px, 768px, 1024px, 1440px, and 1920px.',
  },
  {
    number: '03.',
    title: 'Honesty in Capabilities & Proof',
    text: 'We never invent client testimonials, fabricate analytics figures, or claim backend integrations that do not exist. Clear expectations build lasting client trust.',
  },
];

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigate,
  onOpenEnquiry,
}) => {
  return (
    <div>
      {/* Header */}
      <section className="bg-[#102B25] text-[#F5EBD7] py-16 sm:py-20 border-b border-[#D6B66F]/20">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#D6B66F]">
            <CrownMark className="w-5 h-4 shrink-0" />
            <span>About {siteConfig.brandName}</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[#F5EBD7] mt-4 max-w-3xl text-balance">
            Built on a Simple Conviction: Your Business Deserves a Better Website.
          </h1>
          <p className="text-base sm:text-lg text-[#F5EBD7]/80 leading-relaxed mt-5 max-w-2xl">
            SA Crown Web Design is an independent web design studio focused on giving growing and
            established businesses digital homes that feel composed, trustworthy, and tailored.
          </p>
        </div>
      </section>

      {/* Editorial Story Split */}
      <section className="bg-[#F5EBD7] text-[#202522] py-16 sm:py-24 border-b border-[#102B25]/12">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-5">
            <div className="aspect-[3/4] max-w-md mx-auto lg:mx-0 border border-[#102B25]/20 rounded-sm overflow-hidden bg-[#102B25]">
              <SafeImage
                src={STUDIO_CRAFT_IMG}
                alt="Sunlit architectural studio room with arched steel-framed window, matte forest-green plaster walls, travertine stone console, and linen drapery"
                className="w-full h-full object-cover object-center"
                fallbackTitle="SA Crown Web Design Studio"
              />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#102B25]/70">
              Studio Philosophy
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#102B25] leading-snug">
              Replacing Generic Templates With Architectural Digital Craft.
            </h2>
            <p className="text-base text-[#202522]/85 leading-relaxed">
              Many businesses outgrow their early website long before they replace it. Slow,
              disjointed layouts undermine otherwise excellent services—forcing prospective clients
              to work too hard to understand what makes a company worth contacting.
            </p>
            <p className="text-base text-[#202522]/85 leading-relaxed">
              At SA Crown Web Design, we pair classic editorial typography—anchored by Playfair
              Display and crisp geometric sans-serif prose—with calm color discipline and
              thoughtful responsive engineering. The goal is never visual noise; it is unmistakable
              credibility.
            </p>

            <div className="pt-4 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onNavigate('case-study')}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#102B25] text-[#F5EBD7] text-xs font-semibold rounded-sm hover:bg-[#1A4239] transition-colors cursor-pointer min-h-[44px]"
              >
                <span>Inspect Our Alpine Sanctuary Concept</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#D6B66F]" />
              </button>
              <button
                type="button"
                onClick={() => onOpenEnquiry()}
                className="inline-flex items-center gap-2 px-5 py-3.5 border border-[#102B25]/25 text-[#102B25] text-xs font-semibold rounded-sm hover:border-[#102B25] transition-colors cursor-pointer min-h-[44px]"
              >
                <span>Discuss a Project</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Studio Standards */}
      <section className="bg-[#FAF4E8] text-[#202522] py-16 sm:py-24">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="max-w-2xl pb-8 border-b border-[#102B25]/15">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#102B25]/70">
              How We Measure Quality
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#102B25] mt-2 text-balance">
              Three Non-Negotiable Studio Standards
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 md:auto-rows-fr gap-6 items-stretch">
            {STUDIO_PRINCIPLES.map((principle) => (
              <div
                key={principle.number}
                className="p-7 sm:p-9 bg-[#102B25] text-[#F5EBD7] border border-[#D6B66F]/20 rounded-sm flex flex-col justify-start h-full"
              >
                <p className="text-xs font-semibold text-[#D6B66F] tabular-nums">
                  {principle.number}
                </p>
                <h3 className="font-display text-2xl font-semibold text-[#F5EBD7] mt-2">
                  {principle.title}
                </h3>
                <p className="text-sm sm:text-base text-[#F5EBD7]/80 leading-relaxed mt-4">
                  {principle.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
