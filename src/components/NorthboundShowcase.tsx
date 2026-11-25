import React, { useState, useRef, useLayoutEffect } from 'react';
import {
  Monitor,
  Tablet,
  Smartphone,
  Menu,
  Compass,
  MapPin,
  Calendar,
  CheckCircle2,
} from 'lucide-react';
import { SafeImage } from './SafeImage';

export type NorthboundViewportId = '1440' | '768' | '390';
type PreviewScreen = 'homepage' | 'destinations' | 'enquiry';

interface ViewportSpec {
  id: NorthboundViewportId;
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
    columns: '12-Column Split Expedition Grid',
    navPattern: 'Single-row expedition bar + Plan Journey CTA',
    rationale:
      'Gives sweeping Himalayan horizon frames room to breathe beside balanced editorial copy, paired with a three-column regional expedition row.',
    icon: Monitor,
  },
  {
    id: '768',
    numericWidth: 768,
    label: '768px',
    deviceName: 'Tablet',
    widthLabel: '768 × 1024px',
    columns: 'Stacked Hero · 2-Column Region Cards',
    navPattern: 'Compact top bar + drawer trigger',
    rationale:
      'Reflows hero photography cleanly above the fold and arranges Kashmir, Ladakh, Himachal, Bhutan, and Nepal expedition briefs in two-up tablet cards.',
    icon: Tablet,
  },
  {
    id: '390',
    numericWidth: 390,
    label: '390px',
    deviceName: 'Mobile',
    widthLabel: '390 × 844px (360px–430px support)',
    columns: 'Single-Column Expedition Flow',
    navPattern: 'Minimal bar + drawer navigation',
    rationale:
      'Maintains legible itinerary prose, uncluttered destination cards, and 44px+ enquiry touch targets down to compact 360px screens.',
    icon: Smartphone,
  },
];

const HERO_IMG = '/src/assets/images/northbound_himalayan_hero_1795585871012.jpg';
const LADAKH_IMG = '/src/assets/images/northbound_ladakh_monastery_1795585871549.jpg';
const BHUTAN_IMG = '/src/assets/images/northbound_bhutan_trail_1795585871484.jpg';
const CAMP_IMG = '/src/assets/images/northbound_expedition_camp_1795585871566.jpg';

const SAMPLE_DESTINATIONS = [
  {
    region: 'Kashmir & Ladakh',
    subtitle: 'Alpine Lakes · Monastic Valleys · High Passes',
    img: LADAKH_IMG,
  },
  {
    region: 'Bhutan & Nepal',
    subtitle: 'Cedar Ridges · Heritage Sanctuaries · Trails',
    img: BHUTAN_IMG,
  },
  {
    region: 'Himachal Highlands',
    subtitle: 'Private Cedar Lodges · Twilight Valleys',
    img: CAMP_IMG,
  },
];

export const NorthboundShowcase: React.FC = () => {
  const [activeViewport, setActiveViewport] = useState<NorthboundViewportId>('1440');
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
          aria-label="Northbound Journeys Responsive Breakpoints"
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
            Preview View:
          </span>
          <div className="flex flex-wrap items-center gap-1 p-1 bg-[#FAF4E8] border border-[#102B25]/15 rounded-sm">
            {(
              [
                { id: 'homepage', label: 'Homepage' },
                { id: 'destinations', label: 'Himalayan Regions' },
                { id: 'enquiry', label: 'Expedition Brief' },
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
            Grid Architecture
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
                Concept Preview · NORTHBOUND JOURNEYS ({currentSpec.label} · {scalePercent}% fit)
              </p>
              <span className="text-[11px] text-[#D6B66F] font-medium whitespace-nowrap shrink-0">
                Fictional Brand Concept
              </span>
            </div>

            {/* Simulated Northbound Journeys Header */}
            <div
              className={`${
                isStacked ? 'px-6 py-4' : 'px-10 py-5'
              } border-b border-[#F5EBD7]/10 flex items-center justify-between gap-6`}
            >
              <span className="font-display text-lg sm:text-xl tracking-wider text-[#F5EBD7] whitespace-nowrap shrink-0">
                NORTHBOUND JOURNEYS
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
                    Expeditions
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveScreen('destinations')}
                    className={`cursor-pointer whitespace-nowrap ${
                      activeScreen === 'destinations' ? 'text-[#D6B66F] font-semibold' : ''
                    }`}
                  >
                    Regions
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveScreen('enquiry')}
                    className="px-4 py-2 bg-[#D6B66F] text-[#102B25] font-semibold rounded-sm cursor-pointer whitespace-nowrap"
                  >
                    Private Brief
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
                    Luxury Himalayan Expeditions
                  </p>
                  <h4
                    className={`font-display font-medium text-[#F5EBD7] ${
                      isMobile
                        ? 'text-[30px] leading-[1.15]'
                        : isTablet
                        ? 'text-[38px] leading-[1.12]'
                        : 'text-[48px] leading-[1.08]'
                    }`}
                  >
                    Beyond the Ordinary. Into the Extraordinary.
                  </h4>
                  <p
                    className={`text-[#F5EBD7]/80 mt-4 leading-relaxed max-w-xl ${
                      isMobile ? 'text-sm' : 'text-base'
                    }`}
                  >
                    Private high-altitude journeys across Kashmir, Ladakh, Himachal, Bhutan, and
                    Nepal—crafted with calm architectural pacing and curated expedition dossiers.
                  </p>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveScreen('destinations')}
                      className="px-5 py-2.5 bg-[#D6B66F] text-[#102B25] text-xs font-semibold rounded-sm cursor-pointer whitespace-nowrap"
                    >
                      Explore Regions
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveScreen('enquiry')}
                      className="px-5 py-2.5 border border-[#F5EBD7]/30 text-[#F5EBD7] text-xs font-medium rounded-sm cursor-pointer whitespace-nowrap"
                    >
                      Expedition Brief
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
                    alt="Northbound Journeys golden dawn over snow-capped Himalayan lake and pine valley"
                    className="block w-full h-full object-cover object-center"
                    eager
                  />
                </div>
              </div>
            )}

            {/* Screen 2: Destinations */}
            {activeScreen === 'destinations' && (
              <div className={`${isMobile ? 'p-6' : isTablet ? 'p-8' : 'p-12'} bg-[#FAF4E8] text-[#202522] space-y-6`}>
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#102B25]/15 pb-4">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-[#102B25]/70 font-semibold">
                      Regional Curations
                    </p>
                    <h4 className="font-display text-2xl sm:text-3xl font-semibold text-[#102B25] mt-1">
                      Kashmir · Ladakh · Himachal · Bhutan · Nepal
                    </h4>
                  </div>
                  <span className="text-xs text-[#202522]/65 tabular-nums whitespace-nowrap">
                    {isMobile ? '1-Column Stack' : isTablet ? '2-Column Grid' : '3-Column Row'}
                  </span>
                </div>

                <div
                  className={`grid gap-5 ${
                    isMobile
                      ? 'grid-cols-1'
                      : isTablet
                      ? 'grid-cols-2'
                      : 'grid-cols-3'
                  }`}
                >
                  {SAMPLE_DESTINATIONS.map((dest) => (
                    <div
                      key={dest.region}
                      className="bg-[#102B25] text-[#F5EBD7] border border-[#D6B66F]/20 rounded-sm overflow-hidden flex flex-col"
                    >
                      <div className="aspect-[4/3] overflow-hidden border-b border-[#D6B66F]/20">
                        <SafeImage
                          src={dest.img}
                          alt={`${dest.region} Himalayan expedition landscape`}
                          className="block w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-5 flex-1">
                        <p className="font-display text-lg font-semibold text-[#F5EBD7]">
                          {dest.region}
                        </p>
                        <p className="text-xs text-[#D6B66F] mt-1">{dest.subtitle}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Screen 3: Private Expedition Brief (Concept Demo) */}
            {activeScreen === 'enquiry' && (
              <div className={`${isMobile ? 'p-6' : isTablet ? 'p-8' : 'p-12'} bg-[#FAF4E8] text-[#202522]`}>
                <div className="p-6 sm:p-8 bg-[#102B25] text-[#F5EBD7] rounded-sm border border-[#D6B66F]/25 max-w-3xl mx-auto">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[#D6B66F] font-semibold">
                    Front-End Expedition Brief Demo
                  </p>
                  <h4 className="font-display text-2xl font-semibold text-[#F5EBD7] mt-1">
                    Custom Route Planning Interface
                  </h4>
                  <p className="text-xs text-[#F5EBD7]/70 mt-1">
                    Front-end UI demonstration only — no live travel booking or itinerary dispatch
                    system is connected.
                  </p>

                  {!demoSubmitted ? (
                    <div className="mt-5 space-y-4">
                      <div className={`grid gap-3 ${isMobile ? 'grid-cols-1' : 'grid-cols-3'}`}>
                        <div className="p-3 bg-[#0B1F1B] border border-[#D6B66F]/25 rounded-sm">
                          <p className="text-[10px] uppercase tracking-wider text-[#D6B66F] flex items-center gap-1.5">
                            <MapPin className="w-3 h-3" />
                            <span>Primary Corridor</span>
                          </p>
                          <p className="text-xs font-medium text-[#F5EBD7] mt-1">
                            Ladakh &amp; Kashmir
                          </p>
                        </div>
                        <div className="p-3 bg-[#0B1F1B] border border-[#D6B66F]/25 rounded-sm">
                          <p className="text-[10px] uppercase tracking-wider text-[#D6B66F] flex items-center gap-1.5">
                            <Calendar className="w-3 h-3" />
                            <span>Preferred Window</span>
                          </p>
                          <p className="text-xs font-medium text-[#F5EBD7] mt-1">
                            Autumn Alpine Season
                          </p>
                        </div>
                        <div className="p-3 bg-[#0B1F1B] border border-[#D6B66F]/25 rounded-sm">
                          <p className="text-[10px] uppercase tracking-wider text-[#D6B66F] flex items-center gap-1.5">
                            <Compass className="w-3 h-3" />
                            <span>Travel Pace</span>
                          </p>
                          <p className="text-xs font-medium text-[#F5EBD7] mt-1">
                            Private Lodge Circuit
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setDemoSubmitted(true)}
                        className="px-5 py-2.5 bg-[#D6B66F] text-[#102B25] text-xs font-semibold rounded-sm cursor-pointer"
                      >
                        Simulate Brief Confirmation
                      </button>
                    </div>
                  ) : (
                    <div className="mt-5 p-4 bg-[#0B1F1B] border border-[#D6B66F]/30 rounded-sm space-y-2">
                      <p className="text-xs font-semibold text-[#D6B66F] flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Concept Brief Preview Rendered</span>
                      </p>
                      <p className="text-xs text-[#F5EBD7]/80">
                        Displayed for interface review only—no live expedition inquiry or client
                        booking is sent.
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
