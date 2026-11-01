import React from 'react';
import { WazobetLogo } from '../brand/WazobetLogo';
import { ShieldCheck, PhoneCall, HelpCircle, CheckCircle2 } from 'lucide-react';
import { useSportsbook } from '../../context/SportsbookContext';

export const Footer: React.FC = () => {
  const { setActiveTab } = useSportsbook();

  return (
    <footer className="bg-[#020B24] border-t border-[#182C5E] text-slate-400 text-xs mt-12 pb-24 lg:pb-12">
      {/* Upper Footer: Partner Badges & Quick Links */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <WazobetLogo variant="full" showSlogan={true} />
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              WAZOBET is Kenya's premier sports betting and entertainment platform. Experience lightning-fast live betting, instant M-Pesa deposits and withdrawals, boosted accumulator odds, and Africa's biggest jackpot prizes.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#071B49] border border-[#182C5E] text-slate-300">
                <span className="w-2 h-2 rounded-full bg-[#38E000]" />
                <span className="font-semibold text-[11px]">Safaricom M-PESA</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#071B49] border border-[#182C5E] text-slate-300">
                <span className="font-semibold text-[11px] text-red-400">Airtel Money</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2.5">
            <h4 className="text-white font-bold text-sm tracking-wide">Sports Markets</h4>
            <ul className="space-y-1.5">
              <li><button onClick={() => setActiveTab('sports')} className="hover:text-white transition-colors">FKF Premier League</button></li>
              <li><button onClick={() => setActiveTab('sports')} className="hover:text-white transition-colors">English Premier League</button></li>
              <li><button onClick={() => setActiveTab('sports')} className="hover:text-white transition-colors">UEFA Champions League</button></li>
              <li><button onClick={() => setActiveTab('live')} className="hover:text-white transition-colors">Live In-Play Betting</button></li>
              <li><button onClick={() => setActiveTab('jackpot')} className="hover:text-white transition-colors">Supa 17 Mega Jackpot</button></li>
            </ul>
          </div>

          {/* Help & How to Bet */}
          <div className="space-y-2.5">
            <h4 className="text-white font-bold text-sm tracking-wide">How To Bet</h4>
            <ul className="space-y-1.5">
              <li><span className="text-slate-300">M-Pesa Paybill: <strong>888222</strong></span></li>
              <li><span className="text-slate-300">Account: <strong>Phone Number</strong></span></li>
              <li><button onClick={() => setActiveTab('account')} className="hover:text-white transition-colors">Instant Cash Out Guide</button></li>
              <li><button onClick={() => setActiveTab('promotions')} className="hover:text-white transition-colors">Multibet Boost Rules</button></li>
              <li><button onClick={() => setActiveTab('account')} className="hover:text-white transition-colors">20% Withholding Tax Guide</button></li>
            </ul>
          </div>

          {/* Responsible Gaming & Support */}
          <div className="space-y-2.5">
            <h4 className="text-white font-bold text-sm tracking-wide">Responsible Gaming</h4>
            <ul className="space-y-1.5">
              <li className="flex items-center gap-1 text-slate-300">
                <span className="w-5 h-5 rounded-full bg-red-600/20 text-red-400 font-bold flex items-center justify-center text-[10px]">18+</span>
                <span>Strictly 18 and Over</span>
              </li>
              <li><span className="text-slate-400">Betting is addictive and can be psychologically harmful.</span></li>
              <li className="flex items-center gap-1.5 text-[#FFC400]">
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Helpline: 0800 724 878</span>
              </li>
              <li><button onClick={() => setActiveTab('account')} className="text-[#38E000] hover:underline">Set Deposit Limits</button></li>
            </ul>
          </div>
        </div>

        {/* Regulatory & BCLB Seal Banner */}
        <div className="pt-8 border-t border-[#182C5E]/70 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#38E000]" />
            <span>
              Licensed and regulated by the <strong>Betting Control and Licensing Board of Kenya (BCLB)</strong> under License No. <strong>0000482</strong>.
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span>© 2026 WAZOBET Kenya Ltd. All Rights Reserved.</span>
            <span>·</span>
            <span className="text-[#FFC400] font-semibold">BET SMART. WIN BIG.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
