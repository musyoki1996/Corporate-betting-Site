import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  MatchFixture, 
  BetSelection, 
  BetTicket, 
  WalletTransaction, 
  JackpotCompetition, 
  UserProfile, 
  SportId 
} from '../types/sportsbook';
import { INITIAL_FIXTURES, JACKPOT_COMPETITIONS } from '../data/mockSportsData';

interface SportsbookContextType {
  user: UserProfile | null;
  setUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  activeTab: 'home' | 'live' | 'sports' | 'jackpot' | 'promotions' | 'account' | 'admin';
  setActiveTab: (tab: 'home' | 'live' | 'sports' | 'jackpot' | 'promotions' | 'account' | 'admin') => void;
  selectedSport: SportId;
  setSelectedSport: (sport: SportId) => void;
  selectedLeagueFilter: string;
  setSelectedLeagueFilter: (league: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  fixtures: MatchFixture[];
  activeMatchDetail: MatchFixture | null;
  setActiveMatchDetail: (fixture: MatchFixture | null) => void;
  
  // Bet Slip
  betSlip: BetSelection[];
  betType: 'single' | 'multi' | 'system';
  setBetType: (type: 'single' | 'multi' | 'system') => void;
  stake: number;
  setStake: (amount: number) => void;
  addSelection: (selection: BetSelection) => void;
  removeSelection: (matchId: string, marketName: string) => void;
  clearBetSlip: () => void;
  isSelectionInSlip: (matchId: string, marketName: string, selectionName: string) => boolean;
  totalOdds: number;
  multibetBonusPercent: number;
  grossPayout: number;
  withholdingTax: number;
  netPayout: number;
  placeBet: () => { success: boolean; message: string; ticket?: BetTicket };
  
  // Bets & Transactions
  betHistory: BetTicket[];
  cashOutBet: (ticketId: string) => { success: boolean; amount: number; message: string };
  transactions: WalletTransaction[];
  depositMpesa: (amount: number, phone: string) => Promise<{ success: boolean; message: string }>;
  withdrawMpesa: (amount: number, phone: string) => Promise<{ success: boolean; message: string }>;
  
  // Jackpots
  jackpots: JackpotCompetition[];
  activeJackpotPicks: Record<string, '1' | 'X' | '2'>; // fixtureId -> selection
  setJackpotPick: (fixtureId: string, pick: '1' | 'X' | '2') => void;
  quickPickJackpot: (jackpotId: string) => void;
  clearJackpotPicks: () => void;
  placeJackpotTicket: (jackpotId: string) => { success: boolean; message: string };
  
  // UI states
  isBetSlipOpenMobile: boolean;
  setIsBetSlipOpenMobile: (open: boolean) => void;
  showDepositModal: boolean;
  setShowDepositModal: (open: boolean) => void;
  showLoginModal: boolean;
  setShowLoginModal: (open: boolean) => void;
  
  // Admin Operations
  adminStats: {
    totalAccounts: number;
    activeToday: number;
    totalDepositsKes: number;
    totalPayoutsKes: number;
    ggrKes: number;
    openTicketsCount: number;
  };
  updateMatchScore: (matchId: string, home: number, away: number) => void;
  addMatchLiveEvent: (matchId: string, description: string, type: 'goal' | 'yellow_card' | 'red_card' | 'corner', team: 'home' | 'away') => void;
  settleFixture: (matchId: string, winningOutcome: '1' | 'X' | '2') => void;
  updateOddDirectly: (matchId: string, marketId: string, oddId: string, newOdd: number) => void;
}

const SportsbookContext = createContext<SportsbookContextType | undefined>(undefined);

export const SportsbookProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>({
    id: 'wazo-usr-981',
    fullName: 'Kiprono Mwangi',
    phoneNumber: '+254 712 345 678',
    email: 'kiprono.mwangi@wazobet.co.ke',
    nationalIdMasked: '3349****',
    isVerified: true,
    balanceKes: 14850,
    bonusBalanceKes: 2500,
    joinedDate: 'Jan 2026',
    dailyDepositLimitKes: 50000,
    selfExclusionActive: false,
    realityCheckMinutes: 60,
  });

  const [activeTab, setActiveTab] = useState<'home' | 'live' | 'sports' | 'jackpot' | 'promotions' | 'account' | 'admin'>('home');
  const [selectedSport, setSelectedSport] = useState<SportId>('football');
  const [selectedLeagueFilter, setSelectedLeagueFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const [fixtures, setFixtures] = useState<MatchFixture[]>(INITIAL_FIXTURES);
  const [activeMatchDetail, setActiveMatchDetail] = useState<MatchFixture | null>(INITIAL_FIXTURES[0]);

  // Bet slip state
  const [betSlip, setBetSlip] = useState<BetSelection[]>([]);
  const [betType, setBetType] = useState<'single' | 'multi' | 'system'>('multi');
  const [stake, setStake] = useState<number>(200);

  // UI modals
  const [isBetSlipOpenMobile, setIsBetSlipOpenMobile] = useState<boolean>(false);
  const [showDepositModal, setShowDepositModal] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

  // Jackpot picks
  const [jackpots] = useState<JackpotCompetition[]>(JACKPOT_COMPETITIONS);
  const [activeJackpotPicks, setActiveJackpotPicks] = useState<Record<string, '1' | 'X' | '2'>>({});

  // Bet History
  const [betHistory, setBetHistory] = useState<BetTicket[]>([
    {
      id: 'WZ-882914',
      placedAt: 'Today, 14:15 EAT',
      betType: 'multi',
      stake: 500,
      totalOdds: 4.82,
      multibetBonusPercent: 15,
      grossPayout: 2771.50,
      withholdingTax: 454.30,
      netPayout: 2317.20,
      status: 'open',
      cashoutAvailable: true,
      cashoutAmount: 620,
      selections: [
        {
          matchId: 'kpl-01',
          matchTeams: 'Gor Mahia FC vs AFC Leopards',
          league: 'FKF Premier League',
          marketName: '1X2 (Full Time)',
          selectionName: '1 (Gor Mahia)',
          odd: 1.34,
          isLive: true,
          kickoffTime: 'Today, 16:00',
        },
        {
          matchId: 'ucl-01',
          matchTeams: 'Arsenal FC vs Bayern Munich',
          league: 'UEFA Champions League',
          marketName: 'Both Teams to Score',
          selectionName: 'Yes (GG)',
          odd: 1.62,
          isLive: false,
          kickoffTime: 'Tonight, 22:00',
        },
        {
          matchId: 'laliga-01',
          matchTeams: 'Real Madrid vs Barcelona',
          league: 'La Liga (Spain)',
          marketName: '1X2 (Full Time)',
          selectionName: '1 (Real Madrid)',
          odd: 2.10,
          isLive: false,
          kickoffTime: 'Sunday, 22:00',
        },
      ],
    },
    {
      id: 'WZ-874019',
      placedAt: 'Yesterday, 20:30 EAT',
      betType: 'single',
      stake: 1000,
      totalOdds: 2.35,
      multibetBonusPercent: 0,
      grossPayout: 2350,
      withholdingTax: 270,
      netPayout: 2080,
      status: 'won',
      selections: [
        {
          matchId: 'past-01',
          matchTeams: 'Chelsea vs Newcastle',
          league: 'English Premier League',
          marketName: 'Over/Under 2.5',
          selectionName: 'Over 2.5',
          odd: 2.35,
          isLive: false,
          kickoffTime: 'Settled (3-2)',
        },
      ],
    },
  ]);

  // Transactions
  const [transactions, setTransactions] = useState<WalletTransaction[]>([
    {
      id: 'TXN-001',
      type: 'deposit',
      amount: 5000,
      method: 'M-PESA',
      reference: 'RKH9948271',
      timestamp: 'Today, 11:20 EAT',
      status: 'completed',
      phoneOrAccount: '0712***678',
    },
    {
      id: 'TXN-002',
      type: 'bet_won',
      amount: 2080,
      method: 'SYSTEM',
      reference: 'BET-WZ-874019',
      timestamp: 'Yesterday, 22:45 EAT',
      status: 'completed',
    },
    {
      id: 'TXN-003',
      type: 'deposit',
      amount: 10000,
      method: 'M-PESA',
      reference: 'QJH2948110',
      timestamp: '2 days ago',
      status: 'completed',
      phoneOrAccount: '0712***678',
    },
  ]);

  // Live simulation ticker for realism
  useEffect(() => {
    const timer = setInterval(() => {
      setFixtures((prev) =>
        prev.map((f) => {
          if (!f.isLive || f.status !== 'live') return f;
          
          const newMinute = (f.liveMinute || 0) + 1;
          if (newMinute >= 94) {
            return { ...f, liveMinute: 90, status: 'finished', isLive: false };
          }

          // Random subtle live pitch shifts
          const phases: MatchFixture['pitchPhase'][] = [
            'Home Dangerous Attack',
            'Midfield Battle',
            'Away Dangerous Attack',
            'Corner Kick',
            'Penalty Box Action',
          ];
          const randomPhase = phases[Math.floor(Math.random() * phases.length)];

          // 2% chance of dynamic odds shift during live in-play
          const updatedMarkets = f.markets.map((m) => {
            if (m.id === '1x2' && Math.random() < 0.15) {
              return {
                ...m,
                odds: m.odds.map((o) => {
                  const delta = (Math.random() - 0.5) * 0.08;
                  const newOdd = Math.max(1.05, Number((o.odd + delta).toFixed(2)));
                  const shift: 'up' | 'down' | null = newOdd > o.odd ? 'up' : newOdd < o.odd ? 'down' : null;
                  return {
                    ...o,
                    previousOdd: o.odd,
                    oddShift: shift,
                    odd: newOdd,
                  };
                }),
              };
            }
            return m;
          });

          return {
            ...f,
            liveMinute: newMinute,
            pitchPhase: randomPhase,
            markets: updatedMarkets,
          };
        })
      );
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  // Update activeMatchDetail when fixtures update
  useEffect(() => {
    if (activeMatchDetail) {
      const refreshed = fixtures.find((f) => f.id === activeMatchDetail.id);
      if (refreshed) {
        setActiveMatchDetail(refreshed);
      }
    }
  }, [fixtures]);

  // Bet Selection handlers
  const addSelection = (selection: BetSelection) => {
    setBetSlip((prev) => {
      // If same match and market exists, replace it
      const filtered = prev.filter(
        (s) => !(s.matchId === selection.matchId && s.marketName === selection.marketName)
      );
      // If clicking same odd again, toggle off
      const alreadySame = prev.some(
        (s) =>
          s.matchId === selection.matchId &&
          s.marketName === selection.marketName &&
          s.selectionName === selection.selectionName
      );
      if (alreadySame) {
        return filtered;
      }
      return [...filtered, selection];
    });
  };

  const removeSelection = (matchId: string, marketName: string) => {
    setBetSlip((prev) => prev.filter((s) => !(s.matchId === matchId && s.marketName === marketName)));
  };

  const clearBetSlip = () => {
    setBetSlip([]);
  };

  const isSelectionInSlip = (matchId: string, marketName: string, selectionName: string) => {
    return betSlip.some(
      (s) => s.matchId === matchId && s.marketName === marketName && s.selectionName === selectionName
    );
  };

  // Calculations for odds, multibet bonuses, Kenyan excise and withholding tax
  const totalOdds = Number(
    betSlip.length === 0
      ? 1
      : betSlip.reduce((acc, curr) => acc * curr.odd, 1).toFixed(2)
  );

  // Wazobet Multibet Win Boost:
  // 3 legs: +5%, 4 legs: +10%, 5 legs: +15%, 7 legs: +25%, 10+ legs: +50%, 15+ legs: +100%
  const getMultibetBonus = (legsCount: number) => {
    if (legsCount < 3) return 0;
    if (legsCount === 3) return 5;
    if (legsCount === 4) return 10;
    if (legsCount === 5) return 15;
    if (legsCount <= 8) return 25;
    if (legsCount <= 12) return 50;
    return 100;
  };

  const multibetBonusPercent = betSlip.length >= 2 ? getMultibetBonus(betSlip.length) : 0;
  
  const rawWin = stake * totalOdds;
  const bonusAmount = rawWin * (multibetBonusPercent / 100);
  const grossPayout = Number((rawWin + bonusAmount).toFixed(2));
  
  // Kenyan Withholding Tax (WHT): 20% on net winnings (grossPayout - stake)
  const netWinnings = Math.max(0, grossPayout - stake);
  const withholdingTax = Number((netWinnings * 0.20).toFixed(2));
  const netPayout = Number((grossPayout - withholdingTax).toFixed(2));

  // Place bet action
  const placeBet = () => {
    if (betSlip.length === 0) {
      return { success: false, message: 'Please add selections to your betting slip.' };
    }
    if (stake < 20) {
      return { success: false, message: 'Minimum stake is KES 20.' };
    }
    if (!user) {
      setShowLoginModal(true);
      return { success: false, message: 'Please log in to place your bet.' };
    }
    if (user.balanceKes < stake) {
      setShowDepositModal(true);
      return { success: false, message: 'Insufficient balance. Please deposit via M-Pesa.' };
    }

    const ticketId = `WZ-${Math.floor(100000 + Math.random() * 900000)}`;
    const newTicket: BetTicket = {
      id: ticketId,
      placedAt: 'Just now',
      selections: [...betSlip],
      betType: betSlip.length > 1 ? 'multi' : 'single',
      stake,
      totalOdds,
      multibetBonusPercent,
      grossPayout,
      withholdingTax,
      netPayout,
      status: 'open',
      cashoutAvailable: true,
      cashoutAmount: Number((stake * 0.95).toFixed(2)),
    };

    // Deduct balance & record transaction
    setUser((prev) => (prev ? { ...prev, balanceKes: prev.balanceKes - stake } : null));

    const newTxn: WalletTransaction = {
      id: `TXN-${Date.now().toString().slice(-4)}`,
      type: 'bet_placed',
      amount: stake,
      method: 'SYSTEM',
      reference: `BET-${ticketId}`,
      timestamp: 'Just now',
      status: 'completed',
    };

    setTransactions((prev) => [newTxn, ...prev]);
    setBetHistory((prev) => [newTicket, ...prev]);
    setBetSlip([]);

    // Celebrate with confetti
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#38E000', '#FFC400', '#ffffff'],
    });

    return {
      success: true,
      message: `Bet Placed Successfully! Ticket #${ticketId}`,
      ticket: newTicket,
    };
  };

  // Cash out bet
  const cashOutBet = (ticketId: string) => {
    const ticket = betHistory.find((t) => t.id === ticketId);
    if (!ticket || ticket.status !== 'open' || !ticket.cashoutAmount) {
      return { success: false, amount: 0, message: 'Cashout is not available for this ticket.' };
    }

    const payout = ticket.cashoutAmount;
    setBetHistory((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, status: 'cashed_out', cashoutAvailable: false } : t))
    );

    setUser((prev) => (prev ? { ...prev, balanceKes: prev.balanceKes + payout } : null));

    const newTxn: WalletTransaction = {
      id: `TXN-${Date.now().toString().slice(-4)}`,
      type: 'cashout',
      amount: payout,
      method: 'SYSTEM',
      reference: `CASHOUT-${ticketId}`,
      timestamp: 'Just now',
      status: 'completed',
    };
    setTransactions((prev) => [newTxn, ...prev]);

    return {
      success: true,
      amount: payout,
      message: `Cash Out successful! KES ${payout.toLocaleString()} added to your balance.`,
    };
  };

  // Deposit via M-Pesa STK push simulation
  const depositMpesa = async (amount: number, phone: string) => {
    return new Promise<{ success: boolean; message: string }>((resolve) => {
      setTimeout(() => {
        const ref = `QKH${Math.floor(1000000 + Math.random() * 9000000)}`;
        setUser((prev) => (prev ? { ...prev, balanceKes: prev.balanceKes + amount } : null));

        const newTxn: WalletTransaction = {
          id: `TXN-${Date.now().toString().slice(-4)}`,
          type: 'deposit',
          amount,
          method: 'M-PESA',
          reference: ref,
          timestamp: 'Just now',
          status: 'completed',
          phoneOrAccount: phone,
        };
        setTransactions((prev) => [newTxn, ...prev]);

        confetti({
          particleCount: 50,
          spread: 50,
          colors: ['#38E000', '#FFC400'],
        });

        resolve({
          success: true,
          message: `M-Pesa STK Push Completed! Confirmed KES ${amount.toLocaleString()} received from ${phone}. Ref: ${ref}`,
        });
      }, 1200);
    });
  };

  // Withdraw via M-Pesa simulation
  const withdrawMpesa = async (amount: number, phone: string) => {
    return new Promise<{ success: boolean; message: string }>((resolve) => {
      setTimeout(() => {
        if (!user || user.balanceKes < amount) {
          resolve({ success: false, message: 'Insufficient funds.' });
          return;
        }

        setUser((prev) => (prev ? { ...prev, balanceKes: prev.balanceKes - amount } : null));
        const ref = `WDL${Math.floor(1000000 + Math.random() * 9000000)}`;

        const newTxn: WalletTransaction = {
          id: `TXN-${Date.now().toString().slice(-4)}`,
          type: 'withdrawal',
          amount,
          method: 'M-PESA',
          reference: ref,
          timestamp: 'Just now',
          status: 'completed',
          phoneOrAccount: phone,
        };
        setTransactions((prev) => [newTxn, ...prev]);

        resolve({
          success: true,
          message: `Withdrawal initiated! KES ${amount.toLocaleString()} sent instantly to M-Pesa ${phone}. Ref: ${ref}`,
        });
      }, 1000);
    });
  };

  // Jackpot pick handlers
  const setJackpotPick = (fixtureId: string, pick: '1' | 'X' | '2') => {
    setActiveJackpotPicks((prev) => ({
      ...prev,
      [fixtureId]: prev[fixtureId] === pick ? ('' as any) : pick,
    }));
  };

  const quickPickJackpot = (jackpotId: string) => {
    const comp = jackpots.find((j) => j.id === jackpotId);
    if (!comp) return;

    const outcomes: ('1' | 'X' | '2')[] = ['1', 'X', '2'];
    const newPicks: Record<string, '1' | 'X' | '2'> = {};
    comp.fixtures.forEach((f) => {
      // slight weighted realistic choice
      const randomOutcome = outcomes[Math.floor(Math.random() * outcomes.length)];
      newPicks[f.id] = randomOutcome;
    });
    setActiveJackpotPicks(newPicks);
  };

  const clearJackpotPicks = () => {
    setActiveJackpotPicks({});
  };

  const placeJackpotTicket = (jackpotId: string) => {
    const comp = jackpots.find((j) => j.id === jackpotId);
    if (!comp) return { success: false, message: 'Jackpot not found' };

    const pickedCount = Object.values(activeJackpotPicks).filter(Boolean).length;
    if (pickedCount < comp.matchesCount) {
      return {
        success: false,
        message: `Please predict all ${comp.matchesCount} matches. Currently selected: ${pickedCount}/${comp.matchesCount}`,
      };
    }

    if (!user || user.balanceKes < comp.ticketPriceKes) {
      setShowDepositModal(true);
      return {
        success: false,
        message: `Insufficient balance for jackpot entry (KES ${comp.ticketPriceKes}). Please deposit via M-Pesa.`,
      };
    }

    // Deduct ticket fee
    setUser((prev) => (prev ? { ...prev, balanceKes: prev.balanceKes - comp.ticketPriceKes } : null));

    const jackpotRef = `JKP-${Math.floor(100000 + Math.random() * 900000)}`;
    const newTxn: WalletTransaction = {
      id: `TXN-${Date.now().toString().slice(-4)}`,
      type: 'bet_placed',
      amount: comp.ticketPriceKes,
      method: 'SYSTEM',
      reference: jackpotRef,
      timestamp: 'Just now',
      status: 'completed',
    };
    setTransactions((prev) => [newTxn, ...prev]);

    confetti({
      particleCount: 120,
      spread: 80,
      colors: ['#FFC400', '#38E000', '#03133D'],
    });

    clearJackpotPicks();

    return {
      success: true,
      message: `Mega Jackpot Entry Confirmed! Ticket #${jackpotRef}. Good luck!`,
    };
  };

  // Admin Dashboard operations
  const updateMatchScore = (matchId: string, home: number, away: number) => {
    setFixtures((prev) =>
      prev.map((f) => {
        if (f.id === matchId) {
          return {
            ...f,
            liveScore: [home, away],
            isLive: true,
            status: 'live',
          };
        }
        return f;
      })
    );
  };

  const addMatchLiveEvent = (
    matchId: string,
    description: string,
    type: 'goal' | 'yellow_card' | 'red_card' | 'corner',
    team: 'home' | 'away'
  ) => {
    setFixtures((prev) =>
      prev.map((f) => {
        if (f.id === matchId) {
          const newEvent = {
            id: `evt-${Date.now()}`,
            minute: f.liveMinute || 70,
            type,
            team,
            description,
          };
          let updatedScore = f.liveScore || [0, 0];
          if (type === 'goal') {
            updatedScore = team === 'home' ? [updatedScore[0] + 1, updatedScore[1]] : [updatedScore[0], updatedScore[1] + 1];
          }
          return {
            ...f,
            liveScore: updatedScore,
            events: [newEvent, ...(f.events || [])],
          };
        }
        return f;
      })
    );
  };

  const settleFixture = (matchId: string, winningOutcome: '1' | 'X' | '2') => {
    setFixtures((prev) =>
      prev.map((f) => (f.id === matchId ? { ...f, status: 'finished', isLive: false } : f))
    );

    // Auto-settle any user open bets with this fixture
    setBetHistory((prev) =>
      prev.map((ticket) => {
        if (ticket.status !== 'open') return ticket;
        const matchingSelection = ticket.selections.find((s) => s.matchId === matchId);
        if (!matchingSelection) return ticket;

        const isWin =
          (winningOutcome === '1' && matchingSelection.selectionName.includes('1')) ||
          (winningOutcome === 'X' && matchingSelection.selectionName.includes('X')) ||
          (winningOutcome === '2' && matchingSelection.selectionName.includes('2'));

        if (isWin) {
          // If all selections are settled/won, credit user
          setUser((u) => (u ? { ...u, balanceKes: u.balanceKes + ticket.netPayout } : null));
          return { ...ticket, status: 'won', cashoutAvailable: false };
        } else {
          return { ...ticket, status: 'lost', cashoutAvailable: false };
        }
      })
    );
  };

  const updateOddDirectly = (matchId: string, marketId: string, oddId: string, newOdd: number) => {
    setFixtures((prev) =>
      prev.map((f) => {
        if (f.id !== matchId) return f;
        return {
          ...f,
          markets: f.markets.map((m) => {
            if (m.id !== marketId) return m;
            return {
              ...m,
              odds: m.odds.map((o) => {
                if (o.id !== oddId) return o;
                return {
                  ...o,
                  previousOdd: o.odd,
                  odd: newOdd,
                  oddShift: newOdd > o.odd ? 'up' : 'down',
                };
              }),
            };
          }),
        };
      })
    );
  };

  const adminStats = {
    totalAccounts: 248920,
    activeToday: 41850,
    totalDepositsKes: 184500000,
    totalPayoutsKes: 142100000,
    ggrKes: 42400000,
    openTicketsCount: betHistory.filter((b) => b.status === 'open').length + 8420,
  };

  return (
    <SportsbookContext.Provider
      value={{
        user,
        setUser,
        activeTab,
        setActiveTab,
        selectedSport,
        setSelectedSport,
        selectedLeagueFilter,
        setSelectedLeagueFilter,
        searchQuery,
        setSearchQuery,
        fixtures,
        activeMatchDetail,
        setActiveMatchDetail,
        betSlip,
        betType,
        setBetType,
        stake,
        setStake,
        addSelection,
        removeSelection,
        clearBetSlip,
        isSelectionInSlip,
        totalOdds,
        multibetBonusPercent,
        grossPayout,
        withholdingTax,
        netPayout,
        placeBet,
        betHistory,
        cashOutBet,
        transactions,
        depositMpesa,
        withdrawMpesa,
        jackpots,
        activeJackpotPicks,
        setJackpotPick,
        quickPickJackpot,
        clearJackpotPicks,
        placeJackpotTicket,
        isBetSlipOpenMobile,
        setIsBetSlipOpenMobile,
        showDepositModal,
        setShowDepositModal,
        showLoginModal,
        setShowLoginModal,
        adminStats,
        updateMatchScore,
        addMatchLiveEvent,
        settleFixture,
        updateOddDirectly,
      }}
    >
      {children}
    </SportsbookContext.Provider>
  );
};

export const useSportsbook = () => {
  const context = useContext(SportsbookContext);
  if (!context) {
    throw new Error('useSportsbook must be used within a SportsbookProvider');
  }
  return context;
};
