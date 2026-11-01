export type SportId = 
  | 'football' 
  | 'basketball' 
  | 'tennis' 
  | 'rugby' 
  | 'cricket' 
  | 'boxing' 
  | 'volleyball' 
  | 'esports';

export interface SportCategory {
  id: SportId;
  name: string;
  icon: string;
  matchCount: number;
  liveCount: number;
}

export interface MarketOdd {
  id: string;
  name: string; // e.g. "Home", "Draw", "Away", "Over 2.5", "Yes"
  odd: number;
  previousOdd?: number;
  oddShift?: 'up' | 'down' | null;
  suspended?: boolean;
}

export interface BettingMarket {
  id: string;
  name: string; // "1X2", "Over/Under 2.5", "Both Teams To Score (GG/NG)", "Double Chance"
  odds: MarketOdd[];
}

export interface MatchStats {
  possession: [number, number]; // [Home%, Away%]
  shotsOnTarget: [number, number];
  dangerousAttacks: [number, number];
  corners: [number, number];
  yellowCards: [number, number];
  redCards: [number, number];
}

export interface LiveMatchEvent {
  id: string;
  minute: number;
  type: 'goal' | 'yellow_card' | 'red_card' | 'corner' | 'dangerous_attack' | 'substitution';
  team: 'home' | 'away';
  description: string;
}

export interface MatchFixture {
  id: string;
  sportId: SportId;
  league: string;
  country: string;
  homeTeam: string;
  awayTeam: string;
  homeLogo?: string;
  awayLogo?: string;
  kickoffTime: string; // ISO string or format
  isLive: boolean;
  liveMinute?: number;
  liveScore?: [number, number];
  status: 'upcoming' | 'live' | 'halftime' | 'finished' | 'suspended';
  stats?: MatchStats;
  events?: LiveMatchEvent[];
  markets: BettingMarket[];
  isFeatured?: boolean;
  pitchPhase?: 'Home Dangerous Attack' | 'Away Dangerous Attack' | 'Midfield Battle' | 'Corner Kick' | 'Penalty Box Action';
}

export interface BetSelection {
  matchId: string;
  matchTeams: string;
  league: string;
  marketName: string;
  selectionName: string;
  odd: number;
  isLive: boolean;
  kickoffTime: string;
}

export interface BetTicket {
  id: string;
  placedAt: string;
  selections: BetSelection[];
  betType: 'single' | 'multi' | 'system';
  stake: number;
  totalOdds: number;
  multibetBonusPercent: number;
  grossPayout: number;
  withholdingTax: number; // 20% on winnings as per Kenya Finance Act
  netPayout: number;
  status: 'open' | 'won' | 'lost' | 'cashed_out';
  cashoutAmount?: number;
  cashoutAvailable?: boolean;
}

export interface WalletTransaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'bet_placed' | 'bet_won' | 'cashout' | 'bonus_credited';
  amount: number;
  method: 'M-PESA' | 'AIRTEL MONEY' | 'BONUS' | 'SYSTEM';
  reference: string;
  timestamp: string;
  status: 'completed' | 'pending' | 'failed';
  phoneOrAccount?: string;
}

export interface JackpotFixture {
  id: string;
  matchNumber: number;
  homeTeam: string;
  awayTeam: string;
  league: string;
  date: string;
  odds: {
    home: number;
    draw: number;
    away: number;
  };
  result?: '1' | 'X' | '2';
}

export interface JackpotCompetition {
  id: string;
  title: string;
  slogan: string;
  prizePoolKes: number;
  ticketPriceKes: number;
  closeDate: string;
  matchesCount: number;
  fixtures: JackpotFixture[];
}

export interface UserProfile {
  id: string;
  fullName: string;
  phoneNumber: string; // Kenyan format e.g. +254 712 345 678
  email: string;
  nationalIdMasked: string; // e.g. 33****78
  isVerified: boolean;
  balanceKes: number;
  bonusBalanceKes: number;
  joinedDate: string;
  dailyDepositLimitKes: number;
  selfExclusionActive: boolean;
  realityCheckMinutes: number;
}
