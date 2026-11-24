import React, { useState, useRef, useLayoutEffect } from 'react';
import { Monitor, Laptop, Tablet, Smartphone, Menu } from 'lucide-react';
import { SafeImage } from './SafeImage';

export type ViewportId = '1920' | '1440' | '1024' | '768' | '390';
type PreviewSection = 'hero' | 'suites' | 'spa';

interface ViewportSpec {
  id: ViewportId;
  numericWidth: number;
  label: string;
  deviceName: string;
  widthLabel: string;
  columns: string;
  navPattern: string;
  heroTitleSize: string;
  icon: React.ComponentType<{ className?: string }>;
  rationale: string;
}

const VIEWPORT_SPECS: ViewportSpec[] = [
  {
    id: '1920',
    numericWidth: 1920,
    label: '1920px',
    deviceName: 'Widescreen Display',
    widthLabel: '1920 × 1080px',
    columns: '12-Column Grid (5fr / 7fr Split)',
    navPattern: 'Inline 5-link bar + primary CTA',
    heroTitleSize: '60px Playfair Display',
    icon: Monitor,
    rationale:
      'Constrains readable copy cleanly inside a dedicated left column while allowing atmospheric mountain photography to occupy a full 7-track canvas on wide monitors without stretching prose lines past 70 characters.',
  },
  {
    id: '1440',
    numericWidth: 1440,
    label: '1440px',
    deviceName: 'Standard Desktop',
    widthLabel: '1440 × 900px',
    columns: '12-Column Split Grid (5fr / 7fr)',
    navPattern: 'Single-row 3-zone header',
    heroTitleSize: '50px Playfair Display',
    icon: Monitor,
    rationale:
      'Primary editorial baseline: pairs asymmetric headline cadence on the left with full-bleed twilight lodge architecture on the right, followed by a 3-column suite showcase.',
  },
  {
    id: '1024',
    numericWidth: 1024,
    label: '1024px',
    deviceName: 'Compact Laptop',
    widthLabel: '1024 × 768px',
    columns: '2-Column Balanced Split (1fr / 1fr)',
    navPattern: 'Compact single-row navigation',
    heroTitleSize: '38px Playfair Display',
    icon: Laptop,
    rationale:
      'Tightens outer gutters and balances both columns at 50/50 width so headlines never collide with adjacent lodge photography or wrap navigation onto two lines.',
  },
  {
    id: '768',
    numericWidth: 768,
    label: '768px',
    deviceName: 'Tablet Portrait',
    widthLabel: '768 × 1024px',
    columns: 'Single-Column Hero · 2-Column Suites',
    navPattern: 'Drawer toggle + wordmark',
    heroTitleSize: '36px Playfair Display',
    icon: Tablet,
    rationale:
      'Transitions from horizontal split hero to a stacked editorial band with a 2-column suite grid, keeping generous vertical whitespace and clear touch targets above 44px.',
  },
  {
    id: '390',
    numericWidth: 390,
    label: '390px',
    deviceName: 'Mobile Handheld',
    widthLabel: '390 × 844px (scales to 360px–430px)',
    columns: 'Single-Column Editorial Flow',
    navPattern: 'Full-screen drawer menu',
    heroTitleSize: '30px Playfair Display',
    icon: Smartphone,
    rationale:
      'Prioritizes thumb-friendly vertical pacing, crisp 15px–16px readable body copy, zero horizontal overflow down to 360px, and full-width action buttons.',
  },
];

const ALPINE_HERO_IMG = '/src/assets/images/alpine_resort_panorama_1795494665477.jpg';
const ALPINE_SUITE_IMG = '/src/assets/images/alpine_suite_consistent_1795494666377.jpg';
const ALPINE_SPA_IMG = '/src/assets/images/alpine_spa_consistent_1795494664538.jpg';

export const AlpineViewportShowcase: React.FC = () => {
  const [activeViewport, setActiveViewport] = useState<ViewportId>('1440');
  const [activeSection, setActiveSection] = useState<PreviewSection>('hero');

  const stageRef = useRef<HTMLDivElement>(null);
  const virtualFrameRef = useRef<HTMLDivElement>(null);
  const [stageWidth, setStageWidth] = useState<number>(0);
  const [virtualHeight, setVirtualHeight] = useState<number>(0);

  const currentSpec =
    VIEWPORT_SPECS.find((v) => v.id === activeViewport) || VIEWPORT_SPECS[1];

  const isMobilePreview = activeViewport === '390';
  const isTabletPreview = activeViewport === '768';
  const isCompactDesktop = activeViewport === '1024';
  const isWidescreen = activeViewport === '1920';
  const isStackedHero = isMobilePreview || isTabletPreview;

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
  }, [activeViewport, activeSection]);

  const targetWidth = currentSpec.numericWidth;
  const scale = stageWidth > 0 ? Math.min(1, stageWidth / targetWidth) : 1;
  const scaledWidth = Math.round(targetWidth * scale);
  const scaledHeight = virtualHeight > 0 ? Math.ceil(virtualHeight * scale) : undefined;
  const scalePercent = Math.round(scale * 100);

  return (
    <div className="space-y-6">
      {/* 5 Viewport Interactive Tabs */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#102B25]/15 pb-4">
        <div
          role="tablist"
          aria-label="Alpine Sanctuary Viewport Breakpoints"
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
                  · {spec.deviceName.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Sub-view selector inside the Alpine Sanctuary concept */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-[#202522]/70 font-medium whitespace-nowrap">
            Preview Screen:
          </span>
          <div className="flex items-center gap-1 p-1 bg-[#FAF4E8] border border-[#102B25]/15 rounded-sm">
            {(
              [
                { id: 'hero', label: 'Arrival' },
                { id: 'suites', label: 'Suites' },
                { id: 'spa', label: 'Thermal Spa' },
              ] as { id: PreviewSection; label: string }[]
            ).map((screen) => (
              <button
                key={screen.id}
                type="button"
                onClick={() => setActiveSection(screen.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[34px] ${
                  activeSection === screen.id
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

      {/* Viewport Metadata Strip */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-5 sm:p-6 bg-[#102B25] text-[#F5EBD7] border border-[#D6B66F]/25 rounded-sm">
        <div>
          <p className="text-[11px] uppercase tracking-wider text-[#D6B66F] font-semibold">
            Viewport Frame
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
            Navigation Pattern
          </p>
          <p className="text-sm font-medium text-[#F5EBD7]/90 mt-1">
            {currentSpec.navPattern}
          </p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-wider text-[#D6B66F] font-semibold">
            Display Scale
          </p>
          <p className="text-sm font-medium text-[#F5EBD7]/90 mt-1 tabular-nums">
            {currentSpec.heroTitleSize}
          </p>
        </div>
      </div>

      {/* Proportionally Scaled Interactive Device Stage */}
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
            {/* Simulated Browser / Device Chrome */}
            <div className="px-5 py-3 bg-[#091411] border-b border-[#F5EBD7]/10 flex items-center justify-between gap-4">
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F5EBD7]/25" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#F5EBD7]/25" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#F5EBD7]/25" />
              </div>
              <p className="text-xs text-[#F5EBD7]/70 truncate tabular-nums">
                Concept Preview · Alpine Sanctuary ({currentSpec.label} · {scalePercent}% fit)
              </p>
              <span className="text-[11px] text-[#D6B66F] font-medium whitespace-nowrap shrink-0">
                Fictional Concept
              </span>
            </div>

            {/* Simulated Alpine Sanctuary Header */}
            <div
              className={`${
                isWidescreen ? 'px-12 py-5' : isStackedHero ? 'px-6 py-4' : 'px-9 py-4'
              } border-b border-[#F5EBD7]/10 flex items-center justify-between gap-6`}
            >
              <span
                className={`font-display tracking-wide text-[#F5EBD7] whitespace-nowrap shrink-0 ${
                  isWidescreen ? 'text-xl' : 'text-lg'
                }`}
              >
                Alpine Sanctuary
              </span>

              {isStackedHero ? (
                <div className="flex items-center gap-2 text-[#D6B66F] shrink-0">
                  <span className="text-xs font-medium">Menu</span>
                  <Menu className="w-4 h-4" />
                </div>
              ) : (
                <div className="flex items-center gap-7 text-xs text-[#F5EBD7]/85 shrink-0">
                  <span className="whitespace-nowrap">Suites</span>
                  <span className="whitespace-nowrap">Thermal Spa</span>
                  <span className="whitespace-nowrap">Dining</span>
                  <span className="whitespace-nowrap">Architecture</span>
                  <span className="px-3.5 py-2 bg-[#D6B66F] text-[#102B25] font-semibold rounded-sm whitespace-nowrap">
                    Explore Concept
                  </span>
                </div>
              )}
            </div>

            {/* Dynamic Preview Body based on viewport & selected screen */}
            {activeSection === 'hero' && (
              <div
                className={
                  isStackedHero
                    ? 'grid grid-cols-1'
                    : isCompactDesktop
                    ? 'grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-stretch'
                    : 'grid grid-cols-[minmax(0,5fr)_minmax(0,7fr)] items-stretch'
                }
              >
                {/* Text Container — isolated track with min-w-0 */}
                <div
                  className={
                    isStackedHero
                      ? `min-w-0 order-2 flex flex-col justify-center bg-[#0F1E1A] ${
                          isMobilePreview ? 'p-6' : 'p-8'
                        }`
                      : `min-w-0 flex flex-col justify-center bg-[#0F1E1A] ${
                          isWidescreen
                            ? 'p-16'
                            : isCompactDesktop
                            ? 'p-9'
                            : 'p-12'
                        }`
                  }
                >
                  <p className="text-xs uppercase tracking-[0.22em] text-[#D6B66F] mb-3">
                    Concept Hotel Identity
                  </p>
                  <h4
                    className={`font-display font-medium text-[#F5EBD7] break-words ${
                      isMobilePreview
                        ? 'text-[30px] leading-[1.14]'
                        : isTabletPreview
                        ? 'text-[36px] leading-[1.12]'
                        : isCompactDesktop
                        ? 'text-[38px] leading-[1.12]'
                        : isWidescreen
                        ? 'text-[60px] leading-[1.08]'
                        : 'text-[50px] leading-[1.1]'
                    }`}
                  >
                    Quiet Architecture Above the Timberline.
                  </h4>
                  <p
                    className={`text-[#F5EBD7]/80 mt-4 leading-relaxed max-w-xl ${
                      isWidescreen ? 'text-lg' : isMobilePreview ? 'text-sm' : 'text-base'
                    }`}
                  >
                    A fictional boutique mountain hotel concept crafted to showcase serene visual
                    pacing, warm twilight contrast, and responsive editorial grids.
                  </p>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveSection('suites')}
                      className={`px-5 py-2.5 bg-[#D6B66F] text-[#102B25] font-semibold rounded-sm cursor-pointer whitespace-nowrap ${
                        isWidescreen ? 'text-sm' : 'text-xs'
                      }`}
                    >
                      View Suite Layout
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveSection('spa')}
                      className={`px-5 py-2.5 border border-[#F5EBD7]/30 text-[#F5EBD7] font-medium rounded-sm cursor-pointer whitespace-nowrap ${
                        isWidescreen ? 'text-sm' : 'text-xs'
                      }`}
                    >
                      Thermal Pavilion
                    </button>
                  </div>
                </div>

                {/* Image Container — isolated track with min-w-0 and overflow-hidden */}
                <div
                  className={
                    isStackedHero
                      ? 'min-w-0 order-1 aspect-[16/10] w-full overflow-hidden bg-[#102B25] border-b border-[#D6B66F]/15'
                      : `min-w-0 w-full overflow-hidden bg-[#102B25] border-l border-[#D6B66F]/15 ${
                          isWidescreen
                            ? 'min-h-[600px]'
                            : isCompactDesktop
                            ? 'min-h-[420px]'
                            : 'min-h-[500px]'
                        }`
                  }
                >
                  <SafeImage
                    src={ALPINE_HERO_IMG}
                    alt="Alpine Sanctuary twilight architectural concept showing contemporary basalt stone and timber resort with warm interior glow"
                    className="block w-full h-full object-cover object-center"
                    fallbackTitle="Alpine Sanctuary Exterior"
                    eager
                  />
                </div>
              </div>
            )}

            {activeSection === 'suites' && (
              <div
                className={`${
                  isWidescreen ? 'p-14' : isStackedHero ? 'p-6' : 'p-10'
                } space-y-6 bg-[#FAF4E8] text-[#202522]`}
              >
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#102B25]/15 pb-4">
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-widest text-[#102B25]/70 font-semibold">
                      Concept Accommodation Grid
                    </p>
                    <h4
                      className={`font-display font-semibold text-[#102B25] mt-1 ${
                        isWidescreen ? 'text-4xl' : 'text-2xl'
                      }`}
                    >
                      Timber &amp; Basalt Mountain Suites
                    </h4>
                  </div>
                  <span className="text-xs text-[#202522]/65 tabular-nums whitespace-nowrap shrink-0">
                    {isMobilePreview
                      ? '1-Column Stack'
                      : isTabletPreview
                      ? '2-Column Grid'
                      : '3-Column Editorial Row'}
                  </span>
                </div>

                <div
                  className={`grid gap-5 ${
                    isMobilePreview
                      ? 'grid-cols-1'
                      : isTabletPreview
                      ? 'grid-cols-[repeat(2,minmax(0,1fr))]'
                      : 'grid-cols-[repeat(3,minmax(0,1fr))]'
                  }`}
                >
                  {[
                    {
                      name: 'Ridge Timber Suite',
                      spec: '72 m² · South Valley Aspect',
                      img: ALPINE_SUITE_IMG,
                    },
                    {
                      name: 'Basalt Hearth Chalet',
                      spec: '98 m² · Private Terrace',
                      img: ALPINE_HERO_IMG,
                    },
                    {
                      name: 'Canopy Loft Pavilion',
                      spec: '115 m² · Panoramic Cedar Deck',
                      img: ALPINE_SPA_IMG,
                    },
                  ].map((suite) => (
                    <div
                      key={suite.name}
                      className="min-w-0 bg-[#102B25] text-[#F5EBD7] border border-[#D6B66F]/20 rounded-sm overflow-hidden flex flex-col"
                    >
                      <div className="aspect-[4/3] overflow-hidden border-b border-[#D6B66F]/20">
                        <SafeImage
                          src={suite.img}
                          alt={`${suite.name} concept interior`}
                          className="block w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-5 flex-1">
                        <p className="font-display text-lg font-semibold text-[#F5EBD7]">
                          {suite.name}
                        </p>
                        <p className="text-xs text-[#D6B66F] mt-1">{suite.spec}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'spa' && (
              <div
                className={
                  isStackedHero
                    ? 'grid grid-cols-1 bg-[#102B25]'
                    : 'grid grid-cols-[minmax(0,7fr)_minmax(0,5fr)] items-stretch bg-[#102B25]'
                }
              >
                <div
                  className={
                    isStackedHero
                      ? 'min-w-0 aspect-[4/3] w-full overflow-hidden border-b border-[#D6B66F]/15'
                      : `min-w-0 w-full overflow-hidden border-r border-[#D6B66F]/15 ${
                          isWidescreen ? 'min-h-[560px]' : 'min-h-[420px]'
                        }`
                  }
                >
                  <SafeImage
                    src={ALPINE_SPA_IMG}
                    alt="Alpine Sanctuary basalt stone and timber thermal reflection pool pavilion overlooking snow-covered alpine peaks at twilight"
                    className="block w-full h-full object-cover object-center"
                  />
                </div>
                <div
                  className={`min-w-0 flex flex-col justify-center ${
                    isWidescreen ? 'p-14' : isStackedHero ? 'p-6' : 'p-10'
                  }`}
                >
                  <p className="text-xs uppercase tracking-widest text-[#D6B66F]">
                    Wellness Section Concept
                  </p>
                  <h4
                    className={`font-display font-medium text-[#F5EBD7] mt-2 ${
                      isWidescreen ? 'text-4xl' : 'text-2xl'
                    }`}
                  >
                    Basalt Reflection Pool &amp; Cedar Sauna
                  </h4>
                  <p
                    className={`text-[#F5EBD7]/80 mt-4 leading-relaxed ${
                      isWidescreen ? 'text-base' : 'text-sm'
                    }`}
                  >
                    Demonstrates dark-surface editorial contrast where warm golden lantern lighting
                    guides reader focus without harsh glare.
                  </p>
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
