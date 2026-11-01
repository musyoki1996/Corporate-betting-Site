import React, { useState } from 'react';
import { useSportsbook } from '../../context/SportsbookContext';
import { 
  Trash2, 
  X, 
  Flame, 
  ArrowRight, 
  AlertCircle, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { BetTicket } from '../../types/sportsbook';

export const BetSlip: React.FC = () => {
  const {
    betSlip,
    removeSelection,
    clearBetSlip,
    betType,
    setBetType,
    stake,
    setStake,
    totalOdds,
    multibetBonusPercent,
    grossPayout,
    withholdingTax,
    netPayout,
    placeBet,
    user,
    setShowDepositModal,
    isBetSlipOpenMobile,
    setIsBetSlipOpenMobile,
    fixtures,
    addSelection
  } = useSportsbook();

  const [lastPlacedTicket, setLastPlacedTicket] = useState<BetTicket | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const quickStakes = [50, 100, 200, 500, 1000, 2500];

  const handlePlaceBet = () => {
    setErrorMessage(null);
    const res = placeBet();
    if (res.success && res.ticket) {
      setLastPlacedTicket(res.ticket);
    } else {
      setErrorMessage(res.message);
    }
  };

  const handleAddTrending = () => {
    // Add 3 popular favorites for rapid onboarding
    fixtures.slice(0, 3).forEach((f) => {
      const primaryMarket = f.markets[0];
      if (primaryMarket && primaryMarket.odds[0]) {
        addSelection({
          matchId: f.id,
          matchTeams: `${f.homeTeam} vs ${f.awayTeam}`,
          league: f.league,
          marketName: primaryMarket.name,
          selectionName: primaryMarket.odds[0].name,
          odd: primaryMarket.odds[0].odd,
          isLive: f.isLive,
          kickoffTime: f.kickoffTime,
        });
      }
    });
  };

  return (
    <div className="flex flex-col h-full bg-[#071B49] rounded-2xl border border-[#182C5E] shadow-2xl overflow-hidden">
      {/* Bet Slip Header */}
      <div className="p-3.5 bg-[#03133D] border-b border-[#182C5E] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#38E000]" />
          <h3 className="font-extrabold text-sm tracking-tight text-white font-heading uppercase">
            Betting Slip
          </h3>
          {betSlip.length > 0 && (
            <span className="px-2 py-0.2 rounded-full bg-[#38E000] text-black font-extrabold text-xs">
              {betSlip.length}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {betSlip.length > 0 && (
            <button
              onClick={clearBetSlip}
              title="Clear all selections"
              className="p-1 rounded text-slate-400 hover:text-red-400 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}

          {/* Close button for mobile drawer */}
          <button
            onClick={() => setIsBetSlipOpenMobile(false)}
            className="lg:hidden p-1 rounded text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bet Type Switcher (Single / Multi / System) */}
      <div className="grid grid-cols-3 p-1.5 bg-[#020B24] border-b border-[#182C5E] gap-1 text-xs font-semibold">
        <button
          onClick={() => setBetType('multi')}
          className={`py-1.5 rounded-lg transition-colors ${
            betType === 'multi'
              ? 'bg-[#182C5E] text-[#38E000] font-bold shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Multibet {betSlip.length > 1 && `(${betSlip.length})`}
        </button>
        <button
          onClick={() => setBetType('single')}
          className={`py-1.5 rounded-lg transition-colors ${
            betType === 'single'
              ? 'bg-[#182C5E] text-[#38E000] font-bold shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Single
        </button>
        <button
          onClick={() => setBetType('system')}
          className={`py-1.5 rounded-lg transition-colors ${
            betType === 'system'
              ? 'bg-[#182C5E] text-[#38E000] font-bold shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          System
        </button>
      </div>

      {/* Bet Slip Body */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2.5 max-h-[420px] lg:max-h-[500px]">
        {/* If recent ticket was placed, show receipt confirmation */}
        {lastPlacedTicket && (
          <div className="p-3 rounded-xl bg-[#03133D] border border-[#38E000]/60 space-y-2">
            <div className="flex items-center justify-between text-xs text-[#38E000] font-bold">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Bet Placed Successfully!</span>
              </span>
              <button 
                onClick={() => setLastPlacedTicket(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="text-[11px] text-slate-300 font-mono">
              Ticket: <strong className="text-white font-bold">#{lastPlacedTicket.id}</strong>
            </div>
            <div className="text-xs text-slate-200">
              Potential Payout: <strong className="text-[#38E000]">KES {lastPlacedTicket.netPayout.toLocaleString()}</strong>
            </div>
          </div>
        )}

        {/* Empty State */}
        {betSlip.length === 0 ? (
          <div className="py-8 px-4 text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#03133D] border border-[#182C5E] flex items-center justify-center text-slate-400">
              <Sparkles className="w-6 h-6 text-[#FFC400]" />
            </div>
            <div>
              <p className="font-bold text-sm text-white">Your bet slip is empty</p>
              <p className="text-xs text-slate-400 mt-1">
                Click any odd to build your single or multi-bet accumulator.
              </p>
            </div>
            <button
              onClick={handleAddTrending}
              className="px-3.5 py-1.5 rounded-lg bg-[#03133D] hover:bg-[#182C5E] text-xs font-semibold text-[#38E000] border border-[#182C5E] transition-colors"
            >
              + Add Trending Football Acca
            </button>
          </div>
        ) : (
          /* Active Selections List */
          betSlip.map((item) => (
            <div
              key={`${item.matchId}-${item.marketName}`}
              className="p-3 rounded-xl bg-[#03133D] border border-[#182C5E] relative group hover:border-[#1e3878] transition-colors"
            >
              <button
                onClick={() => removeSelection(item.matchId, item.marketName)}
                className="absolute top-2 right-2 p-1 text-slate-500 hover:text-red-400 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              <div className="text-[10px] text-slate-400 font-medium truncate pr-5">
                {item.league}
              </div>
              <div className="text-xs font-bold text-white truncate mt-0.5">
                {item.matchTeams}
              </div>

              <div className="mt-2 flex items-center justify-between text-xs pt-2 border-t border-[#182C5E]/70">
                <div>
                  <span className="text-[11px] text-slate-400">{item.marketName}: </span>
                  <span className="font-bold text-[#38E000]">{item.selectionName}</span>
                </div>
                <span className="font-mono font-black text-white bg-[#071B49] px-2 py-0.5 rounded border border-[#182C5E]">
                  {item.odd.toFixed(2)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Multibet Boost Banner */}
      {betSlip.length >= 2 && multibetBonusPercent > 0 && (
        <div className="px-3 py-1.5 bg-gradient-to-r from-[#FFC400]/20 via-[#38E000]/10 to-transparent border-t border-[#182C5E] flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-[#FFC400] font-bold">
            <Flame className="w-4 h-4 fill-[#FFC400]" />
            <span>WAZOBET Win Boost:</span>
          </div>
          <span className="font-mono font-extrabold text-[#38E000]">
            +{multibetBonusPercent}% BONUS
          </span>
        </div>
      )}

      {/* Stake & Calculations Footer */}
      {betSlip.length > 0 && (
        <div className="p-3.5 bg-[#03133D] border-t border-[#182C5E] space-y-3">
          {/* Quick Stake Chips */}
          <div>
            <div className="text-[11px] font-semibold text-slate-400 mb-1.5 flex items-center justify-between">
              <span>Stake (KES)</span>
              {user && (
                <span className="text-slate-400">
                  Balance: <strong className="text-white font-mono">KES {user.balanceKes.toLocaleString()}</strong>
                </span>
              )}
            </div>
            <div className="grid grid-cols-6 gap-1 mb-2">
              {quickStakes.map((amt) => (
                <button
                  key={amt}
                  onClick={() => setStake(amt)}
                  className={`py-1 text-[11px] font-mono rounded font-semibold transition-colors ${
                    stake === amt
                      ? 'bg-[#38E000] text-black font-bold'
                      : 'bg-[#071B49] text-slate-300 hover:bg-[#182C5E]'
                  }`}
                >
                  {amt}
                </button>
              ))}
            </div>

            {/* Custom Stake Input */}
            <div className="relative">
              <span className="absolute left-3 top-2 text-xs font-bold text-slate-400">KES</span>
              <input
                type="number"
                min="20"
                step="10"
                value={stake}
                onChange={(e) => setStake(Math.max(0, Number(e.target.value)))}
                className="w-full pl-12 pr-3 py-1.5 text-sm font-bold font-mono bg-[#071B49] border border-[#182C5E] rounded-lg text-white focus:outline-none focus:border-[#38E000]"
              />
            </div>
          </div>

          {/* Breakdown: Total Odds, Gross Win, Tax, Net Win */}
          <div className="space-y-1.5 text-xs pt-1 border-t border-[#182C5E]/70 font-mono">
            <div className="flex justify-between text-slate-400">
              <span>Total Odds:</span>
              <span className="font-bold text-white text-sm">{totalOdds.toFixed(2)}</span>
            </div>

            {multibetBonusPercent > 0 && (
              <div className="flex justify-between text-[#FFC400]">
                <span>Win Bonus ({multibetBonusPercent}%):</span>
                <span>+KES {((grossPayout - stake * totalOdds)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
            )}

            <div className="flex justify-between text-slate-400">
              <span>20% Withholding Tax (WHT):</span>
              <span className="text-red-400">-KES {withholdingTax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>

            <div className="flex justify-between text-sm font-bold text-white pt-1 border-t border-[#182C5E]">
              <span className="text-[#38E000]">Net Potential Win:</span>
              <span className="text-[#38E000] text-base">KES {netPayout.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
          </div>

          {/* Error notice if any */}
          {errorMessage && (
            <div className="p-2 rounded-lg bg-red-950/80 border border-red-800 text-red-300 text-xs flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Place Bet Action Button */}
          <button
            onClick={handlePlaceBet}
            className="w-full py-3 rounded-xl bg-[#38E000] hover:bg-[#62F500] text-black font-black text-sm tracking-tight flex items-center justify-center gap-2 shadow-lg shadow-[#38E000]/25 transition-transform active:scale-95"
          >
            <span>PLACE BET (KES {stake.toLocaleString()})</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>
      )}
    </div>
  );
};
