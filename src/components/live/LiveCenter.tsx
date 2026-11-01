import React, { useState } from 'react';
import { useSportsbook } from '../../context/SportsbookContext';
import { MatchFixture, BetSelection } from '../../types/sportsbook';
import { 
  Radio, 
  BarChart2, 
  Clock, 
  Flame, 
  AlertTriangle, 
  ShieldAlert, 
  ChevronRight,
  TrendingUp,
  Activity
} from 'lucide-react';

export const LiveCenter: React.FC = () => {
  const { 
    fixtures, 
    activeMatchDetail, 
    setActiveMatchDetail, 
    addSelection, 
    isSelectionInSlip 
  } = useSportsbook();

  const liveFixtures = fixtures.filter((f) => f.isLive);
  const selectedMatch = activeMatchDetail || liveFixtures[0] || fixtures[0];

  const handleOddClick = (marketName: string, selectionName: string, odd: number) => {
    if (!selectedMatch) return;
    const selection: BetSelection = {
      matchId: selectedMatch.id,
      matchTeams: `${selectedMatch.homeTeam} vs ${selectedMatch.awayTeam}`,
      league: selectedMatch.league,
      marketName,
      selectionName,
      odd,
      isLive: true,
      kickoffTime: selectedMatch.kickoffTime,
    };
    addSelection(selection);
  };

  return (
    <div className="space-y-6">
      {/* Live Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-[#071B49] via-[#0D204B] to-[#03133D] border border-[#182C5E]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-950/80 border border-red-700/60 flex items-center justify-center text-red-500">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-black italic text-white font-heading">
              WAZOBET LIVE MATCH CENTRE
            </h2>
            <p className="text-xs text-slate-300">
              Real-time scores, in-play pitch tracker, match stats and dynamic live odds.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">In-Play Games:</span>
          <span className="px-2 py-0.5 rounded bg-red-600 text-white font-mono font-bold text-xs">
            {liveFixtures.length} LIVE
          </span>
        </div>
      </div>

      {/* Main Grid: Left side live matches list, Right side pitch visualizer + stats + in-play markets */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Live Matches List (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
            Active In-Play Matches
          </h3>

          <div className="space-y-2 max-h-[620px] overflow-y-auto pr-1">
            {liveFixtures.length === 0 ? (
              <div className="p-6 rounded-xl bg-[#071B49] border border-[#182C5E] text-center text-xs text-slate-400">
                No active in-play matches right now. Check upcoming matches in the sports lobby.
              </div>
            ) : (
              liveFixtures.map((match) => {
                const isSelected = selectedMatch?.id === match.id;
                return (
                  <div
                    key={match.id}
                    onClick={() => setActiveMatchDetail(match)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#0D204B] border-[#38E000] shadow-md shadow-[#38E000]/15'
                        : 'bg-[#071B49] border-[#182C5E] hover:border-[#1e3878]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
                      <span className="truncate">{match.league}</span>
                      <span className="flex items-center gap-1 font-mono font-bold text-red-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                        {match.liveMinute}'
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-bold text-white">
                        <span className="truncate">{match.homeTeam}</span>
                        <span className="font-mono text-sm px-1.5 py-0.2 rounded bg-[#03133D]">
                          {match.liveScore ? match.liveScore[0] : 0}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs font-bold text-white">
                        <span className="truncate">{match.awayTeam}</span>
                        <span className="font-mono text-sm px-1.5 py-0.2 rounded bg-[#03133D]">
                          {match.liveScore ? match.liveScore[1] : 0}
                        </span>
                      </div>
                    </div>

                    {match.pitchPhase && (
                      <div className="mt-2 text-[10px] text-[#38E000] font-medium flex items-center justify-between pt-1 border-t border-[#182C5E]/60">
                        <span className="truncate">{match.pitchPhase}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Interactive Pitch Visualizer, Match Timeline, and Odds (8 cols) */}
        {selectedMatch && (
          <div className="lg:col-span-8 space-y-4">
            {/* Top Scoreboard & Interactive Pitch Visualizer */}
            <div className="p-5 rounded-2xl bg-[#071B49] border border-[#182C5E] shadow-xl">
              {/* Scoreboard Header */}
              <div className="flex items-center justify-between text-xs text-slate-400 pb-3 border-b border-[#182C5E]">
                <span>{selectedMatch.league} · {selectedMatch.country}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-red-950 border border-red-700 text-red-400 font-bold font-mono">
                  LIVE · {selectedMatch.liveMinute || 0}'
                </span>
              </div>

              {/* Big Score Display */}
              <div className="py-4 grid grid-cols-7 items-center text-center">
                <div className="col-span-3 text-right pr-4">
                  <h4 className="text-lg sm:text-xl font-black text-white font-heading">
                    {selectedMatch.homeTeam}
                  </h4>
                  <span className="text-xs text-slate-400">Home</span>
                </div>

                <div className="col-span-1 flex flex-col items-center">
                  <div className="flex items-center gap-2 text-2xl sm:text-3xl font-black text-[#38E000] font-mono tracking-tight bg-[#03133D] px-3 py-1 rounded-xl border border-[#182C5E]">
                    <span>{selectedMatch.liveScore ? selectedMatch.liveScore[0] : 0}</span>
                    <span className="text-slate-500">:</span>
                    <span>{selectedMatch.liveScore ? selectedMatch.liveScore[1] : 0}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono mt-1">2nd Half</span>
                </div>

                <div className="col-span-3 text-left pl-4">
                  <h4 className="text-lg sm:text-xl font-black text-white font-heading">
                    {selectedMatch.awayTeam}
                  </h4>
                  <span className="text-xs text-slate-400">Away</span>
                </div>
              </div>

              {/* Simulated Football Pitch Graphic */}
              <div className="relative h-44 sm:h-52 w-full rounded-xl overflow-hidden bg-gradient-to-b from-[#14532d] via-[#166534] to-[#14532d] border-2 border-emerald-400/40 p-2 shadow-inner">
                {/* Grass pattern stripes */}
                <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_40px,rgba(0,0,0,0.08)_40px,rgba(0,0,0,0.08)_80px)] pointer-events-none" />

                {/* Pitch Lines */}
                <div className="absolute inset-2 border border-white/40 rounded">
                  {/* Center line */}
                  <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-white/40 -translate-x-1/2" />
                  {/* Center circle */}
                  <div className="absolute top-1/2 left-1/2 w-20 h-20 -translate-x-1/2 -translate-y-1/2 border border-white/40 rounded-full" />
                  {/* Penalty Box Left */}
                  <div className="absolute top-1/4 bottom-1/4 left-0 w-16 border-r border-y border-white/40" />
                  {/* Penalty Box Right */}
                  <div className="absolute top-1/4 bottom-1/4 right-0 w-16 border-l border-y border-white/40" />
                </div>

                {/* Animated Attack Phase Indicator */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
                  <div className="px-4 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-[#38E000] text-[#38E000] text-xs font-black tracking-wide uppercase shadow-lg flex items-center gap-2">
                    <Activity className="w-4 h-4 animate-bounce" />
                    <span>{selectedMatch.pitchPhase || 'Live Match In Play'}</span>
                  </div>
                </div>

                {/* Team orientation badges */}
                <div className="absolute bottom-3 left-4 text-[11px] font-bold text-white bg-black/50 px-2 py-0.5 rounded">
                  {selectedMatch.homeTeam} ➡️
                </div>
                <div className="absolute bottom-3 right-4 text-[11px] font-bold text-white bg-black/50 px-2 py-0.5 rounded">
                  ⬅️ {selectedMatch.awayTeam}
                </div>
              </div>

              {/* Match Statistics Bars */}
              {selectedMatch.stats && (
                <div className="mt-5 space-y-3 pt-4 border-t border-[#182C5E] text-xs">
                  <h4 className="font-bold text-slate-300">Live Match Statistics</h4>

                  {/* Possession */}
                  <div>
                    <div className="flex justify-between text-slate-400 font-mono text-[11px] mb-1">
                      <span>{selectedMatch.stats.possession[0]}%</span>
                      <span className="text-slate-300 font-sans font-medium">Ball Possession</span>
                      <span>{selectedMatch.stats.possession[1]}%</span>
                    </div>
                    <div className="h-2 w-full bg-[#03133D] rounded-full overflow-hidden flex">
                      <div 
                        className="bg-[#38E000] h-full transition-all"
                        style={{ width: `${selectedMatch.stats.possession[0]}%` }}
                      />
                      <div 
                        className="bg-[#FFC400] h-full transition-all"
                        style={{ width: `${selectedMatch.stats.possession[1]}%` }}
                      />
                    </div>
                  </div>

                  {/* Dangerous Attacks */}
                  <div>
                    <div className="flex justify-between text-slate-400 font-mono text-[11px] mb-1">
                      <span>{selectedMatch.stats.dangerousAttacks[0]}</span>
                      <span className="text-slate-300 font-sans font-medium">Dangerous Attacks</span>
                      <span>{selectedMatch.stats.dangerousAttacks[1]}</span>
                    </div>
                    <div className="h-2 w-full bg-[#03133D] rounded-full overflow-hidden flex">
                      <div 
                        className="bg-[#38E000] h-full transition-all"
                        style={{ 
                          width: `${(selectedMatch.stats.dangerousAttacks[0] / (selectedMatch.stats.dangerousAttacks[0] + selectedMatch.stats.dangerousAttacks[1])) * 100}%` 
                        }}
                      />
                      <div 
                        className="bg-[#FFC400] h-full transition-all"
                        style={{ 
                          width: `${(selectedMatch.stats.dangerousAttacks[1] / (selectedMatch.stats.dangerousAttacks[0] + selectedMatch.stats.dangerousAttacks[1])) * 100}%` 
                        }}
                      />
                    </div>
                  </div>

                  {/* Shots, Corners, Cards Summary */}
                  <div className="grid grid-cols-3 gap-2 pt-2 text-center text-slate-300">
                    <div className="p-2 rounded bg-[#03133D] border border-[#182C5E]">
                      <div className="font-mono font-bold text-white">
                        {selectedMatch.stats.shotsOnTarget[0]} - {selectedMatch.stats.shotsOnTarget[1]}
                      </div>
                      <div className="text-[10px] text-slate-400">Shots on Target</div>
                    </div>
                    <div className="p-2 rounded bg-[#03133D] border border-[#182C5E]">
                      <div className="font-mono font-bold text-white">
                        {selectedMatch.stats.corners[0]} - {selectedMatch.stats.corners[1]}
                      </div>
                      <div className="text-[10px] text-slate-400">Corners</div>
                    </div>
                    <div className="p-2 rounded bg-[#03133D] border border-[#182C5E]">
                      <div className="font-mono font-bold text-white">
                        {selectedMatch.stats.yellowCards[0]} - {selectedMatch.stats.yellowCards[1]}
                      </div>
                      <div className="text-[10px] text-slate-400">Yellow Cards</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* In-Play Markets & Dynamic Odds */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Flame className="w-4 h-4 text-[#FFC400]" />
                <span>In-Play Live Betting Markets</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedMatch.markets.map((market) => (
                  <div
                    key={market.id}
                    className="p-4 rounded-xl bg-[#071B49] border border-[#182C5E] space-y-2.5"
                  >
                    <div className="font-bold text-xs text-slate-200">
                      {market.name}
                    </div>

                    <div className={`grid gap-2 ${market.odds.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                      {market.odds.map((oddItem) => {
                        const isSelected = isSelectionInSlip(selectedMatch.id, market.name, oddItem.name);
                        return (
                          <button
                            key={oddItem.id}
                            onClick={() => handleOddClick(market.name, oddItem.name, oddItem.odd)}
                            className={`p-2.5 rounded-lg border text-center transition-all select-none active:scale-95 ${
                              isSelected
                                ? 'bg-[#38E000] border-[#38E000] text-black font-bold shadow-md'
                                : 'bg-[#0D204B] border-[#182C5E] text-slate-200 hover:border-[#38E000]/60'
                            } ${
                              oddItem.oddShift === 'up' ? 'odds-shift-up' : oddItem.oddShift === 'down' ? 'odds-shift-down' : ''
                            }`}
                          >
                            <div className={`text-[11px] truncate ${isSelected ? 'text-black' : 'text-slate-400'}`}>
                              {oddItem.name}
                            </div>
                            <div className={`text-base font-black font-mono tabular-nums mt-0.5 ${isSelected ? 'text-black' : 'text-white'}`}>
                              {oddItem.odd.toFixed(2)}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Match Commentary Events */}
            {selectedMatch.events && selectedMatch.events.length > 0 && (
              <div className="p-4 rounded-xl bg-[#071B49] border border-[#182C5E] space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Live Match Timeline
                </h4>
                <div className="space-y-2">
                  {selectedMatch.events.map((evt) => (
                    <div
                      key={evt.id}
                      className="flex items-start gap-3 text-xs p-2 rounded-lg bg-[#03133D] border border-[#182C5E]"
                    >
                      <span className="font-mono font-bold text-[#38E000] bg-[#071B49] px-2 py-0.5 rounded">
                        {evt.minute}'
                      </span>
                      <p className="text-slate-200 flex-1">
                        {evt.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
