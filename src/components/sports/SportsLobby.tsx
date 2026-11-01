import React, { useState } from 'react';
import { useSportsbook } from '../../context/SportsbookContext';
import { MatchCard } from '../matches/MatchCard';
import { SPORT_CATEGORIES } from '../../data/mockSportsData';
import { Trophy, Filter, Search, Globe, ChevronRight } from 'lucide-react';

export const SportsLobby: React.FC = () => {
  const { 
    fixtures, 
    selectedSport, 
    setSelectedSport, 
    selectedLeagueFilter, 
    setSelectedLeagueFilter,
    searchQuery,
    setSearchQuery 
  } = useSportsbook();

  const currentSportCategory = SPORT_CATEGORIES.find((s) => s.id === selectedSport) || SPORT_CATEGORIES[0];

  // Filter fixtures based on sport, league filter, and search
  const filteredFixtures = fixtures.filter((f) => {
    const matchesSport = f.sportId === selectedSport;
    const matchesSearch = searchQuery === '' || 
      f.homeTeam.toLowerCase().includes(searchQuery.toLowerCase()) || 
      f.awayTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.league.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesLeague = true;
    if (selectedLeagueFilter === 'Live In-Play') {
      matchesLeague = f.isLive;
    } else if (selectedLeagueFilter === 'FKF Premier League') {
      matchesLeague = f.league.includes('FKF') || f.league.includes('Kenya');
    } else if (selectedLeagueFilter === 'Champions League') {
      matchesLeague = f.league.includes('Champions');
    } else if (selectedLeagueFilter === 'EPL') {
      matchesLeague = f.league.includes('Premier League') && f.country === 'England';
    }

    return matchesSport && matchesSearch && matchesLeague;
  });

  // Group by league
  const leagues = Array.from(new Set(filteredFixtures.map((f) => f.league)));

  return (
    <div className="space-y-6">
      {/* Lobby Header */}
      <div className="p-5 rounded-2xl bg-[#071B49] border border-[#182C5E] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{currentSportCategory.icon}</span>
          <div>
            <h1 className="text-xl sm:text-2xl font-black italic text-white font-heading">
              {currentSportCategory.name.toUpperCase()} BETTING FIXTURES
            </h1>
            <p className="text-xs text-slate-300">
              Browse top leagues, today's schedule, competitive odds, and multiple market options.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Available Matches:</span>
          <span className="font-mono font-bold text-[#38E000] text-sm">
            {filteredFixtures.length}
          </span>
        </div>
      </div>

      {/* Fixtures List Grouped by League */}
      {filteredFixtures.length === 0 ? (
        <div className="p-8 rounded-2xl bg-[#071B49] border border-[#182C5E] text-center space-y-3">
          <Trophy className="w-10 h-10 mx-auto text-slate-400" />
          <h3 className="font-bold text-base text-white">No matches found for this filter</h3>
          <p className="text-xs text-slate-400">
            Try switching sports or clearing your search term "{searchQuery}".
          </p>
          <button
            onClick={() => { setSelectedLeagueFilter('All'); setSearchQuery(''); }}
            className="px-4 py-2 rounded-lg bg-[#38E000] text-black font-bold text-xs"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        leagues.map((league) => {
          const leagueFixtures = filteredFixtures.filter((f) => f.league === league);
          return (
            <div key={league} className="space-y-3">
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#38E000]" />
                  <h3 className="font-bold text-sm text-white tracking-wide">{league}</h3>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">
                  {leagueFixtures.length} {leagueFixtures.length === 1 ? 'Match' : 'Matches'}
                </span>
              </div>

              <div className="space-y-2.5">
                {leagueFixtures.map((fixture) => (
                  <MatchCard key={fixture.id} fixture={fixture} />
                ))}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};
