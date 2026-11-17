import React, { useState } from 'react';
import { 
  TrendingUp, TrendingDown, AlertTriangle, Shield, Target, 
  Sparkles, CheckCircle2, ArrowRight, Filter, ChevronRight, Zap, Info
} from 'lucide-react';

export default function RecommendationsTab({ recommendations, onSelectStockByTicker }) {
  const [filterType, setFilterType] = useState('ALL'); // ALL, BUY, SELL, HOLD
  const [filterRisk, setFilterRisk] = useState('ALL'); // ALL, Low, Medium, High

  const filteredRecs = recommendations.filter(item => {
    if (filterType !== 'ALL' && item.type !== filterType) return false;
    if (filterRisk !== 'ALL') {
      if (!item.riskLevel.toLowerCase().includes(filterRisk.toLowerCase())) return false;
    }
    return true;
  });

  const buyCount = recommendations.filter(r => r.type === 'BUY').length;
  const sellCount = recommendations.filter(r => r.type === 'SELL').length;
  const holdCount = recommendations.filter(r => r.type === 'HOLD').length;

  return (
    <div className="space-y-6 animate-fadeIn pb-16 font-sans">
      
      {/* Top Banner / Hero */}
      <div className="bg-white border-2 border-black rounded-xl p-6 sm:p-7 shadow-sm relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#FAF8F5] border border-black/30 text-zinc-800 text-[11px] font-mono mb-3">
            <Zap className="w-3.5 h-3.5 text-zinc-700" /> Quantitative Alpha Signal Engine
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight">
            Recommendation Radar: Buy & Sell Signals
          </h2>
          <p className="text-xs text-zinc-600 mt-2 leading-relaxed">
            Actionable trading strategies calibrated with asymmetric risk/reward profiles. Each setup details current entry price, consensus target price, suggested stop-loss, and operational catalysts.
          </p>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-6">
            <div className="bg-[#FAF8F5] border border-black rounded-xl p-3 sm:p-4">
              <div className="text-[11px] font-mono text-[#2D6A4F] uppercase tracking-wider flex items-center gap-1.5 font-bold">
                <TrendingUp className="w-3.5 h-3.5" /> Buy Signals
              </div>
              <div className="text-2xl font-bold text-zinc-900 font-mono mt-1">{buyCount}</div>
              <div className="text-[11px] text-zinc-500">Long opportunities</div>
            </div>

            <div className="bg-[#FAF8F5] border border-black rounded-xl p-3 sm:p-4">
              <div className="text-[11px] font-mono text-[#9E2A2B] uppercase tracking-wider flex items-center gap-1.5 font-bold">
                <TrendingDown className="w-3.5 h-3.5" /> Sell / Reduce
              </div>
              <div className="text-2xl font-bold text-zinc-900 font-mono mt-1">{sellCount}</div>
              <div className="text-[11px] text-zinc-500">Risk alerts</div>
            </div>

            <div className="bg-[#FAF8F5] border border-black rounded-xl p-3 sm:p-4">
              <div className="text-[11px] font-mono text-amber-700 uppercase tracking-wider flex items-center gap-1.5 font-bold">
                <AlertTriangle className="w-3.5 h-3.5" /> Hold / Neutral
              </div>
              <div className="text-2xl font-bold text-zinc-900 font-mono mt-1">{holdCount}</div>
              <div className="text-[11px] text-zinc-500">Wait for entry levels</div>
            </div>
          </div>

        </div>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-3.5 rounded-xl border-2 border-black shadow-sm">
        
        {/* Signal filters */}
        <div className="flex items-center gap-2 overflow-x-auto">
          <span className="text-xs font-mono uppercase tracking-wider text-zinc-600 flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5 text-zinc-500" /> Signal:
          </span>
          <button
            onClick={() => setFilterType('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              filterType === 'ALL'
                ? 'bg-black text-white font-semibold shadow-sm'
                : 'bg-[#FAF8F5] text-zinc-700 hover:text-black border border-black/30'
            }`}
          >
            All ({recommendations.length})
          </button>
          <button
            onClick={() => setFilterType('BUY')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              filterType === 'BUY'
                ? 'bg-[#2D6A4F] text-white font-semibold shadow-sm'
                : 'bg-[#FAF8F5] text-[#2D6A4F] hover:bg-[#EAF3ED] border border-black/30'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" /> Buy ({buyCount})
          </button>
          <button
            onClick={() => setFilterType('SELL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              filterType === 'SELL'
                ? 'bg-[#9E2A2B] text-white font-semibold shadow-sm'
                : 'bg-[#FAF8F5] text-[#9E2A2B] hover:bg-[#FDF0EE] border border-black/30'
            }`}
          >
            <TrendingDown className="w-3.5 h-3.5" /> Sell ({sellCount})
          </button>
          <button
            onClick={() => setFilterType('HOLD')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              filterType === 'HOLD'
                ? 'bg-amber-700 text-white font-semibold shadow-sm'
                : 'bg-[#FAF8F5] text-amber-700 hover:bg-amber-50 border border-black/30'
            }`}
          >
            Hold ({holdCount})
          </button>
        </div>

        {/* Risk Filter */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-zinc-600 font-mono text-[11px] uppercase tracking-wider">Risk Level:</span>
          {['ALL', 'Low', 'Medium', 'High'].map((rk) => (
            <button
              key={rk}
              onClick={() => setFilterRisk(rk)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                filterRisk === rk
                  ? 'bg-black text-white font-semibold shadow-sm'
                  : 'text-zinc-700 hover:text-black bg-[#FAF8F5] border border-black/30'
              }`}
            >
              {rk === 'ALL' ? 'Any' : rk}
            </button>
          ))}
        </div>

      </div>

      {/* Cards List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filteredRecs.map((rec) => {
          const isBuy = rec.type === 'BUY';
          const isSell = rec.type === 'SELL';
          const actionTextEn = isBuy ? 'BUY' : (isSell ? 'SELL' : 'HOLD');

          return (
            <div
              key={rec.id}
              className="bg-white rounded-xl border-2 border-black hover:border-black/70 transition-all shadow-sm flex flex-col justify-between overflow-hidden"
            >
              {/* Card Header */}
              <div className="p-5 pb-4">
                <div className="flex items-start justify-between gap-3">
                  
                  {/* Stock Identification */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] border border-black/40 flex items-center justify-center font-bold text-xs text-zinc-900 font-mono">
                      {rec.ticker.split('.')[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-sm text-zinc-900">{rec.name}</h3>
                        <span className="text-xs text-zinc-500">{rec.flag}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-zinc-600 mt-0.5">
                        <span className="font-mono text-zinc-900 font-semibold">{rec.ticker}</span>
                        <span>•</span>
                        <span>{rec.sector}</span>
                      </div>
                    </div>
                  </div>

                  {/* Recommendation Action Pill */}
                  <div className={`px-2.5 py-1 rounded-md font-mono text-[11px] font-semibold flex items-center gap-1.5 border ${
                    isBuy
                      ? 'bg-[#EAF3ED] text-[#2D6A4F] border-[#2D6A4F]/40'
                      : isSell
                      ? 'bg-[#FDF0EE] text-[#9E2A2B] border-[#9E2A2B]/40'
                      : 'bg-amber-50 text-amber-800 border-amber-300'
                  }`}>
                    {isBuy ? <TrendingUp className="w-3 h-3" /> : isSell ? <TrendingDown className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                    <span>{actionTextEn}</span>
                  </div>

                </div>

                {/* Price targets & Upside bar */}
                <div className="grid grid-cols-3 gap-2 bg-[#FAF8F5] p-3 rounded-lg border border-black/20 mt-4">
                  <div>
                    <div className="text-[10px] uppercase font-mono text-zinc-500 font-medium">Current Price</div>
                    <div className="text-sm font-bold text-zinc-900 font-mono mt-0.5">
                      €{rec.currentPrice.toFixed(2)}
                    </div>
                  </div>

                  <div className="border-l border-black/15 pl-2">
                    <div className="text-[10px] uppercase font-mono text-zinc-500 font-medium">Target Price</div>
                    <div className="text-sm font-bold text-zinc-900 font-mono mt-0.5">
                      €{rec.targetPrice.toFixed(2)}
                    </div>
                  </div>

                  <div className="border-l border-black/15 pl-2">
                    <div className="text-[10px] uppercase font-mono text-zinc-500 font-medium">Upside</div>
                    <div className={`text-sm font-bold font-mono mt-0.5 ${
                      rec.potentialReturn.startsWith('+') ? 'text-[#2D6A4F]' : 'text-[#9E2A2B]'
                    }`}>
                      {rec.potentialReturn}
                    </div>
                  </div>
                </div>

                {/* Investment Thesis */}
                <div className="mt-3.5">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-600 font-semibold mb-1">Investment Thesis:</div>
                  <p className="text-xs text-zinc-700 leading-relaxed bg-[#FAF8F5] p-3 rounded-lg border border-black/20">
                    {rec.thesis}
                  </p>
                </div>

                {/* Catalysts */}
                <div className="mt-3 space-y-1.5">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-600 font-semibold flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-zinc-500" /> Key Catalysts:
                  </div>
                  {rec.catalysts.map((cat, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-zinc-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-700 mt-1.5 flex-shrink-0"></span>
                      <span>{cat}</span>
                    </div>
                  ))}
                </div>

              </div>

              {/* Card Footer */}
              <div className="bg-[#FAF8F5] px-5 py-2.5 border-t border-black/20 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3 text-zinc-600 font-mono text-[11px]">
                  <span>Risk: <strong className="text-zinc-900 font-sans">{rec.riskLevel}</strong></span>
                  <span>•</span>
                  <span>Stop: <strong className="text-[#9E2A2B] font-mono">€{rec.stopLoss.toFixed(2)}</strong></span>
                  <span>•</span>
                  <span>Horizon: <strong className="text-zinc-900 font-sans">{rec.horizon}</strong></span>
                </div>

                <button
                  onClick={() => onSelectStockByTicker(rec.ticker)}
                  className="flex items-center gap-1 font-medium text-zinc-900 hover:text-black font-semibold transition-colors"
                >
                  <span>View Stock</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {filteredRecs.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border-2 border-black">
          <Info className="w-8 h-8 text-zinc-500 mx-auto mb-2" />
          <p className="text-zinc-900 font-semibold">No recommendations found matching selected filters.</p>
          <button 
            onClick={() => { setFilterType('ALL'); setFilterRisk('ALL'); }}
            className="mt-3 text-xs text-[#2D6A4F] font-semibold hover:underline"
          >
            Reset filters
          </button>
        </div>
      )}

      {/* Risk Disclaimer */}
      <div className="p-4 rounded-xl bg-[#FAF8F5] border border-black/30 text-xs text-zinc-700 leading-relaxed flex items-start gap-3">
        <Shield className="w-4 h-4 text-zinc-600 mt-0.5 flex-shrink-0" />
        <div>
          <strong className="font-semibold block mb-0.5 text-zinc-900">Risk Disclosure & Regulatory Disclaimer:</strong>
          All market models, valuations, and quantitative projections are provided for informational and educational purposes only. Past performance does not guarantee future results. Equity investments are subject to market risk and loss of principal. Always perform your own research and due diligence before making investment decisions.
        </div>
      </div>

    </div>
  );
}
