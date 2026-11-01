import React from 'react';
import { WazobetLogo } from '../brand/WazobetLogo';
import { useSportsbook } from '../../context/SportsbookContext';
import { 
  Radio, 
  Trophy, 
  Flame, 
  ShieldCheck, 
  Wallet, 
  Plus, 
  User, 
  Menu, 
  X,
  Search,
  SlidersHorizontal,
  ChevronDown,
  LogOut
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    user, 
    setUser, 
    activeTab, 
    setActiveTab, 
    setShowDepositModal, 
    setShowLoginModal,
    fixtures,
    betHistory,
    searchQuery,
    setSearchQuery
  } = useSportsbook();

  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = React.useState(false);

  const liveMatchesCount = fixtures.filter((f) => f.isLive).length;
  const openBetsCount = betHistory.filter((b) => b.status === 'open').length;

  return (
    <header className="sticky top-0 z-40 bg-[#03133D]/95 backdrop-blur-md border-b border-[#182C5E]">
      {/* Top micro announcement bar (Responsible Gambling / M-Pesa Info) */}
      <div className="bg-[#020B24] border-b border-[#14234b] px-4 py-1 text-[11px] text-slate-400 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-[#FFC400] font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFC400]" />
            M-PESA PAYBILL: <strong className="text-white tracking-wider">888222</strong>
          </span>
          <span className="hidden sm:inline text-slate-500">|</span>
          <span className="hidden sm:inline">BCLB License No: 0000482</span>
          <span className="hidden md:inline text-slate-500">|</span>
          <span className="hidden md:inline">Strictly 18+ · Play Responsibly</span>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setActiveTab('admin')}
            className={`text-[11px] font-medium transition-colors flex items-center gap-1 ${
              activeTab === 'admin' ? 'text-[#38E000]' : 'text-slate-400 hover:text-white'
            }`}
          >
            <SlidersHorizontal className="w-3 h-3" />
            <span>Admin Portal</span>
          </button>
          <span className="text-slate-500">|</span>
          <span className="text-slate-300 font-mono">KES (Kenya)</span>
        </div>
      </div>

      {/* Main Header Row - 3 Zone Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-6">
        {/* Zone 1: Brand Wordmark */}
        <div 
          onClick={() => { setActiveTab('home'); }}
          className="flex items-center gap-3 cursor-pointer shrink-0"
        >
          <WazobetLogo variant="full" />
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold tracking-wide">
          <button
            onClick={() => setActiveTab('home')}
            className={`transition-colors whitespace-nowrap py-1 relative ${
              activeTab === 'home' ? 'text-[#38E000]' : 'text-slate-200 hover:text-white'
            }`}
          >
            Home
            {activeTab === 'home' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#38E000]" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('live')}
            className={`transition-colors whitespace-nowrap py-1 relative flex items-center gap-1.5 ${
              activeTab === 'live' ? 'text-[#38E000]' : 'text-slate-200 hover:text-white'
            }`}
          >
            <Radio className="w-3.5 h-3.5 text-[#38E000] animate-pulse" />
            <span>Live Betting</span>
            {liveMatchesCount > 0 && (
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-red-600 text-white font-mono">
                {liveMatchesCount}
              </span>
            )}
            {activeTab === 'live' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#38E000]" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('sports')}
            className={`transition-colors whitespace-nowrap py-1 relative ${
              activeTab === 'sports' ? 'text-[#38E000]' : 'text-slate-200 hover:text-white'
            }`}
          >
            Sports
            {activeTab === 'sports' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#38E000]" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('jackpot')}
            className={`transition-colors whitespace-nowrap py-1 relative flex items-center gap-1 text-[#FFC400] hover:text-[#ffd54f] ${
              activeTab === 'jackpot' ? 'font-bold' : ''
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Jackpot 150M</span>
            {activeTab === 'jackpot' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FFC400]" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('promotions')}
            className={`transition-colors whitespace-nowrap py-1 relative flex items-center gap-1 ${
              activeTab === 'promotions' ? 'text-[#38E000]' : 'text-slate-200 hover:text-white'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-[#FFC400]" />
            <span>Promotions</span>
            {activeTab === 'promotions' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#38E000]" />
            )}
          </button>
        </nav>

        {/* Zone 3: Primary Action & Wallet */}
        <div className="flex items-center gap-3 shrink-0">
          {user ? (
            <div className="flex items-center gap-2.5">
              {/* Account Balance Widget */}
              <div 
                onClick={() => setActiveTab('account')}
                className="hidden sm:flex flex-col items-end cursor-pointer px-3 py-1.5 rounded-lg bg-[#071B49] border border-[#182C5E] hover:border-[#38E000]/50 transition-colors"
              >
                <div className="text-[10px] text-slate-400 font-medium tracking-tight">Main Balance</div>
                <div className="text-sm font-bold text-white font-mono tabular-nums">
                  KES {user.balanceKes.toLocaleString()}
                </div>
              </div>

              {/* Deposit CTA Button - Electric Green */}
              <button
                onClick={() => setShowDepositModal(true)}
                className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-lg bg-[#38E000] hover:bg-[#62F500] text-black font-extrabold text-xs sm:text-sm tracking-tight shadow-lg shadow-[#38E000]/20 active:scale-95 transition-all whitespace-nowrap"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>DEPOSIT</span>
              </button>

              {/* Profile dropdown trigger */}
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-1.5 p-2 rounded-lg bg-[#071B49] border border-[#182C5E] hover:bg-[#0D204B] transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-[#182C5E] text-[#38E000] font-bold flex items-center justify-center text-xs">
                    {user.fullName.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-xl bg-[#071B49] border border-[#182C5E] shadow-2xl py-2 z-50">
                    <div className="px-4 py-2 border-b border-[#182C5E]">
                      <div className="font-bold text-sm text-white truncate">{user.fullName}</div>
                      <div className="text-xs text-slate-400 font-mono">{user.phoneNumber}</div>
                      <div className="mt-2 text-xs text-[#38E000] font-semibold flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Verified Account</span>
                      </div>
                    </div>

                    <div className="py-1 text-xs">
                      <button
                        onClick={() => { setActiveTab('account'); setProfileDropdownOpen(false); }}
                        className="w-full text-left px-4 py-2 hover:bg-[#0D204B] text-slate-200 hover:text-white flex items-center justify-between"
                      >
                        <span className="flex items-center gap-2">
                          <User className="w-4 h-4 text-slate-400" />
                          <span>My Profile & Wallet</span>
                        </span>
                        <span className="font-mono text-[11px] text-slate-400">KES {user.balanceKes.toLocaleString()}</span>
                      </button>

                      <button
                        onClick={() => { setActiveTab('account'); setProfileDropdownOpen(false); }}
                        className="w-full text-left px-4 py-2 hover:bg-[#0D204B] text-slate-200 hover:text-white flex items-center justify-between"
                      >
                        <span className="flex items-center gap-2">
                          <Wallet className="w-4 h-4 text-slate-400" />
                          <span>Betting History</span>
                        </span>
                        {openBetsCount > 0 && (
                          <span className="px-1.5 py-0.5 rounded bg-[#38E000] text-black font-bold text-[10px]">
                            {openBetsCount} Open
                          </span>
                        )}
                      </button>
                    </div>

                    <div className="pt-1 border-t border-[#182C5E]">
                      <button
                        onClick={() => { setUser(null); setProfileDropdownOpen(false); }}
                        className="w-full text-left px-4 py-2 hover:bg-[#0D204B] text-red-400 hover:text-red-300 flex items-center gap-2 text-xs"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowLoginModal(true)}
                className="px-3.5 py-2 rounded-lg text-xs font-bold text-white hover:bg-[#071B49] border border-transparent hover:border-[#182C5E] transition-colors"
              >
                Log In
              </button>
              <button
                onClick={() => setShowLoginModal(true)}
                className="px-4 py-2 rounded-lg bg-[#38E000] hover:bg-[#62F500] text-black font-extrabold text-xs tracking-tight shadow-md transition-transform active:scale-95"
              >
                Register
              </button>
            </div>
          )}

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white bg-[#071B49] border border-[#182C5E]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#071B49] border-b border-[#182C5E] px-4 py-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search team, league or sport..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#03133D] border border-[#182C5E] text-sm text-white focus:outline-none focus:border-[#38E000]"
            />
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <button
              onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}
              className={`p-2.5 rounded-lg text-left font-medium ${
                activeTab === 'home' ? 'bg-[#38E000] text-black font-bold' : 'bg-[#03133D] text-slate-200'
              }`}
            >
              ⚽ Home
            </button>
            <button
              onClick={() => { setActiveTab('live'); setMobileMenuOpen(false); }}
              className={`p-2.5 rounded-lg text-left font-medium flex items-center justify-between ${
                activeTab === 'live' ? 'bg-[#38E000] text-black font-bold' : 'bg-[#03133D] text-slate-200'
              }`}
            >
              <span>🔴 Live Betting</span>
              <span className="text-xs bg-red-600 text-white px-1.5 py-0.5 rounded">{liveMatchesCount}</span>
            </button>
            <button
              onClick={() => { setActiveTab('sports'); setMobileMenuOpen(false); }}
              className={`p-2.5 rounded-lg text-left font-medium ${
                activeTab === 'sports' ? 'bg-[#38E000] text-black font-bold' : 'bg-[#03133D] text-slate-200'
              }`}
            >
              🏆 Sports Directory
            </button>
            <button
              onClick={() => { setActiveTab('jackpot'); setMobileMenuOpen(false); }}
              className={`p-2.5 rounded-lg text-left font-bold ${
                activeTab === 'jackpot' ? 'bg-[#FFC400] text-black' : 'bg-[#03133D] text-[#FFC400]'
              }`}
            >
              👑 Supa 17 Jackpot
            </button>
            <button
              onClick={() => { setActiveTab('promotions'); setMobileMenuOpen(false); }}
              className={`p-2.5 rounded-lg text-left font-medium ${
                activeTab === 'promotions' ? 'bg-[#38E000] text-black font-bold' : 'bg-[#03133D] text-slate-200'
              }`}
            >
              🎁 Promotions
            </button>
            <button
              onClick={() => { setActiveTab('account'); setMobileMenuOpen(false); }}
              className={`p-2.5 rounded-lg text-left font-medium ${
                activeTab === 'account' ? 'bg-[#38E000] text-black font-bold' : 'bg-[#03133D] text-slate-200'
              }`}
            >
              👤 My Account
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
