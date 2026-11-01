import React, { useState } from 'react';
import { MatchFixture, BetSelection } from '../../types/sportsbook';
import { useSportsbook } from '../../context/SportsbookContext';
import { ChevronDown, ChevronUp, Radio, BarChart2 } from 'lucide-react';

interface MatchCardProps {
  fixture: MatchFixture;
}

export const MatchCard: React.FC<MatchCardProps> = ({ fixture }) => {
  const { 
    addSelection, 
    isSelectionInSlip, 
    setActiveMatchDetail, 
    setActiveTab 
  } = useSportsbook();
  
  const [expanded, setExpanded] = useState(false);

  const market1x2 = fixture.markets.find((m) => m.id === '1x2' || m.id === 'moneyline');
  const marketBtts = fixture.markets.find((m) => m.id === 'btts');
  const marketOverUnder = fixture.markets.find((m) => m.id.startsWith('over_under'));
  const marketDoubleChance = fixture.markets.find((m) => m.id === 'double_chance');

  const handleOddClick = (e: React.MouseEvent, marketName: string, selectionName: string, odd: number) => {
    e.stopPropagation();
    const selection: BetSelection = {
      matchId: fixture.id,
      matchTeams: `${fixture.homeTeam} vs ${fixture.awayTeam}`,
      league: fixture.league,
      marketName,
      selectionName,
      odd,
      isLive: fixture.isLive,
      kickoffTime: fixture.kickoffTime,
    };
    addSelection(selection);
  };

  return (
    <div className="rounded-xl bg-[#071B49] border border-[#182C5E] hover:border-[#1e3878] transition-all shadow-sm">
      {/* Top Header: League, Kickoff Time, Live Status */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[#182C5E]/70 text-xs">
        <div className="flex items-center gap-2 truncate">
          <span className="font-semibold text-slate-300 truncate">{fixture.league}</span>
          <span className="text-slate-500">·</span>
          <span className="text-slate-400 text-[11px] truncate">{fixture.country}</span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {fixture.isLive ? (
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-red-950/80 border border-red-800/60 text-red-400 font-bold font-mono text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span>{fixture.liveMinute}'</span>
            </div>
          ) : (
            <span className="text-slate-400 font-mono text-[11px]">{fixture.kickoffTime}</span>
          )}

          <button
            onClick={() => {
              setActiveMatchDetail(fixture);
              setActiveTab('live');
            }}
            title="View Match Tracker & Live Stats"
            className="p-1 rounded hover:bg-[#182C5E] text-slate-400 hover:text-white transition-colors"
          >
            <BarChart2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Card Body: Teams and Primary 1X2 Odds */}
      <div className="p-3 sm:p-4 grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        {/* Teams and Score Section */}
        <div 
          onClick={() => {
            setActiveMatchDetail(fixture);
            if (fixture.isLive) setActiveTab('live');
          }}
          className="md:col-span-6 cursor-pointer group"
        >
          <div className="space-y-1.5">
            {/* Home Team */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#182C5E] text-[10px] font-bold text-slate-200 flex items-center justify-center shrink-0">
                  {fixture.homeTeam.charAt(0)}
                </div>
                <span className="text-sm font-bold text-white group-hover:text-[#38E000] transition-colors truncate">
                  {fixture.homeTeam}
                </span>
              </div>
              {fixture.isLive && fixture.liveScore && (
                <span className="text-base font-black text-white font-mono tabular-nums px-2 py-0.5 rounded bg-[#03133D]">
                  {fixture.liveScore[0]}
                </span>
              )}
            </div>

            {/* Away Team */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#182C5E] text-[10px] font-bold text-slate-200 flex items-center justify-center shrink-0">
                  {fixture.awayTeam.charAt(0)}
                </div>
                <span className="text-sm font-bold text-white group-hover:text-[#38E000] transition-colors truncate">
                  {fixture.awayTeam}
                </span>
              </div>
              {fixture.isLive && fixture.liveScore && (
                <span className="text-base font-black text-white font-mono tabular-nums px-2 py-0.5 rounded bg-[#03133D]">
                  {fixture.liveScore[1]}
                </span>
              )}
            </div>
          </div>

          {/* Live pitch event ticker if in-play */}
          {fixture.isLive && fixture.pitchPhase && (
            <div className="mt-2 text-[10px] text-[#38E000] font-semibold flex items-center gap-1">
              <Radio className="w-3 h-3 animate-spin" />
              <span>{fixture.pitchPhase}</span>
            </div>
          )}
        </div>

        {/* Primary 1X2 Odds Buttons */}
        <div className="md:col-span-6">
          {market1x2 && (
            <div className={`grid gap-1.5 ${market1x2.odds.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
              {market1x2.odds.map((oddItem) => {
                const isSelected = isSelectionInSlip(fixture.id, market1x2.name, oddItem.name);
                return (
                  <button
                    key={oddItem.id}
                    onClick={(e) => handleOddClick(e, market1x2.name, oddItem.name, oddItem.odd)}
                    className={`flex flex-col items-center justify-center py-2 px-2 rounded-lg border transition-all select-none active:scale-95 ${
                      isSelected
                        ? 'bg-[#38E000] border-[#38E000] text-black shadow-md shadow-[#38E000]/30 font-bold'
                        : 'bg-[#0D204B] border-[#182C5E] text-slate-200 hover:border-[#38E000]/60 hover:bg-[#122b64]'
                    } ${
                      oddItem.oddShift === 'up' ? 'odds-shift-up' : oddItem.oddShift === 'down' ? 'odds-shift-down' : ''
                    }`}
                  >
                    <span className={`text-[11px] font-medium tracking-tight truncate ${isSelected ? 'text-black' : 'text-slate-400'}`}>
                      {oddItem.name.length > 8 ? oddItem.id : oddItem.name}
                    </span>
                    <span className={`text-sm font-black font-mono tabular-nums mt-0.5 ${isSelected ? 'text-black' : 'text-white'}`}>
                      {oddItem.odd.toFixed(2)}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Additional Markets Expander Bar */}
      <div className="px-4 py-1.5 bg-[#03133D]/60 border-t border-[#182C5E]/50 flex items-center justify-between text-xs">
        <span className="text-[11px] text-slate-400">
          ID: <strong className="text-slate-300 font-mono">{fixture.id.toUpperCase()}</strong>
        </span>

        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-[11px] font-semibold text-[#38E000] hover:text-[#62F500] transition-colors"
        >
          <span>{expanded ? 'Hide Extra Markets' : `+${fixture.markets.length * 4} Markets`}</span>
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Expanded Markets Drawer */}
      {expanded && (
        <div className="p-4 bg-[#03133D] border-t border-[#182C5E] space-y-4 text-xs animate-in fade-in duration-200">
          {/* Both Teams To Score (GG/NG) */}
          {marketBtts && (
            <div>
              <div className="font-bold text-slate-300 mb-1.5 flex items-center justify-between">
                <span>Both Teams to Score (GG/NG)</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {marketBtts.odds.map((oddItem) => {
                  const isSelected = isSelectionInSlip(fixture.id, marketBtts.name, oddItem.name);
                  return (
                    <button
                      key={oddItem.id}
                      onClick={(e) => handleOddClick(e, marketBtts.name, oddItem.name, oddItem.odd)}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg border transition-all ${
                        isSelected
                          ? 'bg-[#38E000] border-[#38E000] text-black font-bold'
                          : 'bg-[#071B49] border-[#182C5E] text-slate-200 hover:border-[#38E000]/60'
                      }`}
                    >
                      <span>{oddItem.name}</span>
                      <span className="font-black font-mono tabular-nums">{oddItem.odd.toFixed(2)}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Over / Under Goals */}
          {marketOverUnder && (
            <div>
              <div className="font-bold text-slate-300 mb-1.5 flex items-center justify-between">
                <span>{marketOverUnder.name}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {marketOverUnder.odds.map((oddItem) => {
                  const isSelected = isSelectionInSlip(fixture.id, marketOverUnder.name, oddItem.name);
                  return (
                    <button
                      key={oddItem.id}
                      onClick={(e) => handleOddClick(e, marketOverUnder.name, oddItem.name, oddItem.odd)}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg border transition-all ${
                        isSelected
                          ? 'bg-[#38E000] border-[#38E000] text-black font-bold'
                          : 'bg-[#071B49] border-[#182C5E] text-slate-200 hover:border-[#38E000]/60'
                      }`}
                    >
                      <span>{oddItem.name}</span>
                      <span className="font-black font-mono tabular-nums">{oddItem.odd.toFixed(2)}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Double Chance */}
          {marketDoubleChance && (
            <div>
              <div className="font-bold text-slate-300 mb-1.5 flex items-center justify-between">
                <span>Double Chance (1X, 12, X2)</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {marketDoubleChance.odds.map((oddItem) => {
                  const isSelected = isSelectionInSlip(fixture.id, marketDoubleChance.name, oddItem.name);
                  return (
                    <button
                      key={oddItem.id}
                      onClick={(e) => handleOddClick(e, marketDoubleChance.name, oddItem.name, oddItem.odd)}
                      className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg border transition-all ${
                        isSelected
                          ? 'bg-[#38E000] border-[#38E000] text-black font-bold'
                          : 'bg-[#071B49] border-[#182C5E] text-slate-200 hover:border-[#38E000]/60'
                      }`}
                    >
                      <span className="text-[10px] text-slate-400">{oddItem.name}</span>
                      <span className="font-black font-mono tabular-nums">{oddItem.odd.toFixed(2)}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
