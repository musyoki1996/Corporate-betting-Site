import React from 'react';

interface WazobetLogoProps {
  variant?: 'full' | 'compact' | 'emblem';
  className?: string;
  showSlogan?: boolean;
}

export const WazobetLogo: React.FC<WazobetLogoProps> = ({
  variant = 'full',
  className = '',
  showSlogan = false,
}) => {
  const [imageError, setImageError] = React.useState(false);
  const logoPath = '/assets/aistudio/file_00000000981c81fab7d38ff1f66eeee9_27287074.png';

  if (variant === 'emblem') {
    return (
      <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
        {/* Simplified high-performance SVG W emblem with crown & swoosh */}
        <div className="relative w-9 h-9 rounded-lg bg-gradient-to-br from-[#071B49] to-[#03133D] border border-[#182C5E] flex items-center justify-center shadow-md">
          {/* Crown */}
          <span className="absolute -top-1.5 left-1 text-[11px] leading-none select-none drop-shadow">👑</span>
          <span className="text-xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-[#38E000] to-[#62F500]">
            W
          </span>
          <div className="absolute -bottom-0.5 right-1 w-2.5 h-1 bg-[#FFC400] rounded-full rotate-[-20deg]" />
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col select-none shrink-0 ${className}`}>
      <div className="flex items-center gap-2">
        {!imageError ? (
          <img
            src={logoPath}
            alt="WAZOBET - Bet Smart. Win Big."
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="h-9 sm:h-10 w-auto object-contain cursor-pointer transition-transform hover:scale-[1.02]"
          />
        ) : (
          /* SVG/CSS Fallback accurately reproducing the brand visual identity */
          <div className="flex items-center gap-1.5 cursor-pointer">
            <div className="relative w-9 h-9 rounded-lg bg-[#071B49] border border-[#182C5E] flex items-center justify-center">
              <span className="absolute -top-1.5 left-0.5 text-[10px]">👑</span>
              <span className="text-xl font-black italic text-[#38E000]">W</span>
            </div>
            <div className="flex items-baseline">
              <span className="text-xl sm:text-2xl font-black italic tracking-tight text-white">WAZO</span>
              <span className="text-xl sm:text-2xl font-black italic tracking-tight text-[#38E000]">BET</span>
            </div>
          </div>
        )}
      </div>

      {showSlogan && (
        <span className="text-[10px] font-bold tracking-wider uppercase text-[#FFC400] pl-1 font-heading">
          Bet Smart. Win Big.
        </span>
      )}
    </div>
  );
};
