import React from 'react';

interface CrownMarkProps {
  className?: string;
}

/**
 * Geometric gold crown emblem for SA Crown Web Design.
 * Faceted architectural silhouette with balanced apexes and clean plinth.
 */
export const CrownMark: React.FC<CrownMarkProps> = ({ className = 'w-7 h-7' }) => {
  return (
    <svg
      viewBox="0 0 40 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Left outer facet */}
      <path
        d="M4 22L2 8L12 15.5L20 3L28 15.5L38 8L36 22H4Z"
        stroke="#D6B66F"
        strokeWidth="1.75"
        strokeLinejoin="miter"
      />
      {/* Internal geometric facet lines */}
      <path
        d="M12 15.5L20 22L28 15.5"
        stroke="#D6B66F"
        strokeWidth="1.25"
        strokeLinejoin="miter"
      />
      <path
        d="M20 3V22"
        stroke="#D6B66F"
        strokeWidth="1.25"
      />
      {/* Crown apex diamond accents */}
      <circle cx="20" cy="2.2" r="1.4" fill="#D6B66F" />
      <circle cx="2" cy="7.5" r="1.2" fill="#D6B66F" />
      <circle cx="38" cy="7.5" r="1.2" fill="#D6B66F" />
      {/* Architectural plinth base */}
      <rect x="4" y="25" width="32" height="2.4" fill="#D6B66F" />
    </svg>
  );
};
