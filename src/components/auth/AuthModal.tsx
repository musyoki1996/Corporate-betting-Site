import React, { useState } from 'react';
import { useSportsbook } from '../../context/SportsbookContext';
import { WazobetLogo } from '../brand/WazobetLogo';
import { X, Smartphone, Mail, Lock, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { showLoginModal, setShowLoginModal, setUser } = useSportsbook();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [phoneNumber, setPhoneNumber] = useState('0712345678');
  const [fullName, setFullName] = useState('Kiprono Mwangi');
  const [password, setPassword] = useState('••••••••');
  const [step, setStep] = useState<'form' | 'otp'>('form');
  const [otpCode, setOtpCode] = useState('4829');

  if (!showLoginModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'form') {
      setStep('otp');
    } else {
      // Complete auth
      setUser({
        id: `wazo-usr-${Math.floor(100 + Math.random() * 900)}`,
        fullName: fullName || 'Kiprono Mwangi',
        phoneNumber: `+254 ${phoneNumber.slice(-9)}`,
        email: `${phoneNumber}@wazobet.co.ke`,
        nationalIdMasked: '3349****',
        isVerified: true,
        balanceKes: 10000,
        bonusBalanceKes: 2500,
        joinedDate: 'Nov 2026',
        dailyDepositLimitKes: 50000,
        selfExclusionActive: false,
        realityCheckMinutes: 60,
      });
      setShowLoginModal(false);
      setStep('form');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-md rounded-2xl bg-[#071B49] border border-[#182C5E] shadow-2xl p-6 space-y-5">
        <button
          onClick={() => { setShowLoginModal(false); setStep('form'); }}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#182C5E] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <WazobetLogo variant="full" />
          </div>
          <p className="text-xs text-slate-300">
            {mode === 'login' ? 'Sign in with your Kenyan mobile number' : 'Create your official WAZOBET account'}
          </p>
        </div>

        {/* Tab switch */}
        <div className="grid grid-cols-2 p-1 rounded-xl bg-[#03133D] border border-[#182C5E] text-xs font-semibold">
          <button
            onClick={() => { setMode('login'); setStep('form'); }}
            className={`py-2 rounded-lg transition-colors ${
              mode === 'login' ? 'bg-[#38E000] text-black font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Log In
          </button>
          <button
            onClick={() => { setMode('register'); setStep('form'); }}
            className={`py-2 rounded-lg transition-colors ${
              mode === 'register' ? 'bg-[#38E000] text-black font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Register
          </button>
        </div>

        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            {mode === 'register' && (
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Full Legal Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  placeholder="e.g. Kiprono Mwangi"
                  className="w-full px-3 py-2 rounded-lg bg-[#03133D] border border-[#182C5E] text-white focus:outline-none focus:border-[#38E000]"
                />
              </div>
            )}

            <div>
              <label className="block text-slate-300 font-semibold mb-1">M-Pesa Mobile Number</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400 font-mono font-bold">+254</span>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  placeholder="712345678"
                  className="w-full pl-14 pr-3 py-2 rounded-lg bg-[#03133D] border border-[#182C5E] text-white font-mono focus:outline-none focus:border-[#38E000]"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-lg bg-[#03133D] border border-[#182C5E] text-white focus:outline-none focus:border-[#38E000]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#38E000] hover:bg-[#62F500] text-black font-black text-xs sm:text-sm tracking-tight flex items-center justify-center gap-1.5 shadow-lg shadow-[#38E000]/25 transition-transform active:scale-95"
            >
              <span>{mode === 'login' ? 'CONTINUE TO LOGIN' : 'GET SMS VERIFICATION CODE'}</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="p-3 rounded-xl bg-[#03133D] border border-[#182C5E] text-center space-y-1">
              <span className="text-[11px] text-slate-400">SMS Verification sent to</span>
              <div className="font-mono font-bold text-[#38E000] text-sm">+254 {phoneNumber}</div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1 text-center">Enter 4-Digit OTP Code</label>
              <input
                type="text"
                maxLength={4}
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                className="w-36 mx-auto block text-center text-xl font-mono font-black tracking-widest px-3 py-2 rounded-lg bg-[#03133D] border border-[#38E000] text-white focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#38E000] hover:bg-[#62F500] text-black font-black text-xs sm:text-sm tracking-tight transition-transform active:scale-95"
            >
              VERIFY & ACCESS ACCOUNT
            </button>
          </form>
        )}

        <div className="pt-2 text-[10px] text-slate-400 text-center flex items-center justify-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-[#38E000]" />
          <span>Regulated under Kenyan Betting Act Cap 131 · 18+ only</span>
        </div>
      </div>
    </div>
  );
};
