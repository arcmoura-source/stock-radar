import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, ExternalLink, FileText, Newspaper, TrendingUp, TrendingDown, 
  Layers, CheckCircle2, AlertTriangle, Sparkles, PieChart, Shield, Target,
  DollarSign, BarChart2, Calendar, Award, Compass, MessageSquare, Send,
  Download, Eye, Share2, Info, Key, Check, Zap, Bot
} from 'lucide-react';
import { askStockAI } from '../services/aiAnalyst';

export default function StockDetail({ stock, onBack, onSelectStock }) {
  const [activeTab, setActiveTab] = useState('ai');
  const [customQuestion, setCustomQuestion] = useState('');
  const [aiAnswers, setAiAnswers] = useState([]);
  const [isAsking, setIsAsking] = useState(false);
  const [geminiApiKey, setGeminiApiKey] = useState(() => localStorage.getItem('stockradar_gemini_api_key') || '');
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [keyInput, setKeyInput] = useState('');

  const saveGeminiKey = (key) => {
    const trimmed = key.trim();
    setGeminiApiKey(trimmed);
    localStorage.setItem('stockradar_gemini_api_key', trimmed);
    setShowKeyModal(false);
  };

  const handleAskAI = async (e) => {
    e.preventDefault();
    if (!customQuestion.trim()) return;

    setIsAsking(true);
    const q = customQuestion;
    setCustomQuestion('');

    try {
      const result = await askStockAI(q, stock, geminiApiKey);
      setAiAnswers(prev => [
        { 
          question: q, 
          answer: result.answer, 
          source: result.source, 
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) 
        },
        ...prev
      ]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAsking(false);
    }
  };

  const getVerdictBadge = (verdict = 'BUY', type = 'BUY') => {
    const verdictEn = verdict === 'COMPRA' ? 'BUY' : (verdict === 'COMPRA FORTE' ? 'STRONG BUY' : (verdict === 'VENDA' ? 'SELL' : (verdict === 'MANTER' ? 'HOLD' : verdict)));

    if (type === 'BUY' || verdictEn === 'BUY' || verdictEn === 'STRONG BUY') {
      return (
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 font-bold font-mono text-xs">
          <TrendingUp className="w-4 h-4" />
          <span>{verdictEn}</span>
        </div>
      );
    }
    if (type === 'SELL' || verdictEn === 'SELL') {
      return (
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/25 text-rose-400 font-bold font-mono text-xs">
          <TrendingDown className="w-4 h-4" />
          <span>{verdictEn}</span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/25 text-amber-400 font-bold font-mono text-xs">
        <AlertTriangle className="w-4 h-4" />
        <span>{verdictEn}</span>
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-16 font-sans">
      
      {/* Top Bar with Back Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-medium text-zinc-300 hover:text-white px-3 py-1.5 rounded-lg bg-zinc-850 hover:bg-zinc-800 border border-zinc-750 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Stock Explorer</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono">
          <span>Exchange: <strong className="text-zinc-300">{stock.exchange}</strong></span>
          <span>•</span>
          <span>Region: <strong className="text-zinc-300">{stock.countryName} {stock.flag}</strong></span>
        </div>
      </div>

      {/* Main Stock Banner */}
      <div className="bg-[#101115] border border-[#1E2028] rounded-xl p-6 shadow-sm relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          
          {/* Company identity */}
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-zinc-850 border border-zinc-750 flex items-center justify-center font-bold text-xl text-zinc-200 font-mono shadow-sm">
              {stock.ticker.split('.')[0]}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-100">
                  {stock.name}
                </h1>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-zinc-850 border border-zinc-750 text-zinc-300 font-mono">
                  {stock.ticker}
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-zinc-850 text-zinc-400 border border-zinc-750">
                  {stock.flag} {stock.countryName}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-zinc-500">
                <span className="font-mono text-zinc-300 bg-zinc-850 px-2 py-0.5 rounded border border-zinc-750">
                  {stock.sector}
                </span>
                <span>•</span>
                <span className="line-clamp-1">{stock.subSector}</span>
                <span>•</span>
                <span>Market Cap: <strong className="text-zinc-200 font-mono">{stock.currencySymbol}{stock.marketCap}</strong></span>
              </div>
            </div>
          </div>

          {/* Price & AI Verdict */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-6">
            <div className="text-left sm:text-right">
              <div className="text-[10px] uppercase font-mono tracking-wider text-zinc-500">Current Quote</div>
              <div className="text-3xl font-bold text-zinc-100 font-mono tracking-tight">
                {stock.currencySymbol}{stock.currentPrice?.toFixed(2)}
              </div>
              <div className={`flex items-center justify-start sm:justify-end gap-1 text-xs font-mono font-bold ${
                stock.changePercent >= 0 ? 'text-emerald-400' : 'text-rose-400'
              }`}>
                {stock.changePercent >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                <span>{stock.changePercent >= 0 ? '+' : ''}{stock.changeDaily?.toFixed(2)} ({stock.changePercent?.toFixed(2)}%)</span>
              </div>
            </div>

            <div className="border-l border-zinc-800 pl-6 flex flex-col items-start gap-1">
              <div className="text-[10px] font-mono uppercase text-zinc-500">AI Signal Rating</div>
              {getVerdictBadge(stock.aiAnalysis?.verdict, stock.aiAnalysis?.verdictType)}
              <div className="text-[10px] text-zinc-500 font-mono mt-0.5">
                Conviction: <strong className="text-zinc-300">{stock.aiAnalysis?.confidenceScore || 85}%</strong>
              </div>
            </div>
          </div>

        </div>

        {/* 52W Range bar */}
        <div className="mt-6 pt-5 border-t border-[#1C1E24] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-zinc-400 font-mono">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <span className="text-zinc-400 text-[11px]">52W Low: {stock.currencySymbol}{stock.low52w?.toFixed(2)}</span>
            <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden relative border border-zinc-750">
              <div 
                className="h-full bg-emerald-500 rounded-full"
                style={{
                  width: `${Math.min(100, Math.max(0, ((stock.currentPrice - stock.low52w) / (stock.high52w - stock.low52w || 1)) * 100))}%`
                }}
              ></div>
            </div>
            <span className="text-zinc-400 text-[11px]">52W High: {stock.currencySymbol}{stock.high52w?.toFixed(2)}</span>
          </div>

          <div className="text-zinc-500 text-xs">
            Avg Volume: <strong className="text-zinc-300">{stock.metrics?.avgVolume}</strong>
          </div>
        </div>

      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-[#1E2028]">
        <button
          onClick={() => setActiveTab('ai')}
          className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
            activeTab === 'ai'
              ? 'bg-zinc-100 text-zinc-950 font-semibold shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200 bg-zinc-850 hover:bg-zinc-800 border border-zinc-750'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
          <span>AI Verdict & Thesis</span>
        </button>

        <button
          onClick={() => setActiveTab('metrics')}
          className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
            activeTab === 'metrics'
              ? 'bg-zinc-100 text-zinc-950 font-semibold shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200 bg-zinc-850 hover:bg-zinc-800 border border-zinc-750'
          }`}
        >
          <BarChart2 className="w-3.5 h-3.5 text-zinc-400" />
          <span>Financials & Valuation</span>
        </button>

        <button
          onClick={() => setActiveTab('documents')}
          className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
            activeTab === 'documents'
              ? 'bg-zinc-100 text-zinc-950 font-semibold shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200 bg-zinc-850 hover:bg-zinc-800 border border-zinc-750'
          }`}
        >
          <FileText className="w-3.5 h-3.5 text-zinc-400" />
          <span>SEC Filings & Reports ({stock.documents?.length || 0})</span>
        </button>

        <button
          onClick={() => setActiveTab('news')}
          className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
            activeTab === 'news'
              ? 'bg-zinc-100 text-zinc-950 font-semibold shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200 bg-zinc-850 hover:bg-zinc-800 border border-zinc-750'
          }`}
        >
          <Newspaper className="w-3.5 h-3.5 text-zinc-400" />
          <span>Market News ({stock.news?.length || 0})</span>
        </button>

        <button
          onClick={() => setActiveTab('future')}
          className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
            activeTab === 'future'
              ? 'bg-zinc-100 text-zinc-950 font-semibold shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200 bg-zinc-850 hover:bg-zinc-800 border border-zinc-750'
          }`}
        >
          <Compass className="w-3.5 h-3.5 text-zinc-400" />
          <span>Roadmap & Milestones</span>
        </button>

        <button
          onClick={() => setActiveTab('etfs')}
          className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
            activeTab === 'etfs'
              ? 'bg-zinc-100 text-zinc-950 font-semibold shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200 bg-zinc-850 hover:bg-zinc-800 border border-zinc-750'
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-zinc-400" />
          <span>ETF Holdings ({stock.etfs?.length || 0})</span>
        </button>
      </div>

      {/* TAB CONTENT 1: AI VERDICT & IN-DEPTH RATIONALE */}
      {activeTab === 'ai' && (
        <div className="space-y-6">
          
          {/* Executive Verdict Hero Card */}
          <div className="bg-[#101115] border border-[#1E2028] rounded-xl p-5 sm:p-6 relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#1E2028]">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 mb-1">
                  <Sparkles className="w-3.5 h-3.5" /> Quantitative & Fundamental AI Engine
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-zinc-100">
                  Is {stock.name} an attractive investment today?
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Synthetic conclusion computed from balance sheet health, valuation multiples, competitive moat, and analyst consensus.
                </p>
              </div>

              {/* Target & Upside Pill */}
              <div className="flex items-center gap-4 bg-[#14161C] p-3.5 rounded-lg border border-[#22242D]">
                <div>
                  <div className="text-[10px] uppercase font-mono text-zinc-500">Target Price</div>
                  <div className="text-lg font-bold text-zinc-100 font-mono mt-0.5">
                    {stock.currencySymbol}{stock.aiAnalysis?.targetPrice?.toFixed(2)}
                  </div>
                </div>
                <div className="border-l border-zinc-800 pl-4">
                  <div className="text-[10px] uppercase font-mono text-zinc-500">Upside Potential</div>
                  <div className={`text-lg font-bold font-mono mt-0.5 ${
                    stock.aiAnalysis?.upsidePotential?.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    {stock.aiAnalysis?.upsidePotential}
                  </div>
                </div>
              </div>
            </div>

            {/* AI Summary paragraph */}
            <div className="mt-5 p-4 rounded-lg bg-[#14161C] border border-[#22242D] text-zinc-300 leading-relaxed text-xs">
              <strong className="text-zinc-100 font-semibold block mb-1 font-mono uppercase text-[11px]">Executive AI Summary:</strong>
              {stock.aiAnalysis?.summary}
            </div>

            {/* Bull vs Bear Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
              
              {/* Bull Case */}
              <div className="bg-[#14161C] border border-[#1E2028] rounded-lg p-4">
                <div className="flex items-center gap-2 font-semibold text-emerald-400 text-xs mb-3 font-mono uppercase">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Bullish Thesis (Growth Drivers)</span>
                </div>
                <ul className="space-y-2">
                  {stock.aiAnalysis?.bullCase?.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-zinc-300 leading-relaxed">
                      <span className="w-1 h-1 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bear Case */}
              <div className="bg-[#14161C] border border-[#1E2028] rounded-lg p-4">
                <div className="flex items-center gap-2 font-semibold text-rose-400 text-xs mb-3 font-mono uppercase">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Bearish Thesis & Risks to Monitor</span>
                </div>
                <ul className="space-y-2">
                  {stock.aiAnalysis?.bearCase?.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-zinc-300 leading-relaxed">
                      <span className="w-1 h-1 rounded-full bg-rose-400 mt-1.5 flex-shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>

          {/* Interactive AI Chat on this Stock */}
          <div className="bg-[#101115] border border-[#1E2028] rounded-xl p-5 sm:p-6 relative">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-zinc-400" />
                <h4 className="text-base font-semibold text-zinc-100 tracking-tight">Ask AI About {stock.name}</h4>
              </div>

              {/* Engine Status & API Key Button */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-medium border bg-zinc-850 text-zinc-300 border-zinc-750">
                  <Bot className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{geminiApiKey ? 'Google Gemini 1.5' : 'Local Quant AI'}</span>
                </div>

                <button
                  onClick={() => {
                    setKeyInput(geminiApiKey);
                    setShowKeyModal(true);
                  }}
                  title="Configure Google Gemini API key"
                  className="p-1.5 rounded-lg bg-zinc-850 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-750 text-xs transition-colors flex items-center gap-1 font-mono"
                >
                  <Key className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">API Key</span>
                </button>
              </div>
            </div>

            <p className="text-xs text-zinc-400 mb-4">
              Ask any question regarding valuation multiples, balance sheet liquidity, dividend sustainability, competitive moat, or forward risks.
            </p>

            {/* Quick suggested chips */}
            <div className="flex flex-wrap gap-2 mb-4">
              {[
                'Is the current dividend safe?',
                'Is this stock currently overvalued or undervalued?',
                'What is the debt level and leverage solvency?',
                'What are the primary competitors and economic moat?',
                'What are the key growth drivers for the next 3 years?'
              ].map((suggestion, i) => (
                <button
                  key={i}
                  onClick={() => setCustomQuestion(suggestion)}
                  className="text-xs bg-[#14161C] hover:bg-zinc-800 border border-[#22242D] hover:border-zinc-700 text-zinc-400 hover:text-zinc-200 px-3 py-1.5 rounded-lg transition-all"
                >
                  "{suggestion}"
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleAskAI} className="flex gap-2">
              <input
                type="text"
                value={customQuestion}
                onChange={(e) => setCustomQuestion(e.target.value)}
                placeholder={`Ask any specific investment question about ${stock.name}...`}
                className="flex-1 bg-[#14161C] border border-[#22242D] rounded-lg px-4 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-all font-sans"
              />
              <button
                type="submit"
                disabled={isAsking || !customQuestion.trim()}
                className="bg-zinc-100 hover:bg-white disabled:opacity-50 text-zinc-950 font-semibold px-4 py-2 rounded-lg flex items-center gap-2 text-xs transition-all shadow-sm"
              >
                {isAsking ? <Sparkles className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                <span>{isAsking ? 'Analyzing...' : 'Ask AI'}</span>
              </button>
            </form>

            {/* Custom AI Q&A history */}
            {aiAnswers.length > 0 && (
              <div className="mt-5 space-y-3 pt-4 border-t border-[#1C1E24]">
                {aiAnswers.map((item, idx) => (
                  <div key={idx} className="bg-[#14161C] border border-[#22242D] rounded-lg p-4 text-xs space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#1E2028]">
                      <div className="font-semibold text-zinc-100 flex items-center gap-2">
                        <span className="text-zinc-400 font-mono">Q:</span>
                        <span>"{item.question}"</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-850 text-zinc-400 border border-zinc-750 font-mono">
                          {item.source === 'gemini' ? 'Google Gemini 1.5' : 'Quant AI Engine'}
                        </span>
                        <span className="text-zinc-500 text-[10px] font-mono">{item.time}</span>
                      </div>
                    </div>

                    <div className="text-zinc-300 leading-relaxed whitespace-pre-line font-sans">
                      {item.answer}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Gemini API Key Configuration Modal */}
          {showKeyModal && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
              <div className="bg-[#101115] border border-[#1E2028] rounded-xl p-6 max-w-md w-full shadow-2xl relative">
                <div className="flex items-center justify-between pb-3 border-b border-[#1E2028] mb-4">
                  <div className="flex items-center gap-2 text-zinc-100 font-semibold text-sm">
                    <Key className="w-4 h-4 text-zinc-400" />
                    <span>Connect Google Gemini API</span>
                  </div>
                  <button
                    onClick={() => setShowKeyModal(false)}
                    className="text-zinc-400 hover:text-white text-xs font-bold"
                  >
                    ✕
                  </button>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                  Enter your free API key from Google AI Studio to route custom financial queries through <strong>gemini-1.5-flash</strong> in real-time. If left blank, the platform defaults to the local quantitative analyst engine.
                </p>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-zinc-300 block mb-1">
                      Gemini API Key:
                    </label>
                    <input
                      type="password"
                      value={keyInput}
                      onChange={(e) => setKeyInput(e.target.value)}
                      placeholder="AIzaSy..."
                      className="w-full bg-[#14161C] border border-[#22242D] rounded-lg px-3 py-2 text-xs text-zinc-100 font-mono focus:outline-none focus:border-zinc-500"
                    />
                  </div>

                  <a
                    href="https://aistudio.google.com/app/apikey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white underline font-mono"
                  >
                    <span>Get free API key at Google AI Studio</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <div className="flex items-center gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => saveGeminiKey(keyInput)}
                      className="flex-1 py-2 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 font-bold text-xs transition-colors shadow-sm"
                    >
                      Save Key
                    </button>
                    {geminiApiKey && (
                      <button
                        type="button"
                        onClick={() => saveGeminiKey('')}
                        className="py-2 px-3 rounded-lg bg-zinc-850 hover:bg-zinc-800 border border-zinc-700 text-rose-400 text-xs font-semibold"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      )}

      {/* TAB CONTENT 2: METRICS & VALUATION */}
      {activeTab === 'metrics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
            
            <div className="bg-[#101115] border border-[#1E2028] rounded-xl p-4">
              <div className="text-[10px] uppercase font-mono text-zinc-500 mb-1">P/E Ratio (Price / Earnings)</div>
              <div className="text-xl font-bold font-mono text-zinc-100">{stock.metrics?.peRatio}x</div>
              <div className="text-[11px] text-zinc-500 mt-1">LTM trailing multiple</div>
            </div>

            <div className="bg-[#101115] border border-[#1E2028] rounded-xl p-4">
              <div className="text-[10px] uppercase font-mono text-zinc-500 mb-1">Forward P/E</div>
              <div className="text-xl font-bold font-mono text-zinc-100">{stock.metrics?.forwardPe}x</div>
              <div className="text-[11px] text-zinc-500 mt-1">12-month forward estimate</div>
            </div>

            <div className="bg-[#101115] border border-[#1E2028] rounded-xl p-4">
              <div className="text-[10px] uppercase font-mono text-zinc-500 mb-1">PEG Ratio</div>
              <div className="text-xl font-bold font-mono text-zinc-100">{stock.metrics?.pegRatio}</div>
              <div className="text-[11px] text-zinc-500 mt-1">&lt; 1.5 considered attractive</div>
            </div>

            <div className="bg-[#101115] border border-[#1E2028] rounded-xl p-4">
              <div className="text-[10px] uppercase font-mono text-zinc-500 mb-1">Dividend Yield</div>
              <div className="text-xl font-bold font-mono text-emerald-400">{stock.metrics?.dividendYield}</div>
              <div className="text-[11px] text-zinc-500 mt-1">Annual dividend payout rate</div>
            </div>

            <div className="bg-[#101115] border border-[#1E2028] rounded-xl p-4">
              <div className="text-[10px] uppercase font-mono text-zinc-500 mb-1">Revenue Growth (YoY)</div>
              <div className="text-xl font-bold font-mono text-zinc-100">{stock.metrics?.revenueGrowthYoy}</div>
              <div className="text-[11px] text-zinc-500 mt-1">Annual topline expansion</div>
            </div>

            <div className="bg-[#101115] border border-[#1E2028] rounded-xl p-4">
              <div className="text-[10px] uppercase font-mono text-zinc-500 mb-1">Net Margin</div>
              <div className="text-xl font-bold font-mono text-zinc-100">{stock.metrics?.netMargin}</div>
              <div className="text-[11px] text-zinc-500 mt-1">Net profit / Revenue</div>
            </div>

            <div className="bg-[#101115] border border-[#1E2028] rounded-xl p-4">
              <div className="text-[10px] uppercase font-mono text-zinc-500 mb-1">Operating Margin</div>
              <div className="text-xl font-bold font-mono text-zinc-100">{stock.metrics?.operatingMargin}</div>
              <div className="text-[11px] text-zinc-500 mt-1">EBIT / Revenue</div>
            </div>

            <div className="bg-[#101115] border border-[#1E2028] rounded-xl p-4">
              <div className="text-[10px] uppercase font-mono text-zinc-500 mb-1">ROE (Return on Equity)</div>
              <div className="text-xl font-bold font-mono text-emerald-400">{stock.metrics?.roe}</div>
              <div className="text-[11px] text-zinc-500 mt-1">Shareholder capital return</div>
            </div>

            <div className="bg-[#101115] border border-[#1E2028] rounded-xl p-4">
              <div className="text-[10px] uppercase font-mono text-zinc-500 mb-1">ROCE (Capital Employed)</div>
              <div className="text-xl font-bold font-mono text-emerald-400">{stock.metrics?.roce}</div>
              <div className="text-[11px] text-zinc-500 mt-1">Capital deployment efficiency</div>
            </div>

            <div className="bg-[#101115] border border-[#1E2028] rounded-xl p-4">
              <div className="text-[10px] uppercase font-mono text-zinc-500 mb-1">Net Debt / Equity</div>
              <div className="text-xl font-bold font-mono text-zinc-100">{stock.metrics?.debtToEquity}</div>
              <div className="text-[11px] text-zinc-500 mt-1">Financial leverage ratio</div>
            </div>

            <div className="bg-[#101115] border border-[#1E2028] rounded-xl p-4">
              <div className="text-[10px] uppercase font-mono text-zinc-500 mb-1">Free Cash Flow (FCF)</div>
              <div className="text-xl font-bold font-mono text-cyan-300">{stock.metrics?.freeCashFlow}</div>
              <div className="text-[11px] text-zinc-500 mt-1">Net operational free cash</div>
            </div>

            <div className="bg-[#101115] border border-[#1E2028] rounded-xl p-4">
              <div className="text-[10px] uppercase font-mono text-zinc-500 mb-1">Asset Beta</div>
              <div className="text-xl font-bold font-mono text-zinc-100">{stock.metrics?.beta}</div>
              <div className="text-[11px] text-zinc-500 mt-1">Volatility relative to index (1.0)</div>
            </div>

          </div>

          {/* Sector comparison summary */}
          <div className="bg-[#101115] border border-[#1E2028] rounded-xl p-5 text-xs text-zinc-300">
            <h4 className="font-semibold text-zinc-100 mb-2 flex items-center gap-2">
              <Info className="w-4 h-4 text-zinc-400" /> Sector Comparison ({stock.sector})
            </h4>
            <p className="text-zinc-400 leading-relaxed">
              Across the <strong>{stock.sector}</strong> sector, the company demonstrates profitability metrics above peer medians ({stock.metrics?.roe} ROE vs ~14% industry baseline). Strong liquidity and cash generation ({stock.metrics?.freeCashFlow}) safeguard ongoing reinvestment and shareholder returns without aggressive debt dependency.
            </p>
          </div>
        </div>
      )}

      {/* TAB CONTENT 3: OFFICIAL COMPANY DOCUMENTS */}
      {activeTab === 'documents' && (
        <div className="space-y-4">
          <p className="text-xs text-zinc-400">
            Official regulatory disclosures archived with market regulators (SEC, CMVM, AMF, BaFin, CVM) and investor relations portals.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stock.documents?.map((doc) => (
              <div 
                key={doc.id}
                className="bg-[#101115] border border-[#1E2028] hover:border-zinc-700 rounded-xl p-5 transition-all flex flex-col justify-between group shadow-sm"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-zinc-850 text-zinc-300 border border-zinc-750">
                      {doc.type}
                    </span>
                    <span className="text-[11px] text-zinc-500 font-mono flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {doc.date}
                    </span>
                  </div>

                  <h4 className="font-semibold text-zinc-100 text-sm group-hover:text-white transition-colors">
                    {doc.title}
                  </h4>

                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed bg-[#14161C] p-3 rounded-lg border border-[#22242D]">
                    <strong className="text-zinc-200 block mb-1 font-mono uppercase text-[10px]">Key Takeaways:</strong>
                    {doc.summary}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 mt-4 border-t border-[#1C1E24] text-xs">
                  <span className="text-zinc-500 font-mono">
                    {doc.pages} • {doc.fileSize}
                  </span>

                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-zinc-300 hover:text-white font-medium transition-colors"
                  >
                    <span>Investor Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT 4: RECENT NEWS */}
      {activeTab === 'news' && (
        <div className="space-y-4">
          <p className="text-xs text-zinc-400">
            Financial news feed aggregated from global market wires with algorithmic sentiment scoring.
          </p>

          <div className="space-y-3">
            {stock.news?.map((item) => (
              <div 
                key={item.id}
                className="bg-[#101115] border border-[#1E2028] hover:border-zinc-700 rounded-xl p-5 transition-all shadow-sm"
              >
                <div className="flex items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-zinc-300 bg-zinc-850 px-2 py-0.5 rounded border border-zinc-750">
                      {item.source}
                    </span>
                    <span className="text-xs text-zinc-500 font-mono">{item.time}</span>
                  </div>

                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                    item.sentiment === 'positive' 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                      : item.sentiment === 'negative'
                      ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                  }`}>
                    {item.sentiment === 'positive' ? 'Bullish Sentiment' : item.sentiment === 'negative' ? 'Bearish Sentiment' : 'Neutral'}
                  </span>
                </div>

                <h4 className="font-semibold text-zinc-100 text-sm hover:text-white transition-colors">
                  {item.title}
                </h4>

                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  {item.summary}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT 5: FUTURE PLANS & RECENT MILESTONES */}
      {activeTab === 'future' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Recent Milestones */}
          <div className="bg-[#101115] border border-[#1E2028] rounded-xl p-5 sm:p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-zinc-850 border border-zinc-750 flex items-center justify-center text-emerald-400">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-zinc-100">Recent Completed Milestones</h3>
                <p className="text-xs text-zinc-500">Key operational and corporate targets achieved</p>
              </div>
            </div>

            <div className="space-y-3">
              {stock.recentMilestones?.map((milestone, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-[#14161C] p-3 rounded-lg border border-[#22242D]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {milestone}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Future Plans & Strategic Roadmap */}
          <div className="bg-[#101115] border border-[#1E2028] rounded-xl p-5 sm:p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-zinc-850 border border-zinc-750 flex items-center justify-center text-zinc-200">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-zinc-100">Forward Strategic Roadmap</h3>
                <p className="text-xs text-zinc-500">Capital projects, pipeline expansion, and growth initiatives</p>
              </div>
            </div>

            <div className="space-y-3">
              {stock.futurePlans?.map((plan, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-[#14161C] p-3 rounded-lg border border-[#22242D]">
                  <Target className="w-4 h-4 text-zinc-400 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {plan}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* TAB CONTENT 6: WHAT ETFS HOLD THIS STOCK */}
      {activeTab === 'etfs' && (
        <div className="space-y-4">
          <div className="bg-[#14161C] border border-[#1E2028] rounded-xl p-4 text-xs text-zinc-400 leading-relaxed">
            <strong className="text-zinc-200 font-semibold block mb-0.5 font-mono uppercase text-[11px]">Why Track ETF Ownership?</strong>
            Passive institutional flows from index ETFs represent a primary source of modern equity liquidity. High representation across global indices guarantees consistent automated demand during periodic fund inflows.
          </div>

          <div className="overflow-x-auto rounded-lg border border-[#1E2028]">
            <table className="w-full text-left text-sm text-zinc-300">
              <thead className="bg-[#13151A] text-zinc-400 text-[11px] uppercase font-mono tracking-wider border-b border-[#1E2028]">
                <tr>
                  <th className="py-3 px-4">ETF Ticker</th>
                  <th className="py-3 px-4">Index Fund Name</th>
                  <th className="py-3 px-4">Stock Weight (%)</th>
                  <th className="py-3 px-4">Strategy Category</th>
                  <th className="py-3 px-4 text-right">Fund AUM</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1A1C22] bg-[#101115]">
                {stock.etfs?.map((etf, idx) => (
                  <tr key={idx} className="hover:bg-[#14161C] transition-colors">
                    <td className="py-3 px-4 font-bold font-mono text-zinc-100">
                      {etf.ticker}
                    </td>
                    <td className="py-3 px-4 text-zinc-200">
                      {etf.name}
                    </td>
                    <td className="py-3 px-4 font-bold font-mono text-emerald-400">
                      {etf.weight}
                    </td>
                    <td className="py-3 px-4 text-xs text-zinc-400">
                      <span className="bg-zinc-850 px-2 py-0.5 rounded border border-zinc-750 font-mono">
                        {etf.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-zinc-300">
                      {etf.aum}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
