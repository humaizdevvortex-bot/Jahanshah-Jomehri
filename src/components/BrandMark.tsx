import React, { useState } from 'react';
import { Building2 } from 'lucide-react';

interface BrandLogoProps {
  className?: string;
}

export const ArchitecturalMonogram: React.FC<BrandLogoProps> = ({ className = 'w-9 h-9' }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <rect width="64" height="64" rx="14" fill="#111318" />
    <rect
      x="3"
      y="3"
      width="58"
      height="58"
      rx="11"
      stroke="#D9AE55"
      strokeWidth="1.5"
      strokeOpacity="0.55"
    />
    <path
      d="M14 28L32 13L50 28"
      stroke="#D9AE55"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22 25V47C22 49.2091 20.2091 51 18 51H16"
      stroke="#E8C878"
      strokeWidth="2.4"
      strokeLinecap="round"
    />
    <path
      d="M42 25V47C42 49.2091 40.2091 51 38 51H33"
      stroke="#D9AE55"
      strokeWidth="2.4"
      strokeLinecap="round"
    />
    <path
      d="M28 51V34H36V51"
      stroke="#D9AE55"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

interface AgentPortraitProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
}

export const AgentPortrait: React.FC<AgentPortraitProps> = ({
  src,
  alt,
  className = '',
  imgClassName = '',
}) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-[#111C2C] ${className}`}>
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover object-center ${imgClassName}`}
        />
      ) : (
        <div
          className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#111C2C] via-[#111318] to-[#1d283a] text-[#D9AE55] p-4 text-center"
          role="img"
          aria-label={alt}
        >
          <ArchitecturalMonogram className="w-12 h-12 mb-2" />
          <span className="font-serif-luxury text-lg font-semibold tracking-wide text-white">
            J. Jomehri
          </span>
        </div>
      )}
    </div>
  );
};

interface ResilientPropertyImageProps {
  src: string;
  alt: string;
  title: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
}

export const ResilientPropertyImage: React.FC<ResilientPropertyImageProps> = ({
  src,
  alt,
  title,
  className = '',
  imgClassName = '',
  priority = false,
}) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-[#111C2C] ${className}`}>
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover ${imgClassName}`}
        />
      ) : (
        <div
          className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#111318] via-[#111C2C] to-[#1a2639] p-8 text-center"
          role="img"
          aria-label={alt}
        >
          <Building2 className="w-10 h-10 text-[#D9AE55] mb-3 opacity-80" />
          <p className="font-serif-luxury text-xl text-white font-medium">{title}</p>
          <p className="text-xs text-[#E8C878]/80 mt-1">Canoga Park · Greater Los Angeles</p>
        </div>
      )}
    </div>
  );
};
