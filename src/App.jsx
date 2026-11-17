import React, { useState } from 'react';
import Header from './components/Header';
import StockList from './components/StockList';
import StockDetail from './components/StockDetail';
import RecommendationsTab from './components/RecommendationsTab';
import MyPortfolioTab from './components/MyPortfolioTab';
import FinteckAiChat from './components/FinteckAiChat';
import MacroNewsRadar from './components/MacroNewsRadar';
import { COUNTRIES, SECTORS, STOCKS_DATA } from './data/stocksData';
import { RECOMMENDATIONS } from './data/recommendationsData';
import { Sparkles, TrendingUp, ShieldCheck, Briefcase, Bot, MessageSquare } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('macro-news'); // 'macro-news' (First tab) | 'stocks' | 'recommendations' | 'my-portfolio'
  const [selectedStock, setSelectedStock] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState('ALL');
  const [selectedSector, setSelectedSector] = useState('All Sectors');
  const [searchQuery, setSearchQuery] = useState('');
  const [allStocks, setAllStocks] = useState(STOCKS_DATA);
  const [isFloatingChatOpen, setIsFloatingChatOpen] = useState(false);

  const handleAddLiveStock = (newStock) => {
    setAllStocks(prev => {
      const exists = prev.find(s => s.ticker.toUpperCase() === newStock.ticker.toUpperCase());
      if (exists) return prev;
      return [newStock, ...prev];
    });
    setSelectedStock(newStock);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectStockByTicker = (ticker) => {
    const found = allStocks.find(s => s.ticker.toLowerCase() === ticker.toLowerCase());
    if (found) {
      setSelectedStock(found);
      setActiveTab('stocks');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F2EB] text-zinc-900 font-sans selection:bg-zinc-900 selection:text-white">
      
      {/* Top Navbar */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
        }}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* TAB 1: STOCKS EXPLORER & DETAIL */}
        {activeTab === 'stocks' && (
          <>
            {selectedStock ? (
              <StockDetail
                stock={selectedStock}
                onBack={() => setSelectedStock(null)}
                onSelectStock={setSelectedStock}
              />
            ) : (
              <StockList
                stocks={allStocks}
                onSelectStock={(stock) => {
                  setSelectedStock(stock);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                selectedCountry={selectedCountry}
                setSelectedCountry={setSelectedCountry}
                countries={COUNTRIES}
                selectedSector={selectedSector}
                setSelectedSector={setSelectedSector}
                sectors={SECTORS}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onAddLiveStock={handleAddLiveStock}
              />
            )}
          </>
        )}

        {/* TAB 2: BUY / SELL RECOMMENDATIONS RADAR */}
        {activeTab === 'recommendations' && (
          <RecommendationsTab
            recommendations={RECOMMENDATIONS}
            onSelectStockByTicker={handleSelectStockByTicker}
          />
        )}


        {/* TAB 4: MY PORTFOLIO & AI AUDIT */}
        {activeTab === 'my-portfolio' && (
          <MyPortfolioTab
            onSelectStockByTicker={handleSelectStockByTicker}
          />
        )}

        {/* TAB 5: FINTECK AI CHATBOT */}
        {activeTab === 'finteck-ai' && (
          <FinteckAiChat
            onSelectStockByTicker={handleSelectStockByTicker}
          />
        )}

        {/* TAB 6: MACRO NEWS RADAR */}
        {activeTab === 'macro-news' && (
          <MacroNewsRadar />
        )}

      </main>

      {/* Floating Finteck AI Widget (Available on every tab!) */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
        {isFloatingChatOpen && (
          <div className="mb-3 animate-in fade-in slide-in-from-bottom-5 duration-200">
            <FinteckAiChat
              onSelectStockByTicker={handleSelectStockByTicker}
              isFloatingMode={true}
              onCloseFloating={() => setIsFloatingChatOpen(false)}
            />
          </div>
        )}

        <button
          onClick={() => setIsFloatingChatOpen(!isFloatingChatOpen)}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-medium shadow-md transition-all border border-black ${
            isFloatingChatOpen
              ? 'bg-black text-white hover:bg-zinc-800'
              : 'bg-white text-zinc-900 hover:bg-[#EFEAE1]'
          }`}
          title="Abrir Chatbot Finteck AI"
        >
          <Bot className="w-4 h-4 text-zinc-800" />
          <span className="text-xs font-sans tracking-tight font-semibold">
            {isFloatingChatOpen ? 'Minimizar Finteck AI' : 'Finteck AI'}
          </span>
          {!isFloatingChatOpen && (
            <span className="w-2 h-2 rounded-full bg-[#2D6A4F]"></span>
          )}
        </button>
      </div>

      {/* Minimalist Neutral Footer */}
      <footer className="border-t border-black/10 bg-[#EFEAE2] py-5 text-xs text-zinc-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-4 h-4 rounded bg-black text-white flex items-center justify-center font-bold text-[9px]">
              SR
            </div>
            <span className="font-semibold text-zinc-900">StockRadar AI • Finteck AI</span>
            <span className="text-zinc-400">•</span>
            <span className="text-zinc-600 text-[11px]">Multi-Market Financial Intelligence (US, Europe, Portugal, Brazil)</span>
          </div>

          <div className="flex items-center gap-3 text-zinc-500 font-mono text-[11px]">
            <span>SEC EDGAR & CMVM Connected</span>
            <span>•</span>
            <span>yfinance Live Feed</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
