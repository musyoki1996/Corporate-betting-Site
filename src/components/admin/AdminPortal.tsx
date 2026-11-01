import React, { useState } from 'react';
import { useSportsbook } from '../../context/SportsbookContext';
import { 
  BarChart3, 
  Users, 
  Wallet, 
  TrendingUp, 
  SlidersHorizontal, 
  ShieldAlert, 
  CheckCircle2, 
  AlertCircle, 
  Radio, 
  Plus, 
  RefreshCw, 
  Lock
} from 'lucide-react';

export const AdminPortal: React.FC = () => {
  const { 
    fixtures, 
    updateMatchScore, 
    addMatchLiveEvent, 
    settleFixture, 
    updateOddDirectly,
    adminStats,
    transactions 
  } = useSportsbook();

  const [activeAdminTab, setActiveAdminTab] = useState<'overview' | 'fixtures' | 'odds' | 'payments' | 'risk'>('overview');
  const [selectedFixtureId, setSelectedFixtureId] = useState<string>(fixtures[0]?.id || 'kpl-01');
  const [adminActionMsg, setAdminActionMsg] = useState<string | null>(null);

  const selectedFixture = fixtures.find((f) => f.id === selectedFixtureId) || fixtures[0];

  const handleScoreUpdate = (deltaHome: number, deltaAway: number) => {
    if (!selectedFixture) return;
    const currentScore = selectedFixture.liveScore || [0, 0];
    const newHome = Math.max(0, currentScore[0] + deltaHome);
    const newAway = Math.max(0, currentScore[1] + deltaAway);
    updateMatchScore(selectedFixture.id, newHome, newAway);

    if (deltaHome > 0) {
      addMatchLiveEvent(selectedFixture.id, `GOAL for ${selectedFixture.homeTeam}!`, 'goal', 'home');
    } else if (deltaAway > 0) {
      addMatchLiveEvent(selectedFixture.id, `GOAL for ${selectedFixture.awayTeam}!`, 'goal', 'away');
    }

    setAdminActionMsg(`Score updated for ${selectedFixture.homeTeam} vs ${selectedFixture.awayTeam}: ${newHome}-${newAway}`);
    setTimeout(() => setAdminActionMsg(null), 3000);
  };

  const handleSettle = (outcome: '1' | 'X' | '2') => {
    if (!selectedFixture) return;
    settleFixture(selectedFixture.id, outcome);
    setAdminActionMsg(`Match ${selectedFixture.homeTeam} vs ${selectedFixture.awayTeam} settled as [${outcome}]. User tickets automatically processed!`);
    setTimeout(() => setAdminActionMsg(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Admin Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#03133D] via-[#071B49] to-[#0D204B] border border-[#182C5E] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#182C5E] text-[#38E000] flex items-center justify-center">
            <SlidersHorizontal className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black italic text-white font-heading">
              WAZOBET SPORTSBOOK OPERATIONS CONSOLE
            </h1>
            <p className="text-xs text-slate-300">
              Real-time trading desk, odds adjustment, live match scoring, and compliance monitoring.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#38E000] animate-pulse" />
          <span className="text-xs font-mono font-bold text-[#38E000]">SERVER ENGINE ACTIVE</span>
        </div>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-3.5 rounded-xl bg-[#071B49] border border-[#182C5E]">
          <div className="text-[10px] text-slate-400 uppercase font-bold">Total Accounts</div>
          <div className="text-lg font-black text-white font-mono mt-1">
            {adminStats.totalAccounts.toLocaleString()}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-[#071B49] border border-[#182C5E]">
          <div className="text-[10px] text-slate-400 uppercase font-bold">Active Today</div>
          <div className="text-lg font-black text-[#38E000] font-mono mt-1">
            {adminStats.activeToday.toLocaleString()}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-[#071B49] border border-[#182C5E]">
          <div className="text-[10px] text-slate-400 uppercase font-bold">Total Deposits (KES)</div>
          <div className="text-lg font-black text-white font-mono mt-1">
            {(adminStats.totalDepositsKes / 1000000).toFixed(1)}M
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-[#071B49] border border-[#182C5E]">
          <div className="text-[10px] text-slate-400 uppercase font-bold">Total Payouts (KES)</div>
          <div className="text-lg font-black text-slate-300 font-mono mt-1">
            {(adminStats.totalPayoutsKes / 1000000).toFixed(1)}M
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-[#071B49] border border-[#182C5E]">
          <div className="text-[10px] text-[#FFC400] uppercase font-bold">GGR Profit (KES)</div>
          <div className="text-lg font-black text-[#FFC400] font-mono mt-1">
            {(adminStats.ggrKes / 1000000).toFixed(1)}M
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-[#071B49] border border-[#182C5E]">
          <div className="text-[10px] text-slate-400 uppercase font-bold">Open Bet Liability</div>
          <div className="text-lg font-black text-blue-400 font-mono mt-1">
            {adminStats.openTicketsCount.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto p-1.5 rounded-xl bg-[#071B49] border border-[#182C5E] text-xs font-semibold">
        <button
          onClick={() => setActiveAdminTab('overview')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeAdminTab === 'overview' ? 'bg-[#38E000] text-black font-bold' : 'text-slate-300 hover:text-white'
          }`}
        >
          Fixture Control & Live Scoring
        </button>
        <button
          onClick={() => setActiveAdminTab('odds')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeAdminTab === 'odds' ? 'bg-[#38E000] text-black font-bold' : 'text-slate-300 hover:text-white'
          }`}
        >
          Odds Adjustment Engine
        </button>
        <button
          onClick={() => setActiveAdminTab('payments')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeAdminTab === 'payments' ? 'bg-[#38E000] text-black font-bold' : 'text-slate-300 hover:text-white'
          }`}
        >
          M-Pesa Gateway Monitor
        </button>
        <button
          onClick={() => setActiveAdminTab('risk')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeAdminTab === 'risk' ? 'bg-[#38E000] text-black font-bold' : 'text-slate-300 hover:text-white'
          }`}
        >
          BCLB & Risk Monitoring
        </button>
      </div>

      {adminActionMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-950/90 border border-[#38E000] text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-[#38E000] shrink-0" />
          <span>{adminActionMsg}</span>
        </div>
      )}

      {/* Tab 1: Live Fixture Control & Scoring */}
      {activeAdminTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Match selector (4 cols) */}
          <div className="lg:col-span-4 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Select Match to Control
            </h3>
            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
              {fixtures.map((f) => (
                <div
                  key={f.id}
                  onClick={() => setSelectedFixtureId(f.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    selectedFixture?.id === f.id
                      ? 'bg-[#0D204B] border-[#38E000]'
                      : 'bg-[#071B49] border-[#182C5E] hover:border-slate-500'
                  }`}
                >
                  <div className="text-[11px] text-slate-400 truncate">{f.league}</div>
                  <div className="font-bold text-xs text-white truncate mt-0.5">
                    {f.homeTeam} vs {f.awayTeam}
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1 font-mono">
                    <span>Status: <strong className="text-[#38E000]">{f.status}</strong></span>
                    <span>Score: {f.liveScore ? `${f.liveScore[0]} - ${f.liveScore[1]}` : 'N/A'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Match Operator Controls (8 cols) */}
          {selectedFixture && (
            <div className="lg:col-span-8 space-y-5 p-5 rounded-2xl bg-[#071B49] border border-[#182C5E]">
              <div className="pb-3 border-b border-[#182C5E] flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">
                    {selectedFixture.homeTeam} vs {selectedFixture.awayTeam}
                  </h3>
                  <p className="text-xs text-slate-400">{selectedFixture.league} · Status: {selectedFixture.status}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black font-mono text-[#38E000] bg-[#03133D] px-3 py-1 rounded-xl border border-[#182C5E]">
                    {selectedFixture.liveScore ? `${selectedFixture.liveScore[0]} : ${selectedFixture.liveScore[1]}` : '0 : 0'}
                  </div>
                </div>
              </div>

              {/* Live Score Controls */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-300">Quick Goal Dispatcher</h4>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-[#03133D] border border-[#182C5E] space-y-2">
                    <span className="font-bold text-white truncate block">{selectedFixture.homeTeam}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleScoreUpdate(1, 0)}
                        className="flex-1 py-1.5 rounded-lg bg-[#38E000] text-black font-bold hover:bg-[#62F500]"
                      >
                        +1 Home Goal
                      </button>
                      <button
                        onClick={() => handleScoreUpdate(-1, 0)}
                        className="px-3 py-1.5 rounded-lg bg-red-950 text-red-400 font-bold border border-red-800"
                      >
                        -1
                      </button>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#03133D] border border-[#182C5E] space-y-2">
                    <span className="font-bold text-white truncate block">{selectedFixture.awayTeam}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleScoreUpdate(0, 1)}
                        className="flex-1 py-1.5 rounded-lg bg-[#38E000] text-black font-bold hover:bg-[#62F500]"
                      >
                        +1 Away Goal
                      </button>
                      <button
                        onClick={() => handleScoreUpdate(0, -1)}
                        className="px-3 py-1.5 rounded-lg bg-red-950 text-red-400 font-bold border border-red-800"
                      >
                        -1
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Match Events Dispatcher */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-300">Trigger Match Incident</h4>
                <div className="grid grid-cols-4 gap-2 text-xs">
                  <button
                    onClick={() => addMatchLiveEvent(selectedFixture.id, `Yellow Card to ${selectedFixture.homeTeam}`, 'yellow_card', 'home')}
                    className="py-2 rounded-lg bg-[#03133D] border border-[#FFC400]/50 text-[#FFC400] font-bold hover:bg-[#FFC400]/20"
                  >
                    🟨 Yellow Card
                  </button>
                  <button
                    onClick={() => addMatchLiveEvent(selectedFixture.id, `Red Card shown to ${selectedFixture.awayTeam}!`, 'red_card', 'away')}
                    className="py-2 rounded-lg bg-[#03133D] border border-red-600/50 text-red-400 font-bold hover:bg-red-950"
                  >
                    🟥 Red Card
                  </button>
                  <button
                    onClick={() => addMatchLiveEvent(selectedFixture.id, `Corner Kick for ${selectedFixture.homeTeam}`, 'corner', 'home')}
                    className="py-2 rounded-lg bg-[#03133D] border border-blue-500/50 text-blue-300 font-bold hover:bg-blue-950"
                  >
                    🚩 Corner Kick
                  </button>
                  <button
                    onClick={() => addMatchLiveEvent(selectedFixture.id, `VAR Review ongoing`, 'yellow_card', 'home')}
                    className="py-2 rounded-lg bg-[#03133D] border border-purple-500/50 text-purple-300 font-bold hover:bg-purple-950"
                  >
                    📺 VAR Review
                  </button>
                </div>
              </div>

              {/* Settlement Options */}
              <div className="pt-4 border-t border-[#182C5E] space-y-2">
                <h4 className="text-xs font-bold text-slate-300">
                  Final Settlement (Calculates all punter bet tickets automatically)
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => handleSettle('1')}
                    className="py-2.5 rounded-xl bg-[#03133D] hover:bg-[#38E000] hover:text-black border border-[#182C5E] text-white font-bold text-xs transition-colors"
                  >
                    Settle Home Win (1)
                  </button>
                  <button
                    onClick={() => handleSettle('X')}
                    className="py-2.5 rounded-xl bg-[#03133D] hover:bg-[#FFC400] hover:text-black border border-[#182C5E] text-white font-bold text-xs transition-colors"
                  >
                    Settle Draw (X)
                  </button>
                  <button
                    onClick={() => handleSettle('2')}
                    className="py-2.5 rounded-xl bg-[#03133D] hover:bg-[#38E000] hover:text-black border border-[#182C5E] text-white font-bold text-xs transition-colors"
                  >
                    Settle Away Win (2)
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Odds Adjustment */}
      {activeAdminTab === 'odds' && selectedFixture && (
        <div className="p-6 rounded-2xl bg-[#071B49] border border-[#182C5E] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#182C5E]">
            <div>
              <h3 className="font-bold text-base text-white">
                Odds Margin Adjustment: {selectedFixture.homeTeam} vs {selectedFixture.awayTeam}
              </h3>
              <p className="text-xs text-slate-400">Fine-tune betting market pricing in real time</p>
            </div>
          </div>

          <div className="space-y-4">
            {selectedFixture.markets.map((m) => (
              <div key={m.id} className="p-4 rounded-xl bg-[#03133D] border border-[#182C5E] space-y-3">
                <span className="font-bold text-xs text-white">{m.name}</span>
                <div className="grid grid-cols-3 gap-3">
                  {m.odds.map((o) => (
                    <div key={o.id} className="p-3 rounded-lg bg-[#071B49] border border-[#182C5E] space-y-1">
                      <span className="text-[11px] text-slate-400 block">{o.name}</span>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          step="0.05"
                          defaultValue={o.odd}
                          onBlur={(e) => updateOddDirectly(selectedFixture.id, m.id, o.id, Number(e.target.value))}
                          className="w-full px-2 py-1 rounded bg-[#03133D] border border-[#182C5E] font-mono font-bold text-sm text-white"
                        />
                        <button
                          onClick={() => setAdminActionMsg(`Odd for ${o.name} updated to ${o.odd}`)}
                          className="px-2 py-1 rounded bg-[#38E000] text-black font-bold text-xs"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Payments Gateway Logs */}
      {activeAdminTab === 'payments' && (
        <div className="p-6 rounded-2xl bg-[#071B49] border border-[#182C5E] space-y-4">
          <h3 className="font-bold text-base text-white">Safaricom Daraja STK Push & M-Pesa Gateway Logs</h3>
          <div className="space-y-2 text-xs">
            {transactions.map((t) => (
              <div key={t.id} className="p-3 rounded-xl bg-[#03133D] border border-[#182C5E] flex items-center justify-between font-mono">
                <div>
                  <span className="font-bold text-white">{t.reference}</span>
                  <span className="text-slate-400 ml-2">Type: {t.type} · Method: {t.method}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#38E000] font-bold">KES {t.amount.toLocaleString()}</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-[#38E000] text-[10px]">SUCCESS</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: BCLB Compliance & Risk */}
      {activeAdminTab === 'risk' && (
        <div className="p-6 rounded-2xl bg-[#071B49] border border-[#182C5E] space-y-4">
          <h3 className="font-bold text-base text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-[#FFC400]" />
            <span>BCLB Regulatory & Responsible Gaming Audits</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-[#03133D] border border-[#182C5E]">
              <div className="text-slate-400 font-bold">Self-Excluded Accounts</div>
              <div className="text-xl font-bold font-mono text-white mt-1">14 Accounts</div>
              <p className="text-[10px] text-slate-500 mt-1">All betting activity blocked during cooling period.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#03133D] border border-[#182C5E]">
              <div className="text-slate-400 font-bold">20% Withholding Tax Remittance</div>
              <div className="text-xl font-bold font-mono text-[#38E000] mt-1">KES 28,420,000</div>
              <p className="text-[10px] text-slate-500 mt-1">Ready for KRA monthly remittance reporting.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#03133D] border border-[#182C5E]">
              <div className="text-slate-400 font-bold">KYC Identity Checks</div>
              <div className="text-xl font-bold font-mono text-white mt-1">99.4% Compliant</div>
              <p className="text-[10px] text-slate-500 mt-1">Verified via IPRS & Safaricom KYC token exchange.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
