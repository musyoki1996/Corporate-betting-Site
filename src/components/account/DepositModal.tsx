import React, { useState } from 'react';
import { useSportsbook } from '../../context/SportsbookContext';
import { 
  X, 
  Smartphone, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Loader2,
  ShieldCheck,
  CreditCard
} from 'lucide-react';

export const DepositModal: React.FC = () => {
  const { 
    showDepositModal, 
    setShowDepositModal, 
    depositMpesa, 
    user 
  } = useSportsbook();

  const [paymentMethod, setPaymentMethod] = useState<'mpesa_stk' | 'mpesa_paybill' | 'airtel'>('mpesa_stk');
  const [amount, setAmount] = useState<number>(500);
  const [phoneNumber, setPhoneNumber] = useState<string>(user?.phoneNumber?.replace('+254 ', '0') || '0712345678');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [stkStatus, setStkStatus] = useState<string | null>(null);

  if (!showDepositModal) return null;

  const presetAmounts = [100, 250, 500, 1000, 2000, 5000];

  const handleDepositSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (amount < 20) {
      alert('Minimum deposit amount is KES 20.');
      return;
    }

    setIsProcessing(true);
    setStkStatus('Sending M-Pesa STK Push to ' + phoneNumber + '... Please check your phone screen and enter your M-Pesa PIN.');

    try {
      const res = await depositMpesa(amount, phoneNumber);
      setStkStatus(res.message);
      setTimeout(() => {
        setIsProcessing(false);
        setShowDepositModal(false);
        setStkStatus(null);
      }, 2000);
    } catch {
      setIsProcessing(false);
      setStkStatus('Deposit failed. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-md rounded-2xl bg-[#071B49] border border-[#182C5E] shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 bg-[#03133D] border-b border-[#182C5E] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#182C5E] flex items-center justify-center text-[#38E000]">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-white font-heading">
                DEPOSIT FUNDS (KES)
              </h3>
              <p className="text-[10px] text-slate-400">Instant Safaricom M-Pesa & Airtel Money</p>
            </div>
          </div>

          <button
            onClick={() => setShowDepositModal(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#182C5E] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4">
          {/* Payment Method Switcher */}
          <div className="grid grid-cols-3 gap-2 text-xs font-semibold">
            <button
              onClick={() => setPaymentMethod('mpesa_stk')}
              className={`py-2 px-2 rounded-lg border text-center transition-all ${
                paymentMethod === 'mpesa_stk'
                  ? 'bg-[#03133D] border-[#38E000] text-[#38E000] font-bold'
                  : 'bg-[#03133D]/60 border-[#182C5E] text-slate-300 hover:text-white'
              }`}
            >
              M-Pesa STK Push
            </button>
            <button
              onClick={() => setPaymentMethod('mpesa_paybill')}
              className={`py-2 px-2 rounded-lg border text-center transition-all ${
                paymentMethod === 'mpesa_paybill'
                  ? 'bg-[#03133D] border-[#38E000] text-[#38E000] font-bold'
                  : 'bg-[#03133D]/60 border-[#182C5E] text-slate-300 hover:text-white'
              }`}
            >
              M-Pesa Paybill
            </button>
            <button
              onClick={() => setPaymentMethod('airtel')}
              className={`py-2 px-2 rounded-lg border text-center transition-all ${
                paymentMethod === 'airtel'
                  ? 'bg-[#03133D] border-red-500 text-red-400 font-bold'
                  : 'bg-[#03133D]/60 border-[#182C5E] text-slate-300 hover:text-white'
              }`}
            >
              Airtel Money
            </button>
          </div>

          {paymentMethod === 'mpesa_paybill' ? (
            /* Manual Paybill Instructions */
            <div className="p-4 rounded-xl bg-[#03133D] border border-[#182C5E] space-y-3 text-xs">
              <h4 className="font-bold text-white text-sm">How to Deposit via Paybill</h4>
              <ol className="space-y-1.5 list-decimal list-inside text-slate-300">
                <li>Go to <strong>M-PESA</strong> on your phone</li>
                <li>Select <strong>Lipa na M-PESA</strong> &rarr; <strong>Pay Bill</strong></li>
                <li>Enter Business No: <strong className="text-[#38E000] font-mono">888222</strong></li>
                <li>Account No: <strong className="text-white font-mono">{phoneNumber || 'Your Phone Number'}</strong></li>
                <li>Enter Amount and your M-Pesa PIN</li>
              </ol>
              <div className="p-2.5 rounded-lg bg-[#071B49] text-[11px] text-[#FFC400]">
                Your WAZOBET balance updates automatically upon receipt of Safaricom confirmation SMS.
              </div>
            </div>
          ) : (
            /* STK Push Form */
            <form onSubmit={handleDepositSubmit} className="space-y-4">
              {/* Presets */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1.5">
                  Select Quick Amount (KES)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {presetAmounts.map((amt) => (
                    <button
                      type="button"
                      key={amt}
                      onClick={() => setAmount(amt)}
                      className={`py-2 text-xs font-mono font-bold rounded-lg border transition-all ${
                        amount === amt
                          ? 'bg-[#38E000] border-[#38E000] text-black shadow-md shadow-[#38E000]/20'
                          : 'bg-[#03133D] border-[#182C5E] text-slate-200 hover:border-slate-500'
                      }`}
                    >
                      KES {amt.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom amount */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Or Enter Amount (Min KES 20)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">KES</span>
                  <input
                    type="number"
                    min="20"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    required
                    className="w-full pl-12 pr-3 py-2 text-sm font-mono font-bold rounded-lg bg-[#03133D] border border-[#182C5E] text-white focus:outline-none focus:border-[#38E000]"
                  />
                </div>
              </div>

              {/* Phone number */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  M-Pesa Registered Number
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="0712345678"
                  required
                  className="w-full px-3 py-2 text-sm font-mono rounded-lg bg-[#03133D] border border-[#182C5E] text-white focus:outline-none focus:border-[#38E000]"
                />
              </div>

              {/* STK Feedback Status */}
              {stkStatus && (
                <div className="p-3 rounded-xl bg-[#03133D] border border-[#38E000]/50 text-xs text-slate-200 flex items-start gap-2 animate-in fade-in">
                  {isProcessing ? (
                    <Loader2 className="w-4 h-4 text-[#38E000] animate-spin shrink-0 mt-0.5" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 text-[#38E000] shrink-0 mt-0.5" />
                  )}
                  <span>{stkStatus}</span>
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3 rounded-xl bg-[#38E000] hover:bg-[#62F500] text-black font-extrabold text-sm tracking-tight flex items-center justify-center gap-2 shadow-lg shadow-[#38E000]/25 transition-transform active:scale-95 disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>WAITING FOR M-PESA PIN...</span>
                  </>
                ) : (
                  <>
                    <span>DEPOSIT KES {amount.toLocaleString()} VIA STK PUSH</span>
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </>
                )}
              </button>
            </form>
          )}

          <div className="pt-2 text-[10px] text-slate-400 text-center flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#38E000]" />
            <span>256-bit SSL Encrypted · Safaricom Daraja API Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
};
