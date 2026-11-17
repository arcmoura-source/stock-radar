import React from 'react';
import { TrendingUp, Sparkles, BarChart3, Briefcase, Activity, Newspaper } from 'lucide-react';

export default function Header({ activeTab, setActiveTab }) {
  return (
    <header className="border-b border-black/15 bg-[#F5F2EB]/95 backdrop-blur-md sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* 1. TOP BAR: StockRadar AI Branding & Live Status */}
        <div className="flex items-center justify-between h-12 sm:h-14 border-b border-black/10">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-black text-white flex items-center justify-center font-bold shadow-sm">
              <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm tracking-tight text-zinc-900 font-sans">
                  StockRadar
                </span>
                <span className="text-[9px] sm:text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-black text-white">
                  AI
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-zinc-500 hidden xs:block sm:block font-sans">
                Financial Intelligence & Asset Management
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-zinc-600">
            <span className="w-2 h-2 rounded-full bg-[#2D6A4F] animate-pulse"></span>
            <span className="font-mono text-[11px] text-zinc-600 font-semibold">Live Markets</span>
          </div>
        </div>

        {/* 2. TAB SELECTION BAR (DEPOIS DA BARRA STOCK RADAR): Mobile-friendly full width */}
        <div className="py-2 overflow-x-auto scrollbar-none -mx-3 sm:mx-0 px-3 sm:px-0">
          <nav className="flex items-center gap-1.5 bg-[#EBE5DC] p-1 rounded-xl border border-black/20 w-max sm:w-fit sm:mx-auto">
            
            {/* TAB 1 (PRIMEIRO): NOTÍCIAS & RADAR MACRO */}
            <button
              onClick={() => setActiveTab('macro-news')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
                activeTab === 'macro-news'
                  ? 'bg-black text-white shadow-sm font-semibold border border-black'
                  : 'text-zinc-700 hover:text-black hover:bg-[#E0D8CB]'
              }`}
            >
              <Newspaper className="w-3.5 h-3.5" />
              <span className="font-semibold">Notícias</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono font-bold ${
                activeTab === 'macro-news' ? 'bg-zinc-800 text-white' : 'bg-[#2D6A4F]/20 text-[#2D6A4F]'
              }`}>
                LIVE
              </span>
            </button>

            {/* TAB 2: MARKETS & STOCKS */}
            <button
              onClick={() => setActiveTab('stocks')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
                activeTab === 'stocks'
                  ? 'bg-black text-white shadow-sm font-semibold border border-black'
                  : 'text-zinc-700 hover:text-black hover:bg-[#E0D8CB]'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Markets & Stocks</span>
            </button>

            {/* TAB 3: RECOMMENDATIONS */}
            <button
              onClick={() => setActiveTab('recommendations')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
                activeTab === 'recommendations'
                  ? 'bg-black text-white shadow-sm font-semibold border border-black'
                  : 'text-zinc-700 hover:text-black hover:bg-[#E0D8CB]'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Recommendations</span>
            </button>

            {/* TAB 4: MY PORTFOLIO */}
            <button
              onClick={() => setActiveTab('my-portfolio')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
                activeTab === 'my-portfolio'
                  ? 'bg-black text-white shadow-sm font-semibold border border-black'
                  : 'text-zinc-700 hover:text-black hover:bg-[#E0D8CB]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#2D6A4F]" />
              <span>My Portfolio</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                activeTab === 'my-portfolio' ? 'bg-zinc-800 text-white font-semibold' : 'bg-black/10 text-zinc-700'
              }`}>
                DCA
              </span>
            </button>

          </nav>
        </div>

      </div>
    </header>
  );
}
