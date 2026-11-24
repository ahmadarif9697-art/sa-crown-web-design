import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { PageRoute } from '../types/navigation';
import { SafeImage } from '../components/SafeImage';

interface ServicesPageProps {
  onNavigate: (page: PageRoute) => void;
  onOpenEnquiry: (subjectHint?: string) => void;
}

const SERVICES_INTERIOR_IMG = '/src/assets/images/services_architectural_craft_1795494665361.jpg';

const SERVICES_DETAIL = [
  {
    number: '01.',
    title: 'Bespoke Website Design & Art Direction',
    summary:
      'Editorial layout architecture built specifically for your brand rather than squeezed into an off-the-shelf theme.',
    deliverables: [
      'Custom typography pairing and visual hierarchy',
      'Disciplined color palette and contrast calibration',
      'Clear page structure tailored to your business services',
      'Cohesive component styling across all pages',
    ],
  },
  {
    number: '02.',
    title: 'Multi-Viewport Responsive Engineering',
    summary:
      'Intentional layout adaptation verified across mobile, tablet, laptop, and widescreen displays.',
    deliverables: [
      'Compact mobile optimization at 360px, 390px, and 430px',
      'Tablet layout grids tuned for 768px portrait & landscape',
      'Desktop and widescreen containment for 1024px, 1440px, and 1920px',
      'Accessible touch targets and single-line navigation discipline',
    ],
  },
  {
    number: '03.',
    title: 'Front-End Development & Clean Codebases',
    summary:
      'Maintainable React and TypeScript builds written cleanly with semantic markup and keyboard accessibility.',
    deliverables: [
      'Modular component architecture ready for future expansion',
      'Client-side form validation and clear user feedback',
      'Smooth, reduced-motion-aware subtle UI transitions',
      'Clean metadata and social preview structure',
    ],
  },
  {
    number: '04.',
    title: 'Concept Prototypes & Redesigns',
    summary:
      'Refresh outdated digital presences or preview an ambitious flagship direction before full rollout.',
    deliverables: [
      'Full layout audit identifying visual clutter and hierarchy gaps',
      'Modernized responsive navigation and content pacing',
      'Interactive case-study style viewport previews',
      'Practical, honest technical handoff documentation',
    ],
  },
];

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Discovery & Scope Alignment',
    description:
      'We define your core pages, audience goals, and realistic project deliverables before touching layout code.',
  },
  {
    step: '02',
    title: 'Visual Direction & Structure',
    description:
      'We establish typography, color balance, and clear wireframes so every section earns its space.',
  },
  {
    step: '03',
    title: 'Multi-Viewport Build',
    description:
      'Layouts are crafted and tested across mobile (360px–430px), tablet (768px), and desktop (1024px–1920px).',
  },
  {
    step: '04',
    title: 'Review & Clean Handoff',
    description:
      'Final polish, TypeScript build verification, and straightforward deployment preparation.',
  },
];

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onNavigate,
  onOpenEnquiry,
}) => {
  return (
    <div>
      {/* Page Header */}
      <section className="bg-[#102B25] text-[#F5EBD7] py-16 sm:py-20 border-b border-[#D6B66F]/20">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D6B66F]">
              Services &amp; Capabilities
            </p>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[#F5EBD7] mt-3 max-w-3xl text-balance">
              Purposeful Web Design Built Around Clarity and Craft.
            </h1>
            <p className="text-base sm:text-lg text-[#F5EBD7]/80 leading-relaxed mt-5 max-w-2xl">
              Every engagement focuses on visual authority, readable typography, and responsive
              execution—with clear scope and zero inflated promises.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="aspect-[4/3] rounded-sm overflow-hidden border border-[#D6B66F]/25 bg-[#0B1F1B]">
              <SafeImage
                src={SERVICES_INTERIOR_IMG}
                alt="Boutique architectural hospitality lounge with veined forest-green stone paneling, honed travertine plinth, brass table lamp, and tailored ivory seating"
                className="w-full h-full object-cover object-center"
                fallbackTitle="Hospitality &amp; Interior Digital Direction"
                eager
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="bg-[#F5EBD7] text-[#202522] py-16 sm:py-24 border-b border-[#102B25]/12">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 space-y-8">
          {SERVICES_DETAIL.map((service) => (
            <article
              key={service.number}
              className="p-7 sm:p-9 bg-[#102B25] text-[#F5EBD7] border border-[#D6B66F]/20 rounded-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
            >
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-semibold text-[#D6B66F] tabular-nums">
                    {service.number}
                  </p>
                  <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#F5EBD7] mt-2">
                    {service.title}
                  </h2>
                  <p className="text-sm sm:text-base text-[#F5EBD7]/80 leading-relaxed mt-4">
                    {service.summary}
                  </p>
                </div>
                <div className="mt-8 pt-5 border-t border-[#D6B66F]/20">
                  <button
                    type="button"
                    onClick={() => onOpenEnquiry(service.title)}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-[#D6B66F] hover:text-[#E5CD96] underline underline-offset-4 decoration-[#D6B66F]/60 transition-colors cursor-pointer"
                  >
                    <span>Enquire About This Service</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-7 lg:pl-8 pt-6 lg:pt-0 border-t lg:border-t-0 lg:border-l border-[#D6B66F]/20 flex flex-col justify-center">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D6B66F] mb-4">
                  Included Deliverables
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.deliverables.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-[#F5EBD7]/85 leading-relaxed"
                    >
                      <Check className="w-4 h-4 text-[#D6B66F] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Studio Process */}
      <section className="bg-[#FAF4E8] text-[#202522] py-16 sm:py-24 border-b border-[#102B25]/12">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="max-w-2xl pb-8 border-b border-[#102B25]/15">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#102B25]/70">
              How We Work
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#102B25] mt-2 text-balance">
              A Structured, Transparent Four-Step Workflow
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:auto-rows-fr gap-6 items-stretch">
            {PROCESS_STEPS.map((item) => (
              <div
                key={item.step}
                className="p-7 sm:p-8 bg-[#102B25] text-[#F5EBD7] border border-[#D6B66F]/20 rounded-sm flex flex-col justify-start h-full"
              >
                <p className="text-xs font-semibold text-[#D6B66F] tabular-nums">
                  {item.step}.
                </p>
                <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#F5EBD7] mt-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[#F5EBD7]/80 leading-relaxed mt-4">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conversion Band */}
      <section className="bg-[#102B25] text-[#F5EBD7] py-16 sm:py-20">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#F5EBD7]">
              Ready to Upgrade Your Business Website?
            </h2>
            <p className="text-sm sm:text-base text-[#F5EBD7]/80 mt-2 max-w-2xl">
              Share your goals in a structured brief or inspect our Alpine Sanctuary responsive
              concept study first.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
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
              <span>View Alpine Sanctuary Study</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
