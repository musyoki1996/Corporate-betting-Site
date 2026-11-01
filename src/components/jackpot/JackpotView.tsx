import React, { useState } from 'react';
import { useSportsbook } from '../../context/SportsbookContext';
import { 
  Trophy, 
  Sparkles, 
  Clock, 
  Coins, 
  HelpCircle, 
  CheckCircle2, 
  Flame, 
  Shuffle, 
  RotateCcw,
  AlertCircle
} from 'lucide-react';

export const JackpotView: React.FC = () => {
  const { 
    jackpots, 
    activeJackpotPicks, 
    setJackpotPick, 
    quickPickJackpot, 
    clearJackpotPicks, 
    placeJackpotTicket,
    user,
    setShowDepositModal 
  } = useSportsbook();

  const [selectedJackpotId, setSelectedJackpotId] = useState<string>(jackpots[0]?.id || 'wazo-mega-17');
  const [ticketStatusMsg, setTicketStatusMsg] = useState<{ success: boolean; message: string } | null>(null);

  const currentJackpot = jackpots.find((j) => j.id === selectedJackpotId) || jackpots[0];

  const pickedCount = Object.keys(activeJackpotPicks).filter((key) => {
    return currentJackpot.fixtures.some((f) => f.id === key && activeJackpotPicks[key]);
  }).length;

  const isComplete = pickedCount === currentJackpot.matchesCount;

  const handlePlaceTicket = () => {
    setTicketStatusMsg(null);
    const res = placeJackpotTicket(currentJackpot.id);
    setTicketStatusMsg(res);
  };

  return (
    <div className="space-y-6">
      {/* Hero Jackpot Banner */}
      <div className="relative rounded-2xl overflow-hidden border border-[#FFC400]/40 bg-gradient-to-r from-[#03133D] via-[#071B49] to-[#0D204B] p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#FFC400] text-black font-extrabold text-xs tracking-wider uppercase font-mono">
                👑 KENYA'S BIGGEST JACKPOT
              </span>
              <span className="text-xs text-slate-300 font-medium flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#FFC400]" />
                <span>{currentJackpot.closeDate}</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black italic tracking-tight text-white font-heading">
              KES {currentJackpot.prizePoolKes.toLocaleString()}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300">
              {currentJackpot.slogan} Predict all {currentJackpot.matchesCount} fixtures to take home the entire prize pool. Guaranteed bonuses starting from 13 correct predictions!
            </p>
          </div>

          {/* Quick Ticket Stats Box */}
          <div className="p-4 rounded-xl bg-[#03133D]/90 border border-[#182C5E] space-y-3 min-w-[240px]">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span>Entry Fee:</span>
              <span className="font-bold text-[#FFC400] font-mono text-sm">
                KES {currentJackpot.ticketPriceKes}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span>Matches:</span>
              <span className="font-mono font-bold text-white">
                {pickedCount} / {currentJackpot.matchesCount}
              </span>
            </div>
            <div className="w-full bg-[#071B49] h-2 rounded-full overflow-hidden">
              <div 
                className="bg-[#38E000] h-full transition-all duration-300"
                style={{ width: `${(pickedCount / currentJackpot.matchesCount) * 100}%` }}
              />
            </div>

            <button
              onClick={handlePlaceTicket}
              disabled={!isComplete}
              className={`w-full py-2.5 rounded-lg font-black text-xs sm:text-sm tracking-tight transition-transform active:scale-95 ${
                isComplete
                  ? 'bg-[#38E000] hover:bg-[#62F500] text-black shadow-lg shadow-[#38E000]/25'
                  : 'bg-slate-700 text-slate-400 cursor-not-allowed'
              }`}
            >
              {isComplete ? `PLACE TICKET (KES ${currentJackpot.ticketPriceKes})` : `PICK ${currentJackpot.matchesCount - pickedCount} MORE`}
            </button>
          </div>
        </div>

        {/* Background glow styling */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFC400]/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Jackpot Competition Selector (Supa 17 vs Midweek 13) */}
      <div className="flex items-center gap-3">
        {jackpots.map((j) => (
          <button
            key={j.id}
            onClick={() => {
              setSelectedJackpotId(j.id);
              clearJackpotPicks();
              setTicketStatusMsg(null);
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              selectedJackpotId === j.id
                ? 'bg-[#FFC400] text-black shadow-md'
                : 'bg-[#071B49] text-slate-300 hover:text-white border border-[#182C5E]'
            }`}
          >
            {j.title} · KES {(j.prizePoolKes / 1000000).toFixed(0)}M
          </button>
        ))}
      </div>

      {/* Actions Bar: Auto-Pick (Lucky Dip) / Clear */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl bg-[#071B49] border border-[#182C5E]">
        <div className="flex items-center gap-2">
          <button
            onClick={() => quickPickJackpot(currentJackpot.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#182C5E] hover:bg-[#203a7a] text-xs font-bold text-[#FFC400] transition-colors"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Lucky Dip (Auto-Pick All)</span>
          </button>

          <button
            onClick={clearJackpotPicks}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#03133D] hover:bg-[#182C5E] text-xs font-medium text-slate-400 hover:text-white border border-[#182C5E] transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear Selections</span>
          </button>
        </div>

        <div className="text-xs text-slate-400">
          Selected: <strong className="text-white font-mono">{pickedCount}</strong> of <strong className="text-white font-mono">{currentJackpot.matchesCount}</strong> matches
        </div>
      </div>

      {/* Notification banner */}
      {ticketStatusMsg && (
        <div className={`p-4 rounded-xl border text-xs flex items-center gap-2 ${
          ticketStatusMsg.success
            ? 'bg-emerald-950/80 border-[#38E000] text-emerald-300'
            : 'bg-red-950/80 border-red-800 text-red-300'
        }`}>
          {ticketStatusMsg.success ? <CheckCircle2 className="w-4 h-4 text-[#38E000] shrink-0" /> : <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />}
          <span>{ticketStatusMsg.message}</span>
        </div>
      )}

      {/* Jackpot Fixtures List */}
      <div className="space-y-3">
        {currentJackpot.fixtures.map((fixture) => {
          const currentPick = activeJackpotPicks[fixture.id];
          return (
            <div
              key={fixture.id}
              className="p-3 sm:p-4 rounded-xl bg-[#071B49] border border-[#182C5E] hover:border-[#1e3878] transition-all grid grid-cols-1 md:grid-cols-12 gap-3 items-center"
            >
              {/* Left Col: Match Index & Teams */}
              <div className="md:col-span-6 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-[#03133D] border border-[#182C5E] font-mono font-bold text-xs text-[#FFC400] flex items-center justify-center shrink-0">
                  {fixture.matchNumber}
                </span>

                <div className="truncate">
                  <div className="text-[11px] text-slate-400 font-medium truncate">
                    {fixture.league} · {fixture.date}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-white truncate mt-0.5">
                    {fixture.homeTeam} <span className="text-slate-500 font-normal">vs</span> {fixture.awayTeam}
                  </div>
                </div>
              </div>

              {/* Right Col: 1 - X - 2 Prediction Buttons */}
              <div className="md:col-span-6 grid grid-cols-3 gap-2">
                {/* Pick 1 */}
                <button
                  onClick={() => setJackpotPick(fixture.id, '1')}
                  className={`py-2 px-3 rounded-lg border text-center transition-all ${
                    currentPick === '1'
                      ? 'bg-[#38E000] border-[#38E000] text-black font-black shadow-md shadow-[#38E000]/20'
                      : 'bg-[#0D204B] border-[#182C5E] text-slate-200 hover:border-[#38E000]/50'
                  }`}
                >
                  <div className="text-[10px] uppercase font-bold text-slate-400">1 (Home)</div>
                  <div className="text-xs font-mono font-bold mt-0.5">{fixture.odds.home.toFixed(2)}</div>
                </button>

                {/* Pick X */}
                <button
                  onClick={() => setJackpotPick(fixture.id, 'X')}
                  className={`py-2 px-3 rounded-lg border text-center transition-all ${
                    currentPick === 'X'
                      ? 'bg-[#FFC400] border-[#FFC400] text-black font-black shadow-md shadow-[#FFC400]/20'
                      : 'bg-[#0D204B] border-[#182C5E] text-slate-200 hover:border-[#FFC400]/50'
                  }`}
                >
                  <div className="text-[10px] uppercase font-bold text-slate-400">X (Draw)</div>
                  <div className="text-xs font-mono font-bold mt-0.5">{fixture.odds.draw.toFixed(2)}</div>
                </button>

                {/* Pick 2 */}
                <button
                  onClick={() => setJackpotPick(fixture.id, '2')}
                  className={`py-2 px-3 rounded-lg border text-center transition-all ${
                    currentPick === '2'
                      ? 'bg-[#38E000] border-[#38E000] text-black font-black shadow-md shadow-[#38E000]/20'
                      : 'bg-[#0D204B] border-[#182C5E] text-slate-200 hover:border-[#38E000]/50'
                  }`}
                >
                  <div className="text-[10px] uppercase font-bold text-slate-400">2 (Away)</div>
                  <div className="text-xs font-mono font-bold mt-0.5">{fixture.odds.away.toFixed(2)}</div>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bonus Tiers Breakdown Table */}
      <div className="p-5 rounded-2xl bg-[#071B49] border border-[#182C5E] space-y-3">
        <h4 className="font-bold text-sm text-white flex items-center gap-2">
          <Coins className="w-4 h-4 text-[#FFC400]" />
          <span>Guaranteed Jackpot Bonus Payout Structure</span>
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center text-xs">
          <div className="p-3 rounded-xl bg-[#03133D] border border-[#182C5E]">
            <div className="font-bold text-[#FFC400]">17 / 17 Correct</div>
            <div className="font-black text-white text-sm font-mono mt-1">KES 150,000,000</div>
          </div>
          <div className="p-3 rounded-xl bg-[#03133D] border border-[#182C5E]">
            <div className="font-bold text-slate-300">16 / 17 Correct</div>
            <div className="font-black text-white text-sm font-mono mt-1">KES 5,000,000</div>
          </div>
          <div className="p-3 rounded-xl bg-[#03133D] border border-[#182C5E]">
            <div className="font-bold text-slate-300">15 / 17 Correct</div>
            <div className="font-black text-white text-sm font-mono mt-1">KES 1,500,000</div>
          </div>
          <div className="p-3 rounded-xl bg-[#03133D] border border-[#182C5E]">
            <div className="font-bold text-slate-300">14 / 17 Correct</div>
            <div className="font-black text-white text-sm font-mono mt-1">KES 500,000</div>
          </div>
          <div className="p-3 rounded-xl bg-[#03133D] border border-[#182C5E]">
            <div className="font-bold text-slate-300">13 / 17 Correct</div>
            <div className="font-black text-white text-sm font-mono mt-1">KES 100,000</div>
          </div>
        </div>
      </div>
    </div>
  );
};
