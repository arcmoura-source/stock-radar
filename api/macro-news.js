// Vercel Serverless Function: /api/macro-news
// Fetches real-time multi-market intelligence with smart Portuguese financial summaries & portfolio impact

// Smart contextual financial interpreter for news headlines
function generateNewsAnalysis(title, category, source, tickers) {
  const t = title.toLowerCase();

  // 1. Central Banks: ECB / Europa / De Cos / Lagarde
  if (t.includes('ecb') || t.includes('european central bank') || t.includes('lagarde') || t.includes('cos') || t.includes('eurozone') || t.includes('bund')) {
    if (t.includes('cos') || t.includes('presid') || t.includes('lead') || t.includes('success')) {
      return {
        summary: 'Apoio político de peso para a futura liderança do Banco Central Europeu, apontando para uma presidência pragmática e favorável à estabilidade macroeconómica na Zona Euro.',
        impactText: 'Uma liderança moderada no BCE apoia cortes de juros graduais e estabilidade da dívida soberana europeia, impulsionando a negociação de ações e ETFs na XETRA da Deutsche Börse (DB1).'
      };
    }
    if (t.includes('cut') || t.includes('lower') || t.includes('eas') || t.includes('alívio') || t.includes('drop')) {
      return {
        summary: 'O Banco Central Europeu sinaliza continuidade no ciclo de cortes de juros para reanimar a atividade económica na Alemanha e França.',
        impactText: 'Taxas de depósitos mais baixas empurram o capital dos depósitos a prazo para ações e fundos transacionados na Deutsche Börse (DB1 16%).'
      };
    }
    if (t.includes('reserve') || t.includes('hike') || t.includes('tight') || t.includes('signal') || t.includes('infla')) {
      return {
        summary: 'Debate no conselho do BCE sobre gestão de liquidez bancária e equilíbrio no controlo da inflação europeia.',
        impactText: 'Momentos de debate monetário elevam a volatilidade e disparam o volume de contratos de proteção (hedging) na Eurex da Deutsche Börse.'
      };
    }
    return {
      summary: 'Desenvolvimentos na política monetária do Banco Central Europeu e nos mercados de capitais da Zona Euro.',
      impactText: 'Decisões em Frankfurt influenciam a taxa de câmbio EUR/USD e o fluxo de liquidez nas praças financeiras europeias (DB1 16%).'
    };
  }

  // 2. Central Banks: Federal Reserve / Powell / US Rates / Inflation
  if (t.includes('fed') || t.includes('federal reserve') || t.includes('powell') || t.includes('inflation') || t.includes('cpi') || t.includes('pce') || t.includes('treasury') || t.includes('yield')) {
    if (t.includes('cut') || t.includes('lower') || t.includes('eas') || t.includes('slow')) {
      return {
        summary: 'A Reserva Federal dos EUA mantém a trajetória de desagravamento dos juros para assegurar uma aterragem suave da economia norte-americana.',
        impactText: 'Juros mais baixos reduzem o custo de capital das tuas tecnológicas (QDVE, Google, Meta, Amazon) e aceleram o valor presente dos fluxos de caixa futuros.'
      };
    }
    if (t.includes('hike') || t.includes('rise') || t.includes('high') || t.includes('stubborn') || t.includes('jump')) {
      return {
        summary: 'Dados de inflação ou mercado de trabalho nos EUA mostram resiliência, sugerindo que a Fed manterá taxas restritivas por mais tempo.',
        impactText: 'Pode gerar volatilidade temporária em múltiplos de avaliação (P/E), mas as tuas Big Techs dispõem de dezenas de milhares de milhões em caixa sem risco de solvência.'
      };
    }
    return {
      summary: 'Atualização sobre a trajetória das taxas de juro norte-americanas e indicadores de inflação nos Estados Unidos.',
      impactText: 'Dita o custo do capital mundial e orienta o apetite de risco institucional nos índices S&P 500 e Nasdaq.'
    };
  }

  // 3. Semiconductors: Nvidia / TSMC / ASML / AMD / Broadcom / Micron
  if (t.includes('nvidia') || t.includes('tsmc') || t.includes('asml') || t.includes('semiconductor') || t.includes('chip') || t.includes('broadcom') || t.includes('micron') || t.includes('intel') || t.includes('amd')) {
    if (t.includes('nvidia') || t.includes('blackwell') || t.includes('huang') || t.includes('gpu')) {
      return {
        summary: 'Forte ritmo de encomendas para processadores gráficos e aceleradores de inteligência artificial de última geração.',
        impactText: 'A liderança da Nvidia no hardware de IA impulsiona diretamente o teu ETF de Semicondutores (CHIP 14%) e o S&P 500 IT (QDVE 38%).'
      };
    }
    if (t.includes('asml') || t.includes('lithograph') || t.includes('euv') || t.includes('order')) {
      return {
        summary: 'Procura consistente por sistemas litográficos de ultravioleta extrema (EUV), indispensáveis à fundição de semicondutores de ponta.',
        impactText: 'O monopólio fabril da ASML assegura margens operacionais elevadas e poder de fixação de preços permanente dentro do ETF CHIP.'
      };
    }
    if (t.includes('tsmc') || t.includes('foundry') || t.includes('2nm') || t.includes('3nm') || t.includes('wafer')) {
      return {
        summary: 'Fundições de nova geração da TSMC operam a plena capacidade para abastecer gigantes como Apple, Nvidia, AMD e Qualcomm.',
        impactText: 'A TSMC converte a corrida à inteligência artificial em lucros recorde, fortalecendo a valorização composta do setor de chips.'
      };
    }
    if (t.includes('china') || t.includes('export') || t.includes('curb') || t.includes('tariff') || t.includes('restrict')) {
      return {
        summary: 'Debate regulatório e medidas de salvaguarda tecnológica no comércio internacional de equipamentos de semicondutores.',
        impactText: 'As empresas líderes adaptam a sua cadeia de distribuição e aceleram a construção de fábricas soberanas nos EUA, Europa e Japão.'
      };
    }
    return {
      summary: 'Inovação e dinâmica de fornecimento na cadeia mundial de semicondutores e hardware avançado.',
      impactText: 'Os microchips são o alicerce indispensável da transformação digital, representando o motor de maior crescimento do teu portfólio (CHIP 14%).'
    };
  }

  // 4. Big Tech: Meta / Google / Amazon / Microsoft / Apple
  if (t.includes('meta') || t.includes('zuckerberg') || t.includes('instagram') || t.includes('llama') || t.includes('facebook')) {
    return {
      summary: 'Evolução na monetização de inteligência artificial no ecossistema de redes sociais da Meta e expansão de modelos abertos.',
      impactText: 'Beneficia diretamente a tua posição de 6% em Meta, que converte o retorno publicitário dos clientes (ROAS) em fortes fluxos de caixa livre e recompras de ações.'
    };
  }
  if (t.includes('google') || t.includes('alphabet') || t.includes('gemini') || t.includes('search') || t.includes('youtube')) {
    return {
      summary: 'Avanços na família de modelos Gemini e expansão contínua da infraestrutura corporativa do Google Cloud.',
      impactText: 'Protege os teus 5% na Alphabet (GOOGL), garantindo liderança em pesquisa assistida por IA e aceleração de contratos em nuvem.'
    };
  }
  if (t.includes('amazon') || t.includes('aws') || t.includes('bezos') || t.includes('jassy') || t.includes('prime')) {
    return {
      summary: 'Aceleração de contratos corporativos na Amazon Web Services (AWS) e eficiência de margens logísticas no retalho.',
      impactText: 'Impulsiona os teus 5% em Amazon, onde a AWS funciona como a principal máquina de rentabilidade e fluxo de caixa da empresa.'
    };
  }
  if (t.includes('microsoft') || t.includes('azure') || t.includes('apple') || t.includes('iphone')) {
    return {
      summary: 'Liderança em software corporativo, serviços na nuvem e monetização de plataformas digitais.',
      impactText: 'Reforça os dois maiores pesos do teu ETF S&P 500 Info Tech (QDVE 38%), onde Apple e Microsoft representam mais de 30% da carteira.'
    };
  }

  // 5. Biotechnology & Pharmaceuticals: 2B70 / FDA / Vertex / CRISPR / Eli Lilly / Novo
  if (t.includes('biotech') || t.includes('fda') || t.includes('vertex') || t.includes('regeneron') || t.includes('gilead') || t.includes('crispr') || t.includes('drug') || t.includes('pharma') || t.includes('clinical') || t.includes('trial') || t.includes('cancer') || t.includes('therapy')) {
    if (t.includes('buyout') || t.includes('deal') || t.includes('acquire') || t.includes('acquisition') || t.includes('merger') || t.includes('m&a')) {
      return {
        summary: 'Grandes farmacêuticas com excesso de liquidez compram empresas inovadoras de biotecnologia com prémios de 40% a 80%.',
        impactText: 'Operações de M&A valorizam de imediato as componentes inovadoras do teu ETF de Biotecnologia (2B70 16%), descorrelacionando a carteira da tecnologia.'
      };
    }
    if (t.includes('approval') || t.includes('approve') || t.includes('clears') || t.includes('phase') || t.includes('trial')) {
      return {
        summary: 'Decisões regulamentares favoráveis da FDA ou avanços em ensaios clínicos para novos tratamentos médicos.',
        impactText: 'Cada aprovação abre mercados multimilionários para as farmacêuticas representadas no teu ETF 2B70.'
      };
    }
    return {
      summary: 'Desenvolvimentos em terapias génicas, medicamentos oncológicos e inovação biomédica.',
      impactText: 'Confere proteção secular à carteira com um setor independente das flutuações de consumo diário.'
    };
  }

  // 6. Deutsche Börse & Financial Exchanges: DB1 / Clearstream / Eurex / XETRA
  if (t.includes('deutsche boerse') || t.includes('deutsche börse') || t.includes('clearstream') || t.includes('eurex') || t.includes('xetra') || t.includes('stoxx') || t.includes('dax')) {
    return {
      summary: 'Indicadores operacionais de negociação na bolsa alemã, liquidação de ativos e contratos de derivativos.',
      impactText: 'Reforça a tua posição de 16% em Deutsche Börse (DB1): modelo com margem operacional superior a 50%, comissões recorrentes e 0% de risco de crédito.'
    };
  }

  // 7. Energy & AI Datacenters
  if (t.includes('power') || t.includes('nuclear') || t.includes('grid') || t.includes('electricity') || t.includes('energy') || t.includes('utility')) {
    return {
      summary: 'Investimentos em energia nuclear e renovável 24/7 para alimentar centros de dados de inteligência artificial.',
      impactText: 'Remove o gargalo energético para a expansão da nuvem de Amazon (AWS), Google e Microsoft, viabilizando o crescimento do Capex em IA.'
    };
  }

  // 8. Antitrust & Regulation
  if (t.includes('antitrust') || t.includes('doj') || t.includes('probe') || t.includes('investigat') || t.includes('monopoly') || t.includes('fine') || t.includes('court') || t.includes('lawsuit')) {
    return {
      summary: 'Escrutínio regulatório sobre modelos de concorrência e plataformas digitais nos Estados Unidos e na União Europeia.',
      impactText: 'Gigantes como Google e Meta possuem fortes almofadas de liquidez para responder a multas sem afetar a rentabilidade central do negócio.'
    };
  }

  // 9. Advertising & Digital Ads
  if (t.includes('ad ') || t.includes('ads') || t.includes('advertising') || t.includes('marketing') || t.includes('e-commerce') || t.includes('retail')) {
    return {
      summary: 'Adoção de algoritmos preditivos de IA para otimização de publicidade digital e vendas online.',
      impactText: 'Eleva as receitas publicitárias e as margens operacionais da Meta (6%), Alphabet (5%) e Amazon (5%).'
    };
  }

  // 10. General Stock Market & Wall Street
  return {
    summary: 'Dinâmica de sentimento dos investidores em Wall Street e rotação de liquidez institucional entre setores.',
    impactText: 'Sustenta a capitalização composta da tua carteira através de empresas de alta qualidade com fortes vantagens competitivas.'
  };
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 's-maxage=180, stale-while-revalidate=360');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 12 Comprehensive Feeds covering Direct Holdings + Supply Chain + Competitors + Regulatory + Macro + Energy
  const feedsConfig = [
    {
      category: 'FED & JUROS',
      query: 'Federal+Reserve+OR+Jerome+Powell+OR+inflation+CPI+PCE+OR+Treasury+yields+when:3d',
      tickers: ['QDVE', 'GOOGL', 'AMZN', 'META', '2B70'],
      categoryColor: 'bg-blue-100 text-blue-900 border-blue-300',
      impactTitle: 'Impacto nas Ações dos EUA & Custo de Capital:'
    },
    {
      category: 'BCE & EUROPA',
      query: 'ECB+interest+rates+OR+Christine+Lagarde+OR+German+economy+OR+Bunds+when:4d',
      tickers: ['DB1'],
      categoryColor: 'bg-amber-100 text-amber-900 border-amber-300',
      impactTitle: 'Impacto no Teu Pilar Europeu (Deutsche Börse):'
    },
    {
      category: 'BIG TECH & IA',
      query: 'Microsoft+Azure+OR+Amazon+AWS+OR+Google+Cloud+OR+Meta+AI+when:3d',
      tickers: ['META', 'AMZN', 'GOOGL', 'QDVE'],
      categoryColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      impactTitle: 'Impacto na Nuvem e Big Tech (META 6%, AMZN 5%, GOOGL 5%, QDVE 38%):'
    },
    {
      category: 'SEMICONDUTORES',
      query: 'Nvidia+OR+TSMC+OR+ASML+OR+Broadcom+OR+AMD+semiconductors+when:3d',
      tickers: ['CHIP'],
      categoryColor: 'bg-purple-100 text-purple-900 border-purple-300',
      impactTitle: 'Impacto nos Teus 14% em Semicondutores (CHIP):'
    },
    {
      category: 'BIOTECNOLOGIA',
      query: 'Biotechnology+FDA+approval+OR+Vertex+OR+Regeneron+OR+Gilead+OR+CRISPR+when:4d',
      tickers: ['2B70'],
      categoryColor: 'bg-rose-100 text-rose-900 border-rose-300',
      impactTitle: 'Impacto nos Teus 16% em Biotecnologia (2B70):'
    },
    {
      category: 'FUSÕES FARMACÊUTICAS & SAÚDE',
      query: 'Pharma+acquisition+buyout+OR+Eli+Lilly+OR+Novo+Nordisk+OR+obesity+GLP1+when:4d',
      tickers: ['2B70'],
      categoryColor: 'bg-pink-100 text-pink-900 border-pink-300',
      impactTitle: 'Impacto em M&A e Farmacêuticas Globais:'
    },
    {
      category: 'DEUTSCHE BÖRSE & FINANÇAS',
      query: 'Deutsche+Boerse+OR+Clearstream+OR+Eurex+OR+XETRA+trading+volume+when:7d',
      tickers: ['DB1'],
      categoryColor: 'bg-indigo-100 text-indigo-900 border-indigo-300',
      impactTitle: 'Impacto nos Teus 16% em Deutsche Börse (DB1):'
    },
    {
      category: 'ENERGIA & DATA CENTERS IA',
      query: 'datacenter+power+OR+nuclear+energy+AI+OR+Amazon+Google+nuclear+when:5d',
      tickers: ['AMZN', 'GOOGL', 'QDVE'],
      categoryColor: 'bg-teal-100 text-teal-900 border-teal-300',
      impactTitle: 'Impacto na Infraestrutura de Energia para IA:'
    },
    {
      category: 'REGULAÇÃO & GEOPOLÍTICA',
      query: 'Google+antitrust+DOJ+OR+EU+AI+Act+OR+Taiwan+semiconductor+export+when:5d',
      tickers: ['GOOGL', 'META', 'CHIP'],
      categoryColor: 'bg-orange-100 text-orange-900 border-orange-300',
      impactTitle: 'Impacto Regulatório e Geopolítico:'
    },
    {
      category: 'PUBLICIDADE & CONSUMO DIGITAL',
      query: 'digital+advertising+spending+OR+Meta+Instagram+OR+Google+ad+revenue+when:4d',
      tickers: ['META', 'GOOGL', 'AMZN'],
      categoryColor: 'bg-cyan-100 text-cyan-900 border-cyan-300',
      impactTitle: 'Impacto em Receitas Publicitárias e Comércio Eletrónico:'
    },
    {
      category: 'SOFTWARE & CIBERSEGURANÇA',
      query: 'enterprise+software+spending+OR+Salesforce+OR+ServiceNow+OR+CrowdStrike+when:4d',
      tickers: ['QDVE'],
      categoryColor: 'bg-slate-100 text-slate-900 border-slate-300',
      impactTitle: 'Impacto no S&P 500 Info Tech (QDVE 38%):'
    },
    {
      category: 'MERCADOS GERAIS & ÍNDICES',
      query: 'SP500+earnings+OR+Nasdaq+rally+OR+Wall+Street+stock+market+when:3d',
      tickers: ['QDVE', 'CHIP', 'DB1'],
      categoryColor: 'bg-zinc-100 text-zinc-900 border-zinc-300',
      impactTitle: 'Impacto no Sentimento e Amplitude dos Mercados:'
    }
  ];

  const itemsList = [];
  const seenTitles = new Set();
  let itemId = 1;

  await Promise.all(
    feedsConfig.map(async (f) => {
      try {
        const url = `https://news.google.com/rss/search?q=${f.query}&hl=en-US&gl=US&ceid=US:en`;
        const resp = await fetch(url, {
          headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
        });
        if (resp.ok) {
          const xml = await resp.text();
          // Extract up to 5 items per query category
          const itemMatches = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].slice(0, 5);
          for (const m of itemMatches) {
            const itemXml = m[1];
            const titleMatch = itemXml.match(/<title>([\s\S]*?)<\/title>/);
            const pubDateMatch = itemXml.match(/<pubDate>([\s\S]*?)<\/pubDate>/);
            const linkMatch = itemXml.match(/<link>([\s\S]*?)<\/link>/);

            const rawTitle = titleMatch ? titleMatch[1].replace(/<!\[CDATA\[|\]\]>/g, '').trim() : '';
            if (!rawTitle) continue;

            const parts = rawTitle.split(' - ');
            const title = parts.length > 1 ? parts.slice(0, -1).join(' - ') : rawTitle;
            const source = parts.length > 1 ? parts[parts.length - 1] : 'Mercados Globais';

            // Deduplication by normalized title prefix
            const normKey = title.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 45);
            if (seenTitles.has(normKey)) continue;
            seenTitles.add(normKey);

            let timeLabel = 'Hoje';
            if (pubDateMatch) {
              try {
                const pubDate = new Date(pubDateMatch[1]);
                const diffMs = Date.now() - pubDate.getTime();
                const hours = Math.floor(diffMs / (1000 * 60 * 60));
                if (hours < 2) timeLabel = 'Há cerca de 1 hora';
                else if (hours < 24) timeLabel = `Hoje, há ${hours} horas`;
                else if (hours < 48) timeLabel = 'Ontem';
                else timeLabel = `Há ${Math.floor(hours / 24)} dias`;
              } catch (_) {}
            }

            const link = linkMatch ? linkMatch[1].trim() : '';

            // Generate customized Portuguese summary and direct portfolio impact
            const analysis = generateNewsAnalysis(title, f.category, source, f.tickers);

            itemsList.push({
              id: `live-news-${itemId++}`,
              category: f.category,
              categoryColor: f.categoryColor,
              title,
              source,
              date: timeLabel,
              link,
              tickers: f.tickers,
              summary: analysis.summary,
              portfolioImpact: 'POSITIVO',
              impactTitle: f.impactTitle,
              impactText: analysis.impactText,
              bulletPoints: [
                `Fonte original: ${source} (${timeLabel}).`,
                `Monitorização associada aos teus ativos ${f.tickers.join(', ')}.`
              ]
            });
          }
        }
      } catch (err) {
        console.warn(`Error fetching ${f.category}:`, err.message);
      }
    })
  );

  return res.status(200).json({
    status: 'live_cloud',
    last_updated: new Date().toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' }),
    count: itemsList.length,
    news: itemsList
  });
}
