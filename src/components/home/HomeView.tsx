import React from 'react';
import { useSportsbook } from '../../context/SportsbookContext';
import { HeroSlider } from './HeroSlider';
import { MatchCard } from '../matches/MatchCard';
import { 
  Radio, 
  Flame, 
  Trophy, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Zap, 
  Clock, 
  TrendingUp,
  Newspaper
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const { fixtures, setActiveTab, setActiveMatchDetail } = useSportsbook();

  const liveMatches = fixtures.filter((f) => f.isLive);
  const featuredMatches = fixtures.filter((f) => f.isFeatured);
  const upcomingMatches = fixtures.filter((f) => !f.isLive && f.status === 'upcoming');

  return (
    <div className="space-y-8">
      {/* 1. Hero Promotional Slider */}
      <HeroSlider />

      {/* 2. Live Matches In-Play Section (If live matches exist) */}
      {liveMatches.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
              <h2 className="text-base sm:text-lg font-black italic text-white font-heading tracking-wide">
                LIVE IN-PLAY BETTING
              </h2>
              <span className="px-2 py-0.5 rounded bg-red-950 border border-red-700 text-red-400 font-bold font-mono text-[10px]">
                {liveMatches.length} ACTIVE
              </span>
            </div>

            <button
              onClick={() => setActiveTab('live')}
              className="text-xs font-bold text-[#38E000] hover:text-[#62F500] flex items-center gap-1 transition-colors"
            >
              <span>View All Live Matches</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {liveMatches.map((fixture) => (
              <MatchCard key={fixture.id} fixture={fixture} />
            ))}
          </div>
        </div>
      )}

      {/* 3. Featured Big Matches (Derby, Champions League, EPL) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-[#FFC400]" />
            <h2 className="text-base sm:text-lg font-black italic text-white font-heading tracking-wide">
              FEATURED TOP FIXTURES
            </h2>
          </div>

          <button
            onClick={() => setActiveTab('sports')}
            className="text-xs font-bold text-[#38E000] hover:text-[#62F500] flex items-center gap-1 transition-colors"
          >
            <span>View Full Sports Directory</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-3">
          {featuredMatches.map((fixture) => (
            <MatchCard key={fixture.id} fixture={fixture} />
          ))}
        </div>
      </div>

      {/* 4. Supa 17 Mega Jackpot Highlight Teaser */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#03133D] via-[#071B49] to-[#0D204B] border border-[#FFC400]/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#FFC400] text-black font-extrabold text-[10px] uppercase font-mono">
              👑 WAZOBET MEGA JACKPOT
            </span>
            <span className="text-xs text-slate-300 font-mono">17 Matches · Closes Saturday 17:00</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black italic text-white font-heading">
            KES 150,000,000 GRAND PRIZE
          </h3>

          <p className="text-xs text-slate-300">
            One 99-shilling ticket can transform your life forever! Bonuses paid on 13, 14, 15 and 16 correct predictions.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('jackpot')}
          className="px-6 py-3 rounded-xl bg-[#FFC400] hover:bg-[#ffd54f] text-black font-black text-sm tracking-tight shadow-lg shadow-[#FFC400]/25 transition-transform active:scale-95 whitespace-nowrap"
        >
          PLAY JACKPOT (KES 99)
        </button>
      </div>

      {/* 5. Today's Upcoming Matches */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-400" />
            <h2 className="text-base sm:text-lg font-black italic text-white font-heading tracking-wide">
              UPCOMING TODAY & TOMORROW
            </h2>
          </div>
        </div>

        <div className="space-y-3">
          {upcomingMatches.map((fixture) => (
            <MatchCard key={fixture.id} fixture={fixture} />
          ))}
        </div>
      </div>

      {/* 6. Sports Insights & News Section */}
      <div className="space-y-4 pt-4 border-t border-[#182C5E]">
        <div className="flex items-center gap-2">
          <Newspaper className="w-4 h-4 text-[#38E000]" />
          <h3 className="text-base font-bold text-white font-heading">
            WAZOBET MATCH PREVIEWS & ANALYSIS
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-[#071B49] border border-[#182C5E] space-y-2">
            <span className="text-[10px] font-bold uppercase text-[#38E000] font-mono">FKF PREMIER LEAGUE</span>
            <h4 className="font-bold text-sm text-white">
              Mashemeji Derby Analysis: Can Leopards halt Gor Mahia's title march?
            </h4>
            <p className="text-xs text-slate-400 line-clamp-2">
              With Benson Omala in peak scoring form, Gor Mahia enters Nyayo Stadium aiming to solidify their table lead against traditional rivals AFC Leopards.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#071B49] border border-[#182C5E] space-y-2">
            <span className="text-[10px] font-bold uppercase text-[#FFC400] font-mono">CHAMPIONS LEAGUE</span>
            <h4 className="font-bold text-sm text-white">
              Tactical Breakdown: Arsenal vs Bayern Munich European Quarter-Final
            </h4>
            <p className="text-xs text-slate-400 line-clamp-2">
              Mikel Arteta's high-pressing Gunners face Harry Kane and the Bavarians in what promises to be an explosive European showdown.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
