import React, { useState, useEffect } from 'react';
import { useSportsbook } from '../../context/SportsbookContext';
import { Trophy, Flame, ChevronRight, ChevronLeft, ArrowRight, Zap } from 'lucide-react';

export const HeroSlider: React.FC = () => {
  const { setActiveTab, setShowDepositModal, fixtures, setActiveMatchDetail } = useSportsbook();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 'jackpot-slide',
      tag: 'SUPA 17 MEGA JACKPOT',
      title: 'WIN KES 150,000,000',
      subtitle: 'Predict 17 matches correctly. Guaranteed bonuses for 13, 14, 15 & 16 correct predictions. Ticket only KES 99!',
      image: '/src/assets/images/jackpot_trophy_podium_1793542051449.jpg',
      ctaText: 'PLAY JACKPOT (KES 99)',
      ctaAction: () => setActiveTab('jackpot'),
      accentColor: '#FFC400',
      badge: 'Closing Saturday 17:00 EAT',
    },
    {
      id: 'mashemeji-slide',
      tag: 'MASHEMEJI DERBY IN-PLAY',
      title: 'GOR MAHIA VS AFC LEOPARDS',
      subtitle: 'Live FKF Premier League thriller at Nyayo Stadium. Live odds boosted up to 20% on all in-play markets!',
      image: '/src/assets/images/hero_football_stadium_1793542050315.jpg',
      ctaText: 'BET LIVE IN-PLAY',
      ctaAction: () => {
        const derby = fixtures.find((f) => f.id === 'kpl-01');
        if (derby) setActiveMatchDetail(derby);
        setActiveTab('live');
      },
      accentColor: '#38E000',
      badge: 'LIVE NOW · 2-1 (68\')',
    },
    {
      id: 'karibu-slide',
      tag: 'WAZOBET KARIBU OFFER',
      title: '300% FIRST DEPOSIT BONUS',
      subtitle: 'Deposit via M-Pesa or Airtel Money today and get up to KES 10,000 free bet match + 500% Multibet win bonus!',
      image: '/src/assets/images/fans_celebration_africa_1793542051367.jpg',
      ctaText: 'DEPOSIT & CLAIM BONUS',
      ctaAction: () => setShowDepositModal(true),
      accentColor: '#62F500',
      badge: 'Instant M-Pesa STK Push',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[currentSlide];

  return (
    <div className="relative rounded-2xl overflow-hidden border border-[#182C5E] bg-[#071B49] shadow-xl group">
      {/* Background Image with Scrim */}
      <div className="relative h-60 sm:h-72 md:h-80 w-full overflow-hidden">
        <img
          src={slide.image}
          alt={slide.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Measured Scrim for legibility per Frontend Design Section 1.F */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#03133D] via-[#03133D]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#03133D] via-transparent to-transparent" />
      </div>

      {/* Slide Content Overlay */}
      <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between max-w-2xl z-10">
        <div>
          {/* Badge */}
          <div className="flex items-center gap-2 mb-3">
            <span 
              className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded bg-[#03133D]/90 border text-white font-mono"
              style={{ borderColor: slide.accentColor, color: slide.accentColor }}
            >
              {slide.tag}
            </span>
            <span className="text-xs text-slate-300 font-medium">
              {slide.badge}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black italic tracking-tight text-white font-heading leading-tight drop-shadow-md">
            {slide.title}
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-slate-300 line-clamp-2 max-w-xl leading-relaxed">
            {slide.subtitle}
          </p>
        </div>

        {/* Action Button & Carousel Controls */}
        <div className="flex items-center justify-between pt-4">
          <button
            onClick={slide.ctaAction}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm tracking-tight text-black transition-all transform active:scale-95 shadow-lg"
            style={{ backgroundColor: slide.accentColor }}
          >
            <span>{slide.ctaText}</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </button>

          {/* Dots & arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
              className="p-1.5 rounded-lg bg-[#03133D]/80 hover:bg-[#182C5E] text-slate-300 transition-colors border border-[#182C5E]"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1.5">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-1.5 rounded-full transition-all ${
                    currentSlide === idx ? 'w-6 bg-[#38E000]' : 'w-2 bg-slate-600'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
              className="p-1.5 rounded-lg bg-[#03133D]/80 hover:bg-[#182C5E] text-slate-300 transition-colors border border-[#182C5E]"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
