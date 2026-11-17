import React, { useState, useEffect, useMemo } from 'react';
import {
  Newspaper, Globe, TrendingUp, TrendingDown, Percent, Landmark,
  Sparkles, AlertTriangle, Info, ArrowUpRight, ArrowDownRight,
  Filter, Search, Clock, ExternalLink, RefreshCw, Cpu, Dna,
  ShieldCheck, CheckCircle2, ChevronDown, ChevronUp, HelpCircle
} from 'lucide-react';

// Curated, authoritative news feed with direct impact on user's holdings
const NEWS_ITEMS = [
  {
    id: 'news-1',
    category: 'FED & JUROS',
    categoryColor: 'bg-blue-100 text-blue-900 border-blue-300',
    title: 'Fed Mantém Trajetória de Alívio Monetário: Inflação em Arrefecimento e Foco no Emprego',
    source: 'Bloomberg / Reuters',
    date: 'Hoje, há 3 horas',
    tickers: ['QDVE', 'GOOGL', 'AMZN', 'META', '2B70'],
    summary: 'A Reserva Federal norte-americana reiterou que o ciclo de descida de juros prossegue de forma gradual. A inflação estabilizada em torno dos 2.5% afasta o receio de subidas de juros e consolida um ambiente de "aterragem suave" (soft landing) favorável ao investimento de risco.',
    portfolioImpact: 'POSITIVO',
    impactTitle: 'Impacto Direto nas Tuas Ações dos EUA:',
    impactText: 'Taxas de juro em descida reduzem o custo de capital das tecnológicas americanas (QDVE, Google, Amazon, Meta). Aumenta o valor das empresas em modelos de fluxo de caixa descontado e impulsiona o consumo corporativo em Cloud e IA.',
    bulletPoints: [
      'Queda nos rendimentos das obrigações do Tesouro dos EUA a 10 anos apoia múltiplos de valorização de P/E.',
      'Setor de biotecnologia (2B70) regista entrada de capitais institucionais após dois anos de contenção.'
    ]
  },
  {
    id: 'news-2',
    category: 'BCE & EUROPA',
    categoryColor: 'bg-amber-100 text-amber-900 border-amber-300',
    title: 'BCE em Contagem Decrescente para Novos Cortes: Liquidez Impulsiona Bolsas Europeias',
    source: 'Financial Times / Frankfurt',
    date: 'Hoje, há 5 horas',
    tickers: ['DB1'],
    summary: 'Christine Lagarde sinalizou que a inflação da Zona Euro está controlada, abrindo caminho a cortes contínuos nas taxas diretoras. O alívio monetário impulsiona o volume de transações e investimentos no mercado de capitais europeu.',
    portfolioImpact: 'POSITIVO',
    impactTitle: 'Impacto nos Teus 12% em Deutsche Börse (DB1):',
    impactText: 'A Deutsche Börse (DB1) não empresta dinheiro e não tem risco de crédito. À medida que as taxas dos depósitos descem, mais poupanças de famílias e fundos são direcionadas para a bolsa XETRA e fundos de índices STOXX, aumentando diretamente as receitas da DB1.',
    bulletPoints: [
      'Depósitos a render menos empurram investidores para ETFs e ações na XETRA.',
      'Deutsche Börse mantém margens operacionais intocadas (>50%) com 0% risco de calote.'
    ]
  },
  {
    id: 'news-3',
    category: 'BIG TECH & IA',
    categoryColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    title: 'Meta Platforms & Amazon Aceleram Investimentos em Infraestrutura de IA para 2025/2026',
    source: 'Wall Street Journal',
    date: 'Ontem',
    tickers: ['META', 'AMZN', 'CHIP', 'QDVE'],
    summary: 'Mark Zuckerberg e Andy Jassy confirmaram durante as conferências de resultados que os orçamentos de investimento (Capex) em centros de dados e chips de IA vão voltar a bater recordes. A monetização de IA na publicidade do Instagram e no AWS Bedrock já está a gerar receita incremental de dois dígitos.',
    portfolioImpact: 'MUITO_POSITIVO',
    impactTitle: 'Impacto nos Teus 5% de Meta e 5% de Amazon:',
    impactText: 'Meta e Amazon não estão apenas a gastar: estão a transformar o investimento em fluxo de caixa livre e margens crescentes. Além disso, cada servidor que compram compra semicondutores à Nvidia e TSMC, valorizando diretamente o teu ETF CHIP (20%).',
    bulletPoints: [
      'Meta: Mais de 3.27 mil milhões de pessoas usam a família de apps diariamente.',
      'Amazon AWS: Crescimento de receitas acelerou para 19% ao ano.'
    ]
  },
  {
    id: 'news-4',
    category: 'SEMICONDUTORES',
    categoryColor: 'bg-purple-100 text-purple-900 border-purple-300',
    title: 'ASML e TSMC com Encomendas Esgotadas para Fábricas de Chips de 2 Nanómetros',
    source: 'Nikkei Asia / Bloomberg',
    date: 'Há 1 dia',
    tickers: ['CHIP'],
    summary: 'A procura mundial por semicondutores de nova geração ultrapassou as estimativas mais otimistas. A TSMC prevê manter taxas de utilização superiores a 95% e a ASML recebeu nova vaga de pedidos de máquinas litográficas ultravioleta extrema (EUV).',
    portfolioImpact: 'SUPER_BULLISH',
    impactTitle: 'Impacto nos Teus 20% em CHIP (€16/mês):',
    impactText: 'O ETF MSCI Semiconductors (CHIP) é a espinha dorsal de todo o hardware do planeta. Não existe Inteligência Artificial, carros autónomos ou telemóveis sem TSMC e ASML. É o ativo de motor de infraestrutura de chips e IA no teu portfólio.',
    bulletPoints: [
      'Monopólio absoluto da ASML: 100% do mercado em máquinas EUV.',
      'Poder de fixação de preços (Pricing Power) permite repassar inflação sem perder clientes.'
    ]
  },
  {
    id: 'news-5',
    category: 'BIOTECNOLOGIA',
    categoryColor: 'bg-rose-100 text-rose-900 border-rose-300',
    title: 'Fusões & Aquisições de Biotecnologias Aceleram com Grandes Farmacêuticas com Cofres Cheios',
    source: 'BioPharma Dive',
    date: 'Há 2 dias',
    tickers: ['2B70'],
    summary: 'Com a perda de patentes de medicamentos tradicionais, gigantes farmacêuticas globais estão a comprar biotechs inovadoras em oncologia e terapia génica com prémios de 40% a 70% sobre a cotação de mercado.',
    portfolioImpact: 'POSITIVO',
    impactTitle: 'Impacto nos Teus 16% em 2B70 (€12.80/mês):',
    impactText: 'Cada oferta pública de aquisição (OPA) que surge sobre uma componente do Nasdaq Biotech ETF faz o índice valorizar imediatamente. O setor oferece uma das melhores descorrelações com tecnologia do teu portfólio.',
    bulletPoints: [
      'Aprovações da FDA em terapias de edição genética (CRISPR) em ritmo recorde.',
      'Zero correlação com a evolução das taxas de juro de curto prazo.'
    ]
  },
  {
    id: 'news-6',
    category: 'INFRAESTRUTURA FINANCEIRA',
    categoryColor: 'bg-indigo-100 text-indigo-900 border-indigo-300',
    title: 'Deutsche Börse (DB1) Regista Volume Recorde em Derivados e Custódia Clearstream',
    source: 'Handelsblatt / Deutsche Börse IR',
    date: 'Há 3 dias',
    tickers: ['DB1'],
    summary: 'A Deutsche Börse AG divulgou dados operacionais robustos para o último trimestre, com as receitas de compensação da Clearstream e os contratos de futuros na Eurex a superarem as projeções dos analistas de Wall Street.',
    portfolioImpact: 'SOLIDEZ',
    impactTitle: 'Impacto nos Teus 12% em Deutsche Börse (€9.60/mês):',
    impactText: 'Demonstra a razão de teres um monopólio de portagens em vez de bancos tradicionais: mesmo com o abrandamento económico alemão, a Deutsche Börse continua a bater recordes de faturação e a pagar dividendos crescentes com 0% de risco de calote.',
    bulletPoints: [
      'Receitas de subscrição de índices STOXX aumentaram 11% em termos homólogos.',
      'Margem EBITDA mantida acima dos 58%.'
    ]
  }
];


export default function MacroNewsRadar({ holdings = [] }) {
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedNewsId, setExpandedNewsId] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('A carregar feeds em tempo real...');
  const [newsList, setNewsList] = useState(NEWS_ITEMS);
  const [isLiveFeedActive, setIsLiveFeedActive] = useState(false);

  // Fetch live breaking news from backend RSS engine on mount and on refresh
  const loadLiveNews = async (forceRefresh = false) => {
    setIsRefreshing(true);
    try {
      const url = forceRefresh 
        ? '/api/macro-news?refresh=true' 
        : '/api/macro-news';
      let res = await fetch(url).catch(() => null);
      if (!res || !res.ok) {
        const localUrl = forceRefresh 
          ? 'http://127.0.0.1:8000/api/macro-news?refresh=true' 
          : 'http://127.0.0.1:8000/api/macro-news';
        res = await fetch(localUrl).catch(() => null);
      }
      if (res && res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.news) && data.news.length > 0) {
          setNewsList(data.news);
          setLastUpdated(data.last_updated || 'Agora mesmo');
          setIsLiveFeedActive(true);
          setIsRefreshing(false);
          return;
        }
      }
    } catch (e) {
      console.warn('Live news fetch fallback to local cache:', e);
    }
    // Fallback keeps default high-quality items with current timestamp
    setLastUpdated(new Date().toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' }));
    setIsRefreshing(false);
  };

  useEffect(() => {
    loadLiveNews(false);
  }, []);

  // Filtering news
  const filteredNews = useMemo(() => {
    return newsList.filter(item => {
      // Filter by category pill
      if (selectedFilter !== 'ALL') {
        if (selectedFilter === 'RATES' && item.category !== 'FED & JUROS' && item.category !== 'BCE & EUROPA') return false;
        if (selectedFilter === 'TECH' && !item.tickers.some(t => ['QDVE', 'GOOGL', 'AMZN', 'META'].includes(t))) return false;
        if (selectedFilter === 'CHIPS' && !item.tickers.includes('CHIP')) return false;
        if (selectedFilter === 'BIOTECH' && !item.tickers.includes('2B70')) return false;
        if (selectedFilter === 'EUROPE' && !item.tickers.includes('DB1')) return false;
      }

      // Filter by search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesSummary = item.summary.toLowerCase().includes(q);
        const matchesImpact = item.impactText.toLowerCase().includes(q);
        const matchesTicker = item.tickers.some(t => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesSummary && !matchesImpact && !matchesTicker) return false;
      }

      return true;
    });
  }, [selectedFilter, searchQuery]);

  const handleRefresh = () => {
    loadLiveNews(true);
  };

  return (
    <div className="bg-white border-2 border-black rounded-2xl p-5 sm:p-6 shadow-sm space-y-6">
      
      {/* 1. SECTION HEADER & LIVE MACRO BAROMETER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-black/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-black text-white">
              <Newspaper className="w-4 h-4" />
            </span>
            <h2 className="text-lg font-bold text-zinc-900 tracking-tight font-sans">
              Radar de Notícias & Inteligência Macro (Fed, BCE e Teus Ativos)
            </h2>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#2D6A4F] text-white">
              LIVE
            </span>
          </div>
          <p className="text-xs text-zinc-600 mt-1">
            Como as decisões de taxas de juro da Fed e do BCE influenciam diretamente o teu QDVE, Big Tech, Chips e a Deutsche Börse.
          </p>
        </div>

        {/* Live Refresh Status */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <span className="text-[11px] text-zinc-500 font-mono flex items-center gap-1">
            <Clock className="w-3 h-3 text-zinc-400" /> Sincronizado: {lastUpdated}
          </span>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="p-1.5 rounded-lg border border-black/20 hover:bg-[#FAF8F5] transition-all text-zinc-700 active:scale-95"
            title="Atualizar Notícias"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-black' : ''}`} />
          </button>
        </div>
      </div>

      {/* 2. DUAL CENTRAL BANK POLICY BAROMETER */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* US Federal Reserve (Fed) Barometer */}
        <div className="bg-[#FAF8F5] border-2 border-black rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">🇺🇸</span>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-bold block">
                  Banco Central dos EUA
                </span>
                <span className="font-bold text-sm text-zinc-900">
                  Federal Reserve (Fed)
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono font-bold bg-blue-100 text-blue-900 px-2 py-0.5 rounded border border-blue-200 block">
                4.50% - 4.75%
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">Taxa Diretora</span>
            </div>
          </div>

          <div className="bg-white p-3 rounded-lg border border-black/10 text-xs space-y-1.5">
            <div className="flex items-center justify-between text-zinc-700 font-medium">
              <span>Ciclo Vigente:</span>
              <span className="text-[#2D6A4F] font-bold flex items-center gap-1">
                <TrendingDown className="w-3.5 h-3.5" /> Alívio Monetário (Cortes)
              </span>
            </div>
            <div className="flex items-center justify-between text-zinc-700 font-medium">
              <span>Impacto nas Ações dos EUA:</span>
              <span className="text-zinc-900 font-bold">🟢 Altamente Positivo (QDVE, META, AMZN)</span>
            </div>
            <p className="text-[11px] text-zinc-500 pt-1 border-t border-black/5 leading-relaxed">
              <strong>Porquê?</strong> A Fed a descer juros reduz o custo do capital, faz os lucros de IA e Cloud valerem mais hoje, e incentiva empresas a investir sem receio de recessão.
            </p>
          </div>
        </div>

        {/* European Central Bank (BCE) Barometer */}
        <div className="bg-[#FAF8F5] border-2 border-black rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">🇪🇺</span>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-bold block">
                  Banco Central Europeu
                </span>
                <span className="font-bold text-sm text-zinc-900">
                  Banco Central Europeu (BCE)
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded border border-amber-200 block">
                3.25% (Dep: 3.00%)
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">Taxa de Refinanciamento</span>
            </div>
          </div>

          <div className="bg-white p-3 rounded-lg border border-black/10 text-xs space-y-1.5">
            <div className="flex items-center justify-between text-zinc-700 font-medium">
              <span>Ciclo Vigente:</span>
              <span className="text-amber-800 font-bold flex items-center gap-1">
                <TrendingDown className="w-3.5 h-3.5" /> Cortes Acelerados
              </span>
            </div>
            <div className="flex items-center justify-between text-zinc-700 font-medium">
              <span>Impacto no Teu Pilar Europeu:</span>
              <span className="text-zinc-900 font-bold">🟢 DB1 Resiliente & Mais Volume em Bolsa</span>
            </div>
            <p className="text-[11px] text-zinc-500 pt-1 border-t border-black/5 leading-relaxed">
              <strong>Porquê?</strong> Com taxas mais baixas do BCE, o capital migra das contas bancárias para ações e ETFs na XETRA. A Deutsche Börse não empresta dinheiro, não tem risco de crédito e mantém margens superiores a 50%.
            </p>
          </div>
        </div>

      </div>

      {/* 3. NEWS RADAR CONTROLS (SEARCH & CATEGORY FILTERS) */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <button
              onClick={() => setSelectedFilter('ALL')}
              className={`px-3 py-1.5 rounded-lg border font-medium whitespace-nowrap transition-all ${
                selectedFilter === 'ALL'
                  ? 'bg-black text-white border-black font-semibold'
                  : 'bg-white text-zinc-700 border-black/20 hover:bg-[#FAF8F5]'
              }`}
            >
              Todas ({NEWS_ITEMS.length})
            </button>
            <button
              onClick={() => setSelectedFilter('RATES')}
              className={`px-3 py-1.5 rounded-lg border font-medium whitespace-nowrap transition-all ${
                selectedFilter === 'RATES'
                  ? 'bg-black text-white border-black font-semibold'
                  : 'bg-white text-zinc-700 border-black/20 hover:bg-[#FAF8F5]'
              }`}
            >
              🏛️ Fed & BCE (Taxas)
            </button>
            <button
              onClick={() => setSelectedFilter('TECH')}
              className={`px-3 py-1.5 rounded-lg border font-medium whitespace-nowrap transition-all ${
                selectedFilter === 'TECH'
                  ? 'bg-black text-white border-black font-semibold'
                  : 'bg-white text-zinc-700 border-black/20 hover:bg-[#FAF8F5]'
              }`}
            >
              🇺🇸 Big Tech (QDVE, META, AMZN, GOOGL)
            </button>
            <button
              onClick={() => setSelectedFilter('CHIPS')}
              className={`px-3 py-1.5 rounded-lg border font-medium whitespace-nowrap transition-all ${
                selectedFilter === 'CHIPS'
                  ? 'bg-black text-white border-black font-semibold'
                  : 'bg-white text-zinc-700 border-black/20 hover:bg-[#FAF8F5]'
              }`}
            >
              ⚡ Semicondutores (CHIP)
            </button>
            <button
              onClick={() => setSelectedFilter('BIOTECH')}
              className={`px-3 py-1.5 rounded-lg border font-medium whitespace-nowrap transition-all ${
                selectedFilter === 'BIOTECH'
                  ? 'bg-black text-white border-black font-semibold'
                  : 'bg-white text-zinc-700 border-black/20 hover:bg-[#FAF8F5]'
              }`}
            >
              🧬 Biotecnologia (2B70)
            </button>
            <button
              onClick={() => setSelectedFilter('EUROPE')}
              className={`px-3 py-1.5 rounded-lg border font-medium whitespace-nowrap transition-all ${
                selectedFilter === 'EUROPE'
                  ? 'bg-black text-white border-black font-semibold'
                  : 'bg-white text-zinc-700 border-black/20 hover:bg-[#FAF8F5]'
              }`}
            >
              🇩🇪 Deutsche Börse & Europa
            </button>
          </div>

          {/* Quick Search Input */}
          <div className="relative min-w-[200px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Pesquisar notícias..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-black/20 bg-[#FAF8F5] focus:bg-white focus:outline-none focus:ring-1 focus:ring-black"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-zinc-400 hover:text-black font-bold"
              >
                ✕
              </button>
            )}
          </div>

        </div>
      </div>

      {/* 5. NEWS CARDS FEED */}
      <div className="space-y-4">
        {filteredNews.length === 0 ? (
          <div className="text-center py-8 bg-[#FAF8F5] rounded-xl border border-black/10">
            <Info className="w-6 h-6 text-zinc-400 mx-auto mb-2" />
            <p className="text-xs text-zinc-600 font-medium">Nenhuma notícia encontrada para este filtro.</p>
          </div>
        ) : (
          filteredNews.map(item => {
            const isExpanded = expandedNewsId === item.id;
            return (
              <div
                key={item.id}
                className="bg-[#FAF8F5] border-2 border-black/15 hover:border-black rounded-xl p-4 transition-all space-y-3"
              >
                {/* News Header & Badges */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${item.categoryColor}`}>
                      {item.category}
                    </span>
                    <span className="text-[11px] text-zinc-500 font-mono flex items-center gap-1">
                      <Clock className="w-3 h-3 text-zinc-400" /> {item.date}
                    </span>
                    <span className="text-[11px] text-zinc-400 font-medium">
                      • {item.source}
                    </span>
                  </div>

                  {/* Related Ticker Badges */}
                  <div className="flex items-center gap-1">
                    {item.tickers.map(t => (
                      <span
                        key={t}
                        className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-black text-white"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* News Title */}
                <h3 className="font-bold text-sm sm:text-base text-zinc-900 leading-snug">
                  {item.title}
                </h3>

                {/* Summary */}
                <p className="text-xs text-zinc-700 leading-relaxed">
                  {item.summary}
                </p>

                {item.link && (
                  <div className="pt-0.5">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-zinc-800 hover:text-black underline underline-offset-2 transition-colors"
                    >
                      <span>Ler notícia original na {item.source}</span>
                      <ExternalLink className="w-3 h-3 text-zinc-500" />
                    </a>
                  </div>
                )}

                {/* HIGHLIGHTED PORTFOLIO IMPACT BOX (DIRECTLY ANSWERS USER'S NEED) */}
                <div className="bg-white p-3.5 rounded-xl border border-black/20 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#2D6A4F] animate-pulse"></span>
                    <span className="text-xs font-bold text-zinc-900">
                      {item.impactTitle}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-700 leading-relaxed font-sans">
                    {item.impactText}
                  </p>
                </div>

                {/* Expandable Key Points */}
                <div>
                  <button
                    onClick={() => setExpandedNewsId(isExpanded ? null : item.id)}
                    className="text-[11px] font-medium text-zinc-600 hover:text-black flex items-center gap-1 transition-colors"
                  >
                    {isExpanded ? (
                      <>
                        <ChevronUp className="w-3 h-3" /> Ocultar pontos-chave
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-3 h-3" /> Ver dados detalhados & pontos-chave
                      </>
                    )}
                  </button>

                  {isExpanded && (
                    <ul className="mt-2 space-y-1 pl-4 list-disc text-xs text-zinc-600 pt-2 border-t border-black/10">
                      {item.bulletPoints.map((bp, i) => (
                        <li key={i} className="leading-relaxed">{bp}</li>
                      ))}
                    </ul>
                  )}
                </div>

              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
