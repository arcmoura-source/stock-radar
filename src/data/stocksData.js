export const COUNTRIES = [
  { id: 'ALL', name: 'All Markets', flag: '🌐' },
  { id: 'US', name: 'United States', flag: '🇺🇸', currency: 'USD' },
  { id: 'PT', name: 'Portugal', flag: '🇵🇹', currency: 'EUR' },
  { id: 'DE', name: 'Germany', flag: '🇩🇪', currency: 'EUR' },
  { id: 'NL', name: 'Netherlands', flag: '🇳🇱', currency: 'EUR' },
  { id: 'FR', name: 'France', flag: '🇫🇷', currency: 'EUR' },
  { id: 'BR', name: 'Brazil', flag: '🇧🇷', currency: 'BRL' },
  { id: 'UK', name: 'United Kingdom', flag: '🇬🇧', currency: 'GBP' }
];

export const SECTORS = [
  'All Sectors',
  'Technology',
  'Energy & Utilities',
  'Semiconductors',
  'Consumer & Retail',
  'Healthcare & Pharma',
  'Automotive & Mobility',
  'Luxury Goods',
  'Aerospace & Defense',
  'Basic Materials'
];

export const STOCKS_DATA = [
  {
    ticker: 'SPACEX',
    name: 'SpaceX (Space Exploration Technologies Corp.)',
    country: 'US',
    countryName: 'United States',
    flag: '🇺🇸',
    currency: 'USD',
    currencySymbol: '$',
    exchange: 'NASDAQ',
    sector: 'Aerospace & Defense',
    subSector: 'Reusable Orbital Launchers & Global Satellite Internet (Starlink)',
    logo: 'https://logo.clearbit.com/spacex.com',
    currentPrice: 112.00,
    changeDaily: 5.60,
    changePercent: 5.26,
    high52w: 125.00,
    low52w: 77.00,
    marketCap: '210 B',
    description: 'World-leading aerospace company founded by Elon Musk. Holds commercial orbital launch monopoly with Falcon 9/Heavy rockets, operates the world\'s largest satellite constellation (Starlink), and develops Starship for lunar and Mars missions.',
    
    metrics: {
      peRatio: 38.0,
      forwardPe: 24.5,
      pegRatio: 0.95,
      dividendYield: '0.00%',
      revenueGrowthYoy: '+52.0%',
      netMargin: '22.0%',
      operatingMargin: '31.5%',
      roe: '28.4%',
      roce: '21.0%',
      debtToEquity: '0.35',
      freeCashFlow: '$3.2B',
      beta: 1.45,
      avgVolume: '18.5M'
    },

    aiAnalysis: {
      verdict: 'STRONG BUY',
      verdictType: 'BUY',
      confidenceScore: 96,
      targetPrice: 160.00,
      upsidePotential: '+42.8%',
      timeHorizon: 'Long Term (Secular Growth)',
      summary: 'SpaceX operates the most impenetrable economic moat in aerospace and telecommunications. It is responsible for over 85% of all payload mass launched to orbit globally. The Starlink broadband division operates as a high-margin recurring cash-flow generator, while Starship rapid booster reusability slashes commercial space launch costs by over 90%.',
      bullCase: [
        'Commercial orbital launch monopoly powered by rapid Falcon 9 and Starship reusability.',
        'Starlink division exceeded 4 million active subscribers, generating over $6.6B in recurring annual revenues.',
        'Direct-to-Cell satellite constellation delivers space-based cellular roaming directly on standard smartphones.',
        'Multi-billion dollar anchor contracts with NASA (Artemis Human Landing System) and US Defense (Starshield).'
      ],
      bearCase: [
        'High ongoing CapEx requirements for Starship orbital production, Mars missions, and global orbital constellation replenishment.',
        'Intensifying space traffic congestion and orbital spectrum regulatory scrutiny by the ITU and FCC.',
        'Sensitivity to government space agency budget appropriations and geopolitical space exploration priorities.'
      ],
      aiPromptContext: 'Starlink high-margin free cash flow, Starship commercial launch cadence, and public market valuation multiples.'
    },

    etfs: [
      { ticker: 'SPY', name: 'SPDR S&P 500 ETF Trust', weight: '1.85%', category: 'Large Cap Blend', aum: '$580B' },
      { ticker: 'QQQ', name: 'Invesco QQQ Trust (Nasdaq-100)', weight: '2.40%', category: 'Large Cap Growth', aum: '$290B' },
      { ticker: 'ITA', name: 'iShares U.S. Aerospace & Defense ETF', weight: '8.50%', category: 'Aerospace & Defense', aum: '$6.2B' },
      { ticker: 'ARKX', name: 'ARK Space Exploration & Innovation ETF', weight: '9.20%', category: 'Space Exploration', aum: '$310M' }
    ],

    documents: [
      {
        id: 'doc-spx-1',
        title: 'NASA Artemis Starship Option B Contract (Official Document)',
        type: 'NASA Procurement Doc',
        date: '2024',
        pages: '64 pages',
        fileSize: '4.1 MB',
        url: 'https://www.spacex.com',
        summary: 'Award of $2.9B and $1.15B modification for Starship Human Landing System (HLS) to land astronauts on the Moon during Artemis III and IV.'
      },
      {
        id: 'doc-spx-2',
        title: 'FCC Commercial Authorization Filings (Starlink Gen2 & Direct-to-Cell)',
        type: 'FCC Regulatory Filing',
        date: '2024',
        pages: '32 pages',
        fileSize: '1.8 MB',
        url: 'https://www.spacex.com',
        summary: 'Regulatory authorization for space-based cellular operations connecting Starlink satellites directly to standard cellphones.'
      },
      {
        id: 'doc-spx-3',
        title: 'Starship Architecture Update Presentation by Elon Musk',
        type: 'Strategic Keynote Deck',
        date: 'Starbase Texas 2024',
        pages: '52 slides',
        fileSize: '18.4 MB',
        url: 'https://www.spacex.com',
        summary: 'Engineering roadmap of Starship V2 and V3 detailing 3,000+ tons of thrust, 200-ton orbital payload capacity, and daily reusability goals.'
      }
    ],

    news: [
      {
        id: 'news-spx-1',
        title: 'SpaceX completes historic public market debut following record Starlink cash flow',
        source: 'Bloomberg / SpaceNews',
        time: 'Recent',
        sentiment: 'positive',
        summary: 'Public equity listing reflects high investor demand for orbital launch monopoly and high-margin global satellite broadband.'
      },
      {
        id: 'news-spx-2',
        title: 'SpaceX achieves historic Super Heavy booster catch with Mechazilla tower arms on Starship Flight 5',
        source: 'The Wall Street Journal',
        time: '2 days ago',
        sentiment: 'positive',
        summary: 'Historic flight test demonstrated technical feasibility of immediate pad recovery without landing gear, unlocking rapid reuse of 120-meter ships.'
      },
      {
        id: 'news-spx-3',
        title: 'Starshield defense unit secures new classified reconnaissance satellite contracts with Pentagon',
        source: 'Reuters Defense',
        time: '1 week ago',
        sentiment: 'positive',
        summary: 'Low-Earth orbit satellite constellation equipped with real-time reconnaissance tracking sensors expands defense partnerships.'
      }
    ],

    recentMilestones: [
      'Successful completion of landmark public market listing with strong institutional investor demand.',
      'Successful capture of the 71-meter Super Heavy booster using the launch tower mechanical arms at Starbase.',
      'Surpassed 120 orbital Falcon 9 launches in a single calendar year with a 100% mission success rate.',
      'Over 4 million active Starlink user terminals deployed globally with proven unit profitability.'
    ],
    futurePlans: [
      'Inaugural uncrewed Starship missions targeting Mars during the next orbital transfer window (2026).',
      'Full-scale commercial launch of Starlink Direct-to-Cell voice and data service with partner carriers.',
      'Completion of life-support system qualification for crewed lunar landings under NASA\'s Artemis program.',
      'Scaling Starship launch cadence to enable gigawatt-scale orbital solar and commercial space manufacturing.'
    ]
  },
  {
    ticker: 'VST',
    name: 'Vistra Corp.',
    country: 'US',
    countryName: 'United States',
    flag: '🇺🇸',
    currency: 'USD',
    currencySymbol: '$',
    exchange: 'NYSE',
    sector: 'Energy & Utilities',
    subSector: 'Nuclear Baseload Generation, Natural Gas & Power for AI Data Centers',
    logo: 'https://logo.clearbit.com/vistracorp.com',
    currentPrice: 128.40,
    changeDaily: 4.15,
    changePercent: 3.34,
    high52w: 135.20,
    low52w: 31.80,
    marketCap: '44.8 B',
    description: 'One of the largest independent power producers in the US (41 GW). Leads the transition and 24/7 continuous supply of nuclear and thermal energy to hyperscale datacenters and AI compute workloads.',
    
    metrics: {
      peRatio: 28.5,
      forwardPe: 18.2,
      pegRatio: 1.05,
      dividendYield: '0.68%',
      revenueGrowthYoy: '+24.8%',
      netMargin: '12.4%',
      operatingMargin: '26.8%',
      roe: '34.2%',
      roce: '19.5%',
      debtToEquity: '1.92',
      freeCashFlow: '$2.45B',
      beta: 1.15,
      avgVolume: '7.8M'
    },

    aiAnalysis: {
      verdict: 'STRONG BUY',
      verdictType: 'BUY',
      confidenceScore: 91,
      targetPrice: 155.00,
      upsidePotential: '+20.7%',
      timeHorizon: 'Medium / Long Term',
      summary: 'Vistra has emerged as a prime structural beneficiary of the AI revolution. Datacenters demand continuous, 24/7 baseload power. With the Energy Harbor nuclear fleet and Comanche Peak plant, Vistra supplies clean electricity at premium rates via long-term PPAs and behind-the-meter contracts with tech hyperscalers.',
      bullCase: [
        'Explosive power demand from AI datacenters in ERCOT (Texas) and PJM deregulated wholesale markets.',
        'Nuclear fleet of 6,400+ MW delivering carbon-free baseload energy coveted by Amazon, Microsoft, and Google.',
        'License extension for Comanche Peak nuclear plant authorized by the NRC through 2053.',
        'Successive upward revisions to adjusted EBITDA guidance and recurring free cash flow.'
      ],
      bearCase: [
        'Substantial 1-year stock rally (+250%) may trigger short-term technical valuation consolidation.',
        'Regulatory proceedings at FERC regarding grid tariff allocation for behind-the-meter colocation.',
        'Exposure to seasonal natural gas price fluctuations in deregulated wholesale electricity markets.'
      ],
      aiPromptContext: 'Focus on direct contract monetization with AI datacenters and firm nuclear capacity.'
    },

    etfs: [
      { ticker: 'XLU', name: 'Utilities Select Sector SPDR Fund', weight: '5.85%', category: 'US Utilities', aum: '$17B' },
      { ticker: 'SPY', name: 'SPDR S&P 500 ETF Trust', weight: '0.18%', category: 'S&P 500', aum: '$580B' },
      { ticker: 'VPU', name: 'Vanguard Utilities ETF', weight: '4.90%', category: 'General Utilities', aum: '$6.1B' },
      { ticker: 'NLR', name: 'VanEck Uranium+Nuclear Energy ETF', weight: '7.40%', category: 'Nuclear Energy', aum: '$310M' }
    ],

    documents: [
      {
        id: 'doc-vst-1',
        title: 'SEC Annual Form 10-K (Vistra Corp. FY2023)',
        type: '10-K / Annual',
        date: 'February 2024',
        pages: '142 pages',
        fileSize: '5.6 MB',
        url: 'https://investor.vistracorp.com',
        summary: 'Closing of Energy Harbor acquisition, consolidation of 41,000 MW generation fleet, and generation of $3.8B in ongoing adjusted EBITDA.'
      },
      {
        id: 'doc-vst-2',
        title: 'Investor Presentation: Powering AI Data Centers',
        type: 'Investor Deck',
        date: '2024',
        pages: '56 slides',
        fileSize: '11.8 MB',
        url: 'https://investor.vistracorp.com',
        summary: 'Detailed analysis of exponential gigawatt baseload power demand by AI datacenter clusters across Texas and PJM.'
      },
      {
        id: 'doc-vst-3',
        title: 'Quarterly Form 10-Q & Guidance Revision',
        type: '10-Q / Quarterly',
        date: 'August 2024',
        pages: '48 pages',
        fileSize: '2.3 MB',
        url: 'https://investor.vistracorp.com',
        summary: 'Midpoint EBITDA projection raised to $4.7B alongside authorization of an additional $1.5B in share repurchases.'
      }
    ],

    news: [
      {
        id: 'news-vst-1',
        title: 'Vistra negotiates large-scale power purchase agreements with AI datacenter operators',
        source: 'Bloomberg Markets',
        time: '4 hours ago',
        sentiment: 'positive',
        summary: 'Management confirmed advanced commercial talks for multiple gigawatts across colocated nuclear and gas generation sites.'
      },
      {
        id: 'news-vst-2',
        title: 'Morgan Stanley and Goldman Sachs raise VST target price highlighting "AI power supercycle"',
        source: 'Wall Street Journal',
        time: 'Yesterday',
        sentiment: 'positive',
        summary: 'Wall Street consensus revised 2026 cash flow projections upward on multi-year contracts at record pricing.'
      },
      {
        id: 'news-vst-3',
        title: 'Nuclear Regulatory Commission (NRC) grants 20-year operating license extension for Comanche Peak',
        source: 'Reuters Energy',
        time: '5 days ago',
        sentiment: 'positive',
        summary: 'Authorization secures baseload nuclear operations in Texas through mid-century (2053).'
      }
    ],

    recentMilestones: [
      'Prominent inclusion in S&P 500 index, ranking among top performers across the entire US equity market.',
      'Completion of Energy Harbor integration, forming the 2nd largest commercial nuclear operator in the US.',
      'Execution of over $4 billion in cumulative share repurchases since 2021.'
    ],
    futurePlans: [
      'Deployment of up to 2,000 MW in Vistra Zero battery storage and solar utility projects.',
      'Closing dedicated behind-the-meter long-term power agreements with frontier AI tech hyperscalers.',
      'Optimizing dispatch flexibility in Texas power grid to safeguard margins during seasonal weather peaks.'
    ]
  },
  {
    ticker: 'NVDA',
    name: 'NVIDIA Corporation',
    country: 'US',
    countryName: 'United States',
    flag: '🇺🇸',
    currency: 'USD',
    currencySymbol: '$',
    exchange: 'NASDAQ',
    sector: 'Semiconductors',
    subSector: 'AI Accelerators & Accelerated Compute',
    logo: 'https://logo.clearbit.com/nvidia.com',
    currentPrice: 132.80,
    changeDaily: 3.42,
    changePercent: 2.64,
    high52w: 140.76,
    low52w: 45.12,
    marketCap: '3.25 T',
    description: 'Unchallenged global leader in GPU-accelerated computing and supercomputer architectures for frontier generative AI workloads.',
    
    // Financial Metrics
    metrics: {
      peRatio: 48.2,
      forwardPe: 31.4,
      pegRatio: 1.15,
      dividendYield: '0.03%',
      revenueGrowthYoy: '+122.4%',
      netMargin: '55.3%',
      operatingMargin: '62.1%',
      roe: '115.8%',
      roce: '82.4%',
      debtToEquity: '0.18',
      freeCashFlow: '$39.2B',
      beta: 1.68,
      avgVolume: '54.2M'
    },

    // AI Analysis & Platform Verdict
    aiAnalysis: {
      verdict: 'STRONG BUY',
      verdictType: 'BUY', // BUY, SELL, HOLD
      confidenceScore: 92,
      targetPrice: 165.00,
      upsidePotential: '+24.2%',
      timeHorizon: 'Medium / Long Term',
      summary: 'NVIDIA commands an unassailable economic moat via its proprietary CUDA software stack coupled with Blackwell and Hopper GPU architectures. Surging demand across cloud hyperscalers (Microsoft, Meta, Alphabet, AWS) consistently outpaces optimistic Wall Street forecasts.',
      bullCase: [
        'De facto monopoly (>85% market share) in training and high-throughput inference for frontier AI models.',
        'Gross margins exceeding 74%, demonstrating exceptional pricing power.',
        'Blackwell B200 and GB200 platform allocations are completely sold out for the next 12 months.',
        'Accelerating enterprise adoption and sovereign AI infrastructure buildouts across dozens of nations.'
      ],
      bearCase: [
        'Customer concentration: top 4 cloud hyperscalers account for ~40% of total company revenues.',
        'Potential infrastructure spending digestion cycle if big tech CapEx moderates in future years.',
        'Geopolitical export controls and licensing restrictions on advanced silicon shipments to China.',
        'Demanding valuation multiples require sustained flawless quarterly execution.'
      ],
      aiPromptContext: 'Focus on Blackwell product cycle, hyperscaler CapEx backlog, and export control impacts.'
    },

    // ETF Holdings & Index Exposure
    etfs: [
      { ticker: 'SPY', name: 'SPDR S&P 500 ETF Trust', weight: '6.85%', category: 'Large Cap Blend', aum: '$580B' },
      { ticker: 'QQQ', name: 'Invesco QQQ Trust (Nasdaq-100)', weight: '8.40%', category: 'Large Cap Growth', aum: '$290B' },
      { ticker: 'SMH', name: 'VanEck Semiconductor ETF', weight: '21.50%', category: 'Sector - Semiconductors', aum: '$24B' },
      { ticker: 'VTI', name: 'Vanguard Total Stock Market ETF', weight: '5.70%', category: 'Total US Market', aum: '$410B' },
      { ticker: 'SOXX', name: 'iShares Semiconductor ETF', weight: '8.15%', category: 'Sector - Chips', aum: '$16B' }
    ],

    // Company Filings & Research
    documents: [
      {
        id: 'doc-nvda-1',
        title: 'SEC Annual Form 10-K (SEC Filing FY2024)',
        type: '10-K / Annual',
        date: 'March 2024',
        pages: '108 pages',
        fileSize: '4.8 MB',
        url: 'https://investor.nvidia.com',
        summary: 'Audited financial statements detailing record fiscal revenue of $60.9B, massive datacenter compute expansion, and foundry supply partnerships with TSMC.'
      },
      {
        id: 'doc-nvda-2',
        title: 'SEC Form 10-Q (Q2 Quarterly Report)',
        type: '10-Q / Quarterly',
        date: 'August 2024',
        pages: '45 pages',
        fileSize: '2.1 MB',
        url: 'https://investor.nvidia.com',
        summary: 'Quarterly revenues of $30.0B (+122% YoY) led by datacenter compute ($26.3B) alongside a $50 billion share repurchase expansion.'
      },
      {
        id: 'doc-nvda-3',
        title: 'GTC Investor Presentation & AI Architecture Roadmap',
        type: 'Investor Deck',
        date: '2024',
        pages: '62 slides',
        fileSize: '12.4 MB',
        url: 'https://investor.nvidia.com',
        summary: 'Blackwell Ultra architecture and Rubin roadmap for 2025/2026 featuring Quantum-X800 networking and liquid-cooled NVL racks.'
      },
      {
        id: 'doc-nvda-4',
        title: 'Q2 FY25 Earnings Conference Call Transcript',
        type: 'Transcript',
        date: 'August 2024',
        pages: '18 pages',
        fileSize: '540 KB',
        url: 'https://investor.nvidia.com',
        summary: 'Executive remarks by Jensen Huang and Colette Kress confirming packaging revisions without shipment delays and Q4 ramp volume.'
      }
    ],

    // Market Intelligence & News
    news: [
      {
        id: 'news-nvda-1',
        title: 'Cloud hyperscalers increase 2025 CapEx estimates for NVIDIA GPU server infrastructure',
        source: 'Bloomberg Technology',
        time: '3 hours ago',
        sentiment: 'positive',
        summary: 'Microsoft, Meta, and Alphabet signal to shareholders that AI infrastructure investments will accelerate, confirming order book visibility.'
      },
      {
        id: 'news-nvda-2',
        title: 'TSMC expands CoWoS advanced packaging capacity to meet surging Blackwell demand',
        source: 'Reuters Financial',
        time: 'Yesterday',
        sentiment: 'positive',
        summary: 'Nvidia foundry partner accelerates new advanced packaging capacity in Taiwan, alleviating near-term supply constraints.'
      },
      {
        id: 'news-nvda-3',
        title: 'Antitrust regulators at EU Commission and US DOJ review software licensing and networking bundles',
        source: 'Financial Times',
        time: '3 days ago',
        sentiment: 'neutral',
        summary: 'Competition authorities review whether packaging Mellanox networking fabric with proprietary CUDA libraries presents competitive barriers.'
      }
    ],

    // Key Milestones & Growth Roadmap
    recentMilestones: [
      'Achieved historic $3+ trillion market capitalization milestone, ranking among world\'s most valuable enterprises.',
      'Commercial launch of Blackwell B200 and GB200 NVL72 architectures delivering 30x inference throughput gains.',
      'Deployment of sovereign AI supercomputing clusters in partnership with governments in Japan, France, and Middle East.',
      'Successful execution of 10-for-1 forward stock split improving liquidity for retail and institutional investors.'
    ],
    futurePlans: [
      'Next-generation "Rubin" architecture scheduled for 2026 introduction incorporating ultra-fast HBM4 memory.',
      'Aggressive expansion of enterprise software ecosystem via recurring per-GPU annual subscriptions.',
      'Expansion in autonomous automotive computing (NVIDIA DRIVE Thor) with Tier-1 OEM design wins globally.',
      'Building foundation software for humanoid robotics and digital twins via Isaac and Omniverse platforms.'
    ]
  },

  {
    ticker: 'GALP.LS',
    name: 'Galp Energia, SGPS, S.A.',
    country: 'PT',
    countryName: 'Portugal',
    flag: '🇵🇹',
    currency: 'EUR',
    currencySymbol: '€',
    exchange: 'Euronext Lisbon',
    sector: 'Energy & Utilities',
    subSector: 'Offshore Exploration & Production, Refining & Renewables',
    logo: 'https://logo.clearbit.com/galp.com',
    currentPrice: 17.45,
    changeDaily: 0.28,
    changePercent: 1.63,
    high52w: 21.40,
    low52w: 12.80,
    marketCap: '13.4 B',
    description: 'Portuguese integrated energy company with major deepwater upstream assets in Brazil and Namibia, modern Iberian refining/retail assets, and growing solar/hydrogen ventures.',
    
    metrics: {
      peRatio: 9.8,
      forwardPe: 8.5,
      pegRatio: 0.75,
      dividendYield: '4.85%',
      revenueGrowthYoy: '+14.2%',
      netMargin: '11.8%',
      operatingMargin: '16.4%',
      roe: '27.4%',
      roce: '21.1%',
      debtToEquity: '0.42',
      freeCashFlow: '€1.65B',
      beta: 0.82,
      avgVolume: '2.1M'
    },

    aiAnalysis: {
      verdict: 'BUY',
      verdictType: 'BUY',
      confidenceScore: 84,
      targetPrice: 22.00,
      upsidePotential: '+26.1%',
      timeHorizon: 'Medium / Long Term',
      summary: 'The monumental discovery in PEL 83 (Orange Basin, Namibia - Mopane prospect) fundamentally transformed Galp\'s reserve base and growth trajectory. The company pairs an attractive dividend yield with a lightly leveraged balance sheet and major cash catalysts via farm-out monetization.',
      bullCase: [
        'Mopane discovery in Namibia with in-place resource estimates exceeding 10 billion barrels of oil equivalent.',
        'Competitive farm-out process in Namibia expected to unlock upfront cash payments and potential special dividends.',
        'Resilient operational cash generation from Brazilian pre-salt assets (Tupi, Bacalhau nearing first oil).',
        'Attractive ~5% dividend yield backed by disciplined capital allocation and share buybacks.'
      ],
      bearCase: [
        'Cyclical volatility in international Brent crude benchmarks and refining crack spreads.',
        'Capital expenditure requirements to bring offshore Namibian discoveries to commercial production.',
        'Execution risk in energy transition projects (advanced biofuels and green hydrogen at Sines refinery).'
      ],
      aiPromptContext: 'Assessment of Namibian farm-out updates and Bacalhau production cash flow ramp.'
    },

    etfs: [
      { ticker: 'PSI20', name: 'Lyxor PSI 20 UCITS ETF', weight: '14.20%', category: 'Portuguese Equity Index', aum: '€320M' },
      { ticker: 'IXC', name: 'iShares Global Energy ETF', weight: '0.65%', category: 'Global Energy Sector', aum: '$2.1B' },
      { ticker: 'XLEU', name: 'SPDR MSCI Europe Energy UCITS ETF', weight: '3.10%', category: 'European Energy', aum: '€850M' },
      { ticker: 'IEUR', name: 'iShares Core MSCI Europe ETF', weight: '0.22%', category: 'Broad Europe', aum: '$4.8B' }
    ],

    documents: [
      {
        id: 'doc-galp-1',
        title: 'Annual Integrated Report & Financial Statements',
        type: 'Annual Report / CMVM',
        date: 'April 2024',
        pages: '240 pages',
        fileSize: '9.2 MB',
        url: 'https://www.galp.com/pt/investidores',
        summary: 'Consolidated financial results, sustainability disclosures, upstream asset milestones, and 2030 decarbonization roadmap.'
      },
      {
        id: 'doc-galp-2',
        title: 'Quarterly Financial Results & Exploration Update',
        type: 'Q-Report / CMVM',
        date: 'July 2024',
        pages: '38 pages',
        fileSize: '1.8 MB',
        url: 'https://www.galp.com/pt/investidores',
        summary: 'Quarterly RCA EBITDA of €849M alongside comprehensive DST flow test results from Mopane-1X well in Namibia.'
      },
      {
        id: 'doc-galp-3',
        title: 'Capital Markets Day Strategy Presentation',
        type: 'Investor Deck',
        date: '2024',
        pages: '54 slides',
        fileSize: '6.5 MB',
        url: 'https://www.galp.com/pt/investidores',
        summary: 'Capital allocation strategy: 50% low-cost upstream, 50% energy transition, and direct shareholder cash distributions.'
      }
    ],

    news: [
      {
        id: 'news-galp-1',
        title: 'Galp receives non-binding proposals from global energy majors for Namibian farm-out',
        source: 'Jornal de Negocios / Reuters',
        time: '1 day ago',
        sentiment: 'positive',
        summary: 'Supermajors including ExxonMobil, Shell, TotalEnergies, and Petrobras submit formal proposals for a 40% operating stake in Mopane.'
      },
      {
        id: 'news-galp-2',
        title: 'FPSO Bacalhau progresses on schedule toward first oil in Brazilian offshore pre-salt',
        source: 'ECO Economia Online',
        time: '5 days ago',
        sentiment: 'positive',
        summary: 'Equinor-operated floating production vessel will add over 35,000 net daily barrels to Galp\'s consolidated production base.'
      },
      {
        id: 'news-galp-3',
        title: 'Iberian refining crack spreads moderate toward long-term historical averages',
        source: 'Bloomberg Energy',
        time: '1 week ago',
        sentiment: 'neutral',
        summary: 'Inventory normalization across European distillate markets brought crack spreads to normalized mid-cycle ranges.'
      }
    ],

    recentMilestones: [
      'Completion of Phase 1 exploration drilling in Namibia confirming high-quality reservoir column with excellent permeability.',
      'Enhanced shareholder remuneration with €350M share repurchase program and 4% base dividend per share hike.',
      'Commenced construction of HVO/SAF advanced biofuels unit in Sines refinery in partnership with Mitsui.'
    ],
    futurePlans: [
      'Finalizing competitive farm-out transaction in Namibia by H1 2025 to carry field development expenditures.',
      'Inaugural commercial production from mega-scale Bacalhau development (Brazil), driving significant free cash flow expansion.',
      'Installation of 100 MW green hydrogen electrolyzers at Sines refinery to displace fossil industrial gas.'
    ]
  },

  {
    ticker: 'EDP.LS',
    name: 'EDP - Energias de Portugal, S.A.',
    country: 'PT',
    countryName: 'Portugal',
    flag: '🇵🇹',
    currency: 'EUR',
    currencySymbol: '€',
    exchange: 'Euronext Lisbon',
    sector: 'Energy & Utilities',
    subSector: 'Clean Energy Generation & Regulated Electricity Distribution Grids',
    logo: 'https://logo.clearbit.com/edp.com',
    currentPrice: 3.82,
    changeDaily: -0.04,
    changePercent: -1.04,
    high52w: 4.55,
    low52w: 3.40,
    marketCap: '16.0 B',
    description: 'Global clean energy utility with market-leading positions in Iberian and Brazilian regulated power distribution and top-tier wind/solar portfolios via EDP Renewables.',
    
    metrics: {
      peRatio: 12.4,
      forwardPe: 11.2,
      pegRatio: 1.45,
      dividendYield: '5.24%',
      revenueGrowthYoy: '+6.8%',
      netMargin: '9.2%',
      operatingMargin: '18.1%',
      roe: '10.5%',
      roce: '7.8%',
      debtToEquity: '1.18',
      freeCashFlow: '€1.10B',
      beta: 0.65,
      avgVolume: '8.4M'
    },

    aiAnalysis: {
      verdict: 'BUY',
      verdictType: 'BUY',
      confidenceScore: 78,
      targetPrice: 4.60,
      upsidePotential: '+20.4%',
      timeHorizon: 'Long Term / Dividend Focus',
      summary: 'EDP represents a high-quality defensive anchor for income-focused portfolios. The European Central Bank\'s monetary easing cycle directly compresses debt refinancing costs while enhancing the appeal of its secure >5.2% dividend yield.',
      bullCase: [
        'Positive sensitivity to ECB interest rate reduction cycle, lowering long-term infrastructure funding costs.',
        'Regulated distribution networks and long-term contracted PPAs provide high revenue predictability.',
        'Global leadership in onshore wind and solar via EDPR across North America, Europe, and Latin America.',
        'Clear dividend policy backed by a protected distribution floor.'
      ],
      bearCase: [
        'Substantial net debt position (~€15B) requiring disciplined execution of asset rotation divestments.',
        'Iberian wholesale power prices pressured by daytime solar oversupply conditions during peak solar generation hours.',
        'Grid interconnection queues and permitting bottlenecks on selected US renewable developments.'
      ],
      aiPromptContext: 'Focus on ECB rate cut tailwinds and mitigation of Iberian wholesale pricing swings.'
    },

    etfs: [
      { ticker: 'PSI20', name: 'Lyxor PSI 20 UCITS ETF', weight: '16.80%', category: 'Portuguese Equity Index', aum: '€320M' },
      { ticker: 'ICLN', name: 'iShares Global Clean Energy ETF', weight: '4.85%', category: 'Global Clean Energy', aum: '$2.8B' },
      { ticker: 'VPU', name: 'Vanguard Utilities ETF', weight: '0.90%', category: 'Utilities', aum: '$6.1B' },
      { ticker: 'SDIV', name: 'Global X SuperDividend ETF', weight: '1.20%', category: 'Global High Dividend', aum: '$750M' }
    ],

    documents: [
      {
        id: 'doc-edp-1',
        title: 'Annual Integrated Financial Report',
        type: 'Annual Report / CMVM',
        date: 'March 2024',
        pages: '310 pages',
        fileSize: '11.5 MB',
        url: 'https://www.edp.com/pt/investidores',
        summary: 'Operating performance, 30 GW installed generation portfolio overview, and coal exit roadmap by 2025.'
      },
      {
        id: 'doc-edp-2',
        title: '2024-2026 Strategic Plan & Capital Allocation',
        type: 'Strategic Plan',
        date: '2024',
        pages: '75 slides',
        fileSize: '8.2 MB',
        url: 'https://www.edp.com/pt/investidores',
        summary: 'Investment plan prioritizing regulated electricity networks (40% of CapEx) and contracted renewable assets.'
      }
    ],

    news: [
      {
        id: 'news-edp-1',
        title: 'ECB rate reduction cycle strengthens investment case for capital-intensive European utilities',
        source: 'Expresso Economia',
        time: 'Yesterday',
        sentiment: 'positive',
        summary: 'Barclays and Goldman Sachs upgrade European utilities sector highlighting sovereign yield relief.'
      },
      {
        id: 'news-edp-2',
        title: 'EDPR completes solar asset rotation in Spain and Poland for over €400 million',
        source: 'Reuters Utilities',
        time: '4 days ago',
        sentiment: 'positive',
        summary: 'Capital recycling strategy generates capital gains, self-funding renewable expansion without equity dilution.'
      }
    ],

    recentMilestones: [
      'Over 85% of total group electricity generation now originates from 100% renewable sources.',
      'Successful completion of public tender offer for EDP Brasil minority shares, delisting from B3 Sao Paulo.',
      'Maintained robust liquidity cushion of over €9 billion to comfortably cover maturities through 2027.'
    ],
    futurePlans: [
      'Target 100% clean power generation by 2030 and permanently decommission final coal facility in Spain.',
      'Accelerate investments into smart, digitized distribution networks across Iberia to support EV adoption.',
      'Deploy utility-scale battery storage colocated with existing solar generation assets.'
    ]
  },

  {
    ticker: 'ASML.AS',
    name: 'ASML Holding N.V.',
    country: 'NL',
    countryName: 'Netherlands',
    flag: '🇳🇱',
    currency: 'EUR',
    currencySymbol: '€',
    exchange: 'Euronext Amsterdam / NASDAQ',
    sector: 'Semiconductors',
    subSector: 'Extreme Ultraviolet (EUV) Photolithography Systems',
    logo: 'https://logo.clearbit.com/asml.com',
    currentPrice: 742.60,
    changeDaily: 14.20,
    changePercent: 1.95,
    high52w: 1020.00,
    low52w: 615.00,
    marketCap: '292 B',
    description: 'Critical global monopoly in extreme ultraviolet (EUV) lithography systems, indispensable for manufacturing leading-edge AI microprocessors and smartphones (3nm, 2nm).' ,
    
    metrics: {
      peRatio: 37.8,
      forwardPe: 27.5,
      pegRatio: 1.28,
      dividendYield: '0.88%',
      revenueGrowthYoy: '+18.5%',
      netMargin: '27.4%',
      operatingMargin: '31.2%',
      roe: '52.1%',
      roce: '44.3%',
      debtToEquity: '0.34',
      freeCashFlow: '€5.4B',
      beta: 1.35,
      avgVolume: '1.2M'
    },

    aiAnalysis: {
      verdict: 'STRONG BUY',
      verdictType: 'BUY',
      confidenceScore: 94,
      targetPrice: 910.00,
      upsidePotential: '+22.5%',
      timeHorizon: 'Medium / Long Term',
      summary: 'ASML commands the most impenetrable technological moat in modern industry. No competitor in the world can replicate its High-NA EUV lithography systems. Recent share price consolidation created a compelling entry point ahead of major foundry CapEx buildouts (TSMC, Intel, Samsung) scheduled for 2025/2026.',
      bullCase: [
        'Absolute 100% monopoly in EUV lithography: no leading-edge fab can produce advanced silicon without ASML systems.',
        'Commercial deliveries underway for next-gen "High-NA EUV" tools (Twinscan EXE:5000) priced at $350M+ each.',
        'Robust order backlog exceeding €30 billion providing multi-year revenue visibility.',
        'Return on capital employed (ROCE) above 40% and strong free cash flow with expanding operating margins.'
      ],
      bearCase: [
        'Export control policies implemented by Dutch and US governments restricting advanced DUV shipments to China.',
        'Timing variability in foundry shell completions across the US and Europe tied to CHIPS Act subsidy disbursements.'
      ],
      aiPromptContext: 'High-NA EUV adoption trajectory and order backlog resilience amidst China trade restrictions.'
    },

    etfs: [
      { ticker: 'SMH', name: 'VanEck Semiconductor ETF', weight: '12.40%', category: 'Global Semiconductors', aum: '$24B' },
      { ticker: 'EWG', name: 'iShares MSCI Netherlands / Europe ETF', weight: '18.90%', category: 'Netherlands / Europe', aum: '$3.5B' },
      { ticker: 'EZU', name: 'iShares MSCI Eurozone ETF', weight: '7.10%', category: 'Eurozone Large Cap', aum: '$9.2B' },
      { ticker: 'FEZ', name: 'SPDR EURO STOXX 50 ETF', weight: '8.45%', category: 'European Blue Chips', aum: '$4.1B' }
    ],

    documents: [
      {
        id: 'doc-asml-1',
        title: 'ASML Annual Report 2023 (Form 20-F / Dutch SEC)',
        type: 'Annual Report',
        date: 'February 2024',
        pages: '350 pages',
        fileSize: '15.2 MB',
        url: 'https://www.asml.com/en/investors',
        summary: 'Annual revenues of €27.6B with 51.3% gross margin. Detailed analysis of supply chain architecture and €4B annual R&D investment.'
      },
      {
        id: 'doc-asml-2',
        title: 'Investor Day Presentation - The Road to 2030',
        type: 'Investor Deck',
        date: '2024',
        pages: '88 slides',
        fileSize: '14.1 MB',
        url: 'https://www.asml.com/en/investors',
        summary: '2030 revenue targets of €44B to €60B with 56% to 60% gross margins, fueled by global artificial intelligence proliferation.'
      }
    ],

    news: [
      {
        id: 'news-asml-1',
        title: 'Intel and TSMC confirm encouraging yields with first commercial High-NA EUV tools',
        source: 'EE Times / Reuters',
        time: '2 days ago',
        sentiment: 'positive',
        summary: 'New 0.55 numerical aperture optics reduce mask complexity by over 30%, accelerating 18A and 2nm production ramps.'
      },
      {
        id: 'news-asml-2',
        title: 'Dutch government harmonizes direct licensing oversight for advanced lithography tools',
        source: 'Handelsblatt',
        time: '1 week ago',
        sentiment: 'neutral',
        summary: 'Regulatory decision unifies export control frameworks with NATO partners without introducing surprise restrictions.'
      }
    ],

    recentMilestones: [
      'Successful installation of premier commercial High-NA EXE:5000 system at Intel\'s Oregon development facility.',
      'Surpassed 250 operational EUV lithography systems installed globally since commercial inception.',
      'Expansion plan at Veldhoven headquarters supported by €2.5 billion Dutch government public infrastructure initiative.'
    ],
    futurePlans: [
      'Serial production launch of EXE:5200 model delivering 220 wafers per hour starting in 2025/2026.',
      'Scaling manufacturing facility capacity to 90 EUV systems and 600 DUV tools annually.',
      'Research and development of next-generation Hyper-NA optics for sub-1nm semiconductor nodes beyond 2030.'
    ]
  },

  {
    ticker: 'SAP.DE',
    name: 'SAP SE',
    country: 'DE',
    countryName: 'Germany',
    flag: '🇩🇪',
    currency: 'EUR',
    currencySymbol: '€',
    exchange: 'Deutsche Börse (XETRA)',
    sector: 'Technology',
    subSector: 'Enterprise Cloud ERP Software & Business AI',
    logo: 'https://logo.clearbit.com/sap.com',
    currentPrice: 215.30,
    changeDaily: 1.80,
    changePercent: 0.84,
    high52w: 224.50,
    low52w: 122.00,
    marketCap: '252 B',
    description: 'Europe\'s largest software enterprise and world leader in mission-critical ERP systems. Over 87% of all global commerce touches a system powered by SAP.',
    
    metrics: {
      peRatio: 36.2,
      forwardPe: 26.8,
      pegRatio: 1.32,
      dividendYield: '1.05%',
      revenueGrowthYoy: '+10.2%',
      netMargin: '19.8%',
      operatingMargin: '23.4%',
      roe: '18.4%',
      roce: '16.2%',
      debtToEquity: '0.22',
      freeCashFlow: '€5.8B',
      beta: 0.95,
      avgVolume: '1.8M'
    },

    aiAnalysis: {
      verdict: 'BUY',
      verdictType: 'BUY',
      confidenceScore: 86,
      targetPrice: 245.00,
      upsidePotential: '+13.8%',
      timeHorizon: 'Medium Term',
      summary: 'SAP\'s cloud subscription transformation (S/4HANA Cloud) and enterprise generative AI assistant (Joule) drive sustained Annual Recurring Revenue (ARR) growth, improving cash flow visibility and expanding operating margins.',
      bullCase: [
        'Cloud revenue growth exceeding 25% as legacy ECC enterprise clients migrate to cloud S/4HANA.',
        'Native integration of Joule AI models with exclusive access to mission-critical business data across Fortune 500 enterprises.',
        'Net Revenue Retention (NRR) rates consistently above 103%.',
        'AI-focused restructuring program optimizing headcount efficiency and expanding operating leverage.'
      ],
      bearCase: [
        'Equity valuation near historical highs following strong outperformance in the DAX index.',
        'Competition against Salesforce, Workday, and Oracle in CRM and HCM application verticals.',
        'Potential cloud migration schedule delays among traditional European industrial manufacturing clients.'
      ],
      aiPromptContext: 'S/4HANA Cloud migration velocity and enterprise Business AI monetization.'
    },

    etfs: [
      { ticker: 'DAX', name: 'iShares Core DAX UCITS ETF', weight: '13.10%', category: 'German Equity Index', aum: '€8.5B' },
      { ticker: 'FEZ', name: 'SPDR EURO STOXX 50 ETF', weight: '7.80%', category: 'Eurozone Blue Chips', aum: '$4.1B' },
      { ticker: 'IGV', name: 'iShares Expanded Tech-Software Sector ETF', weight: '2.40%', category: 'Global Software', aum: '$5.6B' },
      { ticker: 'EWG', name: 'iShares MSCI Germany ETF', weight: '12.80%', category: 'Broad Germany', aum: '$1.4B' }
    ],

    documents: [
      {
        id: 'doc-sap-1',
        title: 'Integrated Report 2023 / Annual Financial Report',
        type: 'Annual Report',
        date: 'March 2024',
        pages: '315 pages',
        fileSize: '12.8 MB',
        url: 'https://www.sap.com/investors',
        summary: 'Cloud backlog expansion to €13.7B (+25% CC) and operational cash flow advancing to €6.2B.'
      },
      {
        id: 'doc-sap-2',
        title: 'SAP Sapphire Keynote & Strategy Presentation',
        type: 'Product & Investor Deck',
        date: 'Junho 2024',
        pages: '72 slides',
        fileSize: '18.0 MB',
        url: 'https://www.sap.com/investors',
        summary: 'Business AI strategic roadmap: deep generative AI integrations with Nvidia, Microsoft, and Amazon Bedrock.'
      }
    ],

    news: [
      {
        id: 'news-sap-1',
        title: 'SAP announces expanded strategic enterprise AI partnership with NVIDIA',
        source: 'Handelsblatt / Reuters',
        time: '1 day ago',
        sentiment: 'positive',
        summary: 'SAP enterprise customers can orchestrate custom AI models trained on structured enterprise supply chain and ERP data securely.'
      },
      {
        id: 'news-sap-2',
        title: 'Quarterly financial results beat consensus driven by large-scale enterprise cloud wins',
        source: 'Frankfurter Allgemeine',
        time: '5 days ago',
        sentiment: 'positive',
        summary: 'Company confirmed 2025 cloud revenue target of €21.5B with expanding operating margins.'
      }
    ],

    recentMilestones: [
      'Ranked as the most valuable publicly traded company on the German exchange (XETRA DAX 40).',
      'Global rollout of Joule enterprise generative AI copilot embedded across procurement, HR, and finance.',
      'Over 27,000 corporate enterprises have now adopted the cloud S/4HANA suite.'
    ],
    futurePlans: [
      'Targets €37.5B in total revenues and over €8B in free cash flow by 2025.',
      'Mandatory cloud migration roadmap driving accelerated customer transitions ahead of legacy support sunsets.',
      'Developing autonomous software agents capable of executing invoice reconciliations and procurement approvals without human intervention.'
    ]
  },

  {
    ticker: 'AAPL',
    name: 'Apple Inc.',
    country: 'US',
    countryName: 'United States',
    flag: '🇺🇸',
    currency: 'USD',
    currencySymbol: '$',
    exchange: 'NASDAQ',
    sector: 'Technology',
    subSector: 'Consumer Hardware Devices & Ecosystem Services',
    logo: 'https://logo.clearbit.com/apple.com',
    currentPrice: 234.50,
    changeDaily: -1.15,
    changePercent: -0.49,
    high52w: 237.23,
    low52w: 164.08,
    marketCap: '3.56 T',
    description: 'Global tech titan with an installed base of 2.2+ billion active devices (iPhone, Mac, iPad, Wearables) and a high-margin Services ecosystem (App Store, iCloud, Apple Pay, Subscriptions).' ,
    
    metrics: {
      peRatio: 34.5,
      forwardPe: 29.8,
      pegRatio: 2.85,
      dividendYield: '0.43%',
      revenueGrowthYoy: '+5.4%',
      netMargin: '26.3%',
      operatingMargin: '31.3%',
      roe: '147.2%',
      roce: '58.7%',
      debtToEquity: '1.45',
      freeCashFlow: '$108.8B',
      beta: 1.08,
      avgVolume: '48.1M'
    },

    aiAnalysis: {
      verdict: 'HOLD / NEUTRAL',
      verdictType: 'HOLD',
      confidenceScore: 72,
      targetPrice: 240.00,
      upsidePotential: '+2.3%',
      timeHorizon: 'Long Term',
      summary: 'Apple remains an exceptional cash-generation machine with an ultra-loyal consumer base. However, at prevailing valuation multiples (34x P/E) against mid-single-digit top-line revenue growth, current share prices already discount the initial benefits of the Apple Intelligence upgrade cycle. Prudent strategy favors holding without chasing aggressive new entries.',
      bullCase: [
        'Massive installed base of 2.2+ billion active devices primed for multi-year iPhone hardware upgrade cycles.',
        'High-margin Services segment compounds at double digits with gross margins exceeding 74%.',
        'Disciplined share repurchase program (> $100 billion annually) driving steady EPS expansion.',
        'Privacy-first AI architecture combining on-device silicon with secure Private Cloud Compute.'
      ],
      bearCase: [
        'Valuation multiple elevated relative to mid-single-digit baseline revenue growth.',
        'Intense competition and domestic market share pressure in mainland China from Huawei.',
        'Antitrust scrutiny from the US Department of Justice and enforcement of the EU Digital Markets Act.'
      ],
      aiPromptContext: 'Apple Intelligence upgrade dynamics and transatlantic regulatory scrutiny.'
    },

    etfs: [
      { ticker: 'SPY', name: 'SPDR S&P 500 ETF Trust', weight: '7.15%', category: 'Large Cap Blend', aum: '$580B' },
      { ticker: 'QQQ', name: 'Invesco QQQ Trust', weight: '8.80%', category: 'Large Cap Growth', aum: '$290B' },
      { ticker: 'XLK', name: 'Technology Select Sector SPDR', weight: '16.20%', category: 'Sector - Technology', aum: '$68B' },
      { ticker: 'VIG', name: 'Vanguard Dividend Appreciation ETF', weight: '4.30%', category: 'Dividend Growth', aum: '$82B' }
    ],

    documents: [
      {
        id: 'doc-aapl-1',
        title: 'SEC Form 10-K Anual (Apple Inc. FY2023/24)',
        type: '10-K / Annual',
        date: 'Novembro 2023',
        pages: '78 pages',
        fileSize: '3.4 MB',
        url: 'https://investor.apple.com',
        summary: 'Annual revenues of $383B, operating cash flow of $110.5B, and $77.5B returned to shareholders via share buybacks.'
      },
      {
        id: 'doc-aapl-2',
        title: 'SEC Form 10-Q (Q3 Quarterly Filing)',
        type: '10-Q / Quarterly',
        date: 'August 2024',
        pages: '36 pages',
        fileSize: '1.9 MB',
        url: 'https://investor.apple.com',
        summary: 'Record quarterly Services revenue reaching $24.2B (+14% YoY) with record active devices.'
      }
    ],

    news: [
      {
        id: 'news-aapl-1',
        title: 'Apple releases expanded Apple Intelligence developer beta features',
        source: 'The Wall Street Journal',
        time: 'Yesterday',
        sentiment: 'positive',
        summary: 'iOS software update introduces automated notification summaries, audio transcriptions, and priority notifications.'
      },
      {
        id: 'news-aapl-2',
        title: 'Smartphone market share in China stabilizes following targeted promotions',
        source: 'Reuters Tech',
        time: '3 days ago',
        sentiment: 'neutral',
        summary: 'Channel data indicates flagship Pro and Pro Max models continue leading premium segment demand.'
      }
    ],

    recentMilestones: [
      'Unveiled Apple Intelligence architecture integrating personal context AI models with OpenAI integration.',
      'Reached historic $100 billion annual revenue run-rate for the standalone Services division.',
      'Commercial launch of Apple Vision Pro spatial computing platform.'
    ],
    futurePlans: [
      'Phased multi-language rollout of Apple Intelligence features across European and Asian markets.',
      'Development of custom server-grade Apple Silicon processors tailored for secure datacenter inference.',
      'Advancing non-invasive health monitoring technologies across Apple Watch and AirPods sensor suites.'
    ]
  },

  {
    ticker: 'PETR4.SA',
    name: 'Petróleo Brasileiro S.A. - Petrobras',
    country: 'BR',
    countryName: 'Brazil',
    flag: '🇧🇷',
    currency: 'BRL',
    currencySymbol: 'R$',
    exchange: 'B3 (Brasil Bolsa Balcao)',
    sector: 'Energy & Utilities',
    subSector: 'Deepwater Pre-Salt Offshore Exploration & Production',
    logo: 'https://logo.clearbit.com/petrobras.com.br',
    currentPrice: 37.60,
    changeDaily: -0.42,
    changePercent: -1.10,
    high52w: 42.90,
    low52w: 32.10,
    marketCap: '488 B (R$)',
    description: 'Brazilian state-controlled energy giant with world-leading deepwater pre-salt extraction technologies and exceptionally low lifting costs per barrel.',
    
    metrics: {
      peRatio: 4.6,
      forwardPe: 4.2,
      pegRatio: 0.60,
      dividendYield: '14.80%',
      revenueGrowthYoy: '+3.1%',
      netMargin: '24.2%',
      operatingMargin: '38.5%',
      roe: '31.2%',
      roce: '24.6%',
      debtToEquity: '0.78',
      freeCashFlow: 'R$124B',
      beta: 0.98,
      avgVolume: '36.5M'
    },

    aiAnalysis: {
      verdict: 'BUY',
      verdictType: 'BUY',
      confidenceScore: 76,
      targetPrice: 46.00,
      upsidePotential: '+22.3%',
      timeHorizon: 'Short / Medium Term (Income Focus)',
      summary: 'For investors comfortable navigating state ownership risk, Petrobras generates one of the highest cash dividend yields globally. Pre-salt lifting costs remain ultra-competitive (<$6 per barrel), insulating operational cash flows even in low-oil-price environments.',
      bullCase: [
        'Exceptional double-digit dividend yield supported by a formal corporate shareholder distribution policy.',
        'Ultra-low pre-salt lifting costs ensuring robust profit margins even at $50/barrel Brent oil.',
        'Depressed valuation multiples: trailing P/E below 5x and EV/EBITDA at ~2.8x.',
        'Strong free cash flow generation boosted by deployment of new mega-FPSOs at Buzios and Mero.'
      ],
      bearCase: [
        'Government intervention risks regarding domestic wholesale fuel pricing and capital expenditure allocation.',
        'Potential CapEx diversion into lower-return domestic downstream refining and energy transition assets.',
        'Regulatory delays on environmental drilling licenses in the prospective Equatorial Margin basins.'
      ],
      aiPromptContext: 'Special dividend distribution policy and fuel pricing independence.'
    },

    etfs: [
      { ticker: 'EWZ', name: 'iShares MSCI Brazil ETF', weight: '12.80%', category: 'Brazilian Equity Index', aum: '$5.4B' },
      { ticker: 'EEM', name: 'iShares MSCI Emerging Markets ETF', weight: '1.45%', category: 'Emerging Markets', aum: '$18B' },
      { ticker: 'IXC', name: 'iShares Global Energy ETF', weight: '2.10%', category: 'Global Energy', aum: '$2.1B' },
      { ticker: 'ILF', name: 'iShares Latin America 40 ETF', weight: '15.60%', category: 'Latin America', aum: '$1.2B' }
    ],

    documents: [
      {
        id: 'doc-petr-1',
        title: 'Standardized Annual Financial Statements (CVM)',
        type: 'Annual Report / CVM',
        date: 'March 2024',
        pages: '180 pages',
        fileSize: '7.8 MB',
        url: 'https://www.investidorpetrobras.com.br',
        summary: 'Annual net income of R$124.6B, conservative net leverage, and detailed capital return disclosures.'
      },
      {
        id: 'doc-petr-2',
        title: '2024-2028 Strategic Investment Plan',
        type: 'Strategic Deck',
        date: '2024',
        pages: '65 slides',
        fileSize: '9.4 MB',
        url: 'https://www.investidorpetrobras.com.br',
        summary: '$102B five-year CapEx plan with 72% directed to high-return pre-salt E&P and debt ceiling of $65B.'
      }
    ],

    news: [
      {
        id: 'news-petr-1',
        title: 'Board of Directors approves R$13.5 billion dividend and interest on equity distribution',
        source: 'Valor Economico',
        time: '2 days ago',
        sentiment: 'positive',
        summary: 'Interim dividend distribution and capital return solidify Petrobras among Latin America\'s premier income vehicles.'
      },
      {
        id: 'news-petr-2',
        title: 'Petrobras deploys FPSO Marechal Duque de Caxias with subsea HISEP CO2 separation',
        source: 'PetroNoticias',
        time: '1 week ago',
        sentiment: 'positive',
        summary: 'Vessel produces 180,000 bpd with subsea high-pressure CO2 separation directly reinjected into seabed.'
      }
    ],

    recentMilestones: [
      'Average pre-salt production surpassed 2.3 million barrels of oil equivalent per day.',
      'Gross debt reduced to healthiest leverage ratios observed in over a decade.',
      'Successfully implemented routine flaring reduction initiatives toward zero routine flaring.'
    ],
    futurePlans: [
      'Commissioning of 11 new mega-FPSO platforms through 2028 across Buzios and Santos Basin.',
      'Securing environmental permits for deepwater exploratory drilling in the Equatorial Margin.',
      'Decarbonizing offshore operations and scaling renewable-content R5 co-processed diesel.'
    ]
  },

  {
    ticker: 'MC.PA',
    name: 'LVMH Moët Hennessy Louis Vuitton',
    country: 'FR',
    countryName: 'France',
    flag: '🇫🇷',
    currency: 'EUR',
    currencySymbol: '€',
    exchange: 'Euronext Paris',
    sector: 'Luxury Goods',
    subSector: 'Haute Couture, Luxury Leather Goods & High Jewelry',
    logo: 'https://logo.clearbit.com/lvmh.com',
    currentPrice: 624.00,
    changeDaily: -8.40,
    changePercent: -1.33,
    high52w: 885.00,
    low52w: 590.00,
    marketCap: '312 B',
    description: 'World\'s premier luxury conglomerate controlled by Bernard Arnault, spanning 75 iconic Maisons including Louis Vuitton, Christian Dior, Tiffany & Co., Bulgari, Moët & Chandon, and Sephora.',
    
    metrics: {
      peRatio: 21.2,
      forwardPe: 19.5,
      pegRatio: 1.85,
      dividendYield: '2.08%',
      revenueGrowthYoy: '+1.2%',
      netMargin: '17.8%',
      operatingMargin: '26.1%',
      roe: '23.8%',
      roce: '18.9%',
      debtToEquity: '0.48',
      freeCashFlow: '€8.1B',
      beta: 1.05,
      avgVolume: '720K'
    },

    aiAnalysis: {
      verdict: 'BUY',
      verdictType: 'BUY',
      confidenceScore: 81,
      targetPrice: 750.00,
      upsidePotential: '+20.2%',
      timeHorizon: 'Long Term',
      summary: 'The >25% share price pullback triggered by cyclical headwinds in Chinese consumer demand offers a generational entry into one of history\'s most durable franchises. Flagship Maisons Louis Vuitton and Christian Dior hold enduring pricing power across all inflationary cycles.',
      bullCase: [
        'Proven historical pricing power consistently compounding above annual consumer inflation.',
        'Unmatched portfolio of heritage Maisons with cultural moats competitors cannot replicate.',
        'Attractive valuation relative to 5-year averages (P/E compressed from 30x to ~21x).',
        'Resilient retail sales expansion across Japan, Middle East, and North America.'
      ],
      bearCase: [
        'Consumer sentiment in mainland China and Hong Kong remains cautious amidst property sector adjustments.',
        'Post-pandemic wallet share normalization shifting spending toward experiential travel.',
        'Delayed inventory destocking across US wholesale cognac and champagne channels.'
      ],
      aiPromptContext: 'Tourist spending recovery and Asian consumer stimulus dynamics.'
    },

    etfs: [
      { ticker: 'FEZ', name: 'SPDR EURO STOXX 50 ETF', weight: '6.40%', category: 'Eurozone Blue Chips', aum: '$4.1B' },
      { ticker: 'CAC', name: 'Amundi CAC 40 UCITS ETF', weight: '10.50%', category: 'French Equity Index', aum: '€3.8B' },
      { ticker: 'LUXE', name: 'VanEck Morningstar Luxury Goods ETF', weight: '9.20%', category: 'Luxury Goods', aum: '$450M' },
      { ticker: 'EZU', name: 'iShares MSCI Eurozone ETF', weight: '5.20%', category: 'Continental Europe', aum: '$9.2B' }
    ],

    documents: [
      {
        id: 'doc-lvmh-1',
        title: 'Document d’Enregistrement Universel 2023 (AMF France)',
        type: 'Annual Report / AMF',
        date: 'April 2024',
        pages: '412 pages',
        fileSize: '16.5 MB',
        url: 'https://www.lvmh.com/investors',
        summary: 'Consolidated revenue of €86.2B and recurring operating profit of €22.8B. Balance sheet supported by €62B in total equity.'
      },
      {
        id: 'doc-lvmh-2',
        title: 'H1 2024 Semi-Annual Financial Report',
        type: 'Semi-Annual Report',
        date: 'July 2024',
        pages: '58 pages',
        fileSize: '3.1 MB',
        url: 'https://www.lvmh.com/investors',
        summary: 'Divisional performance: Fashion & Leather Goods delivering 38.8% operating margin and strong growth at Sephora.'
      }
    ],

    news: [
      {
        id: 'news-lvmh-1',
        title: 'Chinese government introduces targeted monetary stimulus to bolster consumer spending',
        source: 'Bloomberg Markets',
        time: '2 days ago',
        sentiment: 'positive',
        summary: 'People\'s Bank of China liquidity and reserve requirement cuts spur positive sentiment across European luxury equities.'
      },
      {
        id: 'news-lvmh-2',
        title: 'LVMH serves as premium creative partner for Paris 2024 Olympic & Paralympic Games',
        source: 'Le Figaro',
        time: '2 weeks ago',
        sentiment: 'positive',
        summary: 'Medals designed by Chaumet and Louis Vuitton bespoke trunk presentations generate record brand equity worldwide.'
      }
    ],

    recentMilestones: [
      'Successful revitalization and global repositioning of Tiffany & Co. jewelry collections.',
      'Unveiled architectural milestones, including "The Landmark" flagship store on 5th Avenue in New York.',
      'Expanded Fashion & Leather Goods operating margins to industry-leading levels.'
    ],
    futurePlans: [
      'Expanding ultra-luxury hospitality footprint across Cheval Blanc and Belmond hotel portfolios.',
      'Expanding directly operated retail boutique footprints across high-growth Gulf and Indian markets.',
      'Structured generational succession planning integrating Bernard Arnault\'s five children into executive Maison leadership.'
    ]
  },

  {
    ticker: 'TSLA',
    name: 'Tesla, Inc.',
    country: 'US',
    countryName: 'United States',
    flag: '🇺🇸',
    currency: 'USD',
    currencySymbol: '$',
    exchange: 'NASDAQ',
    sector: 'Automotive & Mobility',
    subSector: 'Electric Vehicles, Energy Storage Systems & Humanoid Robotics',
    logo: 'https://logo.clearbit.com/tesla.com',
    currentPrice: 218.80,
    changeDaily: -5.40,
    changePercent: -2.41,
    high52w: 271.00,
    low52w: 138.80,
    marketCap: '698 B',
    description: 'Pioneer in intelligent electric vehicles, global Supercharger networks, utility-scale battery storage (Megapack), and autonomous driving software (Full Self-Driving / Cybercab).' ,
    
    metrics: {
      peRatio: 62.4,
      forwardPe: 52.1,
      pegRatio: 4.10,
      dividendYield: '0.00%',
      revenueGrowthYoy: '+2.3%',
      netMargin: '13.2%',
      operatingMargin: '7.8%',
      roe: '21.5%',
      roce: '14.2%',
      debtToEquity: '0.11',
      freeCashFlow: '$3.8B',
      beta: 2.34,
      avgVolume: '62.0M'
    },

    aiAnalysis: {
      verdict: 'HOLD / NEUTRAL',
      verdictType: 'HOLD',
      confidenceScore: 68,
      targetPrice: 210.00,
      upsidePotential: '-4.0%',
      timeHorizon: 'Short / Medium Term',
      summary: 'The Tesla Energy storage segment (Megapack) is compounding at triple digits, but automotive gross margins remain compressed by intense EV pricing competition from Chinese automakers (BYD). Long-term terminal value hinges upon scalable autonomous robotaxi commercialization, creating a polarizing near-term risk/reward profile.',
      bullCase: [
        'Explosive growth (>100% YoY) in utility-scale Megapack energy storage systems with expanding gross margins.',
        'Pristine balance sheet with over $30 billion in cash reserves and negligible long-term debt.',
        'Unmatched real-world video training data driving end-to-end neural network autonomy (FSD v12).' ,
        'Transformational long-term optionality through the Optimus humanoid robot and Cybercab platform.'
      ],
      bearCase: [
        'Automotive operating margins face sustained compression (contracted from 16% to ~7%).',
        'High valuation multiple (P/E > 60x) compared with legacy automotive OEMs or broad tech peers.',
        'Intense market competition in China and Europe from low-cost native electric vehicle brands.'
      ],
      aiPromptContext: 'Cybercab regulatory pathway and Megapack utility storage expansion.'
    },

    etfs: [
      { ticker: 'QQQ', name: 'Invesco QQQ Trust', weight: '3.10%', category: 'Nasdaq-100', aum: '$290B' },
      { ticker: 'SPY', name: 'SPDR S&P 500 ETF Trust', weight: '1.45%', category: 'S&P 500', aum: '$580B' },
      { ticker: 'ARKK', name: 'ARK Innovation ETF', weight: '11.80%', category: 'Disruptive Innovation', aum: '$6.5B' },
      { ticker: 'XLY', name: 'Consumer Discretionary Select Sector SPDR', weight: '12.40%', category: 'Consumer Discretionary', aum: '$21B' }
    ],

    documents: [
      {
        id: 'doc-tsla-1',
        title: 'SEC Form 10-K Anual (Tesla FY2023)',
        type: '10-K / Annual',
        date: 'January 2024',
        pages: '112 pages',
        fileSize: '4.2 MB',
        url: 'https://ir.tesla.com',
        summary: 'Record delivery of 1.81 million electric vehicles and consolidated fiscal revenue of $96.8B.'
      },
      {
        id: 'doc-tsla-2',
        title: 'Tesla "We, Robot" Event Presentation Deck',
        type: 'Product & Vision Deck',
        date: 'October 2024',
        pages: '45 slides',
        fileSize: '22.0 MB',
        url: 'https://ir.tesla.com',
        summary: 'Demonstration of dedicated 2-seater autonomous Cybercab without steering wheel or pedals and Optimus Gen 2 dexterity updates.'
      }
    ],

    news: [
      {
        id: 'news-tsla-1',
        title: 'Tesla Energy deploys record Megapack utility battery storage capacity in quarter',
        source: 'Electrek / Bloomberg',
        time: '1 day ago',
        sentiment: 'positive',
        summary: 'Lathrop Megafactory reaches record annualized production run-rate, supplying utility grid projects globally.'
      },
      {
        id: 'news-tsla-2',
        title: 'China EV pricing competition continues pressuring average selling prices across auto sector',
        source: 'CNBC Auto',
        time: '3 days ago',
        sentiment: 'negative',
        summary: 'Subsidized zero-interest consumer financing maintains delivery volumes while compressing quarterly automotive gross margins.'
      }
    ],

    recentMilestones: [
      'Surpassed 7 million cumulative electric vehicles produced globally.',
      'Transitioned Full Self-Driving architecture to end-to-end neural networks trained directly on video.',
      'Widespread industry adoption of North American Charging Standard (NACS) by competing automakers.'
    ],
    futurePlans: [
      'Targeting volume manufacturing of dedicated autonomous Cybercab by 2026/2027 at sub-$30,000 price point.',
      'Constructing dedicated Shanghai Energy Storage Gigafactory to manufacture Megapack units.',
      'Deploying Optimus bipedal robots for autonomous component handling within Tesla Gigafactory assembly lines.'
    ]
  }
];
