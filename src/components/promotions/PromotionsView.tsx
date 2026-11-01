import React, { useState } from 'react';
import { useSportsbook } from '../../context/SportsbookContext';
import { 
  Flame, 
  Gift, 
  Zap, 
  Check, 
  ArrowRight, 
  Info, 
  ChevronDown, 
  ChevronUp, 
  Calendar,
  Sparkles
} from 'lucide-react';

interface PromoCard {
  id: string;
  tag: string;
  title: string;
  shortDesc: string;
  details: string[];
  terms: string[];
  ctaText: string;
  accentColor: string;
  expires: string;
}

export const PromotionsView: React.FC = () => {
  const { setShowDepositModal, setActiveTab } = useSportsbook();
  const [expandedTermsId, setExpandedTermsId] = useState<string | null>(null);

  const promos: PromoCard[] = [
    {
      id: 'karibu-300',
      tag: 'WELCOME OFFER',
      title: '300% Karibu Deposit Bonus',
      shortDesc: 'Double or triple your first deposit up to KES 10,000 in free bets with instant M-Pesa or Airtel Money funding.',
      details: [
        'Valid on your very first deposit of KES 100 or more',
        'Receive bonus credits instantly into your Bonus Wallet',
        'Use on single or multibet accumulators with minimum odds 1.50',
      ],
      terms: [
        'Offer is open strictly to newly registered WAZOBET Kenyan customers aged 18+.',
        'Wagering requirement: 3x on sports markets with min total odds of 2.00.',
        'Bonus expires 14 days after crediting if not wagered.',
        'Full BCLB regulatory rules apply.',
      ],
      ctaText: 'Deposit & Claim 300%',
      accentColor: '#38E000',
      expires: 'Ongoing 2026',
    },
    {
      id: 'multibet-boost',
      tag: 'ACCA WIN BOOSTER',
      title: 'Up to 500% Multibet Win Boost',
      shortDesc: 'The more legs you add to your betting slip, the bigger your bonus multiplier on winning tickets!',
      details: [
        'Starts automatically at 3+ legs (5% bonus)',
        'Reach 25% bonus at 7 legs and 50% at 10 legs',
        'Max boost up to 500% for 30+ qualifying selections',
      ],
      terms: [
        'Each qualifying selection must have minimum odds of 1.25.',
        'Cashed-out or voided selections do not count toward the active leg total.',
        'Bonus winnings are paid directly in real cash along with standard payout.',
      ],
      ctaText: 'Build an Acca Slip',
      accentColor: '#FFC400',
      expires: 'Permanent Feature',
    },
    {
      id: 'cashout-feature',
      tag: 'CONTROL YOUR DESTINY',
      title: 'Early Cash Out on Live Bets',
      shortDesc: 'Lock in your profits or cut your losses before the final whistle sounds. Available on pre-match and in-play bets.',
      details: [
        'Full and partial cash-out supported',
        'Real-time cash-out offers calculated by live match momentum',
        'Instant settlement straight to your withdrawable balance',
      ],
      terms: [
        'Available on selected football, basketball, and tennis markets.',
        'Cash-out offers may be momentarily suspended during critical match incidents (VAR, penalties).',
      ],
      ctaText: 'View Open Bets',
      accentColor: '#62F500',
      expires: 'Always Available',
    },
    {
      id: 'kpl-friday',
      tag: 'KENYA SPECIAL',
      title: 'Free Bet Friday: FKF Premier League',
      shortDesc: 'Place any KES 500 bet on Kenyan Premier League matches and receive a KES 250 Free Bet token every Friday!',
      details: [
        'Applies to Gor Mahia, AFC Leopards, Tusker, Bandari and all KPL fixtures',
        'Credited every Friday at 12:00 EAT',
      ],
      terms: [
        'Minimum stake KES 500 on KPL matches.',
        'Free bet stake is not returned in payout.',
      ],
      ctaText: 'Explore KPL Odds',
      accentColor: '#38E000',
      expires: 'Every Friday',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#071B49] via-[#0D204B] to-[#03133D] border border-[#182C5E]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#182C5E] text-[#FFC400] flex items-center justify-center">
            <Gift className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-black italic text-white font-heading">
              WAZOBET PROMOTIONS & BONUSES
            </h1>
            <p className="text-xs text-slate-300">
              Honest, transparent bonuses designed for Kenyan sports enthusiasts. Bet smart and maximize your winnings.
            </p>
          </div>
        </div>
      </div>

      {/* Promos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {promos.map((promo) => {
          const isTermsOpen = expandedTermsId === promo.id;
          return (
            <div
              key={promo.id}
              className="rounded-2xl bg-[#071B49] border border-[#182C5E] p-5 flex flex-col justify-between shadow-xl hover:border-[#1e3878] transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-[#03133D] border font-mono"
                    style={{ borderColor: promo.accentColor, color: promo.accentColor }}
                  >
                    {promo.tag}
                  </span>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{promo.expires}</span>
                  </span>
                </div>

                <h3 className="text-xl font-black italic text-white font-heading">
                  {promo.title}
                </h3>

                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {promo.shortDesc}
                </p>

                {/* Bullet details */}
                <ul className="mt-4 space-y-2 text-xs text-slate-300">
                  {promo.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#38E000] shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action and T&C dropdown */}
              <div className="mt-6 pt-4 border-t border-[#182C5E] space-y-3">
                <button
                  onClick={() => {
                    if (promo.id === 'karibu-300') setShowDepositModal(true);
                    else if (promo.id === 'cashout-feature') setActiveTab('account');
                    else setActiveTab('sports');
                  }}
                  className="w-full py-2.5 rounded-xl font-black text-xs sm:text-sm text-black tracking-tight flex items-center justify-center gap-2 shadow-md transition-transform active:scale-95"
                  style={{ backgroundColor: promo.accentColor }}
                >
                  <span>{promo.ctaText}</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </button>

                <div>
                  <button
                    onClick={() => setExpandedTermsId(isTermsOpen ? null : promo.id)}
                    className="w-full flex items-center justify-between text-[11px] text-slate-400 hover:text-white transition-colors"
                  >
                    <span>Terms & Conditions Apply</span>
                    {isTermsOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  {isTermsOpen && (
                    <div className="mt-2 p-3 rounded-lg bg-[#03133D] text-[10px] text-slate-400 space-y-1 animate-in fade-in">
                      {promo.terms.map((term, i) => (
                        <p key={i}>• {term}</p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
