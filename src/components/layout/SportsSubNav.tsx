import React from 'react';
import { useSportsbook } from '../../context/SportsbookContext';
import { SPORT_CATEGORIES } from '../../data/mockSportsData';
import { Search } from 'lucide-react';

export const SportsSubNav: React.FC = () => {
  const { 
    selectedSport, 
    setSelectedSport, 
    selectedLeagueFilter, 
    setSelectedLeagueFilter,
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab
  } = useSportsbook();

  const timeFilters = ['All', 'Live In-Play', 'Today', 'FKF Premier League', 'Champions League', 'EPL'];

  return (
    <div className="bg-[#071B49] border-b border-[#182C5E] py-2 px-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Sports Categories Rail */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none no-scrollbar">
          {SPORT_CATEGORIES.map((sport) => {
            const isSelected = selectedSport === sport.id && (activeTab === 'home' || activeTab === 'sports');
            return (
              <button
                key={sport.id}
                onClick={() => {
                  setSelectedSport(sport.id);
                  if (activeTab !== 'home' && activeTab !== 'sports') {
                    setActiveTab('sports');
                  }
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
                  isSelected
                    ? 'bg-[#38E000] text-black shadow-md shadow-[#38E000]/20 font-bold'
                    : 'bg-[#0D204B] text-slate-300 hover:text-white hover:bg-[#142d68] border border-[#182C5E]'
                }`}
              >
                <span>{sport.icon}</span>
                <span>{sport.name}</span>
                <span className={`text-[10px] tabular-nums font-mono px-1 rounded ${isSelected ? 'bg-black/20 text-black' : 'text-slate-400'}`}>
                  {sport.matchCount}
                </span>
              </button>
            );
          })}
        </div>

        {/* Filter Chips & Fast Search */}
        <div className="flex items-center gap-2 overflow-x-auto shrink-0">
          <div className="flex items-center gap-1 bg-[#03133D] rounded-lg p-1 border border-[#182C5E]">
            {timeFilters.map((filter) => {
              const isFilterActive = selectedLeagueFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => setSelectedLeagueFilter(filter)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                    isFilterActive
                      ? 'bg-[#182C5E] text-[#38E000] font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>

          {/* Quick Search */}
          <div className="relative hidden lg:block w-44 xl:w-56">
            <Search className="absolute left-2.5 top-2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search teams..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1 text-xs rounded-lg bg-[#03133D] border border-[#182C5E] text-white placeholder-slate-500 focus:outline-none focus:border-[#38E000]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
