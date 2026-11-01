/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SportsbookProvider, useSportsbook } from './context/SportsbookContext';
import { Header } from './components/layout/Header';
import { SportsSubNav } from './components/layout/SportsSubNav';
import { Footer } from './components/layout/Footer';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { BetSlip } from './components/betslip/BetSlip';
import { HomeView } from './components/home/HomeView';
import { LiveCenter } from './components/live/LiveCenter';
import { SportsLobby } from './components/sports/SportsLobby';
import { JackpotView } from './components/jackpot/JackpotView';
import { PromotionsView } from './components/promotions/PromotionsView';
import { AccountModal } from './components/account/AccountModal';
import { DepositModal } from './components/account/DepositModal';
import { AuthModal } from './components/auth/AuthModal';
import { AdminPortal } from './components/admin/AdminPortal';

const MainSportsbookContent: React.FC = () => {
  const { activeTab, isBetSlipOpenMobile, setIsBetSlipOpenMobile } = useSportsbook();

  return (
    <div className="min-h-screen flex flex-col bg-[#03133D] text-white">
      {/* 1. Official Header */}
      <Header />

      {/* 2. Sports Rail & Sub-Navigation */}
      <SportsSubNav />

      {/* 3. Main Body Grid */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Content Area (8 cols on lg if slip open, 12 cols for admin) */}
          <div className={activeTab === 'admin' ? 'lg:col-span-12' : 'lg:col-span-8'}>
            {activeTab === 'home' && <HomeView />}
            {activeTab === 'live' && <LiveCenter />}
            {activeTab === 'sports' && <SportsLobby />}
            {activeTab === 'jackpot' && <JackpotView />}
            {activeTab === 'promotions' && <PromotionsView />}
            {activeTab === 'account' && <AccountModal />}
            {activeTab === 'admin' && <AdminPortal />}
          </div>

          {/* Desktop Right Sidebar: Sticky Advanced Bet Slip */}
          {activeTab !== 'admin' && (
            <aside className="hidden lg:block lg:col-span-4 sticky top-24">
              <BetSlip />
            </aside>
          )}
        </div>
      </main>

      {/* 4. Mobile Drawer Bet Slip Sheet */}
      {isBetSlipOpenMobile && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex flex-col justify-end">
          <div 
            className="w-full max-h-[85vh] bg-[#071B49] rounded-t-3xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-200"
          >
            {/* Grab Handle */}
            <div 
              onClick={() => setIsBetSlipOpenMobile(false)}
              className="w-12 h-1.5 bg-slate-600 rounded-full mx-auto my-3 cursor-pointer"
            />
            <div className="p-2">
              <BetSlip />
            </div>
          </div>
        </div>
      )}

      {/* 5. Mobile Fixed Bottom Navigation */}
      <MobileBottomNav />

      {/* 6. Kenyan Payments & Auth Modals */}
      <DepositModal />
      <AuthModal />

      {/* 7. African Sportsbook Footer & Regulatory Badges */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <SportsbookProvider>
      <MainSportsbookContent />
    </SportsbookProvider>
  );
}
