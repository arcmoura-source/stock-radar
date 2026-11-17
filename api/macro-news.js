// Vercel Serverless Function: /api/macro-news
// Fetches real-time multi-market intelligence, related supply chain, macro, and sector news
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
      impactTitle: 'Impacto nas Ações dos EUA & Custo de Capital:',
      impactText: 'Decisões da Fed sobre taxas e rendimentos das obrigações do Tesouro definem a taxa de desconto (WACC) e múltiplos de avaliação de todo o setor tecnológico e biotecnológico.'
    },
    {
      category: 'BCE & EUROPA',
      query: 'ECB+interest+rates+OR+Christine+Lagarde+OR+German+economy+OR+Bunds+when:4d',
      tickers: ['DB1'],
      categoryColor: 'bg-amber-100 text-amber-900 border-amber-300',
      impactTitle: 'Impacto no Teu Pilar Europeu (Deutsche Börse):',
      impactText: 'Cortes do BCE direcionam fluxos de liquidez e poupança bancária para a bolsa XETRA e aumentam as transações de proteção (hedging) na Eurex da Deutsche Börse (DB1).'
    },
    {
      category: 'BIG TECH & IA',
      query: 'Microsoft+Azure+OR+Amazon+AWS+OR+Google+Cloud+OR+Meta+AI+when:3d',
      tickers: ['META', 'AMZN', 'GOOGL', 'QDVE'],
      categoryColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      impactTitle: 'Impacto na Nuvem e Big Tech (META 6%, AMZN 5%, GOOGL 5%, QDVE 38%):',
      impactText: 'A aceleração de receitas na cloud corporativa e a monetização de modelos fundacionais de IA consolidam margens operacionais e crescimento contínuo de fluxo de caixa livre.'
    },
    {
      category: 'SEMICONDUTORES',
      query: 'Nvidia+OR+TSMC+OR+ASML+OR+Broadcom+OR+AMD+semiconductors+when:3d',
      tickers: ['CHIP'],
      categoryColor: 'bg-purple-100 text-purple-900 border-purple-300',
      impactTitle: 'Impacto nos Teus 14% em Semicondutores (CHIP):',
      impactText: 'A corrida mundial por chips de 2nm/3nm e ferramentas litográficas EUV da ASML sustenta o monopólio fabril da TSMC e a liderança de processadores de IA.'
    },
    {
      category: 'BIOTECNOLOGIA',
      query: 'Biotechnology+FDA+approval+OR+Vertex+OR+Regeneron+OR+Gilead+OR+CRISPR+when:4d',
      tickers: ['2B70'],
      categoryColor: 'bg-rose-100 text-rose-900 border-rose-300',
      impactTitle: 'Impacto nos Teus 16% em Biotecnologia (2B70):',
      impactText: 'Novas aprovações aceleradas da FDA e avanços em terapias genéticas valorizam o cabaz de biotecnologia inovadora sem correlação com o ciclo de consumo tradicional.'
    },
    {
      category: 'FUSÕES FARMACÊUTICAS & SAÚDE',
      query: 'Pharma+acquisition+buyout+OR+Eli+Lilly+OR+Novo+Nordisk+OR+obesity+GLP1+when:4d',
      tickers: ['2B70'],
      categoryColor: 'bg-pink-100 text-pink-900 border-pink-300',
      impactTitle: 'Impacto em M&A e Farmacêuticas Globais:',
      impactText: 'Grandes farmacêuticas com cofres cheios compram biotechs com prémios de 50% a 100% para repor patentes em expiração, impulsionando os componentes do índice 2B70.'
    },
    {
      category: 'DEUTSCHE BÖRSE & FINANÇAS',
      query: 'Deutsche+Boerse+OR+Clearstream+OR+Eurex+OR+XETRA+trading+volume+when:7d',
      tickers: ['DB1'],
      categoryColor: 'bg-indigo-100 text-indigo-900 border-indigo-300',
      impactTitle: 'Impacto nos Teus 16% em Deutsche Börse (DB1):',
      impactText: 'Monopólio de compensação da Clearstream, negociação na Xetra e índices STOXX mantêm margens operacionais acima de 50% sem qualquer risco de crédito bancário.'
    },
    {
      category: 'ENERGIA & DATA CENTERS IA',
      query: 'datacenter+power+OR+nuclear+energy+AI+OR+Amazon+Google+nuclear+when:5d',
      tickers: ['AMZN', 'GOOGL', 'QDVE'],
      categoryColor: 'bg-teal-100 text-teal-900 border-teal-300',
      impactTitle: 'Impacto na Infraestrutura de Energia para IA:',
      impactText: 'Amazon, Google e Microsoft estão a fechar acordos diretos de energia nuclear e renovável para alimentar centros de dados de IA sem restrições de rede elétrica.'
    },
    {
      category: 'REGULAÇÃO & GEOPOLÍTICA',
      query: 'Google+antitrust+DOJ+OR+EU+AI+Act+OR+Taiwan+semiconductor+export+when:5d',
      tickers: ['GOOGL', 'META', 'CHIP'],
      categoryColor: 'bg-orange-100 text-orange-900 border-orange-300',
      impactTitle: 'Impacto Regulatório e Geopolítico:',
      impactText: 'Acompanhamento de processos antitrust nos EUA/UE e equilíbrio geopolítico no Estreito de Taiwan, vitais para o fornecimento mundial de chips e plataformas digitais.'
    },
    {
      category: 'PUBLICIDADE & CONSUMO DIGITAL',
      query: 'digital+advertising+spending+OR+Meta+Instagram+OR+Google+ad+revenue+when:4d',
      tickers: ['META', 'GOOGL', 'AMZN'],
      categoryColor: 'bg-cyan-100 text-cyan-900 border-cyan-300',
      impactTitle: 'Impacto em Receitas Publicitárias e Comércio Eletrónico:',
      impactText: 'A IA preditiva na segmentação de anúncios da Meta e Alphabet aumenta o retorno sobre investimento (ROAS) dos anunciantes, sustentando taxas de faturação recorde.'
    },
    {
      category: 'SOFTWARE & CIBERSEGURANÇA',
      query: 'enterprise+software+spending+OR+Salesforce+OR+ServiceNow+OR+CrowdStrike+when:4d',
      tickers: ['QDVE'],
      categoryColor: 'bg-slate-100 text-slate-900 border-slate-300',
      impactTitle: 'Impacto no S&P 500 Info Tech (QDVE 38%):',
      impactText: 'Orçamentos de software corporativo (SaaS) e segurança informática são despesas obrigatórias para empresas mundiais, reforçando o pilar tecnológico central.'
    },
    {
      category: 'MERCADOS GERAIS & ÍNDICES',
      query: 'SP500+earnings+OR+Nasdaq+rally+OR+Wall+Street+stock+market+when:3d',
      tickers: ['QDVE', 'CHIP', 'DB1'],
      categoryColor: 'bg-zinc-100 text-zinc-900 border-zinc-300',
      impactTitle: 'Impacto no Sentimento e Amplitude dos Mercados:',
      impactText: 'A saúde dos lucros do S&P 500 e do Nasdaq dita o fluxo de capital institucional para ações de crescimento e ativos de qualidade superior.'
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

            itemsList.push({
              id: `live-news-${itemId++}`,
              category: f.category,
              categoryColor: f.categoryColor,
              title,
              source,
              date: timeLabel,
              link,
              tickers: f.tickers,
              summary: `Notícia de relevância estratégica para a tua carteira e ativos relacionados: "${title}". Noticiado por ${source}.`,
              portfolioImpact: 'POSITIVO',
              impactTitle: f.impactTitle,
              impactText: f.impactText,
              bulletPoints: [
                `Publicado por ${source} (${timeLabel}).`,
                `Monitorização contínua com impacto nos ativos ${f.tickers.join(', ')} e setores correlacionados.`
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
