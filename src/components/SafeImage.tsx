import React, { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
  fallbackSubtitle?: string;
  eager?: boolean;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className = 'w-full h-full object-cover',
  fallbackTitle,
  fallbackSubtitle,
  eager = false,
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="w-full h-full min-h-[200px] bg-gradient-to-br from-[#102B25] via-[#173A32] to-[#202522] flex flex-col items-center justify-center p-6 text-center border border-[#D6B66F]/20"
      >
        <ImageIcon className="w-7 h-7 text-[#D6B66F] mb-3 opacity-80" strokeWidth={1.5} />
        <p className="font-display text-lg text-[#F5EBD7]">
          {fallbackTitle || alt}
        </p>
        {fallbackSubtitle && (
          <p className="text-xs text-[#F5EBD7]/70 mt-1 max-w-xs">
            {fallbackSubtitle}
          </p>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={eager ? 'high' : undefined}
    />
  );
};
