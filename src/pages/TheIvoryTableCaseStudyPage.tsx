import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Info,
  Check,
  UtensilsCrossed,
  Calendar,
  BookOpen,
  LayoutGrid,
} from 'lucide-react';
import { PageRoute } from '../types/navigation';
import { SafeImage } from '../components/SafeImage';
import { IvoryTableShowcase } from '../components/IvoryTableShowcase';
import { siteConfig } from '../config/siteConfig';

interface TheIvoryTableCaseStudyPageProps {
  onNavigate: (page: PageRoute) => void;
  onOpenEnquiry: (subjectHint?: string) => void;
}

const DINING_HERO_IMG = '/src/assets/images/ivory_table_dining_hero_1795527375285.jpg';
const CULINARY_PLATE_IMG = '/src/assets/images/ivory_table_culinary_plate_1795527374975.jpg';
const STORY_ATELIER_IMG = '/src/assets/images/ivory_table_story_atelier_1795527376176.jpg';
const CELLAR_LOUNGE_IMG = '/src/assets/images/ivory_table_cellar_lounge_1795527376912.jpg';

const GALLERY_ITEMS = [
  {
    id: 'dining-hall',
    label: 'Main Dining Room',
    category: 'Interior Architecture',
    title: 'Candlelit Fluted Oak & Travertine Salon',
    caption:
      'Sets the atmospheric arrival tone on the homepage hero—warm brass lighting, arched limestone niches, and crisp white table linens.',
    src: DINING_HERO_IMG,
    alt: 'The Ivory Table candlelit luxury fine-dining salon with fluted forest oak paneling and travertine arches',
  },
  {
    id: 'tasting-course',
    label: 'Tasting Menu Plate',
    category: 'Culinary Presentation',
    title: 'Line-Caught Sea Bass & Charred Leek Course',
    caption:
      'Anchored the editorial menu section to pair restrained seasonal dish descriptions with intimate tactile stoneware photography.',
    src: CULINARY_PLATE_IMG,
    alt: 'Plated roasted sea bass course on matte ivory stoneware beside crystal wine glass',
  },
  {
    id: 'kitchen-pass',
    label: 'The Open Pass',
    category: 'Storytelling & Craft',
    title: 'Brass Shelving, Sourdough & Finishing Pass',
    caption:
      'Used on the Our Story page to highlight culinary discipline, heritage grain baking, and unhurried plating craft.',
    src: STORY_ATELIER_IMG,
    alt: 'Chef plating a course at an open fine-dining kitchen pass with warm brass shelving',
  },
  {
    id: 'cellar-salon',
    label: 'Private Cellar Salon',
    category: 'Private Dining & Reservations',
    title: 'Travertine Table & Illuminated Oak Wine Cellar',
    caption:
      'Supports the private dining and reservation request experience with clear visual differentiation between main room and cellar seating.',
    src: CELLAR_LOUNGE_IMG,
    alt: 'Private restaurant dining salon with forest-green velvet banquette and glass-enclosed wine cellar',
  },
];

const COLOUR_SWATCHES = [
  {
    name: 'Deep Dining Forest',
    hex: '#102B25',
    role: 'Primary structural dark surface & contrast backdrop for evening dining photography',
  },
  {
    name: 'Table Linen Ivory',
    hex: '#F5EBD7',
    role: 'Daylight reading canvas for editorial menu progression and storytelling prose',
  },
  {
    name: 'Candlelight Champagne',
    hex: '#D6B66F',
    role: 'Primary reservation actions, course indexes, and restrained hairline framing',
  },
  {
    name: 'Slate Charcoal',
    hex: '#202522',
    role: 'Long-form typography ensuring legible reading contrast on ivory surfaces',
  },
];

const SECTION_BREAKDOWN = [
  {
    number: '01.',
    icon: LayoutGrid,
    title: 'Homepage Design',
    summary:
      'Opens with a calm split composition pairing candlelit dining room photography with clear hospitality positioning and direct links to the tasting menu and reservation demo.',
  },
  {
    number: '02.',
    icon: UtensilsCrossed,
    title: 'Menu & Food Presentation',
    summary:
      'Replaces crowded multi-column delivery grids with course-by-course typographic hierarchy, concise tasting notes, dietary clarity, and directional food photography.',
  },
  {
    number: '03.',
    icon: BookOpen,
    title: 'Our Story Page',
    summary:
      'Walks visitors through ingredient provenance, sourdough craftsmanship, and open-pass hospitality philosophy using balanced prose measures and documentary photography.',
  },
  {
    number: '04.',
    icon: Calendar,
    title: 'Reservation Experience (Demo)',
    summary:
      'Guides guests through date, seating window, party size, and dining zone selection via clean interactive controls—explicitly marked as a front-end UI demo.',
  },
];

const RESPONSIVE_SPECS = [
  {
    breakpoint: '360px – 430px',
    device: 'Mobile Handset',
    layout: 'Single-column linear storytelling, 4:3 culinary crops, stacked reservation inputs',
    touch: 'Minimum 44px button height with full-width primary CTAs',
  },
  {
    breakpoint: '768px',
    device: 'Tablet Portrait',
    layout: 'Two-column tasting course pairs and 2-up gallery selector grid',
    touch: 'Drawer navigation + generous section breathing room',
  },
  {
    breakpoint: '1024px – 1440px+',
    device: 'Laptop & Desktop',
    layout: '12-column editorial splits (5/7 hero, 6/6 story, structured reservation grid)',
    touch: 'Single-line navigation bar with focused reservation trigger',
  },
];

const DEVELOPMENT_HIGHLIGHTS = [
  {
    number: '01.',
    title: 'Website Design & Editorial Direction',
    items: [
      'Custom restaurant art direction anchored in evening fine-dining atmosphere',
      'Balanced visual pacing alternating moody dining imagery with readable ivory bands',
      'Zero template badges, fake star ratings, or cluttered booking popups',
    ],
  },
  {
    number: '02.',
    title: 'UI/UX Design & Storytelling',
    items: [
      'Dedicated user journeys for menu browsing, story reading, and table requests',
      'Accessible typography hierarchy pairing Playfair Display with clean geometric sans',
      'Clear interactive gallery captions linking culinary spaces to guest atmosphere',
    ],
  },
  {
    number: '03.',
    title: 'Responsive Development & Interactive Forms',
    items: [
      'Verified cross-device behavior across mobile, tablet, and desktop widths',
      'Interactive front-end reservation interface with structured client-side validation',
      'Clean semantic markup and performant image framing across every section',
    ],
  },
];

export const TheIvoryTableCaseStudyPage: React.FC<TheIvoryTableCaseStudyPageProps> = ({
  onNavigate,
  onOpenEnquiry,
}) => {
  const liveDemoUrl = siteConfig.projects.theIvoryTable.publicDemoUrl;
  const [activeGalleryId, setActiveGalleryId] = useState(GALLERY_ITEMS[0].id);

  const [demoDate, setDemoDate] = useState('2026-12-04');
  const [demoTime, setDemoTime] = useState('19:30');
  const [demoGuests, setDemoGuests] = useState('2 Guests');
  const [demoZone, setDemoZone] = useState('Main Dining Room');
  const [demoName, setDemoName] = useState('');
  const [demoError, setDemoError] = useState<string | null>(null);
  const [demoConfirmed, setDemoConfirmed] = useState(false);

  const activeGalleryItem =
    GALLERY_ITEMS.find((item) => item.id === activeGalleryId) || GALLERY_ITEMS[0];

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (demoName.trim().length < 2) {
      setDemoError('Please enter a guest name (at least 2 characters) to preview the demo.');
      return;
    }
    setDemoError(null);
    setDemoConfirmed(true);
  };

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
                Case Study 02 · {siteConfig.projects.theIvoryTable.category} ·{' '}
                {siteConfig.projects.theIvoryTable.classification}
              </p>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-[54px] font-semibold text-[#F5EBD7] mt-3 leading-tight text-balance">
                The Ivory Table
              </h1>
              <p className="text-base sm:text-lg text-[#F5EBD7]/80 leading-relaxed mt-4 max-w-2xl">
                An elegant digital experience for a fictional luxury fine-dining restaurant designed
                and developed by SA Crown Web Design—combining an editorial menu, culinary
                photography, restaurant storytelling, and an interactive reservation interface.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-3">
              <a
                href={liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#D6B66F] text-[#102B25] text-sm font-semibold rounded-sm hover:bg-[#E5CD96] transition-colors min-h-[46px] whitespace-nowrap"
              >
                <span>View Live Demo</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={() => onOpenEnquiry('The Ivory Table Fine Dining Concept')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-[#F5EBD7]/30 text-[#F5EBD7] text-xs font-medium rounded-sm hover:border-[#D6B66F] hover:text-[#D6B66F] transition-colors cursor-pointer min-h-[46px] whitespace-nowrap"
              >
                <span>Discuss a Similar Project</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Fictional Concept & Reservation Disclosure */}
      <section className="bg-[#0B1F1B] text-[#F5EBD7] py-4 border-b border-[#D6B66F]/15">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 flex items-start sm:items-center gap-3 text-xs text-[#F5EBD7]/85">
          <Info className="w-4 h-4 text-[#D6B66F] shrink-0 mt-0.5 sm:mt-0" />
          <p>
            <strong className="text-[#F5EBD7]">Portfolio Concept Disclosure:</strong> The Ivory Table
            is a fictional luxury restaurant portfolio concept created by SA Crown Web Design—not a
            real client restaurant. No guest numbers, covers, or conversion statistics are claimed,
            and all reservation flows operate strictly as a front-end UI demonstration not connected
            to a live booking system.
          </p>
        </div>
      </section>

      {/* 3. Project Overview & Creative Direction */}
      <section className="bg-[#F5EBD7] text-[#202522] py-16 sm:py-24 border-b border-[#102B25]/12">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7">
            <div className="aspect-[16/10] rounded-sm overflow-hidden border border-[#102B25]/20 bg-[#102B25]">
              <SafeImage
                src={DINING_HERO_IMG}
                alt="The Ivory Table luxury evening dining room with fluted forest oak panels, travertine arches, and candlelit tables"
                className="w-full h-full object-cover object-center"
                fallbackTitle="The Ivory Table Dining Room"
                eager
              />
            </div>
          </div>

          <div className="lg:col-span-5 space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#102B25]/70">
              Project Overview &amp; Creative Direction
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#102B25] leading-snug text-balance">
              Hospitality Storytelling Shaped Like an Evening at the Table
            </h2>
            <p className="text-sm sm:text-base text-[#202522]/85 leading-relaxed">
              Luxury fine-dining websites often fall into two extremes: illegible flash-heavy dark
              pages or transactional booking forms stripped of atmosphere. For The Ivory Table, SA
              Crown Web Design structured a calm editorial journey that balances dining-room mood
              with clear, scannable utility.
            </p>
            <p className="text-sm sm:text-base text-[#202522]/85 leading-relaxed">
              Visitors move naturally from an atmospheric arrival hero into seasonal tasting menus,
              kitchen storytelling, curated room photography, and a focused reservation interface.
            </p>
            <div className="pt-4 border-t border-[#102B25]/15 text-xs text-[#202522]/75 space-y-1.5">
              <p>
                <strong className="text-[#102B25] font-semibold">Services Delivered:</strong>{' '}
                Website Design · UI/UX Design · Responsive Development · Interactive Forms
              </p>
              <p>
                <strong className="text-[#102B25] font-semibold">Category:</strong> Fine Dining &amp;
                Hospitality (Fictional Portfolio Concept)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Visual Identity & Colour Approach */}
      <section className="bg-[#FAF4E8] text-[#202522] py-16 sm:py-24 border-b border-[#102B25]/12">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl pb-8 border-b border-[#102B25]/15">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#102B25]/70">
              Visual Identity &amp; Colour Approach
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#102B25] mt-2 text-balance">
              Restrained Materiality: Forest Oak, Ivory Linen &amp; Warm Brass
            </h2>
            <p className="text-sm sm:text-base text-[#202522]/80 leading-relaxed mt-3">
              Built in natural harmony with SA Crown Web Design’s signature palette, each surface
              mirrors physical dining-room materials—deep forest paneling for evening ambience,
              warm linen ivory for menu legibility, and champagne brass strictly for guest actions.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:auto-rows-fr gap-6 items-stretch">
            {COLOUR_SWATCHES.map((swatch) => (
              <div
                key={swatch.hex}
                className="p-6 bg-[#102B25] text-[#F5EBD7] border border-[#D6B66F]/20 rounded-sm flex flex-col justify-between h-full"
              >
                <div>
                  <div
                    className="h-20 w-full rounded-sm border border-[#D6B66F]/30 mb-5"
                    style={{ backgroundColor: swatch.hex }}
                    aria-hidden="true"
                  />
                  <p className="text-xs font-semibold text-[#D6B66F] tabular-nums">{swatch.hex}</p>
                  <h3 className="font-display text-xl font-semibold text-[#F5EBD7] mt-1">
                    {swatch.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#F5EBD7]/80 leading-relaxed mt-2.5">
                    {swatch.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Interactive Concept Screen & Breakpoint Explorer */}
      <section className="bg-[#F5EBD7] text-[#202522] py-16 sm:py-24 border-b border-[#102B25]/12">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl pb-8 border-b border-[#102B25]/15 mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#102B25]/70">
              Interactive Concept Preview
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#102B25] mt-2 text-balance">
              Inspect Homepage, Menu, Story &amp; Reservations Across Breakpoints
            </h2>
            <p className="text-sm sm:text-base text-[#202522]/80 leading-relaxed mt-3">
              Switch between Desktop (1440px), Tablet (768px), and Mobile (390px) frames or jump
              between concept pages below.
            </p>
          </div>

          <IvoryTableShowcase />
        </div>
      </section>

      {/* 6. Editorial Architecture: Homepage, Menu, Story & Reservation */}
      <section className="bg-[#FAF4E8] text-[#202522] py-16 sm:py-24 border-b border-[#102B25]/12">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="max-w-2xl pb-8 border-b border-[#102B25]/15">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#102B25]/70">
              Page-by-Page Experience
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#102B25] mt-2 text-balance">
              Core Sections Crafted for The Ivory Table
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 md:auto-rows-fr gap-6 items-stretch">
            {SECTION_BREAKDOWN.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.number}
                  className="p-7 sm:p-9 bg-[#102B25] text-[#F5EBD7] border border-[#D6B66F]/20 rounded-sm flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-xs font-semibold text-[#D6B66F] tabular-nums">
                        {item.number}
                      </p>
                      <Icon className="w-4 h-4 text-[#D6B66F]" />
                    </div>
                    <h3 className="font-display text-2xl font-semibold text-[#F5EBD7] mt-2">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#F5EBD7]/80 leading-relaxed mt-4">
                      {item.summary}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Menu & Food + Story Split Spotlight */}
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            <article className="bg-[#102B25] text-[#F5EBD7] border border-[#D6B66F]/20 rounded-sm overflow-hidden flex flex-col">
              <div className="aspect-[4/3] overflow-hidden border-b border-[#D6B66F]/20">
                <SafeImage
                  src={CULINARY_PLATE_IMG}
                  alt="Fine dining sea bass tasting course on matte ivory ceramic plate"
                  className="w-full h-full object-cover"
                  fallbackTitle="Menu & Food Presentation"
                />
              </div>
              <div className="p-7 sm:p-8 flex-1">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#D6B66F]">
                  Menu &amp; Food Presentation
                </p>
                <h3 className="font-display text-2xl font-semibold text-[#F5EBD7] mt-2">
                  Editorial Course Hierarchy Over Cluttered Grids
                </h3>
                <p className="text-sm text-[#F5EBD7]/80 leading-relaxed mt-3">
                  Seasonal courses, provenance notes, and wine pairing cues are laid out with calm
                  horizontal dividers so guests scan evening tastings cleanly on both desktop and
                  handheld screens.
                </p>
              </div>
            </article>

            <article className="bg-[#102B25] text-[#F5EBD7] border border-[#D6B66F]/20 rounded-sm overflow-hidden flex flex-col">
              <div className="aspect-[4/3] overflow-hidden border-b border-[#D6B66F]/20">
                <SafeImage
                  src={STORY_ATELIER_IMG}
                  alt="Chef plating culinary dishes at The Ivory Table open brass kitchen pass"
                  className="w-full h-full object-cover"
                  fallbackTitle="Our Story & Culinary Craft"
                />
              </div>
              <div className="p-7 sm:p-8 flex-1">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#D6B66F]">
                  Our Story Page
                </p>
                <h3 className="font-display text-2xl font-semibold text-[#F5EBD7] mt-2">
                  Intimate Kitchen Pass &amp; Culinary Philosophy
                </h3>
                <p className="text-sm text-[#F5EBD7]/80 leading-relaxed mt-3">
                  Editorial portraits of the open pass, sourdough fermentation, and stoneware vessels
                  establish hospitality craft without overwhelming visitors with long walls of text.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* 7. Interactive Gallery */}
      <section className="bg-[#F5EBD7] text-[#202522] py-16 sm:py-24 border-b border-[#102B25]/12">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="max-w-2xl pb-8 border-b border-[#102B25]/15 mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#102B25]/70">
              Interactive Gallery
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#102B25] mt-2 text-balance">
              Curated Photography Across Dining, Kitchen &amp; Cellar Spaces
            </h2>
          </div>

          <div className="bg-[#102B25] text-[#F5EBD7] border border-[#D6B66F]/25 rounded-sm p-5 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 aspect-[16/10] overflow-hidden rounded-sm border border-[#D6B66F]/25 bg-[#0B1F1B]">
                <SafeImage
                  src={activeGalleryItem.src}
                  alt={activeGalleryItem.alt}
                  className="w-full h-full object-cover object-center"
                  fallbackTitle={activeGalleryItem.title}
                />
              </div>

              <div className="lg:col-span-4 space-y-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D6B66F]">
                    {activeGalleryItem.category}
                  </p>
                  <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#F5EBD7] mt-2">
                    {activeGalleryItem.title}
                  </h3>
                  <p className="text-sm text-[#F5EBD7]/80 leading-relaxed mt-3">
                    {activeGalleryItem.caption}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#D6B66F]/20">
                  <p className="text-[11px] uppercase tracking-wider text-[#F5EBD7]/65 font-semibold mb-3">
                    Select Scene
                  </p>
                  <div className="grid grid-cols-2 gap-2.5">
                    {GALLERY_ITEMS.map((item) => {
                      const isSelected = item.id === activeGalleryItem.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setActiveGalleryId(item.id)}
                          className={`text-left p-2.5 rounded-sm border transition-colors cursor-pointer ${
                            isSelected
                              ? 'border-[#D6B66F] bg-[#0B1F1B] text-[#D6B66F]'
                              : 'border-[#F5EBD7]/15 bg-[#0B1F1B]/50 text-[#F5EBD7]/80 hover:border-[#D6B66F]/60'
                          }`}
                        >
                          <div className="aspect-[16/10] overflow-hidden rounded-sm mb-2">
                            <SafeImage
                              src={item.src}
                              alt={item.label}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="block text-xs font-semibold truncate">
                            {item.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Interactive Reservation Experience (Front-End Demonstration) */}
      <section className="bg-[#FAF4E8] text-[#202522] py-16 sm:py-24 border-b border-[#102B25]/12">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <div className="lg:col-span-5 flex flex-col justify-between bg-[#102B25] text-[#F5EBD7] border border-[#D6B66F]/25 rounded-sm p-7 sm:p-9">
            <div className="space-y-5">
              <div className="aspect-[4/3] overflow-hidden rounded-sm border border-[#D6B66F]/20 bg-[#0B1F1B]">
                <SafeImage
                  src={CELLAR_LOUNGE_IMG}
                  alt="Private cellar alcove dining table with green velvet banquette at The Ivory Table"
                  className="w-full h-full object-cover"
                  fallbackTitle="Private Cellar & Seating Zones"
                />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D6B66F]">
                  Reservation Experience
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#F5EBD7] mt-2">
                  Frictionless Table Request UX
                </h2>
                <p className="text-sm text-[#F5EBD7]/80 leading-relaxed mt-3">
                  Designed so prospective guests can test date, seating zone, and party-size fields
                  with accessible form labels and immediate client-side validation.
                </p>
              </div>
            </div>

            <p className="mt-6 pt-4 border-t border-[#D6B66F]/20 text-xs text-[#F5EBD7]/70 leading-relaxed">
              Note: Reservations below are a front-end interactive demonstration only and are not
              connected to a live booking engine.
            </p>
          </div>

          <div className="lg:col-span-7 bg-[#102B25] text-[#F5EBD7] border border-[#D6B66F]/25 rounded-sm p-7 sm:p-9 flex flex-col justify-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D6B66F]">
              Interactive Front-End Form Demonstration
            </p>
            <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#F5EBD7] mt-2">
              Try the Reservation Request Flow
            </h3>

            {!demoConfirmed ? (
              <form onSubmit={handleDemoSubmit} noValidate className="mt-6 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="ivory-demo-name"
                      className="block text-xs font-semibold text-[#D6B66F] mb-1.5"
                    >
                      Guest Name (Demo) *
                    </label>
                    <input
                      id="ivory-demo-name"
                      type="text"
                      value={demoName}
                      onChange={(e) => {
                        setDemoName(e.target.value);
                        if (demoError) setDemoError(null);
                      }}
                      placeholder="Enter sample name"
                      className="w-full px-3.5 py-2.5 bg-[#FAF4E8] border border-[#D6B66F]/35 rounded-sm text-sm text-[#202522] placeholder:text-[#202522]/45 focus:border-[#D6B66F] focus:bg-[#FFFDF8] focus:outline-none min-h-[44px]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="ivory-demo-date"
                      className="block text-xs font-semibold text-[#D6B66F] mb-1.5"
                    >
                      Preferred Evening
                    </label>
                    <input
                      id="ivory-demo-date"
                      type="date"
                      value={demoDate}
                      onChange={(e) => setDemoDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#FAF4E8] border border-[#D6B66F]/35 rounded-sm text-sm text-[#202522] focus:border-[#D6B66F] focus:bg-[#FFFDF8] focus:outline-none min-h-[44px]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label
                      htmlFor="ivory-demo-time"
                      className="block text-xs font-semibold text-[#D6B66F] mb-1.5"
                    >
                      Seating Time
                    </label>
                    <select
                      id="ivory-demo-time"
                      value={demoTime}
                      onChange={(e) => setDemoTime(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#FAF4E8] border border-[#D6B66F]/35 rounded-sm text-sm text-[#202522] focus:border-[#D6B66F] focus:bg-[#FFFDF8] focus:outline-none min-h-[44px]"
                    >
                      <option value="18:30">18:30 First Seating</option>
                      <option value="19:30">19:30 Main Service</option>
                      <option value="20:45">20:45 Late Seating</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="ivory-demo-guests"
                      className="block text-xs font-semibold text-[#D6B66F] mb-1.5"
                    >
                      Party Size
                    </label>
                    <select
                      id="ivory-demo-guests"
                      value={demoGuests}
                      onChange={(e) => setDemoGuests(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#FAF4E8] border border-[#D6B66F]/35 rounded-sm text-sm text-[#202522] focus:border-[#D6B66F] focus:bg-[#FFFDF8] focus:outline-none min-h-[44px]"
                    >
                      <option value="2 Guests">2 Guests</option>
                      <option value="4 Guests">4 Guests</option>
                      <option value="6 Guests (Cellar Table)">6 Guests (Cellar Table)</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="ivory-demo-zone"
                      className="block text-xs font-semibold text-[#D6B66F] mb-1.5"
                    >
                      Dining Zone
                    </label>
                    <select
                      id="ivory-demo-zone"
                      value={demoZone}
                      onChange={(e) => setDemoZone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#FAF4E8] border border-[#D6B66F]/35 rounded-sm text-sm text-[#202522] focus:border-[#D6B66F] focus:bg-[#FFFDF8] focus:outline-none min-h-[44px]"
                    >
                      <option value="Main Dining Room">Main Dining Room</option>
                      <option value="Chef's Pass Counter">Chef&apos;s Pass Counter</option>
                      <option value="Private Cellar Alcove">Private Cellar Alcove</option>
                    </select>
                  </div>
                </div>

                {demoError && <p className="text-xs text-[#F5B7B1]">{demoError}</p>}

                <div className="pt-3 border-t border-[#D6B66F]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <p className="text-xs text-[#F5EBD7]/70">
                    Front-end UI preview only — no real table booking occurs.
                  </p>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#D6B66F] text-[#102B25] text-xs font-semibold rounded-sm hover:bg-[#E5CD96] transition-colors cursor-pointer min-h-[44px] whitespace-nowrap"
                  >
                    Preview Reservation Summary
                  </button>
                </div>
              </form>
            ) : (
              <div className="mt-6 p-6 bg-[#0B1F1B] border border-[#D6B66F]/30 rounded-sm space-y-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#D6B66F]">
                  Front-End Demonstration Summary
                </p>
                <div className="text-sm text-[#F5EBD7]/90 space-y-1.5">
                  <p>
                    <strong className="text-[#D6B66F]">Guest:</strong> {demoName.trim()}
                  </p>
                  <p>
                    <strong className="text-[#D6B66F]">Evening &amp; Seating:</strong> {demoDate} at{' '}
                    {demoTime}
                  </p>
                  <p>
                    <strong className="text-[#D6B66F]">Table Preference:</strong> {demoGuests} ·{' '}
                    {demoZone}
                  </p>
                </div>
                <p className="text-xs text-[#F5EBD7]/70 leading-relaxed">
                  This confirms client-side form validation and summary formatting only. The Ivory
                  Table is a fictional concept and is not connected to a live reservation system.
                </p>
                <button
                  type="button"
                  onClick={() => setDemoConfirmed(false)}
                  className="text-xs font-semibold text-[#D6B66F] hover:text-[#E5CD96] underline underline-offset-4 cursor-pointer"
                >
                  Edit Demo Selection
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 9. Responsive Matrix & Development Highlights */}
      <section className="bg-[#F5EBD7] text-[#202522] py-16 sm:py-24 border-b border-[#102B25]/12">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 space-y-16">
          <div>
            <div className="max-w-2xl pb-8 border-b border-[#102B25]/15 mb-10">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#102B25]/70">
                Responsive Desktop, Tablet &amp; Mobile Design
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#102B25] mt-2 text-balance">
                Consistent Fine-Dining Experience Across Every Screen Size
              </h2>
            </div>

            <div className="overflow-x-auto bg-[#102B25] text-[#F5EBD7] border border-[#D6B66F]/25 rounded-sm">
              <table className="w-full text-left border-collapse min-w-[640px]">
                <thead>
                  <tr className="bg-[#0B1F1B] text-[#D6B66F] text-xs uppercase tracking-wider border-b border-[#D6B66F]/20">
                    <th className="py-4 px-5 font-semibold">Viewport</th>
                    <th className="py-4 px-5 font-semibold">Device</th>
                    <th className="py-4 px-5 font-semibold">Layout Adaptation</th>
                    <th className="py-4 px-5 font-semibold">Interaction Discipline</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D6B66F]/15 text-sm">
                  {RESPONSIVE_SPECS.map((row) => (
                    <tr key={row.breakpoint} className="hover:bg-[#173D34]/60 transition-colors">
                      <td className="py-4 px-5 font-semibold text-[#D6B66F] tabular-nums whitespace-nowrap">
                        {row.breakpoint}
                      </td>
                      <td className="py-4 px-5 font-medium text-[#F5EBD7] whitespace-nowrap">
                        {row.device}
                      </td>
                      <td className="py-4 px-5 text-[#F5EBD7]/80">{row.layout}</td>
                      <td className="py-4 px-5 text-[#F5EBD7]/80">{row.touch}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <div className="max-w-2xl pb-8 border-b border-[#102B25]/15 mb-10">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#102B25]/70">
                Key Features &amp; Development Highlights
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#102B25] mt-2 text-balance">
                Craftsmanship Built Into Every Layer
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 md:auto-rows-fr gap-6 items-stretch">
              {DEVELOPMENT_HIGHLIGHTS.map((highlight) => (
                <div
                  key={highlight.number}
                  className="p-7 sm:p-8 bg-[#102B25] text-[#F5EBD7] border border-[#D6B66F]/20 rounded-sm flex flex-col justify-start h-full"
                >
                  <p className="text-xs font-semibold text-[#D6B66F] tabular-nums">
                    {highlight.number}
                  </p>
                  <h3 className="font-display text-2xl font-semibold text-[#F5EBD7] mt-2">
                    {highlight.title}
                  </h3>
                  <ul className="mt-5 space-y-3">
                    {highlight.items.map((item) => (
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
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 10. Final Live Demo & Enquiry CTA */}
      <section className="bg-[#102B25] text-[#F5EBD7] py-16 sm:py-20">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D6B66F]">
              Live Concept Demonstration
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#F5EBD7] mt-2">
              Experience The Ivory Table Live or Commission Your Hospitality Website
            </h2>
            <p className="text-sm sm:text-base text-[#F5EBD7]/80 mt-2 max-w-2xl">
              Inspect the full published demonstration site or share your restaurant or hotel
              project details with SA Crown Web Design.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <a
              href={liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#D6B66F] text-[#102B25] text-sm font-semibold rounded-sm hover:bg-[#E5CD96] transition-colors whitespace-nowrap min-h-[46px]"
            >
              <span>View Live Demo</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={() => onOpenEnquiry('The Ivory Table Fine Dining Concept')}
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
