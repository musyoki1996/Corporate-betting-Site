import React from 'react';
import { useSportsbook } from '../../context/SportsbookContext';
import { Home, Radio, Trophy, Ticket, User, Layers } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    betSlip, 
    isBetSlipOpenMobile, 
    setIsBetSlipOpenMobile,
    fixtures 
  } = useSportsbook();

  const liveMatchesCount = fixtures.filter((f) => f.isLive).length;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#071B49]/95 backdrop-blur-md border-t border-[#182C5E] px-2 py-1.5 shadow-2xl">
      <div className="grid grid-cols-5 items-center max-w-md mx-auto">
        {/* Tab 1: Home */}
        <button
          onClick={() => { setActiveTab('home'); setIsBetSlipOpenMobile(false); }}
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            activeTab === 'home' && !isBetSlipOpenMobile ? 'text-[#38E000]' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-0.5 tracking-tight">Home</span>
        </button>

        {/* Tab 2: Live */}
        <button
          onClick={() => { setActiveTab('live'); setIsBetSlipOpenMobile(false); }}
          className={`relative flex flex-col items-center justify-center py-1 transition-colors ${
            activeTab === 'live' && !isBetSlipOpenMobile ? 'text-[#38E000]' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Radio className="w-5 h-5" />
          {liveMatchesCount > 0 && (
            <span className="absolute top-0 right-4 w-2 h-2 rounded-full bg-red-500 animate-ping" />
          )}
          <span className="text-[10px] font-semibold mt-0.5 tracking-tight">Live</span>
        </button>

        {/* Tab 3: Jackpot */}
        <button
          onClick={() => { setActiveTab('jackpot'); setIsBetSlipOpenMobile(false); }}
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            activeTab === 'jackpot' && !isBetSlipOpenMobile ? 'text-[#FFC400]' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Trophy className="w-5 h-5 text-[#FFC400]" />
          <span className="text-[10px] font-bold text-[#FFC400] mt-0.5 tracking-tight">Jackpot</span>
        </button>

        {/* Tab 4: Bet Slip - Highlighted button with badge */}
        <button
          onClick={() => setIsBetSlipOpenMobile(!isBetSlipOpenMobile)}
          className={`relative flex flex-col items-center justify-center py-1 transition-colors ${
            isBetSlipOpenMobile ? 'text-[#38E000]' : 'text-slate-300 hover:text-white'
          }`}
        >
          <div className="relative">
            <Ticket className="w-5 h-5" />
            {betSlip.length > 0 && (
              <span className="absolute -top-1.5 -right-2.5 px-1.5 py-0.2 rounded-full bg-[#38E000] text-black font-extrabold text-[10px] leading-tight shadow-md animate-bounce">
                {betSlip.length}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold mt-0.5 tracking-tight">Bet Slip</span>
        </button>

        {/* Tab 5: Account */}
        <button
          onClick={() => { setActiveTab('account'); setIsBetSlipOpenMobile(false); }}
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            activeTab === 'account' && !isBetSlipOpenMobile ? 'text-[#38E000]' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-0.5 tracking-tight">Account</span>
        </button>
      </div>
    </div>
  );
};
