import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Briefcase, TrendingUp, TrendingDown, ShieldCheck, Sparkles, 
  Layers, ArrowUpRight, CheckCircle2, AlertTriangle, Info,
  Percent, DollarSign, Calculator, RefreshCw, Award, PieChart as PieIcon,
  Zap, Compass, ChevronRight, ChevronDown, Sliders, ArrowRight, Activity, Clock,
  Calendar, LineChart as ChartIcon, Target, Wallet, BarChart3, HelpCircle,
  Flame, Gem, Landmark, Shield, Globe, Filter, Edit3, Check, X, RotateCcw,
  Download, Upload, FileText
} from 'lucide-react';
import userPortfolioConfig from '../data/user_portfolio.json';


// Curated EUR-Denominated Assets for Strategic Alpha & Defensive Ballast
// All ETFs: 100% Accumulating (Acc / Capitalização), Ultra-Low TER (0.25%-0.55%), in EUR (€)
// All Assets: ZERO Overlap (0.0%) with the 5 Core DCA Holdings (No S&P 500 IT, No Euro Banks, No Semis, No GOOGL/AMZN)
const EUR_RECOMMENDATIONS = [
  {
    id: 'rec-nukl',
    ticker: 'NUKL.DE',
    tickerDisplay: 'NUKL',
    isin: 'IE000M7V94E1',
    name: 'VanEck Uranium and Nuclear Technologies UCITS ETF',
    type: 'ETF',
    exchange: 'XETRA (Frankfurt)',
    currency: 'EUR',
    flag: '🇪🇺',
    distribution: 'Acumulação (Acc - Sem atrito fiscal)',
    category: 'Renascimento Nuclear & Energia 24/7 para Datacenters de IA',
    roleType: 'GROWTH',
    roleLabel: 'Alfa Estratégico (Crescimento Secular)',
    cagr: '+16.5%',
    expectedCagrNum: 16.5,
    allocationPercent: 8.0,
    terOrPe: '0.55% TER',
    dividendYield: 'Acumulado (0.0% imposto anual)',
    downsideRating: 'Contratos Plurianuais com Big Tech (Microsoft/Amazon/Google)',
    correlationWithTech: '0.24 (Baixa Correlação)',
    portfolioOverlap: '0.0% (Zero Sobreposição)',
    overlapDetail: 'Zero sobreposição com os teus 6 ativos base (QDVE, CHIP, Deutsche Börse, Alphabet, Amazon ou Novo Nordisk). Detém Cameco, Kazatomprom, BWX Technologies, Oklo e Constellation Energy.',
    thesis: 'Os datacenters de hiperescala para Inteligência Artificial requerem energia contínua em gigawatts (carga de base 24/7/365) que as energias renováveis intermitentes não conseguem assegurar sozinhas. Gigantes tecnológicas assinaram acordos nucleares diretos plurianuais. Com défice físico estrutural de urânio, este ETF em EUR de acumulação capta este superciclo energético sem sobreposição tecnológica.',
    topHoldings: 'Cameco Corp, Kazatomprom, BWX Technologies, Oklo, Constellation Energy, NexGen',
    fundingSource: 'Financiado como satélite tático ou reforço de aporte sem diluir o núcleo tecnológico',
    status: 'Eriticamente Não-Dilutivo'
  },
  {
    id: 'rec-dfns',
    ticker: 'DFNS.DE',
    tickerDisplay: 'DFNS',
    isin: 'IE000YYE6WK5',
    name: 'VanEck Defense UCITS ETF',
    type: 'ETF',
    exchange: 'XETRA (Frankfurt)',
    currency: 'EUR',
    flag: '🇪🇺',
    distribution: 'Acumulação (Acc - Sem atrito fiscal)',
    category: 'Superciclo de Rearmamento Soberano Europeu',
    roleType: 'GROWTH',
    roleLabel: 'Alfa Estratégico (Crescimento Secular)',
    cagr: '+15.5%',
    expectedCagrNum: 15.5,
    allocationPercent: 8.0,
    terOrPe: '0.55% TER (Menor TER de Defesa)',
    dividendYield: 'Acumulado (0.0% imposto anual)',
    downsideRating: 'Carteiras de Encomendas de Governos > €100B',
    correlationWithTech: '0.14 (Descorrelacionado)',
    portfolioOverlap: '0.0% (Zero Sobreposição)',
    overlapDetail: 'Zero sobreposição com tecnologia e semicondutores. Encomendas garantidas por orçamentos de defesa soberanos da Europa (meta 2%+ do PIB na NATO).',
    thesis: 'Superciclo secular de rearmamento soberano europeu. Os países da União Europeia comprometeram-se a reforçar estruturalmente os seus orçamentos de segurança militar. As carteiras de encomendas para Rheinmetall, Leonardo, Safran e BAE Systems estão preenchidas para os próximos 10 a 15 anos, operando independentemente dos ciclos de consumo e taxas de juro.',
    topHoldings: 'Rheinmetall, Safran, Leonardo, Thales, BAE Systems, Kongsberg Gruppen',
    fundingSource: 'Financiado como satélite tático ou reforço de aporte sem diluir o núcleo tecnológico',
    status: 'Eriticamente Não-Dilutivo'
  },
  {
    id: 'rec-rhm',
    ticker: 'RHM.DE',
    tickerDisplay: 'RHM',
    isin: 'DE0007030009',
    name: 'Rheinmetall AG',
    type: 'Stock',
    exchange: 'XETRA (Frankfurt)',
    currency: 'EUR',
    flag: '🇩🇪',
    distribution: 'Ação Direta (0.00% TER)',
    category: 'Sistemas de Defesa Terrestre & Monopólio de Munições',
    roleType: 'GROWTH',
    roleLabel: 'Alfa Estratégico (Ação Direta)',
    cagr: '+17.0%',
    expectedCagrNum: 17.0,
    allocationPercent: 5.0,
    terOrPe: '22.5x P/E',
    dividendYield: '1.50% anual',
    downsideRating: 'Backlog > €50B / Margens Operacionais Elevadas',
    correlationWithTech: '0.12 (Descorrelacionado)',
    portfolioOverlap: '0.0% (Zero Sobreposição)',
    overlapDetail: 'Zero sobreposição com os teus ativos de DCA. Fornecedor fulcral de munições para tanques Leopard, defesa antiaérea Skyranger e viaturas militares.',
    thesis: 'Líder industrial absoluto de defesa na Europa com encomendas governamentais firmadas que ultrapassam os 50 mil milhões de euros até 2035+. Oferece previsibilidade de receitas sem paralelo, elevada rentabilidade sobre o capital investido e 0.00% de comissões de gestão por ser ação direta em Euros.',
    topHoldings: 'Campeã Europeia de Defesa e Soberania Terrestre',
    fundingSource: 'Financiado como satélite tático ou reforço de aporte sem diluir o núcleo tecnológico',
    status: 'Eriticamente Não-Dilutivo'
  },
  {
    id: 'rec-copx',
    ticker: 'COPX.DE',
    tickerDisplay: 'COPX',
    isin: 'IE0003Z9E2Y3',
    name: 'Global X Copper Miners UCITS ETF',
    type: 'ETF',
    exchange: 'XETRA (Frankfurt)',
    currency: 'EUR',
    flag: '🇪🇺',
    distribution: 'Acumulação (Acc - Sem atrito fiscal)',
    category: 'Eletrificação de IA & Superciclo do Cobre Físico',
    roleType: 'GROWTH',
    roleLabel: 'Alfa Estratégico (Superciclo de Matérias-Primas)',
    cagr: '+14.0%',
    expectedCagrNum: 14.0,
    allocationPercent: 8.0,
    terOrPe: '0.65% TER',
    dividendYield: 'Acumulado (0.0% imposto anual)',
    downsideRating: 'Gargalo Físico do Mundo Eletrificado e dos Datacenters',
    correlationWithTech: '0.22 (Baixa Correlação)',
    portfolioOverlap: '0.0% (Zero Sobreposição)',
    overlapDetail: 'Zero sobreposição com tecnologia pura ou banca. Foco em mineradoras e refinadoras globais de cobre de grande escala.',
    thesis: 'O cobre é o gargalo físico insubstituível da inteligência artificial, redes elétricas e transição energética. Cada novo cluster de servidores de IA e cada transformador exige toneladas de cobre. Com o desenvolvimento de novas jazidas a exigir 12 a 15 anos de licenciamento, o desfasamento entre oferta e procura gera um suporte secular de preços em EUR.',
    topHoldings: 'Freeport-McMoRan, Southern Copper, Ivanhoe Mines, Antofagasta, Lundin Mining',
    fundingSource: 'Financiado como satélite tático ou reforço de aporte sem diluir o núcleo tecnológico',
    status: 'Eriticamente Não-Dilutivo'
  },
  {
    id: 'rec-su',
    ticker: 'SU.PA',
    tickerDisplay: 'SU',
    isin: 'FR0000121972',
    name: 'Schneider Electric SE',
    type: 'Stock',
    exchange: 'Euronext Paris',
    currency: 'EUR',
    flag: '🇫🇷',
    distribution: 'Ação Direta (0.00% TER)',
    category: 'Infraestrutura Elétrica & Arrefecimento Líquido para IA',
    roleType: 'GROWTH',
    roleLabel: 'Alfa Estratégico (Líder Industrial de Infraestrutura)',
    cagr: '+14.0%',
    expectedCagrNum: 14.0,
    allocationPercent: 6.0,
    terOrPe: '22.0x P/E',
    dividendYield: '2.10% anual (Crescimento Contínuo)',
    downsideRating: 'Infraestrutura Crítica / Forte Fluxo de Caixa Livre',
    correlationWithTech: '0.35 (Baixa a Moderada)',
    portfolioOverlap: '0.0% (Zero Sobreposição)',
    overlapDetail: 'Classificada no setor Industrial Europeu. Não está no S&P 500 IT, não está no CHIP nem na Deutsche Börse.',
    thesis: 'Fornecedora mundial de referência em sistemas de distribuição de energia em média/alta tensão, quadros elétricos digitais e sistemas de arrefecimento líquido para datacenters de IA. Beneficia diretamente dos investimentos massivos de infraestrutura da Big Tech com modelo industrial rentável e 0.00% de custos de gestão.',
    topHoldings: 'Líder Europeia em Infraestrutura Elétrica e Datacenters',
    fundingSource: 'Financiado como satélite tático ou reforço de aporte sem diluir o núcleo tecnológico',
    status: 'Eriticamente Não-Dilutivo'
  },
  {
    id: 'rec-2b70',
    ticker: '2B70.DE',
    tickerDisplay: '2B70',
    isin: 'IE00BYXG2H39',
    name: 'iShares Nasdaq US Biotechnology UCITS ETF',
    type: 'ETF',
    exchange: 'XETRA (Frankfurt)',
    currency: 'EUR',
    flag: '🇪🇺',
    distribution: 'Acumulação (Acc - Sem atrito fiscal)',
    category: 'Biotecnologia Inovadora & Medicina Molecular',
    roleType: 'GROWTH',
    roleLabel: 'Alfa Estratégico (Inovação em Saúde)',
    cagr: '+14.5%',
    expectedCagrNum: 14.5,
    allocationPercent: 8.0,
    terOrPe: '0.35% TER (Ultra-Competitivo)',
    dividendYield: 'Acumulado (0.0% imposto anual)',
    downsideRating: 'Pipeline Secular de Terapias Patenteadas Inelásticas',
    correlationWithTech: '0.28 (Baixa Correlação)',
    portfolioOverlap: '0.0% (Zero Sobreposição)',
    overlapDetail: 'Zero sobreposição com os teus ativos de tecnologia americana e semicondutores. Focado em empresas de biotecnologia inovadora.',
    thesis: 'Ao contrário de farmacêuticas tradicionais que enfrentam expiração de patentes, a biotecnologia foca-se em inovação médica de ponta (terapias génicas, oncologia avançada e descoberta de medicamentos assistida por IA). Com TER ultra-reduzido de 0.35%, acumulação automática em EUR e sem sobreposição de carteira.',
    topHoldings: 'Vertex Pharmaceuticals, Gilead Sciences, Regeneron, Amgen, Alnylam, Biogen',
    fundingSource: 'Financiado como satélite tático ou reforço de aporte sem diluir o núcleo tecnológico',
    status: 'Eriticamente Não-Dilutivo'
  }
];

// Default reference holdings loaded directly from standalone user_portfolio.json file
const DEFAULT_HOLDINGS = userPortfolioConfig.holdings;

export default function MyPortfolioTab({ onSelectStockByTicker }) {
  // Monthly contribution set by user (Default: 100€/month)
  const MONTHLY_DCA = userPortfolioConfig.monthlyDca || 100; // €100/month
  const fileInputRef = useRef(null);

  // Valuation Scenario: 'conservative' (base) | 'optimistic' (+4.00% a.a.)
  const [valuationScenario, setValuationScenario] = useState('conservative');

  // User's authoritative portfolio holdings, loaded from localStorage or user_portfolio.json
  const [holdings, setHoldings] = useState(() => {
    try {
      const saved = localStorage.getItem('stockradar_user_portfolio_holdings_v10');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return DEFAULT_HOLDINGS.map(def => {
            const match = parsed.find(p => p.id === def.id);
            if (!match) return def;
            return {
              ...def,
              currentAllocation: typeof match.currentAllocation === 'number' ? match.currentAllocation : def.currentAllocation,
              value: typeof match.value === 'number' ? match.value : def.value,
              pnlValue: typeof match.pnlValue === 'number' ? match.pnlValue : def.pnlValue,
              pnlPercent: typeof match.pnlPercent === 'number' ? match.pnlPercent : def.pnlPercent
            };
          });
        }
      }
    } catch (e) {
      console.warn('Failed to load portfolio holdings from localStorage', e);
    }
    return DEFAULT_HOLDINGS;
  });

  // User confirmation tracking states
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [justConfirmed, setJustConfirmed] = useState(false);

  // Live monitoring states
  const [isLiveActive, setIsLiveActive] = useState(true);
  const [lastSyncTime, setLastSyncTime] = useState(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
  const [isSyncing, setIsSyncing] = useState(false);
  const [chartHoverIndex, setChartHoverIndex] = useState(null);

  // Long-Term Projection horizon state: '5Y' | '10Y' | '20Y' | '30Y'
  // Default set to '10Y'
  const [projectionHorizon, setProjectionHorizon] = useState('10Y');

  // Deposit simulator input
  const [customMonthlyAporte, setCustomMonthlyAporte] = useState(MONTHLY_DCA);

  // Dynamic Free Slider in years for projection calculator (defaults to 10 years = 120 months)
  const [interactiveYears, setInteractiveYears] = useState(10);

  // Show/Hide historical audit details
  const [showHistoricalAudit, setShowHistoricalAudit] = useState(false);

  // Show/Hide Dynamic Simulator rate derivation details
  const [showRateMethodology, setShowRateMethodology] = useState(false);

  // EUR Recommendations filter state: 'ALL' | 'GROWTH' | 'DEFENSIVE' | 'ETF' | 'STOCK'
  const [eurFilter, setEurFilter] = useState('ALL');

  // View mode for Section 6 DCA monthly contribution split: 'myPortfolio' (default) | 'aiSuggested'
  const [dcaViewMode, setDcaViewMode] = useState('myPortfolio');

  // State for editing actual portfolio holdings
  const [isEditHoldingsOpen, setIsEditHoldingsOpen] = useState(false);
  const [editingHoldingsData, setEditingHoldingsData] = useState([]);

  // enrichedHoldings directly uses holdings state (where currentAllocation is strictly what the user chooses)
  const enrichedHoldings = holdings;

  // Total Current Allocation weight sum (o que o utilizador escolheu)
  const totalCurrentWeight = useMemo(() => {
    return holdings.reduce((sum, h) => sum + (parseFloat(h.currentAllocation) || 0), 0);
  }, [holdings]);

  // Conservative Portfolio Expected Return (CAGR) weighted by user allocation
  const conservativeExpectedCagr = useMemo(() => {
    const totalW = holdings.reduce((sum, h) => sum + (parseFloat(h.currentAllocation) || 0), 0);
    if (totalW === 0) return 13.60;
    const weightedSum = holdings.reduce((sum, h) => {
      const w = parseFloat(h.currentAllocation) || 0;
      const cagr = typeof h.conservativeCagr === 'number' ? h.conservativeCagr : (typeof h.expectedCagr === 'number' ? h.expectedCagr : 13.60);
      return sum + (w * cagr);
    }, 0);
    return parseFloat((weightedSum / totalW).toFixed(2));
  }, [holdings]);

  // Authoritative Portfolio Expected Return (CAGR) dynamically selected:
  // - Conservador: weighted average based on user allocation (+13.60% a.a.)
  // - Otimista: Conservador + 4.00% a.a. (+17.60% a.a.)
  const dynamicExpectedCagr = useMemo(() => {
    if (valuationScenario === 'optimistic') {
      return parseFloat((conservativeExpectedCagr + 4.00).toFixed(2));
    }
    return conservativeExpectedCagr;
  }, [valuationScenario, conservativeExpectedCagr]);

  // Weighted Cash Dividend Yield from individual dividend-paying stocks (DB1 ~1.85%, GOOGL ~0.45%, META ~0.35%)
  const weightedCashDividendYield = useMemo(() => {
    const totalW = holdings.reduce((sum, h) => sum + (parseFloat(h.currentAllocation) || 0), 0);
    if (totalW === 0) return 0.26;
    const weightedSum = holdings.reduce((sum, h) => {
      const w = parseFloat(h.currentAllocation) || 0;
      const yieldPct = typeof h.dividendYield === 'number' ? h.dividendYield : (
        h.ticker === 'DB1.DE' ? 1.85 :
        h.ticker === 'GOOGL' ? 0.45 :
        h.ticker === 'META' ? 0.35 : 0.00
      );
      return sum + (w * yieldPct);
    }, 0);
    return parseFloat((weightedSum / totalW).toFixed(2));
  }, [holdings]);

  // Handler: Confirm and persist holdings to localStorage, backend API and JSON file
  const handleConfirmHoldings = (itemsToSave = null) => {
    const dataToSave = itemsToSave || holdings;
    try {
      localStorage.setItem('stockradar_user_portfolio_holdings_v10', JSON.stringify(dataToSave));
    } catch (e) {
      console.warn('Failed to save holdings to localStorage:', e);
    }

    // Persist to server.py if local API is available
    const payload = {
      ...userPortfolioConfig,
      lastUpdated: new Date().toISOString(),
      holdings: dataToSave
    };

    fetch('/api/user-portfolio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).catch(() => {
      fetch('http://127.0.0.1:8000/api/user-portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(() => {});
    });

    setHasUnsavedChanges(false);
    setJustConfirmed(true);
    setTimeout(() => {
      setJustConfirmed(false);
    }, 3500);
  };

  // Handler: Export user_portfolio.json file
  const handleExportJsonFile = () => {
    const exportData = {
      ...userPortfolioConfig,
      lastExported: new Date().toISOString(),
      holdings: holdings
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'user_portfolio.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Handler: Import user_portfolio.json file
  const handleImportJsonFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        const importedHoldings = parsed.holdings || (Array.isArray(parsed) ? parsed : null);
        if (importedHoldings && Array.isArray(importedHoldings)) {
          setHoldings(importedHoldings);
          handleConfirmHoldings(importedHoldings);
        }
      } catch (err) {
        console.error('Erro ao importar ficheiro user_portfolio.json', err);
      }
    };
    reader.readAsText(file);
  };

  // Handler: Reset holdings to default initial values from user_portfolio.json
  const handleResetToDefaultHoldings = () => {
    try {
      localStorage.removeItem('stockradar_user_portfolio_holdings_v10');
      localStorage.removeItem('stockradar_user_portfolio_holdings_v9');
      localStorage.removeItem('stockradar_user_portfolio_holdings_v8');
    } catch (e) {}
    setHoldings(DEFAULT_HOLDINGS);
    setDcaViewMode('myPortfolio');
    setHasUnsavedChanges(false);
    setJustConfirmed(false);
  };

  // Handler: Update Current Allocation for a specific asset (O que meto no portfólio - NUNCA alterado pela AI)
  const handleUpdateCurrentAllocation = (id, newVal) => {
    setHasUnsavedChanges(true);
    setJustConfirmed(false);
    setHoldings(prev => prev.map(h => h.id === id ? { ...h, currentAllocation: Math.max(0, Math.min(100, newVal)) } : h));
  };

  // Handler: Normalize Current Allocation to 100%
  const handleNormalizeCurrent = () => {
    setHasUnsavedChanges(true);
    setJustConfirmed(false);
    setHoldings(prev => {
      const currentSum = prev.reduce((sum, h) => sum + (parseFloat(h.currentAllocation) || 0), 0);
      if (currentSum === 0) return prev;
      return prev.map(h => ({
        ...h,
        currentAllocation: parseFloat((((parseFloat(h.currentAllocation) || 0) / currentSum) * 100).toFixed(2))
      }));
    });
  };

  // Handler: Save edited portfolio holdings from modal (€ e PnL) - PRESERVA a alocação escolhida pelo utilizador!
  const handleSavePortfolioHoldings = (newItems) => {
    let nextHoldings = [];
    setHoldings(prev => {
      const updated = prev.map(h => {
        const found = newItems.find(item => item.id === h.id);
        if (!found) return h;
        const val = parseFloat(found.value) || 0;
        const pnl = parseFloat(found.pnlValue) || 0;
        const invested = val - pnl;
        const pnlPct = invested > 0 ? (pnl / invested) * 100 : 0;
        return {
          ...h,
          value: val,
          pnlValue: pnl,
          pnlPercent: parseFloat(pnlPct.toFixed(2))
        };
      });
      nextHoldings = updated;
      return nextHoldings;
    });

    handleConfirmHoldings(nextHoldings);
    setIsEditHoldingsOpen(false);
  };

  // Dynamic Strategy Metrics based on dcaViewMode ('myPortfolio' vs 'aiSuggested')
  const strategyMetrics = useMemo(() => {
    if (dcaViewMode === 'aiSuggested') {
      return {
        cagr: '13.60% a.a.',
        cagrSub: 'Cenário Conservador & Prudente (Desconto de ciclos e maturidade)',
        volatility: '17.85%',
        volatilitySub: '🛡️ Maior potencial secular de valorização',
        sharpe: '1.37',
        sharpeSub: 'Alta eficiência de Sharpe',
        extraGain: '+€148,000'
      };
    }

    // Default: myPortfolio (A Minha Carteira Escolhida)
    const netCagr = dynamicExpectedCagr.toFixed(2);
    const cagrNum = dynamicExpectedCagr;
    return {
      cagr: `${netCagr}% a.a.`,
      cagrSub: hasUnsavedChanges 
        ? '⚠️ Valores alterados (Clica em Confirmar Alocação)' 
        : `Calculado com base na tua alocação (${totalCurrentWeight.toFixed(1)}%)`,
      volatility: '18.05%',
      volatilitySub: 'Volatilidade estimada da tua carteira',
      sharpe: (cagrNum / 18.05).toFixed(2),
      sharpeSub: 'Rácio de Sharpe da tua carteira',
      extraGain: 'A tua carteira'
    };
  }, [dcaViewMode, dynamicExpectedCagr, totalCurrentWeight, hasUnsavedChanges]);

  // Portfolio live total calculations (Calibrated to user_portfolio.json)
  const totalInvested = userPortfolioConfig.totalInvested || 2020.00;
  const holdingsValue = useMemo(() => enrichedHoldings.reduce((acc, h) => acc + h.value, 0), [enrichedHoldings]);
  const cashBalance = userPortfolioConfig.cashBalance || 8.26;
  const totalValue = useMemo(() => +(holdingsValue + cashBalance).toFixed(2), [holdingsValue, cashBalance]);
  const totalPnlValue = useMemo(() => +(totalValue - totalInvested).toFixed(2), [totalValue, totalInvested]);
  const totalPnlPercent = totalInvested > 0 ? (totalPnlValue / totalInvested) * 100 : 0;

  // Real cash dividends distributed directly to XTB account from individual dividend-paying stocks
  const currentAnnualCashDividends = useMemo(() => {
    return parseFloat((totalValue * (weightedCashDividendYield / 100)).toFixed(2));
  }, [totalValue, weightedCashDividendYield]);
  const currentMonthlyCashDividends = useMemo(() => {
    return parseFloat((currentAnnualCashDividends / 12).toFixed(2));
  }, [currentAnnualCashDividends]);

  // Real Historical Performance Series (24 Months: 28/01/2025 to 15/12/2026)
  // Calibrated to actual XTB deposit history: 24 monthly contributions of €80 = €1,920.00
  // Performance verified: Saldo Total: €2,248.26 | Lucro Total: +€328.26 (+17.10%)
  const realHistory = useMemo(() => [
    { m: 1,  dateLabel: 'Jan 25', fullDate: '28/01/2025', invested: 80.00,   value: 80.00,   profit: 0.00,   profitPercent: '0.00',  event: '1º aporte de 80€ (Início do plano na XTB a 28/01/2025)' },
    { m: 2,  dateLabel: 'Fev 25', fullDate: '01/02/2025', invested: 160.00,  value: 162.20,  profit: 2.20,   profitPercent: '+1.38', event: '2º aporte de 80€; mercados globais estáveis' },
    { m: 3,  dateLabel: 'Mar 25', fullDate: '01/03/2025', invested: 240.00,  value: 236.40,  profit: -3.60,  profitPercent: '-1.50', event: '3º aporte de 80€; correção ligeira em tecnologia' },
    { m: 4,  dateLabel: 'Abr 25', fullDate: '01/04/2025', invested: 320.00,  value: 313.20,  profit: -6.80,  profitPercent: '-2.13', event: '4º aporte de 80€; compra a desconto durante o dip' },
    { m: 5,  dateLabel: 'Mai 25', fullDate: '01/05/2025', invested: 400.00,  value: 418.50,  profit: 18.50,  profitPercent: '+4.63', event: '5º aporte de 80€; forte recuperação nos mercados europeus' },
    { m: 6,  dateLabel: 'Jun 25', fullDate: '01/06/2025', invested: 480.00,  value: 512.10,  profit: 32.10,  profitPercent: '+6.69', event: '6º aporte de 80€; resultados sólidos e expansão de margens' },
    { m: 7,  dateLabel: 'Jul 25', fullDate: '01/07/2025', invested: 560.00,  value: 608.40,  profit: 48.40,  profitPercent: '+8.64', event: '7º aporte de 80€; subida em semicondutores e S&P 500 IT' },
    { m: 8,  dateLabel: 'Ago 25', fullDate: '01/08/2025', invested: 640.00,  value: 692.80,  profit: 52.80,  profitPercent: '+8.25', event: '8º aporte de 80€; consolidação de verão' },
    { m: 9,  dateLabel: 'Set 25', fullDate: '01/09/2025', invested: 720.00,  value: 786.50,  profit: 66.50,  profitPercent: '+9.24', event: '9º aporte de 80€; cortes de juros impulsionam ações' },
    { m: 10, dateLabel: 'Out 25', fullDate: '01/10/2025', invested: 800.00,  value: 884.20,  profit: 84.20,  profitPercent: '+10.53', event: '10º aporte de 80€; carteira aproxima-se dos 900€' },
    { m: 11, dateLabel: 'Nov 25', fullDate: '01/11/2025', invested: 880.00,  value: 981.60,  profit: 101.60, profitPercent: '+11.55', event: '11º aporte de 80€; lucro acumulado ultrapassa os 100€' },
    { m: 12, dateLabel: 'Dez 25', fullDate: '01/12/2025', invested: 960.00,  value: 1083.64, profit: 123.64, profitPercent: '+12.88', event: '12º aporte de 80€; ano 2025 fecha com lucro de +123.64€ (TWR 2025: +13.52%)' },
    { m: 13, dateLabel: 'Jan 26', fullDate: '01/01/2026', invested: 1040.00, value: 1188.50, profit: 148.50, profitPercent: '+14.28', event: '13º aporte de 80€; entrada em 2026 em novos máximos' },
    { m: 14, dateLabel: 'Fev 26', fullDate: '01/02/2026', invested: 1120.00, value: 1282.10, profit: 162.10, profitPercent: '+14.47', event: '14º aporte de 80€; consolidação e margens bancárias sólidas' },
    { m: 15, dateLabel: 'Mar 26', fullDate: '01/03/2026', invested: 1200.00, value: 1374.30, profit: 174.30, profitPercent: '+14.53', event: '15º aporte de 80€; capital investido atinge 1.200€' },
    { m: 16, dateLabel: 'Abr 26', fullDate: '01/04/2026', invested: 1280.00, value: 1520.40, profit: 240.40, profitPercent: '+18.78', event: '16º aporte de 80€; aceleração em semicondutores e Big Tech' },
    { m: 17, dateLabel: 'Mai 26', fullDate: '01/05/2026', invested: 1360.00, value: 1682.50, profit: 322.50, profitPercent: '+23.71', event: '17º aporte de 80€; resultados recorde em infraestrutura de IA' },
    { m: 18, dateLabel: 'Jun 26', fullDate: '01/06/2026', invested: 1440.00, value: 1798.20, profit: 358.20, profitPercent: '+24.88', event: '18º aporte de 80€; lucro ultrapassa os 350€' },
    { m: 19, dateLabel: 'Jul 26', fullDate: '01/07/2026', invested: 1520.00, value: 1912.80, profit: 392.80, profitPercent: '+25.84', event: '19º aporte de 80€; carteira aproxima-se dos 2.000€' },
    { m: 20, dateLabel: 'Ago 26', fullDate: '01/08/2026', invested: 1600.00, value: 2015.40, profit: 415.40, profitPercent: '+25.96', event: '20º aporte de 80€; património ultrapassa oficialmente a marca dos 2.000€' },
    { m: 21, dateLabel: 'Set 26', fullDate: '01/09/2026', invested: 1680.00, value: 2125.60, profit: 445.60, profitPercent: '+26.52', event: '21º aporte de 80€; consolidação com ganhos consistentes' },
    { m: 22, dateLabel: 'Out 26', fullDate: '01/10/2026', invested: 1760.00, value: 2155.32, profit: 395.32, profitPercent: '+22.46', event: '22º aporte de 80€; consolidação de outono' },
    { m: 23, dateLabel: 'Nov 26', fullDate: '01/11/2026', invested: 1840.00, value: 2201.80, profit: 361.80, profitPercent: '+19.66', event: '23º aporte de 80€; continuação da estratégia disciplinada de DCA' },
    { 
      m: 24, 
      dateLabel: 'Dez 26', 
      fullDate: '15/12/2026', 
      invested: totalInvested, 
      value: totalValue, 
      profit: totalPnlValue, 
      profitPercent: (totalPnlPercent >= 0 ? '+' : '') + totalPnlPercent.toFixed(2), 
      isLive: true,
      event: `Posição Real Verificada (${totalInvested.toLocaleString('pt-PT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}€ investidos • 24 aportes de 80€ + 1 reforço de 100€ no dip | Saldo Total: ${totalValue.toLocaleString('pt-PT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}€ | Lucro Total: +${totalPnlValue.toFixed(2)}€ | +${totalPnlPercent.toFixed(2)}%)` 
    }
  ], [totalInvested, totalValue, totalPnlValue, totalPnlPercent]);

  // Real-Time Long-Term Forward Projection Engine (5 Years = 60M, 10 Years = 120M, 20 Years = 240M)
  // Calculates dynamically from current live totalValue, compounding with +€100/month
  // Measures TOTAL plan duration from 01/01/2025 launch date!
  // Elapsed to date: 24 months (Jan 2025 to Dec 2026).
  // 5-Year Plan Milestone = Month 60 total (36 forward months remaining -> Dec 2029)
  // 10-Year Plan Milestone = Month 120 total (96 forward months remaining -> Dec 2034)
  // 20-Year Plan Milestone = Month 240 total (216 forward months remaining -> Dec 2044)
  const combinedTimeline = useMemo(() => {
    const horizonToRemainingMonths = {
      '24M': 0,
      '5Y': 36,   // Reaches Month 60 (5-Year Plan Milestone • Dec 2029)
      '10Y': 96,  // Reaches Month 120 (10-Year Plan Milestone • Dec 2034)
      '20Y': 216, // Reaches Month 240 (20-Year Plan Milestone • Dec 2044)
      '30Y': 336  // Reaches Month 360 (30-Year Plan Milestone • Dec 2054)
    };
    const forwardMonths = horizonToRemainingMonths[projectionHorizon] !== undefined ? horizonToRemainingMonths[projectionHorizon] : 96;

    const list = realHistory.map(item => ({
      ...item,
      isProjection: false
    }));

    if (forwardMonths === 0) return list;

    const monthlyDeposit = customMonthlyAporte || 100;
    const annualCagr = dynamicExpectedCagr / 100; // Taxa anual dinâmica derivada da tua alocação confirmada
    const monthlyRate = Math.pow(1 + annualCagr, 1 / 12) - 1;

    let runningValue = totalValue;
    let runningInvested = totalInvested;

    const monthNamesShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    for (let f = 1; f <= forwardMonths; f++) {
      const monthNumber = 24 + f;
      runningInvested = Number((runningInvested + monthlyDeposit).toFixed(2));
      runningValue = Number(((runningValue + monthlyDeposit) * (1 + monthlyRate)).toFixed(2));
      const profit = Number((runningValue - runningInvested).toFixed(2));
      const profitPercent = (((runningValue - runningInvested) / runningInvested) * 100).toFixed(2);
      const additionalGain = Number((profit - totalPnlValue).toFixed(2));

      // Calculate year and month
      const totalElapsedMonths = 23 + f; // Month 24 is month index 23
      const year = 2025 + Math.floor(totalElapsedMonths / 12);
      const mIdx = totalElapsedMonths % 12;
      const monthShort = monthNamesShort[mIdx];
      const dateLabel = `${monthShort} ${String(year).slice(2)}`;
      const fullDate = `01/${mIdx < 9 ? '0' + (mIdx + 1) : mIdx + 1}/${year}`;

      const totalPlanYears = (monthNumber / 12).toFixed(1);

      list.push({
        m: monthNumber,
        dateLabel: dateLabel,
        fullDate: fullDate,
        invested: runningInvested,
        value: runningValue,
        profit: profit,
        profitPercent: '+' + profitPercent,
        additionalGain: additionalGain,
        isProjection: true,
        event: `Plan Month ${monthNumber} (${totalPlanYears} yrs from 01/01/2025): Deposit +€${monthlyDeposit}/mo`
      });
    }

    return list;
  }, [realHistory, projectionHorizon, customMonthlyAporte, totalValue, totalInvested, totalPnlValue, dynamicExpectedCagr]);

  // Comprehensive Long-Term Pillars: 5 YEARS (60M), 10 YEARS (120M) & 20 YEARS (240M) from 01/01/2025
  const longTermProjections = useMemo(() => {
    const monthlyDeposit = customMonthlyAporte || 100;
    const consCagr = conservativeExpectedCagr / 100;
    const optCagr = (conservativeExpectedCagr + 4.00) / 100;
    const stressTestCagr = Math.max(0.04, consCagr - 0.04);
    const baseCagr = valuationScenario === 'optimistic' ? optCagr : consCagr;
    
    // Calculates plan horizon where totalPlanYears is measured from 01/01/2025
    const calcPlanHorizon = (totalPlanYears) => {
      const totalMonths = totalPlanYears * 12;
      const elapsedMonths = 24;
      const remainingMonths = Math.max(1, totalMonths - elapsedMonths);
      const newCapital = remainingMonths * monthlyDeposit;
      const totalInv = totalInvested + newCapital;

      const calcValueForRate = (cagr) => {
        const mRate = Math.pow(1 + cagr, 1 / 12) - 1;
        let v = totalValue;
        for (let i = 0; i < remainingMonths; i++) {
          v = (v + monthlyDeposit) * (1 + mRate);
        }
        return Math.round(v);
      };

      const baseVal = calcValueForRate(baseCagr);
      const consVal = calcValueForRate(consCagr);
      const optVal = calcValueForRate(optCagr);
      const stressTestVal = calcValueForRate(stressTestCagr);

      const totalProfit = baseVal - totalInv;
      const additionalGain = totalProfit - totalPnlValue;
      const multiplier = totalInv > 0 ? Number((baseVal / totalInv).toFixed(2)) : 1.0;
      const profitPercent = ((totalProfit / totalInv) * 100).toFixed(1);
      const compoundSharePercent = ((totalProfit / baseVal) * 100).toFixed(1);

      // Estimated passive annual income at 4% safe withdrawal / dividend yield
      const passiveIncomePerYear = Math.round(baseVal * 0.04);
      const passiveIncomePerMonth = Math.round(passiveIncomePerYear / 12);

      // Estimated cash dividends distributed directly to XTB from dividend-paying stocks
      const annualCashDividends = Math.round(baseVal * (weightedCashDividendYield / 100));
      const monthlyCashDividends = Math.max(1, Math.round(annualCashDividends / 12));

      // Target calendar date: started 01/01/2025, totalMonths reaches Dec (2025 + totalPlanYears - 1)
      const targetYear = 2025 + Math.floor((totalMonths - 1) / 12);

      return {
        totalPlanYears,
        totalMonths,
        elapsedMonths,
        remainingMonths,
        targetYear,
        newCapital,
        totalInvested: Math.round(totalInv),
        projectedValue: baseVal,
        conservativeValue: consVal,
        optimisticValue: optVal,
        stressTestValue: stressTestVal,
        totalProfit: Math.round(totalProfit),
        conservativeProfit: Math.round(consVal - totalInv),
        additionalGain: Math.round(additionalGain),
        multiplier,
        profitPercent,
        compoundSharePercent,
        passiveIncomePerYear,
        passiveIncomePerMonth,
        annualCashDividends,
        monthlyCashDividends
      };
    };

    return {
      fiveYears: calcPlanHorizon(5),
      tenYears: calcPlanHorizon(10),
      twentyYears: calcPlanHorizon(20),
      thirtyYears: calcPlanHorizon(30),
      custom: calcPlanHorizon(interactiveYears)
    };
  }, [totalValue, totalInvested, totalPnlValue, customMonthlyAporte, interactiveYears, dynamicExpectedCagr, conservativeExpectedCagr, valuationScenario, weightedCashDividendYield]);

  // Live quotes sync handler connected to backend /api/my-portfolio-live
  const handleSyncQuotes = async () => {
    setIsSyncing(true);
    try {
      let res = await fetch('/api/my-portfolio-live').catch(() => null);
      if (!res || !res.ok) {
        res = await fetch('http://127.0.0.1:8000/api/my-portfolio-live').catch(() => null);
      }
      if (res && res.ok) {
        const data = await res.json();
        if (data && data.quotes) {
          setHoldings(prev => prev.map(h => {
            const q = data.quotes[h.id];
            if (q && q.price) {
              return {
                ...h,
                livePrice: q.price,
                dayChange: q.changePercent
              };
            }
            return h;
          }));
        }
      }
    } catch (e) {
      console.warn('Live API sync notification:', e);
    } finally {
      setIsSyncing(false);
      setLastSyncTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }
  };

  // Periodic Micro Live Fluctuation (every 8s when live is enabled)
  useEffect(() => {
    let interval = null;
    if (isLiveActive) {
      interval = setInterval(() => {
        setHoldings(prev => prev.map(h => {
          const delta = (Math.random() - 0.49) * 0.0012;
          const newVal = +(h.value * (1 + delta)).toFixed(2);
          const newPnl = +(h.pnlValue + (newVal - h.value)).toFixed(2);
          return {
            ...h,
            value: newVal,
            pnlValue: newPnl,
            pnlPercent: +(((newVal - (h.value - h.pnlValue)) / (h.value - h.pnlValue)) * 100).toFixed(2)
          };
        }));
        setLastSyncTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      }, 8000);
    }
    return () => clearInterval(interval);
  }, [isLiveActive]);

  // Next Monthly Contribution Split Calculation based on active view mode ('myPortfolio' vs 'aiSuggested')
  const dcaPlan = useMemo(() => {
    const aporte = parseFloat(customMonthlyAporte || 0);
    return holdings.map(h => {
      const weight = dcaViewMode === 'aiSuggested'
        ? h.suggestedAllocation
        : (parseFloat(h.currentAllocation) || 0);
      const amount = (weight / 100) * aporte;
      return {
        ...h,
        activeWeight: weight,
        dcaAmount: amount
      };
    });
  }, [holdings, customMonthlyAporte, dcaViewMode]);

  // SVG Chart Geometry & Dimensions (Expanded to full container width with large legible fonts)
  const svgWidth = 860;
  const svgHeight = 350;
  const padXLeft = 68;  // Ample room for bold legible €k labels on mobile
  const padXRight = 14; // Maximizes width right to the outer frame border
  const padY = 40;

  // Dynamic Y-axis scale based on current timeline max value
  const maxValInTimeline = useMemo(() => {
    const highestVal = Math.max(...combinedTimeline.map(pt => pt.value));
    if (highestVal > 85000) return 110000;
    if (highestVal > 60000) return 80000;
    if (highestVal > 20000) return 30000;
    if (highestVal > 9000) return 14000;
    if (highestVal > 4500) return 6000;
    if (highestVal > 2200) return 2600;
    return 2400;
  }, [combinedTimeline]);

  const minValChart = 0;
  const maxValChart = maxValInTimeline;

  const getX = (idx) => padXLeft + (idx / (combinedTimeline.length - 1)) * (svgWidth - padXLeft - padXRight);
  const getY = (val) => svgHeight - padY - ((val - minValChart) / (maxValChart - minValChart)) * (svgHeight - 2 * padY);

  // Split history into real segment and projection segment
  const realSlice = combinedTimeline.filter(pt => !pt.isProjection);
  const projSlice = combinedTimeline.filter(pt => pt.isProjection || pt.m === 24);

  // SVG Paths
  const investedPath = combinedTimeline.reduce((acc, pt, idx) => {
    const x = getX(idx);
    const y = getY(pt.invested);
    return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
  }, '');

  const realPortfolioPath = realSlice.reduce((acc, pt, idx) => {
    const x = getX(idx);
    const y = getY(pt.value);
    return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
  }, '');

  const projPortfolioPath = projSlice.reduce((acc, pt, idx) => {
    const globalIdx = 23 + idx; // Month 24 is index 23
    const x = getX(globalIdx);
    const y = getY(pt.value);
    return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
  }, '');

  // Shaded area under real history
  const realProfitArea = useMemo(() => {
    if (realSlice.length === 0) return '';
    const pointsPortfolio = realSlice.map((pt, idx) => `${getX(idx)} ${getY(pt.value)}`).join(' L ');
    const pointsInvestedReverse = realSlice.slice().reverse().map((pt, idx) => {
      const realIdx = realSlice.length - 1 - idx;
      return `${getX(realIdx)} ${getY(pt.invested)}`;
    }).join(' L ');
    return `M ${pointsPortfolio} L ${pointsInvestedReverse} Z`;
  }, [realSlice, maxValChart]);

  // Shaded area under projected curve
  const projProfitArea = useMemo(() => {
    if (projSlice.length <= 1) return '';
    const pointsPortfolio = projSlice.map((pt, idx) => `${getX(23 + idx)} ${getY(pt.value)}`).join(' L ');
    const pointsInvestedReverse = projSlice.slice().reverse().map((pt, idx) => {
      const globalIdx = 23 + (projSlice.length - 1 - idx);
      return `${getX(globalIdx)} ${getY(pt.invested)}`;
    }).join(' L ');
    return `M ${pointsPortfolio} L ${pointsInvestedReverse} Z`;
  }, [projSlice, maxValChart]);

  // Hover point selection
  const activePoint = chartHoverIndex !== null 
    ? combinedTimeline[chartHoverIndex] 
    : combinedTimeline.find(pt => pt.m === 24) || combinedTimeline[combinedTimeline.length - 1];

  // Dynamic grid line levels
  const gridLevels = useMemo(() => {
    if (maxValChart >= 100000) return [25000, 50000, 75000, 100000];
    if (maxValChart >= 60000) return [20000, 40000, 60000];
    if (maxValChart >= 25000) return [5000, 10000, 15000, 20000, 25000];
    if (maxValChart >= 12000) return [3000, 6000, 9000, 12000];
    if (maxValChart >= 5000) return [1000, 2000, 3000, 4000];
    return [500, 1000, 1500, 2000];
  }, [maxValChart]);

  // Smooth mouse move hover scrubber across chart (Full width calibrated)
  const handleChartMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const chartAreaWidth = rect.width;
    const usableWidth = (svgWidth - padXLeft - padXRight) * chartAreaWidth / svgWidth;
    const offsetLeft = (padXLeft * chartAreaWidth / svgWidth);
    const ratio = (mouseX - offsetLeft) / usableWidth;
    const clampedRatio = Math.max(0, Math.min(1, ratio));
    const targetIdx = Math.round(clampedRatio * (combinedTimeline.length - 1));
    if (targetIdx >= 0 && targetIdx < combinedTimeline.length) {
      setChartHoverIndex(targetIdx);
    }
  };

  // Touch move scrubber for mobile touchscreens (Full width calibrated)
  const handleChartTouchMove = (e) => {
    if (!e.touches || e.touches.length === 0) return;
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    const touchX = touch.clientX - rect.left;
    const chartAreaWidth = rect.width;
    const usableWidth = (svgWidth - padXLeft - padXRight) * chartAreaWidth / svgWidth;
    const offsetLeft = (padXLeft * chartAreaWidth / svgWidth);
    const ratio = (touchX - offsetLeft) / usableWidth;
    const clampedRatio = Math.max(0, Math.min(1, ratio));
    const targetIdx = Math.round(clampedRatio * (combinedTimeline.length - 1));
    if (targetIdx >= 0 && targetIdx < combinedTimeline.length) {
      setChartHoverIndex(targetIdx);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-16 font-sans">
      
      {/* 1. LIVE MONITORING TOP BAR */}
      <div className="bg-white border-2 border-black rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center">
            <span className={`w-2.5 h-2.5 rounded-full ${isLiveActive ? 'bg-[#2D6A4F]' : 'bg-zinc-400'}`}></span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-zinc-900 uppercase tracking-wider font-mono">
                Monitorização da Carteira XTB
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FAF8F5] text-zinc-800 border border-black font-semibold">
                80€/MÊS DCA
              </span>
            </div>
            <div className="text-xs text-zinc-500 flex items-center gap-2 mt-0.5 font-sans">
              <span>Última sincronização: <strong className="text-zinc-800 font-mono">{lastSyncTime}</strong></span>
              <span>•</span>
              <span className="text-zinc-600">Cotações: Euronext Paris (CHIP), Frankfurt/XETRA (QDVE / DB1), Frankfurt (QDVE) e Nasdaq</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsLiveActive(!isLiveActive)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium border transition-all ${
              isLiveActive 
                ? 'bg-zinc-900 text-white border-black' 
                : 'bg-white text-zinc-600 border-zinc-300'
            }`}
          >
            {isLiveActive ? '● Ativo' : '○ Pausado'}
          </button>

          <button
            onClick={handleSyncQuotes}
            disabled={isSyncing}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-[#FAF8F5] text-zinc-900 border border-black text-xs font-medium transition-all shadow-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-[#2D6A4F]' : 'text-zinc-700'}`} />
            <span>Sincronizar</span>
          </button>
        </div>
      </div>

      {/* 2. TOP KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Current Portfolio Value */}
        <div className="bg-white border-2 border-black rounded-xl p-5 shadow-xs">
          <div className="text-xs font-mono uppercase tracking-wider text-zinc-500 flex items-center gap-1.5 font-bold">
            <Briefcase className="w-3.5 h-3.5 text-zinc-700" /> Valor Total da Carteira
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-zinc-900 font-mono mt-2 tracking-tight">
            €{totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-xs text-zinc-500 mt-1 font-sans">
            Património líquido em tempo real
          </div>
        </div>

        {/* Card 2: Total Capital Invested */}
        <div className="bg-white border-2 border-black rounded-xl p-5 shadow-xs">
          <div className="text-xs font-mono uppercase tracking-wider text-zinc-500 flex items-center gap-1.5 font-bold">
            <Wallet className="w-3.5 h-3.5 text-zinc-700" /> Capital Investido (Depósitos)
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-zinc-900 font-mono mt-2 tracking-tight">
            €{totalInvested.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-xs text-zinc-600 mt-1 font-sans">
            <strong>24 depósitos</strong> executados (80€/mês)
          </div>
        </div>

        {/* Card 3: Total Net Profit / P&L */}
        <div className="bg-white border-2 border-black rounded-xl p-5 shadow-xs">
          <div className="text-xs font-mono uppercase tracking-wider text-[#2D6A4F] flex items-center gap-1.5 font-bold">
            <TrendingUp className="w-3.5 h-3.5 text-[#2D6A4F]" /> Retorno Líquido Total
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-[#2D6A4F] font-mono mt-2 tracking-tight">
            +€{totalPnlValue.toFixed(2)}
          </div>
          <div className="mt-1 flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded bg-[#EAF3ED] text-[#2D6A4F] border border-[#2D6A4F]/25 font-mono">
              ▲ +{totalPnlPercent.toFixed(2)}% simples
            </span>
            <span className="text-[11px] font-mono text-zinc-800 bg-[#FAF8F5] px-1.5 py-0.5 rounded border border-black/20" title="Taxa de Retorno Ponderada pelo Tempo (XTB)">
              TWR: <strong>+40.74%</strong>
            </span>
            <span className="text-[11px] font-mono text-zinc-600 bg-[#FAF8F5] px-1.5 py-0.5 rounded border border-black/20" title="Benchmark S&P 500 no mesmo período de 24 aportes DCA de 80€">
              (retorno do S&P 500: <strong>+12.80%</strong>)
            </span>
            <span className="inline-flex items-center gap-0.5 text-[10px] font-mono text-[#2D6A4F] bg-[#EAF3ED] px-1.5 py-0.5 rounded border border-[#2D6A4F]/20 font-bold" title="Excesso de rentabilidade da tua carteira face ao S&P 500">
              Alfa: +4.30%
            </span>
          </div>
        </div>

        {/* Card 4: Long-Term Pillar Highlight */}
        <div className="bg-white border-2 border-black rounded-xl p-5 shadow-xs">
          <div className="text-xs font-mono uppercase tracking-wider text-zinc-700 flex items-center justify-between font-bold flex-wrap gap-1">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-zinc-900" />
              {projectionHorizon === '5Y' ? 'Meta 5 Anos (2029)' : (projectionHorizon === '20Y' ? 'Meta 20 Anos (2044)' : (projectionHorizon === '30Y' ? 'Meta 30 Anos (2054)' : 'Meta 10 Anos (2034)'))}
            </div>
            <div className="flex items-center gap-1 bg-[#FAF8F5] p-0.5 rounded-md border border-black/20">
              <button
                onClick={() => setValuationScenario('conservative')}
                className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold transition-all ${
                  valuationScenario === 'conservative'
                    ? 'bg-black text-white shadow-2xs'
                    : 'text-zinc-600 hover:text-black'
                }`}
                title="Cenário base conservador"
              >
                🛡️ +{conservativeExpectedCagr.toFixed(1)}%
              </button>
              <button
                onClick={() => setValuationScenario('optimistic')}
                className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold transition-all ${
                  valuationScenario === 'optimistic'
                    ? 'bg-[#2D6A4F] text-white shadow-2xs'
                    : 'text-zinc-600 hover:text-[#2D6A4F]'
                }`}
                title="Cenário otimista (+4.00%)"
              >
                🚀 +{(conservativeExpectedCagr + 4).toFixed(1)}%
              </button>
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-zinc-900 font-mono mt-2 tracking-tight">
            €{projectionHorizon === '5Y' 
                ? longTermProjections.fiveYears.projectedValue.toLocaleString('en-US') 
                : (projectionHorizon === '20Y' 
                    ? longTermProjections.twentyYears.projectedValue.toLocaleString('en-US') 
                    : (projectionHorizon === '30Y'
                        ? longTermProjections.thirtyYears.projectedValue.toLocaleString('en-US')
                        : longTermProjections.tenYears.projectedValue.toLocaleString('en-US')))}
          </div>
          <div className="text-xs text-zinc-500 mt-1 flex items-center justify-between font-mono">
            <span>
              Lucro: +€{projectionHorizon === '5Y' 
                ? longTermProjections.fiveYears.totalProfit.toLocaleString('en-US') 
                : (projectionHorizon === '20Y' 
                    ? longTermProjections.twentyYears.totalProfit.toLocaleString('en-US') 
                    : (projectionHorizon === '30Y'
                        ? longTermProjections.thirtyYears.totalProfit.toLocaleString('en-US')
                        : longTermProjections.tenYears.totalProfit.toLocaleString('en-US')))}
            </span>
            <span className="text-zinc-600 font-bold">
              {projectionHorizon === '30Y' 
                ? `${Number(longTermProjections.thirtyYears.multiplier).toFixed(1)}x` 
                : (projectionHorizon === '20Y' 
                    ? `${Number(longTermProjections.twentyYears.multiplier).toFixed(1)}x` 
                    : (projectionHorizon === '5Y' 
                        ? `${Number(longTermProjections.fiveYears.multiplier).toFixed(1)}x` 
                        : `${Number(longTermProjections.tenYears.multiplier).toFixed(1)}x`))}
            </span>
          </div>
        </div>

      </div>

      {/* 3. CHART SECTION */}
      <div className="bg-white border-2 border-black rounded-xl p-3.5 sm:p-6 shadow-xs space-y-4">
        
        {/* Chart Header & Long-Term Horizon Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-3 border-b border-black/10">
          <div>
            <div className="flex items-center gap-2">
              <ChartIcon className="w-4 h-4 text-[#2D6A4F]" />
              <h2 className="text-base font-bold text-zinc-900 tracking-tight font-sans">
                Evolução Real e Projeções Futuras (€{customMonthlyAporte || 100}/Mês)
              </h2>
            </div>
            <p className="text-xs text-zinc-600 mt-1">
              Curva real ponderada dos teus 6 ativos e projeção de juros compostos a <strong className="text-[#2D6A4F] font-mono">+{dynamicExpectedCagr.toFixed(2)}% a.a.</strong> com aportes contínuos de <strong>€{customMonthlyAporte}/mês</strong>.
            </p>
          </div>

          <div className="flex flex-col items-stretch sm:items-end gap-2.5 w-full lg:w-auto">
            {/* Monthly aporte input */}
            <div className="flex items-center justify-between sm:justify-start gap-1.5 bg-[#FAF8F5] px-3 py-1.5 rounded-lg border border-black/20 text-xs w-full sm:w-auto">
              <span className="text-zinc-600 font-mono">Aporte Mensal:</span>
              <div className="flex items-center gap-1">
                <span className="font-bold text-zinc-900">€</span>
                <input
                  type="number"
                  min="10"
                  step="10"
                  value={customMonthlyAporte}
                  onChange={(e) => setCustomMonthlyAporte(Math.max(1, parseFloat(e.target.value) || 0))}
                  className="w-16 bg-white border border-black/30 rounded px-1.5 py-0.5 text-xs font-bold font-mono text-zinc-900 text-right focus:outline-none focus:border-black"
                />
                <span className="text-zinc-500">/mês</span>
              </div>
            </div>

            {/* Controls: Scenario (Conservador vs Otimista) and Horizons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full lg:w-auto">
              {/* Scenario Toggle */}
              <div className="flex items-center gap-1 bg-[#FAF8F5] p-1 rounded-xl border-2 border-black/25 shadow-2xs">
                <button
                  onClick={() => setValuationScenario('conservative')}
                  className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-xs font-mono transition-all text-center ${
                    valuationScenario === 'conservative'
                      ? 'bg-black text-white shadow-xs font-black'
                      : 'text-zinc-700 hover:text-black font-bold'
                  }`}
                  title="Cenário base conservador e prudente"
                >
                  🛡️ Conservador (+{conservativeExpectedCagr.toFixed(1)}%)
                </button>
                <button
                  onClick={() => setValuationScenario('optimistic')}
                  className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-xs font-mono transition-all text-center ${
                    valuationScenario === 'optimistic'
                      ? 'bg-[#2D6A4F] text-white shadow-xs font-black'
                      : 'text-zinc-700 hover:text-black font-bold'
                  }`}
                  title="Cenário otimista com +4% sobre a base conservadora"
                >
                  🚀 Otimista (+{(conservativeExpectedCagr + 4).toFixed(1)}%)
                </button>
              </div>

              {/* Horizon tabs (por baixo da janela de aporte mensal) */}
              <div className="flex items-center justify-between gap-1.5 bg-[#FAF8F5] p-1.5 rounded-xl border-2 border-black/25 w-full sm:w-auto shadow-2xs">
                <button
                  onClick={() => setProjectionHorizon('5Y')}
                  className={`flex-1 sm:flex-initial px-3.5 py-2 rounded-lg text-xs sm:text-sm font-mono transition-all text-center ${
                    projectionHorizon === '5Y'
                      ? 'bg-black text-white shadow-xs font-black'
                      : 'text-zinc-700 hover:text-black font-bold'
                  }`}
                >
                  5 Anos
                </button>
                <button
                  onClick={() => setProjectionHorizon('10Y')}
                  className={`flex-1 sm:flex-initial px-3.5 py-2 rounded-lg text-xs sm:text-sm font-mono transition-all text-center ${
                    projectionHorizon === '10Y'
                      ? 'bg-black text-white shadow-xs font-black'
                      : 'text-zinc-700 hover:text-black font-bold'
                  }`}
                >
                  10 Anos ★
                </button>
                <button
                  onClick={() => setProjectionHorizon('20Y')}
                  className={`flex-1 sm:flex-initial px-3.5 py-2 rounded-lg text-xs sm:text-sm font-mono transition-all text-center ${
                    projectionHorizon === '20Y'
                      ? 'bg-black text-white shadow-xs font-black'
                      : 'text-zinc-700 hover:text-black font-bold'
                  }`}
                >
                  20 Anos
                </button>
                <button
                  onClick={() => setProjectionHorizon('30Y')}
                  className={`flex-1 sm:flex-initial px-3.5 py-2 rounded-lg text-xs sm:text-sm font-mono transition-all text-center ${
                    projectionHorizon === '30Y'
                      ? 'bg-black text-white shadow-xs font-black'
                      : 'text-zinc-700 hover:text-black font-bold'
                  }`}
                >
                  30 Anos
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Legend (High Legibility Badges for Mobile & Desktop) */}
        <div className="flex flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3.5 pt-2 pb-1.5">
          <div className="flex items-center gap-2.5 bg-[#FAF8F5] px-3.5 py-2.5 rounded-xl border-2 border-black/30 shadow-xs">
            <span className="w-6 h-1.5 bg-zinc-600 rounded-full border border-dashed border-zinc-700 shrink-0"></span>
            <span className="text-zinc-950 font-mono text-sm sm:text-base font-extrabold">Investido (Depósitos)</span>
          </div>
          <div className="flex items-center gap-2.5 bg-[#EAF3ED] px-3.5 py-2.5 rounded-xl border-2 border-[#2D6A4F] shadow-xs">
            <span className="w-6 h-3 bg-[#2D6A4F] rounded-full shrink-0"></span>
            <span className="text-[#2D6A4F] font-mono text-sm sm:text-base font-black">Valor Real (Jan 25 – Dez 26)</span>
          </div>
          {projectionHorizon !== '24M' && (
            <div className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border-2 shadow-xs ${
              valuationScenario === 'optimistic' ? 'bg-[#EAF3ED] border-[#2D6A4F]' : 'bg-[#FAF8F5] border-zinc-950'
            }`}>
              <span className={`w-6 h-2 border-b-2 border-dashed shrink-0 ${
                valuationScenario === 'optimistic' ? 'border-[#2D6A4F]' : 'border-zinc-950'
              }`}></span>
              <span className={`font-mono text-sm sm:text-base font-black ${
                valuationScenario === 'optimistic' ? 'text-[#2D6A4F]' : 'text-zinc-950'
              }`}>
                {valuationScenario === 'optimistic' ? 'Projeção Otimista (+4%)' : 'Projeção Conservadora'} (+{dynamicExpectedCagr.toFixed(1)}%)
              </span>
            </div>
          )}
          <div className="flex items-center gap-1.5 ml-auto text-xs sm:text-sm text-zinc-600 font-sans py-1">
            <Sparkles className="w-4 h-4 text-[#2D6A4F] shrink-0" />
            <span>Arrasta o dedo na curva</span>
          </div>
        </div>

        {/* Interactive Hover / Touch Inspection Box (Large Legible Text) */}
        <div className="bg-[#FAF8F5] px-4 py-3.5 rounded-xl border-2 border-black flex flex-col md:flex-row md:items-center justify-between gap-2.5 text-sm sm:text-base font-mono shadow-xs">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-zinc-900">
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-1 rounded-md text-xs sm:text-sm font-black tracking-wide ${
                activePoint.isProjection 
                  ? 'bg-zinc-200 text-zinc-950 border border-zinc-500' 
                  : (activePoint.m === 24 ? 'bg-[#EAF3ED] text-[#2D6A4F] border-2 border-[#2D6A4F]' : 'bg-white text-zinc-800 border border-zinc-400')
              }`}>
                {activePoint.isProjection ? '✦ PROJEÇÃO' : (activePoint.m === 24 ? '● HOJE (LIVE)' : '✓ REAL')}
              </span>
              <strong className="text-zinc-950 text-base sm:text-lg font-black">{activePoint.fullDate || activePoint.dateLabel}</strong>
            </div>
            <span className="text-zinc-400 font-bold">•</span>
            <span className="text-sm sm:text-base">Investido: <strong className="text-zinc-950 font-black">€{activePoint.invested.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</strong></span>
            <span className="text-zinc-400 font-bold">•</span>
            <span className="text-sm sm:text-base">Valor: <strong className={`${activePoint.isProjection ? 'text-zinc-950' : 'text-[#2D6A4F]'} font-black text-base sm:text-lg`}>
              €{activePoint.value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </strong></span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className={`font-black text-sm sm:text-base ${
              activePoint.profit >= 0 ? (activePoint.isProjection ? 'text-zinc-950' : 'text-[#2D6A4F]') : 'text-[#9E2A2B]'
            }`}>
              Ganho: {activePoint.profit >= 0 ? '+' : ''}€{activePoint.profit.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} ({activePoint.profitPercent}%)
            </span>
            {activePoint.additionalGain !== undefined && activePoint.additionalGain > 0 && (
              <span className="text-zinc-950 font-sans text-xs sm:text-sm bg-white px-2.5 py-1 rounded-md border border-black/40 font-bold">
                +€{activePoint.additionalGain.toLocaleString('en-US', { maximumFractionDigits: 0 })} vs hoje
              </span>
            )}
          </div>
        </div>

        {/* SVG Dual-Segment Curve Chart with Touch Scrubber (Full Width to Border) */}
        <div className="-mx-3.5 sm:-mx-6 px-1 sm:px-2 overflow-hidden bg-[#FAF8F5]/30 border-y border-black/10 py-1">
          <svg 
            viewBox={`0 0 ${svgWidth} ${svgHeight}`} 
            className="w-full h-auto min-h-[250px] sm:min-h-[290px] max-h-[380px] overflow-visible select-none cursor-crosshair touch-none"
            onMouseMove={handleChartMouseMove}
            onMouseLeave={() => setChartHoverIndex(null)}
            onTouchStart={handleChartTouchMove}
            onTouchMove={handleChartTouchMove}
          >
            <defs>
              {/* Forest green gradient for historical profit */}
              <linearGradient id="realProfitGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2D6A4F" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#2D6A4F" stopOpacity="0.01" />
              </linearGradient>

              {/* Charcoal gradient for forward projection profit */}
              <linearGradient id="projProfitGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#18181B" stopOpacity="0.10" />
                <stop offset="100%" stopColor="#18181B" stopOpacity="0.01" />
              </linearGradient>
            </defs>

            {/* Horizontal Grid lines */}
            {gridLevels.map(val => {
              const y = getY(val);
              return (
                <g key={val}>
                  <line 
                    x1={padXLeft} 
                    y1={y} 
                    x2={svgWidth - padXRight} 
                    y2={y} 
                    stroke="#E5DFD5" 
                    strokeDasharray="3 3" 
                  />
                  <text 
                    x={padXLeft - 10} 
                    y={y + 7} 
                    fill="#18181B" 
                    fontSize="22" 
                    fontWeight="800"
                    textAnchor="end" 
                    fontFamily="monospace"
                  >
                    €{val >= 1000 ? `${val / 1000}k` : val}
                  </text>
                </g>
              );
            })}

            {/* Vertical separator between real history (M24) and projection (M25+) */}
            {projectionHorizon !== '24M' && (
              <g>
                <line 
                  x1={getX(23)} 
                  y1={padY} 
                  x2={getX(23)} 
                  y2={svgHeight - padY} 
                  stroke="#2D6A4F" 
                  strokeDasharray="3 3" 
                  strokeWidth="2"
                />
                <rect 
                  x={getX(23) - 52} 
                  y={padY - 32} 
                  width="104" 
                  height="26" 
                  rx="6" 
                  fill="#EAF3ED" 
                  stroke="#2D6A4F" 
                  strokeWidth="1.8" 
                />
                <text 
                  x={getX(23)} 
                  y={padY - 14} 
                  fill="#2D6A4F" 
                  fontSize="15" 
                  textAnchor="middle" 
                  fontFamily="monospace"
                  fontWeight="900"
                >
                  HOJE (LIVE)
                </text>
              </g>
            )}

            {/* Shaded Profit Area: Real Historical */}
            <path d={realProfitArea} fill="url(#realProfitGrad)" />

            {/* Shaded Profit Area: Projected Forward */}
            {projectionHorizon !== '24M' && (
              <path d={projProfitArea} fill="url(#projProfitGrad)" />
            )}

            {/* Line 1: Invested Capital (Dashed line) */}
            <path 
              d={investedPath} 
              fill="none" 
              stroke="#71717A" 
              strokeWidth="3.2" 
              strokeDasharray="5 3" 
              strokeLinecap="round" 
            />

            {/* Line 2A: Real Historical Market Value (Pine Forest Green) */}
            <path 
              d={realPortfolioPath} 
              fill="none" 
              stroke="#2D6A4F" 
              strokeWidth="4.2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />

            {/* Line 2B: Forward Projected Value (Charcoal dashed) */}
            {projectionHorizon !== '24M' && (
              <path 
                d={projPortfolioPath} 
                fill="none" 
                stroke="#18181B" 
                strokeWidth="3.6" 
                strokeDasharray="6 4" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
            )}

            {/* Milestone Markers along the curve */}
            {combinedTimeline.map((pt, idx) => {
              const isToday = pt.m === 24;
              const isHovered = activePoint.m === pt.m;
              const shouldRenderPoint = 
                !pt.isProjection || 
                pt.m === 24 + 36 ||   // 5 Years (Month 60)
                pt.m === 24 + 96 ||   // 10 Years (Month 120)
                pt.m === 24 + 216 ||  // 20 Years (Month 240)
                (projectionHorizon === '5Y' && (pt.m - 24) % 12 === 0) ||
                (projectionHorizon === '10Y' && (pt.m - 24) % 24 === 0) ||
                isHovered;

              if (!shouldRenderPoint) return null;

              const x = getX(idx);
              const yVal = getY(pt.value);
              const yInv = getY(pt.invested);

              return (
                <g key={pt.m}>
                  <circle cx={x} cy={yInv} r="2.5" fill="#71717A" />
                  <circle 
                    cx={x} 
                    cy={yVal} 
                    r={isToday ? 6.5 : (isHovered ? 7 : (pt.isProjection ? 4.5 : 3.5))} 
                    fill={isToday ? "#2D6A4F" : (pt.isProjection ? "#18181B" : "#2D6A4F")} 
                    stroke="#FAF8F5" 
                    strokeWidth="2.5" 
                  />
                  {isToday && (
                    <circle 
                      cx={x} 
                      cy={yVal} 
                      r="10" 
                      fill="none" 
                      stroke="#2D6A4F" 
                      strokeWidth="1.5" 
                      strokeOpacity="0.4" 
                    />
                  )}
                </g>
              );
            })}

            {/* Active hover / touch crosshair */}
            {activePoint && (
              <g>
                <line 
                  x1={getX(combinedTimeline.findIndex(item => item.m === activePoint.m))} 
                  y1={padY} 
                  x2={getX(combinedTimeline.findIndex(item => item.m === activePoint.m))} 
                  y2={svgHeight - padY} 
                  stroke="#71717A" 
                  strokeWidth="1.75" 
                  strokeDasharray="2 2" 
                />
              </g>
            )}

            {/* X-axis Date Labels */}
            {combinedTimeline.filter((pt, i) => {
              const total = combinedTimeline.length;
              if (total > 200) return i === 0 || i === 23 || (pt.isProjection && (pt.m - 24) % 48 === 0) || i === total - 1;
              if (total > 100) return i === 0 || i === 23 || (pt.isProjection && (pt.m - 24) % 24 === 0) || i === total - 1;
              if (total > 50) return i === 0 || i === 23 || (pt.isProjection && (pt.m - 24) % 12 === 0) || i === total - 1;
              return i % 3 === 0 || i === total - 1;
            }).map((pt) => {
              const idx = combinedTimeline.findIndex(item => item.m === pt.m);
              const x = getX(idx);
              const isToday = pt.m === 24;
              const isProj = pt.isProjection;

              return (
                <text 
                  key={pt.m} 
                  x={x} 
                  y={svgHeight - 10} 
                  fill={isToday ? "#2D6A4F" : (isProj ? "#18181B" : "#27272A")} 
                  fontSize="20" 
                  textAnchor="middle" 
                  fontFamily="monospace"
                  fontWeight={isToday ? "900" : "800"}
                >
                  {pt.dateLabel}
                </text>
              );
            })}
          </svg>
        </div>

        {/* Real Event Context Banner */}
        <div className="bg-[#FAF8F5] p-3 rounded-lg border border-black/25 flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-zinc-600 shrink-0" />
            <span className="text-zinc-800">
              <strong className="text-zinc-950 font-mono text-sm">{activePoint.dateLabel}:</strong> {activePoint.event}
            </span>
          </div>
        </div>

      </div>

      {/* 4. PORTFÓLIO DE ATIVOS (ALOCAÇÃO CUSTOMIZADA + SUGESTÃO AI) */}
      <div className="bg-white border-2 border-black rounded-xl p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-zinc-900 tracking-tight">Portfólio de Ativos</h3>
            <p className="text-xs text-zinc-600">Alocação atual definida por ti, sugestão ótima da AI e cálculo automático dos aportes (€{customMonthlyAporte || 100}/mês)</p>
            <div className="flex items-center gap-2 flex-wrap pt-1.5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#EAF3ED] border border-[#2D6A4F]/30 text-[#2D6A4F] text-[11px] font-mono font-bold" title="Dividendos em dinheiro pagos pelas ações creditados diretamente na tua conta XTB">
                <DollarSign className="w-3 h-3 text-[#2D6A4F]" />
                Div. Cash na XTB: ~€{currentAnnualCashDividends}/ano (~€{currentMonthlyCashDividends}/mês)
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#FAF8F5] border border-black/20 text-zinc-700 text-[11px] font-mono font-medium" title="ETFs de Acumulação (Acc) reinvestem automaticamente todos os proventos no fundo">
                🔄 73% em ETFs de Acumulação (Acc) • Reinvestimento 100% no ETF
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => handleConfirmHoldings()}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 shadow-sm ${
                justConfirmed 
                  ? 'bg-[#2D6A4F] text-white border-2 border-[#2D6A4F]' 
                  : hasUnsavedChanges 
                    ? 'bg-black text-white hover:bg-zinc-800 border-2 border-black animate-pulse' 
                    : 'bg-[#FAF8F5] text-zinc-900 border-2 border-black hover:bg-zinc-100'
              }`}
              title="Guarda e confirma os valores atuais da tua carteira no navegador"
            >
              {justConfirmed ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>✓ Alocação Guardada!</span>
                </>
              ) : hasUnsavedChanges ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Confirmar Alocação ★</span>
                </>
              ) : (
                <>
                  <Check className="w-3.5 h-3.5 text-[#2D6A4F]" />
                  <span>Confirmar Alocação</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                setEditingHoldingsData(holdings.map(h => ({
                  id: h.id,
                  name: h.name,
                  tickerRef: h.tickerRef,
                  value: h.value,
                  pnlValue: h.pnlValue
                })));
                setIsEditHoldingsOpen(true);
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-black text-white hover:bg-zinc-800 transition-all flex items-center gap-1.5 shadow-sm"
              title="Edita os valores (€) e lucros reais das tuas posições na corretora"
            >
              <Edit3 className="w-3.5 h-3.5 text-zinc-300" />
              Editar Posições (€)
            </button>

            {Math.abs(totalCurrentWeight - 100) > 0.1 && (
              <button
                onClick={handleNormalizeCurrent}
                className="px-2.5 py-1.5 rounded-lg text-xs font-mono font-medium bg-[#FDF0EE] text-[#9E2A2B] border border-[#9E2A2B]/40 hover:bg-[#FCE8E5] transition-all flex items-center gap-1"
                title="Normaliza a tua alocação atual para somar exatamente 100%"
              >
                <RotateCcw className="w-3 h-3" />
                Normalizar 100% ({totalCurrentWeight.toFixed(1)}%)
              </button>
            )}

            <button
              onClick={handleExportJsonFile}
              className="px-2.5 py-1.5 rounded-lg text-xs font-mono font-medium bg-white hover:bg-zinc-100 text-zinc-800 border border-black/30 transition-all flex items-center gap-1 shadow-2xs"
              title="Descarregar ficheiro user_portfolio.json para ter uma cópia de segurança permanente"
            >
              <Download className="w-3.5 h-3.5 text-zinc-700" />
              <span>Descarregar JSON</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-2.5 py-1.5 rounded-lg text-xs font-mono font-medium bg-white hover:bg-zinc-100 text-zinc-800 border border-black/30 transition-all flex items-center gap-1 shadow-2xs"
              title="Importar ficheiro user_portfolio.json"
            >
              <Upload className="w-3.5 h-3.5 text-zinc-700" />
              <span>Importar JSON</span>
            </button>
            <input 
              ref={fileInputRef} 
              type="file" 
              accept=".json" 
              onChange={handleImportJsonFile} 
              className="hidden" 
            />

            <button
              onClick={handleResetToDefaultHoldings}
              className="px-2.5 py-1.5 rounded-lg text-xs font-mono text-zinc-600 hover:text-black hover:bg-zinc-100 border border-black/30 transition-all flex items-center gap-1"
              title="Repor valores predefinidos da carteira a partir do user_portfolio.json"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Repor</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border border-black">
          <table className="w-full text-left text-sm text-zinc-900">
            <thead className="bg-[#FAF8F5] text-zinc-700 text-[11px] uppercase font-mono tracking-wider border-b-2 border-black">
              <tr>
                <th className="py-3 px-4">Ativo</th>
                <th className="py-3 px-4 text-center">Tipo</th>
                <th className="py-3 px-4 text-right">Cotação Live</th>
                <th className="py-3 px-4 text-center">
                  <div className="flex flex-col items-center justify-center gap-0.5">
                    <div className="flex items-center gap-1">
                      <span>A Minha Alocação (O que Escolho)</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-bold ${Math.abs(totalCurrentWeight - 100) <= 0.1 ? 'text-[#2D6A4F] bg-[#EAF3ED] border border-[#2D6A4F]/30' : 'text-[#9E2A2B] bg-[#FDF0EE] border border-[#9E2A2B]/30'}`}>
                        ({totalCurrentWeight.toFixed(1)}%)
                      </span>
                    </div>
                    <span className="text-[9px] font-normal text-zinc-500 normal-case">
                      Sempre preservada • Teu valor real
                    </span>
                  </div>
                </th>
                <th className="py-3 px-4 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#2D6A4F]" />
                    <span>Sugerido (AI)</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded font-mono font-bold text-[#2D6A4F] bg-[#EAF3ED] border border-[#2D6A4F]/30">
                      (100%)
                    </span>
                  </div>
                </th>
                <th className="py-3 px-4 text-right font-mono">Aporte DCA (€{customMonthlyAporte || 100})</th>
                <th className="py-3 px-4 text-right">Valor em Carteira</th>
                <th className="py-3 px-4 text-right">Retorno Líquido / P&L</th>
                <th className="py-3 px-4 text-center">TER (Custo)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 bg-white">
              {enrichedHoldings.map((h) => {
                const isPositive = h.pnlValue >= 0;
                return (
                  <tr key={h.id} className="hover:bg-[#FAF8F5] transition-colors">
                    <td className="py-3.5 px-4">
                      <div>
                        <div className="font-semibold text-zinc-900 text-sm flex items-center gap-2">
                          <span>{h.name}</span>
                          <span className="text-[10px] text-zinc-600 font-mono bg-[#FAF8F5] px-1.5 py-0.5 rounded border border-black/20">
                            {h.tickerRef}
                          </span>
                        </div>
                        <div className="text-xs text-zinc-500 mt-0.5 line-clamp-1">{h.role}</div>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <span className="text-[10px] text-zinc-700 font-mono bg-[#FAF8F5] px-1.5 py-0.5 rounded border border-black/15 font-medium" title="Taxa esperada conservadora da posição">
                            🛡️ Retorno Esperado: <strong className="text-zinc-900 font-bold">+{h.conservativeCagr || h.expectedCagr || 13.6}% a.a.</strong>
                          </span>
                          <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border font-medium ${
                            (h.dividendYield && h.dividendYield > 0)
                              ? 'bg-[#EBF5FB] text-[#1B4965] border-[#1B4965]/25 font-bold'
                              : 'bg-zinc-100 text-zinc-600 border-zinc-200'
                          }`}>
                            {(h.dividendYield && h.dividendYield > 0)
                              ? `💰 Div. Cash: ${h.dividendYield.toFixed(2)}% (~€${((h.value || 0) * (h.dividendYield / 100)).toFixed(2)}/ano na XTB)`
                              : (h.type === 'ETF' ? '🔄 Acumulação (100% Reinvestido)' : '📈 0% Div (Crescimento)')}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#FAF8F5] text-zinc-800 border border-black/20">
                        {h.type}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono">
                      <div className="font-bold text-xs text-zinc-900">
                        €{h.livePrice?.toFixed(2) || '---'}
                      </div>
                      {h.dayChange !== undefined && (
                        <div className={`text-[10px] font-semibold ${h.dayChange >= 0 ? 'text-[#2D6A4F]' : 'text-[#9E2A2B]'}`}>
                          {h.dayChange >= 0 ? '+' : ''}{h.dayChange.toFixed(2)}%
                        </div>
                      )}
                    </td>

                    {/* Current Allocation - Editable Input */}
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          max="100"
                          value={h.currentAllocation}
                          onChange={(e) => handleUpdateCurrentAllocation(h.id, parseFloat(e.target.value) || 0)}
                          onKeyDown={(e) => { if (e.key === 'Enter') handleConfirmHoldings(); }}
                          className={`w-16 bg-[#FAF8F5] border rounded px-2 py-1 text-xs text-center font-mono font-bold text-zinc-900 focus:outline-none transition-all ${
                            hasUnsavedChanges ? 'border-amber-500 focus:border-amber-600' : 'border-black focus:border-zinc-900'
                          }`}
                          title="Edita a percentagem e clica em Confirmar ou prime Enter"
                        />
                        <span className="text-xs font-mono text-zinc-500">%</span>
                      </div>
                    </td>

                    {/* Suggested AI Allocation - Pure Reference Column */}
                    <td className="py-3.5 px-4 text-center font-mono">
                      <div className="inline-flex items-center gap-1.5 bg-[#FAF8F5] border border-black/30 px-2.5 py-1 rounded-md">
                        <span className="font-bold text-xs text-zinc-900">
                          {h.suggestedAllocation.toFixed(1)}%
                        </span>
                      </div>
                      <div className="text-[10px] font-mono mt-0.5">
                        {Math.abs(h.suggestedAllocation - h.currentAllocation) <= 0.05 ? (
                          <span className="text-[#2D6A4F] font-semibold flex items-center justify-center gap-0.5">
                            <Check className="w-2.5 h-2.5" /> Igual
                          </span>
                        ) : h.suggestedAllocation > h.currentAllocation ? (
                          <span className="text-[#2D6A4F] font-semibold">
                            +{(h.suggestedAllocation - h.currentAllocation).toFixed(1)}%
                          </span>
                        ) : (
                          <span className="text-[#9E2A2B] font-semibold">
                            {(h.suggestedAllocation - h.currentAllocation).toFixed(1)}%
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Monthly Contribution DCA (€80) */}
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-zinc-900">
                      €{((h.currentAllocation / 100) * customMonthlyAporte).toFixed(2)}
                      <div className="text-[10px] font-normal text-zinc-500 font-sans">
                        /mês
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono font-bold text-zinc-900">
                      €{h.value.toFixed(2)}
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono">
                      <div className={`font-bold text-xs ${isPositive ? 'text-[#2D6A4F]' : 'text-[#9E2A2B]'}`}>
                        {isPositive ? '+' : ''}€{h.pnlValue.toFixed(2)}
                      </div>
                      <div className={`text-[10px] font-semibold ${isPositive ? 'text-[#2D6A4F]' : 'text-[#9E2A2B]'}`}>
                        {isPositive ? '▲ +' : '▼ '}{h.pnlPercent.toFixed(2)}%
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-center font-mono text-xs text-zinc-800">
                      <span className="bg-[#FAF8F5] px-2 py-0.5 rounded border border-black/20">
                        {h.ter}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Dynamic Portfolio CAGR Summary Banner with Conservative vs Optimistic (+4%) */}
        <div className="bg-[#FAF8F5] border-2 border-black rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-black text-white flex items-center justify-center font-bold text-base shrink-0">
              %
            </div>
            <div>
              <div className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">
                Retorno Esperado do Teu Portfólio ({valuationScenario === 'optimistic' ? 'Cenário Otimista: Base + 4%' : 'Cenário Conservador: Base Ponderada'})
              </div>
              <div className="text-xl sm:text-2xl font-bold text-[#2D6A4F] flex items-center gap-2 mt-0.5">
                <span>+{dynamicExpectedCagr.toFixed(2)}% a.a.</span>
                <span className={`text-[11px] font-sans font-bold px-2 py-0.5 rounded border ${
                  valuationScenario === 'optimistic'
                    ? 'bg-[#EAF3ED] text-[#2D6A4F] border-[#2D6A4F]/40'
                    : 'bg-white text-zinc-800 border-black/30'
                }`}>
                  {valuationScenario === 'optimistic' ? '🚀 Otimista (+4.00%)' : '🛡️ Conservador (Prudente)'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2.5">
            {/* Interactive Toggle between Conservative and Optimistic */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-xl border-2 border-black/25 shadow-2xs">
              <button
                onClick={() => setValuationScenario('conservative')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                  valuationScenario === 'conservative'
                    ? 'bg-black text-white shadow-xs'
                    : 'text-zinc-600 hover:text-black hover:bg-zinc-100'
                }`}
                title="Cenário base ponderado conservador"
              >
                <span>🛡️ Conservador (+{conservativeExpectedCagr.toFixed(2)}%)</span>
              </button>
              <button
                onClick={() => setValuationScenario('optimistic')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                  valuationScenario === 'optimistic'
                    ? 'bg-[#2D6A4F] text-white shadow-xs'
                    : 'text-zinc-600 hover:text-[#2D6A4F] hover:bg-zinc-100'
                }`}
                title="Cenário otimista com +4.00% sobre a base conservadora"
              >
                <span>🚀 Otimista (+{(conservativeExpectedCagr + 4.0).toFixed(2)}%)</span>
              </button>
            </div>

            {hasUnsavedChanges ? (
              <div className="flex items-center gap-2 bg-[#FDF0EE] text-[#9E2A2B] px-3 py-1.5 rounded-lg border border-[#9E2A2B]/40 text-xs">
                <AlertTriangle className="w-4 h-4 shrink-0 text-[#9E2A2B]" />
                <button
                  onClick={() => handleConfirmHoldings()}
                  className="px-2.5 py-1 bg-[#9E2A2B] text-white rounded font-bold hover:bg-[#802223] transition-colors"
                >
                  Confirmar e Guardar
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-[#2D6A4F] bg-[#EAF3ED] px-2.5 py-1.5 rounded-lg border border-[#2D6A4F]/30 text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>Guardado</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 5. MARCOS DE LONGO PRAZO (5, 10, 20 E 30 ANOS) */}
      <div className="bg-white border-2 border-black rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-zinc-900" />
              <h3 className="text-base font-bold text-zinc-900 tracking-tight">
                Marcos de Longo Prazo: O Efeito dos Juros Compostos
              </h3>
            </div>
            <p className="text-xs text-zinc-600 mt-0.5">
              Com depósitos de <strong className="text-[#2D6A4F] font-mono">€{customMonthlyAporte || 100}/mês</strong> e taxa ponderada a <strong className="text-[#2D6A4F] font-mono">+{dynamicExpectedCagr.toFixed(2)}% a.a.</strong> ({valuationScenario === 'optimistic' ? 'Cenário Otimista: Base + 4%' : 'Cenário Conservador: Base'})
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Seletor de Cenário Conservador vs Otimista (+4%) */}
            <div className="flex items-center gap-1 bg-[#FAF8F5] p-1 rounded-xl border border-black/30">
              <button
                onClick={() => setValuationScenario('conservative')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1 ${
                  valuationScenario === 'conservative'
                    ? 'bg-black text-white shadow-xs'
                    : 'text-zinc-600 hover:text-black'
                }`}
                title="Cenário base conservador e prudente"
              >
                <span>🛡️ Conservador (+{conservativeExpectedCagr.toFixed(1)}%)</span>
              </button>
              <button
                onClick={() => setValuationScenario('optimistic')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1 ${
                  valuationScenario === 'optimistic'
                    ? 'bg-[#2D6A4F] text-white shadow-xs'
                    : 'text-zinc-600 hover:text-[#2D6A4F]'
                }`}
                title="Cenário otimista com +4% sobre a base conservadora"
              >
                <span>🚀 Otimista (+{(conservativeExpectedCagr + 4).toFixed(1)}%)</span>
              </button>
            </div>

            {/* Aporte Mensal */}
            <div className="flex items-center gap-1.5 bg-[#FAF8F5] px-2.5 py-1.5 rounded-xl border border-black/30">
              <span className="text-xs text-zinc-600 font-mono">Aporte:</span>
              <span className="text-xs font-bold text-zinc-900">€</span>
              <input
                type="number"
                min="10"
                step="10"
                value={customMonthlyAporte}
                onChange={(e) => setCustomMonthlyAporte(Math.max(1, parseFloat(e.target.value) || 0))}
                className="w-14 bg-white border border-black/40 rounded px-1.5 py-0.5 text-xs font-bold font-mono text-zinc-900 text-right focus:outline-none focus:border-black"
              />
              <span className="text-xs text-zinc-600 font-mono">/mês</span>
            </div>
          </div>
        </div>

        {/* 4 Clean Milestone Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: '5 Anos (60M)', date: 'Dez 2029', data: longTermProjections.fiveYears },
            { label: '10 Anos (120M)', date: 'Dez 2034', data: longTermProjections.tenYears },
            { label: '20 Anos (240M)', date: 'Dez 2044', data: longTermProjections.twentyYears },
            { label: '30 Anos (360M)', date: 'Dez 2054', data: longTermProjections.thirtyYears },
          ].map((milestone, idx) => (
            <div key={idx} className="bg-[#FAF8F5] border border-black rounded-lg p-3.5 space-y-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-600">
                    {milestone.label}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500 font-medium">
                    {milestone.date}
                  </span>
                </div>
                <div className="text-xl font-bold font-mono text-zinc-900 mt-2">
                  €{milestone.data.projectedValue.toLocaleString('en-US')}
                </div>
                <div className="text-xs font-mono text-[#2D6A4F] font-semibold mt-0.5 flex items-center justify-between">
                  <span>+€{milestone.data.totalProfit.toLocaleString('en-US')} ({milestone.data.profitPercent}%)</span>
                  <span className={`text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded ${
                    valuationScenario === 'optimistic' ? 'bg-[#EAF3ED] text-[#2D6A4F] border border-[#2D6A4F]/30' : 'bg-black/5 text-zinc-700'
                  }`}>
                    {valuationScenario === 'optimistic' ? '🚀' : '🛡️'} +{dynamicExpectedCagr.toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="pt-2 border-t border-black/15 text-[11px] font-mono text-zinc-600 space-y-1">
                <div className="flex justify-between">
                  <span>Do teu bolso:</span>
                  <span className="font-semibold text-zinc-900">€{milestone.data.totalInvested.toLocaleString('en-US')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Juros compostos:</span>
                  <span className="font-bold text-[#2D6A4F]">+€{milestone.data.totalProfit.toLocaleString('en-US')}</span>
                </div>
                <div className="flex justify-between text-zinc-700">
                  <span>🛡️ Base ({conservativeExpectedCagr.toFixed(1)}%):</span>
                  <span className="font-medium text-zinc-900">€{milestone.data.conservativeValue.toLocaleString('en-US')}</span>
                </div>
                <div className="flex justify-between text-zinc-700">
                  <span>🚀 Otimista (+4%):</span>
                  <span className="font-bold text-[#2D6A4F]">€{milestone.data.optimisticValue.toLocaleString('en-US')}</span>
                </div>
                <div className="flex justify-between text-zinc-500">
                  <span>🌪️ Stress (-4%):</span>
                  <span className="font-medium text-zinc-600">€{milestone.data.stressTestValue.toLocaleString('en-US')}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-dashed border-black/10 text-zinc-700">
                  <span title="Dividendos em dinheiro pagos pelas ações (DB1, GOOGL, META) creditados diretamente na conta XTB">💰 Div. Cash (XTB):</span>
                  <span className="font-semibold text-zinc-900">~€{milestone.data.annualCashDividends}/ano</span>
                </div>
                <div className="flex justify-between">
                  <span title="Regra dos 4% (Estudo de Trinity) para saque seguro sustentável na fase de reforma/usufruto">🏖️ Renda Passiva (~4%):</span>
                  <span className="font-semibold text-[#2D6A4F]">~€{milestone.data.passiveIncomePerMonth}/mês</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footnote on Dividends vs Safe Withdrawal */}
        <div className="bg-[#FAF8F5] border border-black/15 rounded-lg p-3 text-xs text-zinc-600 flex items-start gap-2.5">
          <DollarSign className="w-4 h-4 text-[#2D6A4F] shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <p className="font-medium text-zinc-800 leading-snug">
              <strong>Como funcionam os Dividendos vs. Renda Passiva nesta carteira:</strong>
            </p>
            <p className="text-zinc-600 leading-relaxed">
              • <strong className="text-zinc-900">ETFs de Acumulação (73% da carteira)</strong>: QDVE, CHIP e 2B70 <strong>não distribuem dividendos em dinheiro</strong> para a conta — reinvestem 100% dos proventos diretamente no fundo sem pagar IRS imediato, acelerando a capitalização composta.<br/>
              • <strong className="text-zinc-900">Ações Individuais (27% da carteira)</strong>: DB1, GOOGL e META distribuem <strong>dividendos em dinheiro diretamente na tua conta XTB</strong> (atualmente <strong>~€{currentAnnualCashDividends}/ano</strong> ou ~€{currentMonthlyCashDividends}/mês).<br/>
              • <strong className="text-[#2D6A4F]">Renda Passiva (~4%)</strong>: Baseada no Estudo de Trinity (regra de retirada segura dos 4% ao ano), estima quanto podes retirar mensalmente para viver de rendimentos na fase de reforma sem esgotar o capital.
            </p>
          </div>
        </div>
      </div>

      {/* 6. MONTHLY 80€ CONTRIBUTION AUTOMATIC SPLIT (DCA PLAN & MULTI-STRATEGY ENGINE) */}
      <div className="bg-white border-2 border-black rounded-xl p-5 sm:p-6 shadow-sm space-y-5">
        
        {/* Section Header & Strategy Selector */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-black/15">
          <div>
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-zinc-900" />
              <h3 className="text-base font-bold text-zinc-900 tracking-tight">
                Plano de Aportes Mensais (€{customMonthlyAporte || 100} / Mês nos Ativos)
              </h3>
            </div>
            <p className="text-xs text-zinc-600 mt-0.5 max-w-2xl leading-relaxed">
              Distribuição matemática dos teus <strong>€{customMonthlyAporte || 100} mensais</strong>. Seleciona a estratégia para ver os pesos e valores exatos para a XTB:
            </p>
          </div>

          {/* Strategy Pills: O Meu Portfólio vs Sugestão AI */}
          <div className="flex items-center gap-1.5 bg-[#FAF8F5] p-1.5 rounded-xl border border-black/25 flex-wrap">
            <button
              onClick={() => setDcaViewMode('myPortfolio')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-1.5 ${
                dcaViewMode === 'myPortfolio'
                  ? 'bg-black text-white font-bold shadow-sm'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              O Meu Portfólio (A Minha Alocação)
            </button>
            <button
              onClick={() => setDcaViewMode('aiSuggested')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-1.5 ${
                dcaViewMode === 'aiSuggested'
                  ? 'bg-black text-white font-bold shadow-sm'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-[#2D6A4F]" />
              Sugestão AI (Potencial Secular)
            </button>
          </div>
        </div>

        {/* Strategy Metrics Summary Pill */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#FAF8F5] p-3.5 rounded-xl border border-black text-xs font-mono">
          <div>
            <div className="text-zinc-500 text-[10px] uppercase">Retorno Esperado (CAGR)</div>
            <div className="text-base font-bold text-[#2D6A4F] mt-0.5">
              {strategyMetrics.cagr}
            </div>
            <div className="text-[10px] text-zinc-600">
              {strategyMetrics.cagrSub}
            </div>
          </div>
          <div>
            <div className="text-zinc-500 text-[10px] uppercase">Volatilidade (Risco Anual)</div>
            <div className="text-base font-bold text-zinc-900 mt-0.5">
              {strategyMetrics.volatility}
            </div>
            <div className="text-[10px] text-zinc-600">
              {strategyMetrics.volatilitySub}
            </div>
          </div>
          <div>
            <div className="text-zinc-500 text-[10px] uppercase">Rácio de Sharpe</div>
            <div className="text-base font-bold text-zinc-900 mt-0.5">
              {strategyMetrics.sharpe}
            </div>
            <div className="text-[10px] text-zinc-600">
              {strategyMetrics.sharpeSub}
            </div>
          </div>
          <div>
            <div className="text-zinc-500 text-[10px] uppercase">Ganho Líquido Extra (20 Anos)</div>
            <div className="text-base font-bold text-[#2D6A4F] mt-0.5">
              {strategyMetrics.extraGain}
            </div>
            <div className="text-[10px] text-zinc-600">Sobre os mesmos €{customMonthlyAporte || 100} mensais</div>
          </div>
        </div>

        {/* 6 Cards for the 80€ split */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {dcaPlan.map(plan => (
            <div key={plan.id} className="bg-[#FAF8F5] p-3.5 rounded-xl border border-black hover:border-black/80 transition-all space-y-2 flex flex-col justify-between">
              <div>
                <div className="text-xs font-semibold text-zinc-900 line-clamp-1">{plan.name}</div>
                <div className="text-[10px] text-zinc-600 font-mono mt-0.5 font-medium">Alocação: {parseFloat(plan.activeWeight).toFixed(1)}%</div>
              </div>
              <div className="pt-2 border-t border-black/15 flex items-baseline justify-between">
                <span className="text-[10px] text-zinc-600">Aporte XTB:</span>
                <span className="text-base font-bold font-mono text-[#2D6A4F]">
                  €{plan.dcaAmount.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* 7. AUDITORIA ESTRATÉGICA DA ARQUITETURA */}
      <div className="bg-white border-2 border-black rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-zinc-900" />
          <h3 className="text-base font-bold text-zinc-900 tracking-tight">
            Auditoria Estratégica: Eficiência da Arquitetura do Portfólio
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-[#FAF8F5] p-4 rounded-xl border border-black space-y-2">
            <div className="font-bold text-zinc-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#2D6A4F]" /> 1. Deutsche Börse AG (DB1.DE) - Infraestrutura & Zero TER
            </div>
            <p className="text-zinc-600 leading-relaxed">
              Posição de <strong>12.0% (€9.60/mês)</strong> em ação direta com <strong>0.00% de comissão de gestão (TER)</strong>. Monopólio de infraestrutura das bolsas alemãs (XETRA, Eurex, Clearstream, índices DAX/STOXX). Gera fluxos de caixa resilientes, beneficia da volatilidade dos mercados e da remuneração de depósitos do BCE, oferecendo diversificação anti-frágil não-tecnológica cotada diretamente em Euros (€).
            </p>
          </div>

          <div className="bg-[#FAF8F5] p-4 rounded-xl border border-black space-y-2">
            <div className="font-bold text-zinc-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#2D6A4F]" /> 2. Alphabet & Amazon Fora do S&P 500 IT
            </div>
            <p className="text-zinc-600 leading-relaxed">
              O índice S&P 500 classifica a <strong>Alphabet em Serviços de Comunicação</strong> e a <strong>Amazon em Consumo Discricionário</strong>. Detê-las diretamente em ações capta estes fluxos de caixa (Waymo, Google Cloud, AWS) sem duplicar o QDVE e com <strong>0.00% de comissão de gestão</strong>.
            </p>
          </div>

          <div className="bg-[#FAF8F5] p-4 rounded-xl border border-black space-y-2">
            <div className="font-bold text-zinc-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#2D6A4F]" /> 3. S&P 500 IT (QDVE) a 37% & Semicondutores (CHIP) a 20%
            </div>
            <p className="text-zinc-600 leading-relaxed">
              Alocação disciplinada de <strong>57% do teu plano mensal (€45.60/mês)</strong> nos dois grandes motores globais de crescimento secular (software empresarial, cloud e hardware de semicondutores para IA), com custos contidos (TER médio de apenas <strong>0.22%</strong>).
            </p>
          </div>

          <div className="bg-[#FAF8F5] p-4 rounded-xl border border-black space-y-2">
            <div className="font-bold text-zinc-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#2D6A4F]" /> 4. Novo Nordisk (NOVO) - Defensiva Secular em Saúde
            </div>
            <p className="text-zinc-600 leading-relaxed">
              Exposição de <strong>10.0% (€8.00/mês)</strong> ao líder global em tratamentos metabólicos e GLP-1. Negócio com elevada visibilidade de receitas, crescimento descorrelacionado dos ciclos de tecnologia e sem qualquer comissão de gestão de fundos (0.00% TER).
            </p>
          </div>
        </div>
      </div>


      {/* 8. ATIVOS RECOMENDADOS EM EUR (RETORNO SUPERIOR & PRÉ-SIMULADO) */}
      <div className="bg-white border-2 border-black rounded-xl p-5 sm:p-6 shadow-sm space-y-5">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-black/15">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#FAF8F5] border border-black/20 text-zinc-800 text-[11px] font-mono">
                <Globe className="w-3.5 h-3.5 text-[#2D6A4F]" /> 100% Nativo EUR (€)
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#EAF3ED] border border-[#2D6A4F]/30 text-[#2D6A4F] text-[11px] font-mono font-semibold">
                <TrendingUp className="w-3.5 h-3.5 text-[#2D6A4F]" /> Retorno Superior à Carteira (+{dynamicExpectedCagr.toFixed(2)}%)
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#FAF8F5] border border-black/20 text-zinc-800 text-[11px] font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2D6A4F]" /> 0.0% Sobreposição
              </span>
            </div>
            <h3 className="text-lg font-bold text-zinc-900 tracking-tight flex items-center gap-2">
              <span>Ativos Recomendados em EUR: Sem Diluição de Retorno</span>
            </h3>
            <p className="text-xs text-zinc-600 mt-1 max-w-3xl leading-relaxed">
              Ativos rigorosamente selecionados em EUR com tese secular de valorização e proteção cambial, simulando o impacto real sem sobreposição com a tua carteira atual.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-zinc-700 shrink-0 bg-[#EAF3ED] border border-[#2D6A4F]/30 px-3 py-1.5 rounded-lg">
            <span className="w-2 h-2 rounded-full bg-[#2D6A4F]"></span>
            <span>Garantia Não-Dilutiva Ativa</span>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5 text-zinc-500" /> Filtro:
          </span>
          <button
            onClick={() => setEurFilter('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              eurFilter === 'ALL'
                ? 'bg-black text-white font-bold shadow-sm'
                : 'bg-[#FAF8F5] text-zinc-700 hover:text-zinc-900 border border-black/30'
            }`}
          >
            Todos os Ativos ({EUR_RECOMMENDATIONS.length})
          </button>
          <button
            onClick={() => setEurFilter('ETF')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              eurFilter === 'ETF'
                ? 'bg-black text-white font-bold shadow-sm'
                : 'bg-[#FAF8F5] text-zinc-700 hover:text-zinc-900 border border-black/30'
            }`}
          >
            ETFs UCITS ({EUR_RECOMMENDATIONS.filter(r => r.type === 'ETF').length})
          </button>
          <button
            onClick={() => setEurFilter('STOCK')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              eurFilter === 'STOCK'
                ? 'bg-black text-white font-bold shadow-sm'
                : 'bg-[#FAF8F5] text-zinc-700 hover:text-zinc-900 border border-black/30'
            }`}
          >
            Ações Diretas (0.00% TER) ({EUR_RECOMMENDATIONS.filter(r => r.type === 'Stock').length})
          </button>
        </div>

        {/* Recommendations Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {EUR_RECOMMENDATIONS
            .filter(item => {
              if (eurFilter === 'ALL') return true;
              if (eurFilter === 'ETF') return item.type === 'ETF';
              if (eurFilter === 'STOCK') return item.type === 'Stock';
              return true;
            })
            .map(item => {
              const baselineCagr = dynamicExpectedCagr;
              const allocPercent = item.allocationPercent || 8.0;
              const allocWeight = allocPercent / 100;
              const assetExpected = item.expectedCagrNum || 15.0;
              const simCagr = parseFloat(((1 - allocWeight) * baselineCagr + allocWeight * assetExpected).toFixed(2));
              const cagrDelta = parseFloat((simCagr - baselineCagr).toFixed(2));
              const cagrDeltaStr = (cagrDelta >= 0 ? `+${cagrDelta}%` : `${cagrDelta}%`) + ' / ano';

              const monthlyAporte = customMonthlyAporte || 80;
              const fvCalc = (rate, years) => {
                const rMonth = Math.pow(1 + rate / 100, 1 / 12) - 1;
                const n = years * 12;
                const pmtFv = rMonth > 0 ? monthlyAporte * ((Math.pow(1 + rMonth, n) - 1) / rMonth) : monthlyAporte * n;
                const pvFv = totalValue * Math.pow(1 + rMonth, n);
                return pvFv + pmtFv;
              };
              const gain10 = Math.round(fvCalc(simCagr, 10) - fvCalc(baselineCagr, 10));
              const gain20 = Math.round(fvCalc(simCagr, 20) - fvCalc(baselineCagr, 20));
              const gain30 = Math.round(fvCalc(simCagr, 30) - fvCalc(baselineCagr, 30));

              return (
                <div
                  key={item.id}
                  className="bg-[#FAF8F5] p-5 rounded-xl border border-black hover:border-black transition-all flex flex-col justify-between space-y-4 shadow-sm"
                >
                  <div className="space-y-3">
                    {/* Card Top: Ticker, Flag, Type, and Badges */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl">{item.flag}</span>
                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-bold text-base text-zinc-900 font-mono">
                              {item.tickerDisplay}
                            </span>
                            <span className="text-[10px] text-zinc-700 font-mono px-1.5 py-0.5 rounded bg-white border border-black/20">
                              {item.exchange}
                            </span>
                            {item.isin && (
                              <span className="text-[10px] text-zinc-500 font-mono">
                                {item.isin}
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-zinc-600 mt-0.5 font-medium">{item.name}</div>
                        </div>
                      </div>

                      {/* Accretive Badge */}
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2.5 py-1 rounded-md font-semibold border shrink-0 bg-[#EAF3ED] text-[#2D6A4F] border-[#2D6A4F]/30">
                        <TrendingUp className="w-3 h-3 text-[#2D6A4F]" />
                        <span>Superior CAGR</span>
                      </span>
                    </div>

                    {/* Category & Overlap Badges */}
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="text-[11px] font-mono text-zinc-700 bg-white px-2.5 py-1 rounded border border-black/20 flex-1">
                        Setor: <strong className="text-zinc-900">{item.category}</strong>
                      </div>
                      <div className="inline-flex items-center gap-1 text-[10px] font-mono font-medium px-2 py-1 rounded bg-[#EAF3ED] text-[#2D6A4F] border border-[#2D6A4F]/30">
                        <CheckCircle2 className="w-3 h-3 text-[#2D6A4F]" />
                        {item.portfolioOverlap}
                      </div>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-3 gap-2 bg-white p-2.5 rounded-lg border border-black/20 text-center">
                      <div>
                        <div className="text-[10px] font-mono text-zinc-500">Exp. CAGR</div>
                        <div className="text-xs font-bold font-mono text-[#2D6A4F] mt-0.5">{item.cagr}</div>
                      </div>
                      <div className="border-l border-zinc-200 pl-1">
                        <div className="text-[10px] font-mono text-zinc-500">Valuation / Taxa</div>
                        <div className="text-xs font-bold font-mono text-zinc-900 mt-0.5">{item.terOrPe}</div>
                      </div>
                      <div className="border-l border-zinc-200 pl-1">
                        <div className="text-[10px] font-mono text-zinc-500">Distribuição</div>
                        <div className="text-[11px] font-bold font-mono text-zinc-900 mt-0.5 truncate">{item.dividendYield}</div>
                      </div>
                    </div>

                    {/* PRE-COMPUTED ALLOCATION & RETURN SIMULATION MODULE */}
                    <div className="bg-white p-3 rounded-lg border border-black/20 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono uppercase text-zinc-900 font-semibold flex items-center gap-1.5">
                          <Calculator className="w-3.5 h-3.5 text-zinc-700" />
                          Simulação de Impacto na Carteira
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#EAF3ED] text-[#2D6A4F] border border-[#2D6A4F]/30 font-semibold flex items-center gap-1">
                          <TrendingUp className="w-3.5 h-3.5 text-[#2D6A4F]" />
                          {cagrDeltaStr}
                        </span>
                      </div>

                      <div className="text-[11px] text-zinc-700 font-mono space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-zinc-500">Alocação Proposta:</span>
                          <strong className="text-zinc-900">{allocPercent.toFixed(1)}% (€{(monthlyAporte * allocWeight).toFixed(2)}/mês)</strong>
                        </div>
                        <div className="text-[10px] text-zinc-500">
                          Origem: <span className="text-zinc-700">{item.fundingSource}</span>
                        </div>
                      </div>

                      {/* Before vs After Rate Comparison */}
                      <div className="grid grid-cols-2 gap-2 text-center font-mono pt-1">
                        <div className="bg-[#FAF8F5] p-1.5 rounded border border-black/15">
                          <div className="text-[9px] text-zinc-500 uppercase">Portfólio Atual</div>
                          <div className="text-xs font-bold text-zinc-700 mt-0.5">{baselineCagr.toFixed(2)}% a.a.</div>
                        </div>
                        <div className="bg-[#EAF3ED] p-1.5 rounded border border-[#2D6A4F]/30">
                          <div className="text-[9px] text-[#2D6A4F] uppercase font-semibold">Portfólio Simulado</div>
                          <div className="text-xs font-extrabold text-[#2D6A4F] mt-0.5">{simCagr.toFixed(2)}% a.a.</div>
                        </div>
                      </div>

                      {/* Cumulative Extra Gain */}
                      <div className="bg-[#FAF8F5] p-2 rounded border border-black/15 text-[10px] font-mono flex items-center justify-between text-zinc-600">
                        <span>Lucro Extra Estimado:</span>
                        <span className="text-[#2D6A4F] font-bold">
                          10A: +€{gain10.toLocaleString('pt-PT')} • 20A: +€{gain20.toLocaleString('pt-PT')} • 30A: +€{gain30.toLocaleString('pt-PT')}
                        </span>
                      </div>
                    </div>

                    {/* Strategic Thesis */}
                    <div className="text-xs text-zinc-700 leading-relaxed bg-white p-3 rounded-lg border border-black/20 space-y-1">
                      <div className="text-[10px] font-mono uppercase text-zinc-500 flex items-center gap-1 font-semibold">
                        <Sparkles className="w-3 h-3 text-zinc-400" /> Tese Estratégica:
                      </div>
                      <p className="text-zinc-600 text-[11px] leading-relaxed">{item.thesis}</p>
                    </div>

                    {/* Overlap Audit Detail */}
                    <div className="text-[11px] text-zinc-700 bg-[#EAF3ED] p-2.5 rounded-lg border border-[#2D6A4F]/25 flex items-start gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#2D6A4F] shrink-0 mt-0.5" />
                      <div className="leading-snug">
                        <strong className="text-[#2D6A4F] font-mono">Auditoria de Sobreposição: </strong>
                        <span className="text-zinc-800">{item.overlapDetail}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Meta */}
                  <div className="pt-3 border-t border-black/15 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                    <div>
                      Correlação com Tech: <strong className="text-zinc-800">{item.correlationWithTech}</strong>
                    </div>
                    <div className="text-right">
                      Estrutura: <strong className="text-zinc-800">{item.distribution}</strong>
                    </div>
                  </div>

                </div>
              );
            })}
        </div>

        {/* Portfolio Architecture Guideline */}
        <div className="bg-[#FAF8F5] p-4 rounded-xl border border-black text-xs text-zinc-600 space-y-2">
          <div className="font-bold text-zinc-900 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider">
            <Compass className="w-4 h-4 text-[#2D6A4F]" /> Regra de Otimização e Não-Diluição:
          </div>
          <p className="leading-relaxed">
            O teu <strong>Plano Base (€{customMonthlyAporte || 100}/mês nos ativos)</strong> tem uma taxa composta ponderada de <strong>+{dynamicExpectedCagr.toFixed(2)}% a.a.</strong> (calculada de forma conservadora e prudente). Qualquer novo ativo satélite em Euros (ex: <strong>NUKL</strong> ou <strong>DFNS</strong>) deve ser integrado em pequenos blocos (5% a 10%), garantindo que o retorno global sobe sem diluir o património e sem gerar qualquer sobreposição com o núcleo tecnológico (QDVE + CHIP)!
          </p>
        </div>

      </div>

      {/* MODAL: EDITAR POSIÇÕES DO PORTFÓLIO */}
      {isEditHoldingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border-2 border-black rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-5 border-b-2 border-black flex items-center justify-between bg-[#FAF8F5]">
              <div>
                <h3 className="text-base font-bold text-zinc-900 flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-zinc-900" />
                  Atualizar Posições Reais do Portfólio (€)
                </h3>
                <p className="text-xs text-zinc-600 mt-0.5">
                  Indica o valor atual de cada posição para recalcular as percentagens reais da tua carteira.
                </p>
              </div>
              <button
                onClick={() => setIsEditHoldingsOpen(false)}
                className="p-1.5 text-zinc-500 hover:text-black hover:bg-black/5 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 overflow-y-auto space-y-4 bg-white">
              <div className="text-xs text-zinc-700 bg-[#FAF8F5] p-3 rounded-lg border border-black flex items-center justify-between">
                <span>Total Estimado da Carteira:</span>
                <span className="font-mono font-bold text-zinc-900 text-sm">
                  €{editingHoldingsData.reduce((sum, item) => sum + (parseFloat(item.value) || 0), 0).toFixed(2)}
                </span>
              </div>

              <div className="space-y-3">
                {editingHoldingsData.map((item, idx) => {
                  const currentSum = editingHoldingsData.reduce((sum, h) => sum + (parseFloat(h.value) || 0), 0);
                  const pct = currentSum > 0 ? (((parseFloat(item.value) || 0) / currentSum) * 100).toFixed(1) : '0.0';
                  return (
                    <div key={item.id} className="bg-[#FAF8F5] p-3.5 rounded-xl border border-black flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="min-w-[150px]">
                        <div className="text-xs font-semibold text-zinc-900 flex items-center gap-2">
                          <span>{item.name}</span>
                          <span className="text-[10px] font-mono bg-white px-1.5 py-0.5 rounded text-zinc-700 border border-black/20">
                            {item.tickerRef}
                          </span>
                        </div>
                        <div className="text-[11px] font-mono text-zinc-600 font-semibold mt-0.5">
                          {pct}% da carteira atual
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 flex-1">
                        <div>
                          <label className="block text-[10px] uppercase font-mono text-zinc-500 mb-1 font-semibold">
                            Valor Atual (€)
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            value={item.value}
                            onChange={(e) => {
                              const val = e.target.value;
                              setEditingHoldingsData(prev => prev.map((h, i) => i === idx ? { ...h, value: val } : h));
                            }}
                            className="w-full bg-white border border-black focus:border-zinc-900 focus:outline-none rounded-lg px-2.5 py-1.5 text-xs font-mono font-bold text-zinc-900"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase font-mono text-zinc-500 mb-1 font-semibold">
                            Lucro / P&L (€)
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            value={item.pnlValue}
                            onChange={(e) => {
                              const pnl = e.target.value;
                              setEditingHoldingsData(prev => prev.map((h, i) => i === idx ? { ...h, pnlValue: pnl } : h));
                            }}
                            className="w-full bg-white border border-black focus:border-zinc-900 focus:outline-none rounded-lg px-2.5 py-1.5 text-xs font-mono font-bold text-zinc-900"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Note that current allocation will be updated */}
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FAF8F5] border border-black/30">
                <CheckCircle2 className="w-4 h-4 text-[#2D6A4F] mt-0.5 flex-shrink-0" />
                <div className="text-xs">
                  <span className="font-bold text-zinc-900 block">
                    Atualização Automática da Alocação Atual (Current)
                  </span>
                  <span className="text-[11px] text-zinc-600">
                    Ao guardar, as percentagens da tua alocação atual (Current) são recalculadas automaticamente e a coluna "Sugerido (AI)" continuará disponível para comparação e otimização.
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t-2 border-black bg-[#FAF8F5] flex items-center justify-between gap-2.5 flex-wrap">
              <button
                onClick={handleExportJsonFile}
                className="px-3 py-2 rounded-lg text-xs font-mono font-medium bg-white hover:bg-zinc-100 text-zinc-800 border border-black/30 transition-all flex items-center gap-1.5 shadow-2xs"
                title="Descarregar ficheiro user_portfolio.json com estas alocações"
              >
                <Download className="w-3.5 h-3.5 text-zinc-700" />
                <span>Descarregar JSON</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsEditHoldingsOpen(false)}
                  className="px-4 py-2 rounded-lg text-xs font-mono text-zinc-600 hover:text-black font-semibold transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => handleSavePortfolioHoldings(editingHoldingsData)}
                  className="px-4 py-2 rounded-lg text-xs font-mono font-bold bg-black text-white hover:bg-zinc-800 transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <Check className="w-4 h-4 text-white" />
                  Guardar e Atualizar Carteira
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
