import React, { useState, useRef, useLayoutEffect } from 'react';
import { Monitor, Tablet, Smartphone, Menu, Calendar, Clock, Users, CheckCircle2 } from 'lucide-react';
import { SafeImage } from './SafeImage';

export type IvoryViewportId = '1440' | '768' | '390';
type PreviewScreen = 'homepage' | 'menu' | 'story' | 'reservations';

interface ViewportSpec {
  id: IvoryViewportId;
  numericWidth: number;
  label: string;
  deviceName: string;
  widthLabel: string;
  columns: string;
  navPattern: string;
  rationale: string;
  icon: React.ComponentType<{ className?: string }>;
}

const VIEWPORT_SPECS: ViewportSpec[] = [
  {
    id: '1440',
    numericWidth: 1440,
    label: '1440px',
    deviceName: 'Desktop',
    widthLabel: '1440 × 900px',
    columns: '12-Column Split Editorial Grid',
    navPattern: 'Single-row restaurant header + Reserve CTA',
    rationale:
      'Balances spacious editorial copy columns against wide-angle candlelit dining room and plated culinary photography without stretching text measures.',
    icon: Monitor,
  },
  {
    id: '768',
    numericWidth: 768,
    label: '768px',
    deviceName: 'Tablet',
    widthLabel: '768 × 1024px',
    columns: 'Stacked Hero · 2-Column Course Grid',
    navPattern: 'Compact top bar + drawer menu',
    rationale:
      'Reflows hero splits vertically while organizing menu courses and reservation inputs into comfortable two-column tablet bands.',
    icon: Tablet,
  },
  {
    id: '390',
    numericWidth: 390,
    label: '390px',
    deviceName: 'Mobile',
    widthLabel: '390 × 844px (360px–430px support)',
    columns: 'Single-Column Thumb-Friendly Flow',
    navPattern: 'Minimal bar + slide-down menu',
    rationale:
      'Keeps menu pricing, story prose, and interactive reservation fields single-column with 44px+ touch targets and zero horizontal overflow.',
    icon: Smartphone,
  },
];

const HERO_IMG = '/src/assets/images/ivory_table_dining_hero_1795527375285.jpg';
const MENU_IMG = '/src/assets/images/ivory_table_culinary_plate_1795527374975.jpg';
const STORY_IMG = '/src/assets/images/ivory_table_story_atelier_1795527376176.jpg';
const CELLAR_IMG = '/src/assets/images/ivory_table_cellar_lounge_1795527376912.jpg';

const SAMPLE_COURSES = [
  {
    course: 'First Course',
    dish: 'Line-Caught Sea Bass & Charred Leek',
    note: 'Saffron beurre blanc, coastal sea fennel, cold-pressed herb oil',
  },
  {
    course: 'Second Course',
    dish: 'Dry-Aged Duck Crown & Smoked Fig',
    note: 'Juniper jus, roasted salsify, crisp buckwheat tuile',
  },
  {
    course: 'Pastry Finale',
    dish: 'Warm Hazelnut Mille-Feuille',
    note: 'Brown butter ice cream, espresso caramel, toasted praline',
  },
];

export const IvoryTableShowcase: React.FC = () => {
  const [activeViewport, setActiveViewport] = useState<IvoryViewportId>('1440');
  const [activeScreen, setActiveScreen] = useState<PreviewScreen>('homepage');
  const [demoSubmitted, setDemoSubmitted] = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const virtualFrameRef = useRef<HTMLDivElement>(null);
  const [stageWidth, setStageWidth] = useState<number>(0);
  const [virtualHeight, setVirtualHeight] = useState<number>(0);

  const currentSpec =
    VIEWPORT_SPECS.find((v) => v.id === activeViewport) || VIEWPORT_SPECS[0];

  const isMobile = activeViewport === '390';
  const isTablet = activeViewport === '768';
  const isStacked = isMobile || isTablet;

  useLayoutEffect(() => {
    const updateMeasurements = () => {
      if (stageRef.current) {
        const styles = window.getComputedStyle(stageRef.current);
        const horizontalPad =
          parseFloat(styles.paddingLeft || '0') +
          parseFloat(styles.paddingRight || '0');
        const available = Math.max(0, stageRef.current.clientWidth - horizontalPad);
        setStageWidth(available);
      }
      if (virtualFrameRef.current) {
        setVirtualHeight(virtualFrameRef.current.scrollHeight);
      }
    };

    updateMeasurements();
    if (typeof ResizeObserver === 'undefined') return;

    const observer = new ResizeObserver(() => {
      updateMeasurements();
    });

    if (stageRef.current) observer.observe(stageRef.current);
    if (virtualFrameRef.current) observer.observe(virtualFrameRef.current);

    return () => observer.disconnect();
  }, [activeViewport, activeScreen, demoSubmitted]);

  const targetWidth = currentSpec.numericWidth;
  const scale = stageWidth > 0 ? Math.min(1, stageWidth / targetWidth) : 1;
  const scaledWidth = Math.round(targetWidth * scale);
  const scaledHeight = virtualHeight > 0 ? Math.ceil(virtualHeight * scale) : undefined;
  const scalePercent = Math.round(scale * 100);

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#102B25]/15 pb-4">
        <div
          role="tablist"
          aria-label="The Ivory Table Responsive Breakpoints"
          className="flex flex-wrap items-center gap-1.5 p-1 bg-[#FAF4E8] border border-[#102B25]/15 rounded-sm"
        >
          {VIEWPORT_SPECS.map((spec) => {
            const Icon = spec.icon;
            const isSelected = activeViewport === spec.id;
            return (
              <button
                key={spec.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveViewport(spec.id)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-sm transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer min-h-[40px] ${
                  isSelected
                    ? 'bg-[#102B25] text-[#D6B66F] shadow-sm'
                    : 'text-[#202522]/80 hover:text-[#102B25] hover:bg-[#F5EBD7]'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span className="tabular-nums">{spec.label}</span>
                <span className="hidden sm:inline font-normal opacity-80">
                  · {spec.deviceName}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-[#202522]/70 font-medium whitespace-nowrap">
            Concept Page:
          </span>
          <div className="flex flex-wrap items-center gap-1 p-1 bg-[#FAF4E8] border border-[#102B25]/15 rounded-sm">
            {(
              [
                { id: 'homepage', label: 'Homepage' },
                { id: 'menu', label: 'Menu' },
                { id: 'story', label: 'Our Story' },
                { id: 'reservations', label: 'Reservations' },
              ] as { id: PreviewScreen; label: string }[]
            ).map((screen) => (
              <button
                key={screen.id}
                type="button"
                onClick={() => {
                  setActiveScreen(screen.id);
                  setDemoSubmitted(false);
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[34px] ${
                  activeScreen === screen.id
                    ? 'bg-[#102B25] text-[#D6B66F] font-semibold'
                    : 'text-[#202522]/75 hover:text-[#102B25] hover:bg-[#F5EBD7]'
                }`}
              >
                {screen.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Metadata Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 sm:p-6 bg-[#102B25] text-[#F5EBD7] border border-[#D6B66F]/25 rounded-sm">
        <div>
          <p className="text-[11px] uppercase tracking-wider text-[#D6B66F] font-semibold">
            Active Viewport
          </p>
          <p className="text-sm font-semibold text-[#F5EBD7] mt-1 tabular-nums">
            {currentSpec.widthLabel}
          </p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-wider text-[#D6B66F] font-semibold">
            Layout Structure
          </p>
          <p className="text-sm font-medium text-[#F5EBD7]/90 mt-1">
            {currentSpec.columns}
          </p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-wider text-[#D6B66F] font-semibold">
            Navigation Behavior
          </p>
          <p className="text-sm font-medium text-[#F5EBD7]/90 mt-1">
            {currentSpec.navPattern}
          </p>
        </div>
      </div>

      {/* Scaled Preview Stage */}
      <div
        ref={stageRef}
        className="bg-[#EAE0CA] border border-[#102B25]/15 rounded-sm p-3 sm:p-6 lg:p-8 flex justify-center overflow-hidden"
      >
        <div
          style={{
            width: stageWidth > 0 ? `${scaledWidth}px` : '100%',
            height: scaledHeight !== undefined ? `${scaledHeight}px` : 'auto',
          }}
          className="relative overflow-hidden rounded-sm shadow-xl"
        >
          <div
            ref={virtualFrameRef}
            style={{
              width: `${targetWidth}px`,
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
            }}
            className="bg-[#0F1E1A] text-[#F5EBD7] border border-[#D6B66F]/30 rounded-sm overflow-hidden"
          >
            {/* Browser Bar */}
            <div className="px-5 py-3 bg-[#091411] border-b border-[#F5EBD7]/10 flex items-center justify-between gap-4">
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F5EBD7]/25" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#F5EBD7]/25" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#F5EBD7]/25" />
              </div>
              <p className="text-xs text-[#F5EBD7]/70 truncate tabular-nums">
                Concept Preview · The Ivory Table ({currentSpec.label} · {scalePercent}% fit)
              </p>
              <span className="text-[11px] text-[#D6B66F] font-medium whitespace-nowrap shrink-0">
                Fictional Portfolio Concept
              </span>
            </div>

            {/* Simulated Restaurant Header */}
            <div
              className={`${
                isStacked ? 'px-6 py-4' : 'px-10 py-5'
              } border-b border-[#F5EBD7]/10 flex items-center justify-between gap-6`}
            >
              <span className="font-display text-xl tracking-wide text-[#F5EBD7] whitespace-nowrap shrink-0">
                The Ivory Table
              </span>

              {isStacked ? (
                <div className="flex items-center gap-2 text-[#D6B66F] shrink-0">
                  <span className="text-xs font-medium">Menu</span>
                  <Menu className="w-4 h-4" />
                </div>
              ) : (
                <div className="flex items-center gap-7 text-xs text-[#F5EBD7]/85 shrink-0">
                  <button
                    type="button"
                    onClick={() => setActiveScreen('homepage')}
                    className={`cursor-pointer whitespace-nowrap ${
                      activeScreen === 'homepage' ? 'text-[#D6B66F] font-semibold' : ''
                    }`}
                  >
                    Home
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveScreen('menu')}
                    className={`cursor-pointer whitespace-nowrap ${
                      activeScreen === 'menu' ? 'text-[#D6B66F] font-semibold' : ''
                    }`}
                  >
                    Menu
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveScreen('story')}
                    className={`cursor-pointer whitespace-nowrap ${
                      activeScreen === 'story' ? 'text-[#D6B66F] font-semibold' : ''
                    }`}
                  >
                    Our Story
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveScreen('reservations')}
                    className="px-4 py-2 bg-[#D6B66F] text-[#102B25] font-semibold rounded-sm cursor-pointer whitespace-nowrap"
                  >
                    Reserve a Table
                  </button>
                </div>
              )}
            </div>

            {/* Screen 1: Homepage */}
            {activeScreen === 'homepage' && (
              <div
                className={
                  isStacked
                    ? 'grid grid-cols-1'
                    : 'grid grid-cols-[minmax(0,5fr)_minmax(0,7fr)] items-stretch'
                }
              >
                <div
                  className={
                    isStacked
                      ? `min-w-0 order-2 flex flex-col justify-center bg-[#0F1E1A] ${
                          isMobile ? 'p-6' : 'p-8'
                        }`
                      : 'min-w-0 flex flex-col justify-center bg-[#0F1E1A] p-12'
                  }
                >
                  <p className="text-xs uppercase tracking-[0.22em] text-[#D6B66F] mb-3">
                    Seasonal Tasting &amp; Wine Cellar
                  </p>
                  <h4
                    className={`font-display font-medium text-[#F5EBD7] ${
                      isMobile
                        ? 'text-[30px] leading-[1.15]'
                        : isTablet
                        ? 'text-[38px] leading-[1.12]'
                        : 'text-[50px] leading-[1.08]'
                    }`}
                  >
                    Candlelit Gastronomy Crafted Without Rush.
                  </h4>
                  <p
                    className={`text-[#F5EBD7]/80 mt-4 leading-relaxed max-w-xl ${
                      isMobile ? 'text-sm' : 'text-base'
                    }`}
                  >
                    An evening dining experience defined by open-hearth ingredients, cellar pairings,
                    and quiet linen-draped hospitality.
                  </p>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveScreen('menu')}
                      className="px-5 py-2.5 bg-[#D6B66F] text-[#102B25] text-xs font-semibold rounded-sm cursor-pointer whitespace-nowrap"
                    >
                      Explore Seasonal Menu
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveScreen('reservations')}
                      className="px-5 py-2.5 border border-[#F5EBD7]/30 text-[#F5EBD7] text-xs font-medium rounded-sm cursor-pointer whitespace-nowrap"
                    >
                      Reservation Interface
                    </button>
                  </div>
                </div>

                <div
                  className={
                    isStacked
                      ? 'min-w-0 order-1 aspect-[16/10] w-full overflow-hidden bg-[#102B25] border-b border-[#D6B66F]/15'
                      : 'min-w-0 w-full min-h-[500px] overflow-hidden bg-[#102B25] border-l border-[#D6B66F]/15'
                  }
                >
                  <SafeImage
                    src={HERO_IMG}
                    alt="The Ivory Table luxury fine dining room with candlelight, fluted forest oak walls, and ivory linen tables"
                    className="block w-full h-full object-cover object-center"
                    eager
                  />
                </div>
              </div>
            )}

            {/* Screen 2: Editorial Menu */}
            {activeScreen === 'menu' && (
              <div className={`${isMobile ? 'p-6' : isTablet ? 'p-8' : 'p-12'} bg-[#FAF4E8] text-[#202522]`}>
                <div
                  className={`grid gap-8 items-center ${
                    isStacked ? 'grid-cols-1' : 'grid-cols-12'
                  }`}
                >
                  <div className={isStacked ? '' : 'col-span-5'}>
                    <div className="aspect-[4/3] overflow-hidden rounded-sm border border-[#102B25]/20 bg-[#102B25]">
                      <SafeImage
                        src={MENU_IMG}
                        alt="Seared sea bass tasting course on matte ivory stoneware"
                        className="block w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className={isStacked ? 'space-y-4' : 'col-span-7 space-y-5'}>
                    <div className="border-b border-[#102B25]/15 pb-3">
                      <p className="text-xs uppercase tracking-[0.2em] text-[#102B25]/70 font-semibold">
                        Editorial Menu Layout
                      </p>
                      <h4 className="font-display text-2xl sm:text-3xl font-semibold text-[#102B25] mt-1">
                        Autumn Tasting Progression
                      </h4>
                    </div>
                    <div className="divide-y divide-[#102B25]/12">
                      {SAMPLE_COURSES.map((item) => (
                        <div key={item.dish} className="py-3.5 first:pt-1 last:pb-1">
                          <p className="text-[11px] uppercase tracking-wider text-[#102B25]/65 font-semibold">
                            {item.course}
                          </p>
                          <p className="font-display text-lg font-semibold text-[#102B25] mt-0.5">
                            {item.dish}
                          </p>
                          <p className="text-xs text-[#202522]/75 mt-1">{item.note}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Screen 3: Our Story */}
            {activeScreen === 'story' && (
              <div
                className={
                  isStacked
                    ? 'grid grid-cols-1 bg-[#102B25]'
                    : 'grid grid-cols-[minmax(0,6fr)_minmax(0,6fr)] items-stretch bg-[#102B25]'
                }
              >
                <div
                  className={
                    isStacked
                      ? 'aspect-[4/3] w-full overflow-hidden border-b border-[#D6B66F]/20'
                      : 'w-full min-h-[460px] overflow-hidden border-r border-[#D6B66F]/20'
                  }
                >
                  <SafeImage
                    src={STORY_IMG}
                    alt="Chef plating culinary dishes at The Ivory Table open brass-shelved kitchen pass"
                    className="block w-full h-full object-cover object-center"
                  />
                </div>
                <div className={`flex flex-col justify-center ${isMobile ? 'p-6' : 'p-10'}`}>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#D6B66F] font-semibold">
                    Our Story Page Concept
                  </p>
                  <h4 className="font-display text-2xl sm:text-3xl font-medium text-[#F5EBD7] mt-2">
                    Rooted in Craft, Quiet Sourcing, and Warm Service
                  </h4>
                  <p className="text-sm text-[#F5EBD7]/80 leading-relaxed mt-4">
                    The story page pairs documentary kitchen-pass imagery with measured editorial
                    paragraphs detailing fermentation, heritage grain baking, and acoustic room
                    design—keeping copy digestible across every viewport.
                  </p>
                </div>
              </div>
            )}

            {/* Screen 4: Reservations UI Demo */}
            {activeScreen === 'reservations' && (
              <div className={`${isMobile ? 'p-6' : isTablet ? 'p-8' : 'p-12'} bg-[#FAF4E8] text-[#202522]`}>
                <div
                  className={`grid gap-8 items-center ${
                    isStacked ? 'grid-cols-1' : 'grid-cols-12'
                  }`}
                >
                  <div className={isStacked ? '' : 'col-span-5'}>
                    <div className="aspect-[4/3] overflow-hidden rounded-sm border border-[#102B25]/20 bg-[#102B25]">
                      <SafeImage
                        src={CELLAR_IMG}
                        alt="The Ivory Table private dining alcove and travertine table"
                        className="block w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className={`${isStacked ? '' : 'col-span-7'} p-6 bg-[#102B25] text-[#F5EBD7] rounded-sm border border-[#D6B66F]/25`}>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-[#D6B66F] font-semibold">
                      Front-End Reservation Demo
                    </p>
                    <h4 className="font-display text-2xl font-semibold text-[#F5EBD7] mt-1">
                      Table Request Interface
                    </h4>
                    <p className="text-xs text-[#F5EBD7]/70 mt-1">
                      Front-end demonstration only — not connected to a live booking engine.
                    </p>

                    {!demoSubmitted ? (
                      <div className="mt-5 space-y-4">
                        <div className={`grid gap-3 ${isMobile ? 'grid-cols-1' : 'grid-cols-3'}`}>
                          <div className="p-3 bg-[#0B1F1B] border border-[#D6B66F]/25 rounded-sm">
                            <p className="text-[10px] uppercase tracking-wider text-[#D6B66F] flex items-center gap-1.5">
                              <Calendar className="w-3 h-3" />
                              <span>Evening Date</span>
                            </p>
                            <p className="text-xs font-medium text-[#F5EBD7] mt-1">
                              Friday · Evening Seating
                            </p>
                          </div>
                          <div className="p-3 bg-[#0B1F1B] border border-[#D6B66F]/25 rounded-sm">
                            <p className="text-[10px] uppercase tracking-wider text-[#D6B66F] flex items-center gap-1.5">
                              <Clock className="w-3 h-3" />
                              <span>Preferred Time</span>
                            </p>
                            <p className="text-xs font-medium text-[#F5EBD7] mt-1 tabular-nums">
                              19:30 Seating
                            </p>
                          </div>
                          <div className="p-3 bg-[#0B1F1B] border border-[#D6B66F]/25 rounded-sm">
                            <p className="text-[10px] uppercase tracking-wider text-[#D6B66F] flex items-center gap-1.5">
                              <Users className="w-3 h-3" />
                              <span>Party Size</span>
                            </p>
                            <p className="text-xs font-medium text-[#F5EBD7] mt-1">
                              2 Guests · Main Salon
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => setDemoSubmitted(true)}
                          className="px-5 py-2.5 bg-[#D6B66F] text-[#102B25] text-xs font-semibold rounded-sm cursor-pointer"
                        >
                          Simulate Request Validation
                        </button>
                      </div>
                    ) : (
                      <div className="mt-5 p-4 bg-[#0B1F1B] border border-[#D6B66F]/30 rounded-sm space-y-2">
                        <p className="text-xs font-semibold text-[#D6B66F] flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>UI Validation Preview Complete</span>
                        </p>
                        <p className="text-xs text-[#F5EBD7]/80">
                          Simulated summary displayed for UX review only. No live reservation was
                          booked or transmitted.
                        </p>
                        <button
                          type="button"
                          onClick={() => setDemoSubmitted(false)}
                          className="text-xs font-semibold text-[#D6B66F] underline underline-offset-4 cursor-pointer"
                        >
                          Reset Demo Preview
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Breakpoint Rationale */}
      <div className="p-4 sm:p-5 bg-[#102B25] text-[#F5EBD7] rounded-sm border border-[#D6B66F]/25">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#D6B66F]">
          {currentSpec.label} ({currentSpec.deviceName}) Layout Decision
        </p>
        <p className="text-sm text-[#F5EBD7]/85 mt-1.5 leading-relaxed">
          {currentSpec.rationale}
        </p>
      </div>
    </div>
  );
};
