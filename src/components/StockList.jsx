import React, { useState } from 'react';
import { 
  TrendingUp, TrendingDown, AlertTriangle, Search, Filter, 
  ArrowUpRight, Sparkles, Globe, DollarSign, DownloadCloud, Loader2, Plus
} from 'lucide-react';

const COUNTRY_NAMES_EN = {
  'ALL': 'All Markets',
  'US': 'United States',
  'PT': 'Portugal',
  'DE': 'Germany',
  'NL': 'Netherlands',
  'FR': 'France',
  'BR': 'Brazil',
  'UK': 'United Kingdom'
};

const SECTOR_NAMES_EN = {
  'Todos': 'All Sectors',
  'Tecnologia': 'Technology',
  'Energia & Utilities': 'Energy & Utilities',
  'Semicondutores': 'Semiconductors',
  'Consumo & Retalho': 'Consumer & Retail',
  'Saúde & Farmacêutica': 'Healthcare & Pharma',
  'Automóvel & Mobilidade': 'Automotive & Mobility',
  'Bens de Luxo': 'Luxury Goods',
  'Aeroespacial & Defesa': 'Aerospace & Defense',
  'Materiais Básicos': 'Basic Materials'
};

export default function StockList({ 
  stocks, 
  onSelectStock, 
  selectedCountry, 
  setSelectedCountry, 
  countries,
  selectedSector,
  setSelectedSector,
  sectors,
  searchQuery,
  setSearchQuery,
  onAddLiveStock
}) {
  const [isSearchingGlobal, setIsSearchingGlobal] = useState(false);
  const [globalSearchError, setGlobalSearchError] = useState(null);

  const filteredStocks = stocks.filter(stock => {
    // Country filter
    if (selectedCountry !== 'ALL' && stock.country !== selectedCountry) return false;
    // Sector filter
    if (selectedSector !== 'All Sectors' && selectedSector !== 'Todos' && stock.sector !== selectedSector) return false;
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTicker = stock.ticker.toLowerCase().includes(q);
      const matchName = stock.name.toLowerCase().includes(q);
      const matchSector = stock.sector.toLowerCase().includes(q);
      if (!matchTicker && !matchName && !matchSector) return false;
    }
    return true;
  });

  const handleFetchAnyStock = async (tickerToFetch) => {
    const symbol = tickerToFetch || searchQuery.trim().toUpperCase();
    if (!symbol) return;

    setIsSearchingGlobal(true);
    setGlobalSearchError(null);

    try {
      let res = await fetch(`/api/stock?ticker=${encodeURIComponent(symbol)}`).catch(() => null);
      if (!res || !res.ok) {
        res = await fetch(`http://127.0.0.1:8000/api/stock?ticker=${encodeURIComponent(symbol)}`).catch(() => null);
      }
      if (!res.ok) throw new Error('Failed to connect to market quote feed');
      const data = await res.json();

      if (data.error) {
        setGlobalSearchError(data.error);
      } else {
        onAddLiveStock(data);
        setSearchQuery('');
      }
    } catch (err) {
      setGlobalSearchError(`Could not find symbol "${symbol}". Verify that the ticker is correct.`);
    } finally {
      setIsSearchingGlobal(false);
    }
  };

  const getVerdictMiniBadge = (verdict = 'BUY', type = 'BUY') => {
    const verdictEn = verdict === 'COMPRA' ? 'BUY' : (verdict === 'COMPRA FORTE' ? 'STRONG BUY' : (verdict === 'VENDA' ? 'SELL' : (verdict === 'MANTER' ? 'HOLD' : verdict)));
    
    if (type === 'BUY' || verdictEn === 'BUY' || verdictEn === 'STRONG BUY') {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-[#EAF3ED] text-[#2D6A4F] border border-[#2D6A4F]/40 font-mono">
          <TrendingUp className="w-3 h-3" /> {verdictEn}
        </span>
      );
    }
    if (type === 'SELL' || verdictEn === 'SELL') {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-[#FDF0EE] text-[#9E2A2B] border border-[#9E2A2B]/40 font-mono">
          <TrendingDown className="w-3 h-3" /> {verdictEn}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-300 font-mono">
        <AlertTriangle className="w-3 h-3" /> {verdictEn}
      </span>
    );
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-16 font-sans">
      
      {/* Search and Filters Bar */}
      <div className="bg-white border-2 border-black rounded-xl p-4 sm:p-5 shadow-sm space-y-4">
        
        {/* Global Stock Search bar with Instant Yahoo Finance Connector */}
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && filteredStocks.length === 0) {
                  handleFetchAnyStock();
                }
              }}
              placeholder="Search any global stock ticker (e.g. MSFT, AMZN, PLTR, BABA, NOVO-B.CO, KO, DIS, VST)..."
              className="w-full bg-[#FAF8F5] border border-black/30 rounded-lg pl-10 pr-10 py-2 text-sm text-zinc-900 placeholder-zinc-500 focus:outline-none focus:border-black transition-all font-sans"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-2.5 text-xs text-zinc-500 hover:text-black font-semibold"
              >
                Clear
              </button>
            )}
          </div>

          <button
            onClick={() => handleFetchAnyStock()}
            disabled={isSearchingGlobal || !searchQuery.trim()}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-black hover:bg-zinc-800 disabled:opacity-50 text-white font-medium text-xs shadow-sm transition-all whitespace-nowrap"
          >
            {isSearchingGlobal ? <Loader2 className="w-4 h-4 animate-spin" /> : <DownloadCloud className="w-4 h-4" />}
            <span>{isSearchingGlobal ? 'Searching...' : 'Search Market'}</span>
          </button>
        </div>

        {/* Global Search Error or Notice */}
        {globalSearchError && (
          <div className="p-3 rounded-lg bg-[#FDF0EE] border border-[#9E2A2B]/40 text-xs text-[#9E2A2B] flex items-center justify-between font-mono">
            <span>{globalSearchError}</span>
            <button onClick={() => setGlobalSearchError(null)} className="text-[#9E2A2B] font-bold ml-2">✕</button>
          </div>
        )}

        {/* Popular Stock Shortcuts */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs text-zinc-600">
          <span className="text-[11px] text-zinc-500 font-medium mr-1 font-mono">Shortcuts:</span>
          {['PLTR', 'AMZN', 'GOOGL', 'META', 'AMD', 'NFLX', 'DIS', 'KO', 'BABA', 'NOVO-B.CO'].map((sym) => (
            <button
              key={sym}
              onClick={() => handleFetchAnyStock(sym)}
              className="px-2 py-0.5 rounded bg-[#FAF8F5] hover:bg-[#EFEAE1] hover:text-black border border-black/25 text-zinc-700 font-mono transition-colors text-[11px]"
            >
              +{sym}
            </button>
          ))}
        </div>

        {/* Country Filter Buttons */}
        <div className="pt-2 border-t border-black/15">
          <div className="text-xs font-mono uppercase tracking-wider text-zinc-600 mb-2 flex items-center gap-1.5 font-semibold">
            <Globe className="w-3.5 h-3.5 text-zinc-600" /> Market / Region:
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {countries.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCountry(c.id)}
                className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  selectedCountry === c.id
                    ? 'bg-black text-white shadow-sm font-semibold'
                    : 'bg-[#FAF8F5] hover:bg-[#EFEAE1] text-zinc-700 border border-black/25'
                }`}
              >
                <span>{c.flag}</span>
                <span>{COUNTRY_NAMES_EN[c.id] || c.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Sector Filter Buttons */}
        <div className="pt-2 border-t border-black/15">
          <div className="text-xs font-mono uppercase tracking-wider text-zinc-600 mb-2 flex items-center gap-1.5 font-semibold">
            <Filter className="w-3.5 h-3.5 text-zinc-600" /> Sector:
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {sectors.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSector(s)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  selectedSector === s
                    ? 'bg-black text-white font-semibold shadow-sm'
                    : 'text-zinc-700 hover:text-black bg-[#FAF8F5] border border-black/25'
                }`}
              >
                {SECTOR_NAMES_EN[s] || s}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Stock Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStocks.map((stock) => (
          <div
            key={stock.ticker}
            onClick={() => onSelectStock(stock)}
            className="bg-white hover:bg-[#FAF8F5] border-2 border-black rounded-xl p-5 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 shadow-sm group flex flex-col justify-between"
          >
            <div>
              {/* Header: Flag, Ticker, Exchange & Verdict */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl" title={stock.countryName}>{stock.flag}</span>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-lg text-zinc-900 font-mono group-hover:text-black transition-colors">
                        {stock.ticker}
                      </span>
                      <span className="text-[10px] text-zinc-600 font-mono px-1.5 py-0.2 rounded bg-[#FAF8F5] border border-black/25">
                        {stock.exchange}
                      </span>
                    </div>
                    <div className="text-xs text-zinc-500 line-clamp-1">{stock.name}</div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1">
                  {getVerdictMiniBadge(stock.aiAnalysis?.verdict || 'BUY', stock.aiAnalysis?.verdictType || 'BUY')}
                  <span className="text-[10px] text-zinc-500 font-mono">
                    Target: <strong className="text-zinc-900 font-mono">{stock.currencySymbol}{stock.aiAnalysis?.targetPrice?.toFixed(2)}</strong>
                  </span>
                </div>
              </div>

              {/* Price and Day change */}
              <div className="flex items-baseline justify-between my-3 bg-[#FAF8F5] p-3 rounded-lg border border-black/20">
                <div>
                  <div className="text-[10px] uppercase font-mono text-zinc-500 font-medium">Current Price</div>
                  <div className="text-2xl font-bold text-zinc-900 font-mono mt-0.5">
                    {stock.currencySymbol}{stock.currentPrice?.toFixed(2)}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] uppercase font-mono text-zinc-500 font-medium">24h Change</div>
                  <div className={`text-sm font-bold font-mono flex items-center justify-end gap-0.5 mt-0.5 ${
                    stock.changePercent >= 0 ? 'text-[#2D6A4F]' : 'text-[#9E2A2B]'
                  }`}>
                    {stock.changePercent >= 0 ? '+' : ''}{stock.changeDaily?.toFixed(2)} ({stock.changePercent?.toFixed(2)}%)
                  </div>
                </div>
              </div>

              {/* Description preview */}
              <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed mb-4">
                {stock.description}
              </p>
            </div>

            {/* Quick Metrics Bar & Action footer */}
            <div className="pt-3 border-t border-black/15 space-y-3">
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-[#FAF8F5] p-1.5 rounded border border-black/20">
                  <div className="text-[10px] font-mono text-zinc-500">P/E</div>
                  <div className="font-semibold text-zinc-900 font-mono">{stock.metrics?.peRatio}x</div>
                </div>
                <div className="bg-[#FAF8F5] p-1.5 rounded border border-black/20">
                  <div className="text-[10px] font-mono text-zinc-500">Div. Yield</div>
                  <div className="font-semibold text-[#2D6A4F] font-mono">{stock.metrics?.dividendYield}</div>
                </div>
                <div className="bg-[#FAF8F5] p-1.5 rounded border border-black/20">
                  <div className="text-[10px] font-mono text-zinc-500">Market Cap</div>
                  <div className="font-semibold text-zinc-900 font-mono">{stock.marketCap}</div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-zinc-700 bg-[#FAF8F5] px-2 py-0.5 rounded text-[11px] font-mono border border-black/25">
                  {SECTOR_NAMES_EN[stock.sector] || stock.sector}
                </span>

                <div className="flex items-center gap-1 text-zinc-800 group-hover:text-black font-semibold transition-colors">
                  <span>View Details</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>

      {filteredStocks.length === 0 && (
        <div className="text-center py-16 bg-white rounded-xl border-2 border-black space-y-3">
          <Search className="w-8 h-8 text-zinc-500 mx-auto" />
          <h3 className="text-base font-bold text-zinc-900">Stock not found in local watchlist</h3>
          <p className="text-xs text-zinc-600 max-w-md mx-auto">
            Would you like to fetch ticker <strong>"{searchQuery}"</strong> directly from Yahoo Finance live database?
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => handleFetchAnyStock()}
              disabled={isSearchingGlobal || !searchQuery.trim()}
              className="px-5 py-2.5 rounded-lg bg-black hover:bg-zinc-800 disabled:opacity-50 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-sm"
            >
              {isSearchingGlobal ? <Loader2 className="w-4 h-4 animate-spin" /> : <DownloadCloud className="w-4 h-4" />}
              <span>Import "{searchQuery.toUpperCase()}" Live</span>
            </button>
            <button
              onClick={() => {
                setSelectedCountry('ALL');
                setSelectedSector('All Sectors');
                setSearchQuery('');
              }}
              className="px-4 py-2.5 rounded-lg bg-[#FAF8F5] text-zinc-800 text-xs font-semibold hover:bg-[#EFEAE1] border border-black/30 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
