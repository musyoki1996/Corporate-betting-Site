import React, { useState } from 'react';
import { useSportsbook } from '../../context/SportsbookContext';
import { 
  User, 
  Wallet, 
  History, 
  ShieldCheck, 
  ShieldAlert, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Clock, 
  CheckCircle2, 
  X, 
  AlertTriangle,
  Flame,
  Check,
  CreditCard,
  Lock
} from 'lucide-react';

export const AccountModal: React.FC = () => {
  const { 
    user, 
    setUser, 
    betHistory, 
    cashOutBet, 
    transactions, 
    withdrawMpesa,
    setShowDepositModal 
  } = useSportsbook();

  const [activeAccountTab, setActiveAccountTab] = useState<'profile' | 'open_bets' | 'settled_bets' | 'transactions' | 'withdraw' | 'responsible'>('open_bets');

  // Withdrawal form state
  const [withdrawAmount, setWithdrawAmount] = useState<number>(1000);
  const [withdrawPhone, setWithdrawPhone] = useState<string>(user?.phoneNumber?.replace('+254 ', '0') || '0712345678');
  const [withdrawMsg, setWithdrawMsg] = useState<{ success: boolean; message: string } | null>(null);
  const [isWithdrawing, setIsWithdrawing] = useState<boolean>(false);

  // Responsible gambling state
  const [depositLimit, setDepositLimit] = useState<number>(user?.dailyDepositLimitKes || 50000);
  const [selfExclusionDays, setSelfExclusionDays] = useState<number>(0);
  const [rgSavedMsg, setRgSavedMsg] = useState<string | null>(null);

  if (!user) {
    return (
      <div className="p-8 rounded-2xl bg-[#071B49] border border-[#182C5E] text-center space-y-4 max-w-lg mx-auto">
        <User className="w-12 h-12 mx-auto text-slate-400" />
        <h3 className="text-xl font-bold text-white">Log in to view your account</h3>
        <p className="text-xs text-slate-300">
          Access your wallet balance, open bets, M-Pesa withdrawal requests, and responsible gambling settings.
        </p>
      </div>
    );
  }

  const openBets = betHistory.filter((b) => b.status === 'open');
  const settledBets = betHistory.filter((b) => b.status !== 'open');

  const handleWithdrawSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (withdrawAmount < 100) {
      alert('Minimum withdrawal is KES 100.');
      return;
    }
    if (withdrawAmount > user.balanceKes) {
      alert('Insufficient funds.');
      return;
    }

    setIsWithdrawing(true);
    setWithdrawMsg(null);

    const res = await withdrawMpesa(withdrawAmount, withdrawPhone);
    setIsWithdrawing(false);
    setWithdrawMsg(res);
  };

  const handleSaveResponsibleGambling = () => {
    setUser((prev) => prev ? { ...prev, dailyDepositLimitKes: depositLimit } : null);
    setRgSavedMsg('Responsible gambling limits updated successfully.');
    setTimeout(() => setRgSavedMsg(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* User Balance Overview Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#03133D] via-[#071B49] to-[#0D204B] border border-[#182C5E] shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#182C5E] border border-[#38E000]/40 flex items-center justify-center text-xl font-black text-[#38E000] font-heading">
            {user.fullName.split(' ').map((n) => n[0]).join('')}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-white font-heading">{user.fullName}</h2>
              <span className="px-2 py-0.5 rounded-full bg-[#38E000]/20 text-[#38E000] font-bold text-[10px] flex items-center gap-1 border border-[#38E000]/30">
                <ShieldCheck className="w-3 h-3" />
                <span>Verified (KYC)</span>
              </span>
            </div>
            <div className="text-xs text-slate-400 font-mono mt-0.5">
              Phone: {user.phoneNumber} · ID: {user.nationalIdMasked}
            </div>
          </div>
        </div>

        {/* Balance Display & CTAs */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="p-3 rounded-xl bg-[#03133D] border border-[#182C5E] min-w-[140px]">
            <div className="text-[10px] text-slate-400 uppercase font-bold">Main Balance</div>
            <div className="text-lg font-black text-white font-mono tabular-nums">
              KES {user.balanceKes.toLocaleString()}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#03133D] border border-[#182C5E] min-w-[140px]">
            <div className="text-[10px] text-[#FFC400] uppercase font-bold">Bonus Balance</div>
            <div className="text-lg font-black text-[#FFC400] font-mono tabular-nums">
              KES {user.bonusBalanceKes.toLocaleString()}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowDepositModal(true)}
              className="px-4 py-2.5 rounded-xl bg-[#38E000] hover:bg-[#62F500] text-black font-extrabold text-xs shadow-md transition-transform active:scale-95"
            >
              + Deposit
            </button>
            <button
              onClick={() => setActiveAccountTab('withdraw')}
              className="px-4 py-2.5 rounded-xl bg-[#182C5E] hover:bg-[#223d80] text-white font-bold text-xs transition-colors"
            >
              Withdraw
            </button>
          </div>
        </div>
      </div>

      {/* Account Navigation Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto p-1.5 rounded-xl bg-[#071B49] border border-[#182C5E] text-xs font-semibold">
        <button
          onClick={() => setActiveAccountTab('open_bets')}
          className={`px-3.5 py-2 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeAccountTab === 'open_bets'
              ? 'bg-[#38E000] text-black font-bold'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          <span>Open Bets</span>
          {openBets.length > 0 && (
            <span className="px-1.5 py-0.2 rounded bg-black/20 text-black font-mono font-bold text-[10px]">
              {openBets.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveAccountTab('settled_bets')}
          className={`px-3.5 py-2 rounded-lg whitespace-nowrap transition-colors ${
            activeAccountTab === 'settled_bets'
              ? 'bg-[#38E000] text-black font-bold'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          Settled Bets ({settledBets.length})
        </button>

        <button
          onClick={() => setActiveAccountTab('transactions')}
          className={`px-3.5 py-2 rounded-lg whitespace-nowrap transition-colors ${
            activeAccountTab === 'transactions'
              ? 'bg-[#38E000] text-black font-bold'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          Transactions & M-Pesa Logs
        </button>

        <button
          onClick={() => setActiveAccountTab('withdraw')}
          className={`px-3.5 py-2 rounded-lg whitespace-nowrap transition-colors ${
            activeAccountTab === 'withdraw'
              ? 'bg-[#38E000] text-black font-bold'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          Instant Withdrawal
        </button>

        <button
          onClick={() => setActiveAccountTab('responsible')}
          className={`px-3.5 py-2 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1 ${
            activeAccountTab === 'responsible'
              ? 'bg-[#FFC400] text-black font-bold'
              : 'text-[#FFC400] hover:text-white'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Responsible Gaming</span>
        </button>
      </div>

      {/* Tab 1: Open Bets & Cash Out */}
      {activeAccountTab === 'open_bets' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-white">Active Open Bets ({openBets.length})</h3>
            <span className="text-xs text-[#38E000] font-semibold">Instant Early Cash Out Available</span>
          </div>

          {openBets.length === 0 ? (
            <div className="p-8 rounded-2xl bg-[#071B49] border border-[#182C5E] text-center text-xs text-slate-400">
              No active open bets. Head over to the sports lobby or live centre to place a wager!
            </div>
          ) : (
            openBets.map((ticket) => (
              <div
                key={ticket.id}
                className="p-5 rounded-2xl bg-[#071B49] border border-[#182C5E] space-y-4"
              >
                {/* Header */}
                <div className="flex items-center justify-between text-xs pb-3 border-b border-[#182C5E]">
                  <div>
                    <span className="font-mono font-bold text-white">Ticket #{ticket.id}</span>
                    <span className="text-slate-400 ml-2">Placed: {ticket.placedAt}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-blue-950 border border-blue-700 text-blue-300 font-bold uppercase text-[10px]">
                    {ticket.betType.toUpperCase()} BET
                  </span>
                </div>

                {/* Selections in this ticket */}
                <div className="space-y-2">
                  {ticket.selections.map((sel, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-[#03133D] border border-[#182C5E] flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="text-[10px] text-slate-400">{sel.league}</div>
                        <div className="font-bold text-white mt-0.5">{sel.matchTeams}</div>
                        <div className="text-slate-300 mt-1">
                          Pick: <strong className="text-[#38E000]">{sel.selectionName}</strong> ({sel.marketName})
                        </div>
                      </div>
                      <div className="font-mono font-bold text-white bg-[#071B49] px-2.5 py-1 rounded border border-[#182C5E]">
                        {sel.odd.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Financial Summary & Cash Out Action */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-[#182C5E]">
                  <div className="grid grid-cols-3 gap-4 text-xs font-mono">
                    <div>
                      <div className="text-slate-400 text-[10px]">Stake:</div>
                      <div className="font-bold text-white">KES {ticket.stake.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-[10px]">Total Odds:</div>
                      <div className="font-bold text-white">{ticket.totalOdds.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-[10px]">Potential Net Win:</div>
                      <div className="font-bold text-[#38E000]">KES {ticket.netPayout.toLocaleString()}</div>
                    </div>
                  </div>

                  {ticket.cashoutAvailable && ticket.cashoutAmount && (
                    <button
                      onClick={() => {
                        const res = cashOutBet(ticket.id);
                        alert(res.message);
                      }}
                      className="px-5 py-2.5 rounded-xl bg-[#FFC400] hover:bg-[#ffd54f] text-black font-extrabold text-xs tracking-tight shadow-md flex items-center justify-center gap-1.5 transition-transform active:scale-95"
                    >
                      <Flame className="w-4 h-4 fill-black" />
                      <span>CASH OUT KES {ticket.cashoutAmount.toLocaleString()} NOW</span>
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: Settled Bets */}
      {activeAccountTab === 'settled_bets' && (
        <div className="space-y-4">
          <h3 className="font-bold text-sm text-white">Settled Bet History ({settledBets.length})</h3>

          {settledBets.map((ticket) => (
            <div
              key={ticket.id}
              className="p-4 rounded-xl bg-[#071B49] border border-[#182C5E] space-y-3 text-xs"
            >
              <div className="flex items-center justify-between pb-2 border-b border-[#182C5E]">
                <span className="font-mono font-bold text-white">#{ticket.id}</span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                    ticket.status === 'won'
                      ? 'bg-emerald-950 text-[#38E000] border border-[#38E000]'
                      : ticket.status === 'cashed_out'
                      ? 'bg-amber-950 text-[#FFC400] border border-[#FFC400]'
                      : 'bg-red-950 text-red-400 border border-red-800'
                  }`}
                >
                  {ticket.status.toUpperCase()}
                </span>
              </div>

              <div className="space-y-1">
                {ticket.selections.map((s, i) => (
                  <div key={i} className="flex justify-between text-slate-300">
                    <span>{s.matchTeams} ({s.selectionName})</span>
                    <span className="font-mono">{s.odd.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between pt-2 border-t border-[#182C5E] font-mono">
                <span className="text-slate-400">Stake: KES {ticket.stake.toLocaleString()}</span>
                <span className="font-bold text-white">
                  {ticket.status === 'won' ? `Won: KES ${ticket.netPayout.toLocaleString()}` : ticket.status === 'cashed_out' ? `Cashed: KES ${ticket.cashoutAmount}` : 'Settled'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Transactions & M-Pesa Statements */}
      {activeAccountTab === 'transactions' && (
        <div className="space-y-4">
          <h3 className="font-bold text-sm text-white">Wallet & M-Pesa Transaction Logs</h3>

          <div className="rounded-xl bg-[#071B49] border border-[#182C5E] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#03133D] text-slate-400 uppercase text-[10px] font-bold border-b border-[#182C5E]">
                  <tr>
                    <th className="p-3">Reference</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">Method</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#182C5E] text-slate-200">
                  {transactions.map((txn) => (
                    <tr key={txn.id} className="hover:bg-[#0D204B]">
                      <td className="p-3 font-mono font-bold text-white">{txn.reference}</td>
                      <td className="p-3 capitalize">{txn.type.replace('_', ' ')}</td>
                      <td className="p-3 font-semibold text-slate-300">{txn.method}</td>
                      <td className={`p-3 font-mono font-bold ${
                        txn.type === 'deposit' || txn.type === 'bet_won' || txn.type === 'cashout'
                          ? 'text-[#38E000]'
                          : 'text-red-400'
                      }`}>
                        {txn.type === 'deposit' || txn.type === 'bet_won' || txn.type === 'cashout' ? '+' : '-'}
                        KES {txn.amount.toLocaleString()}
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded bg-emerald-950 text-[#38E000] text-[10px] font-bold">
                          {txn.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-3 text-slate-400 font-mono text-[11px]">{txn.timestamp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Instant Withdrawal to M-Pesa */}
      {activeAccountTab === 'withdraw' && (
        <div className="max-w-md mx-auto p-6 rounded-2xl bg-[#071B49] border border-[#182C5E] space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#182C5E] text-[#38E000] flex items-center justify-center">
              <ArrowDownLeft className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Instant M-Pesa Withdrawal</h3>
              <p className="text-xs text-slate-400">Withdrawable Balance: KES {user.balanceKes.toLocaleString()}</p>
            </div>
          </div>

          <form onSubmit={handleWithdrawSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Withdrawal Amount (Min KES 100)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 font-bold text-slate-400">KES</span>
                <input
                  type="number"
                  min="100"
                  max={user.balanceKes}
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                  required
                  className="w-full pl-12 pr-3 py-2 text-sm font-mono font-bold rounded-lg bg-[#03133D] border border-[#182C5E] text-white focus:outline-none focus:border-[#38E000]"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Recipient M-Pesa Phone Number
              </label>
              <input
                type="tel"
                value={withdrawPhone}
                onChange={(e) => setWithdrawPhone(e.target.value)}
                required
                className="w-full px-3 py-2 text-sm font-mono rounded-lg bg-[#03133D] border border-[#182C5E] text-white focus:outline-none focus:border-[#38E000]"
              />
            </div>

            {/* Tax Breakdown Notice */}
            <div className="p-3 rounded-xl bg-[#03133D] border border-[#182C5E] text-[11px] text-slate-300 space-y-1">
              <div className="flex justify-between">
                <span>Gross Withdrawal:</span>
                <span className="font-mono">KES {withdrawAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[#38E000] font-bold">
                <span>Net M-Pesa Transfer:</span>
                <span className="font-mono">KES {withdrawAmount.toLocaleString()}</span>
              </div>
              <p className="text-[10px] text-slate-500 pt-1">
                Zero M-Pesa withdrawal fees charged by WAZOBET. Funds reflect on your phone in under 60 seconds.
              </p>
            </div>

            {withdrawMsg && (
              <div className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
                withdrawMsg.success ? 'bg-emerald-950 border-[#38E000] text-emerald-300' : 'bg-red-950 border-red-800 text-red-300'
              }`}>
                {withdrawMsg.success ? <CheckCircle2 className="w-4 h-4 text-[#38E000]" /> : <AlertTriangle className="w-4 h-4 text-red-400" />}
                <span>{withdrawMsg.message}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isWithdrawing || user.balanceKes < withdrawAmount}
              className="w-full py-3 rounded-xl bg-[#38E000] hover:bg-[#62F500] text-black font-extrabold text-sm tracking-tight transition-transform active:scale-95 disabled:opacity-50"
            >
              {isWithdrawing ? 'PROCESSING INSTANT PAYOUT...' : `WITHDRAW KES ${withdrawAmount.toLocaleString()} TO M-PESA`}
            </button>
          </form>
        </div>
      )}

      {/* Tab 5: Responsible Gaming & Player Protection */}
      {activeAccountTab === 'responsible' && (
        <div className="p-6 rounded-2xl bg-[#071B49] border border-[#182C5E] space-y-6">
          <div>
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-[#FFC400]" />
              <span>Responsible Gaming & Player Safeguards</span>
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              WAZOBET is committed to providing a secure, regulated entertainment environment. Set your personal wagering boundaries below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Daily Deposit Limit */}
            <div className="p-4 rounded-xl bg-[#03133D] border border-[#182C5E] space-y-3 text-xs">
              <h4 className="font-bold text-white">Daily Deposit Limit (KES)</h4>
              <p className="text-slate-400">
                Cap the maximum funds you can deposit via M-Pesa in any 24-hour cycle.
              </p>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="1000"
                  max="100000"
                  step="5000"
                  value={depositLimit}
                  onChange={(e) => setDepositLimit(Number(e.target.value))}
                  className="flex-1 accent-[#38E000]"
                />
                <span className="font-mono font-bold text-white text-sm">
                  KES {depositLimit.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Self-Exclusion / Cooling Off */}
            <div className="p-4 rounded-xl bg-[#03133D] border border-[#182C5E] space-y-3 text-xs">
              <h4 className="font-bold text-white">Self-Exclusion / Take a Break</h4>
              <p className="text-slate-400">
                Temporarily lock your account from placing bets for a set period.
              </p>
              <div className="grid grid-cols-4 gap-2">
                {[1, 7, 30, 180].map((days) => (
                  <button
                    key={days}
                    type="button"
                    onClick={() => setSelfExclusionDays(days)}
                    className={`py-1.5 rounded-lg border font-semibold ${
                      selfExclusionDays === days
                        ? 'bg-[#FFC400] text-black border-[#FFC400]'
                        : 'bg-[#071B49] text-slate-300 border-[#182C5E]'
                    }`}
                  >
                    {days === 1 ? '24h' : `${days}d`}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {rgSavedMsg && (
            <div className="p-3 rounded-xl bg-emerald-950 border border-[#38E000] text-[#38E000] text-xs flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>{rgSavedMsg}</span>
            </div>
          )}

          <div className="flex justify-end">
            <button
              onClick={handleSaveResponsibleGambling}
              className="px-6 py-2.5 rounded-xl bg-[#38E000] text-black font-extrabold text-xs tracking-tight transition-transform active:scale-95"
            >
              Save Protection Settings
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
