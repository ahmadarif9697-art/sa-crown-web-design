import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PageRoute } from '../types/navigation';

interface NotFoundPageProps {
  pathname: string;
  onReturnHome: (targetPage?: PageRoute) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ pathname, onReturnHome }) => {
  return (
    <section className="bg-[#102B25] text-[#F5EBD7] py-20 sm:py-28 border-b border-[#D6B66F]/20">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="max-w-2xl p-8 sm:p-10 bg-[#0B1F1B] border border-[#D6B66F]/30 rounded-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D6B66F]">
            404 · Page Not Found
          </p>
          <h1 className="font-display text-3xl sm:text-5xl font-semibold text-[#F5EBD7] mt-3 leading-tight text-balance">
            This Page Is No Longer Available.
          </h1>
          <p className="text-sm sm:text-base text-[#F5EBD7]/80 leading-relaxed mt-4">
            The path <span className="text-[#D6B66F] break-all">{pathname}</span> does not exist on
            SA Crown Web Design. You can visit our studio homepage or browse our current portfolio
            below.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onReturnHome('home')}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#D6B66F] text-[#102B25] text-sm font-semibold rounded-sm hover:bg-[#E5CD96] transition-colors cursor-pointer min-h-[46px]"
            >
              <span>Return to Homepage</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => onReturnHome('work')}
              className="inline-flex items-center gap-2 px-5 py-3.5 border border-[#F5EBD7]/30 text-[#F5EBD7] text-sm font-medium rounded-sm hover:border-[#D6B66F] hover:text-[#D6B66F] transition-colors cursor-pointer min-h-[46px]"
            >
              <span>Explore Our Work</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
