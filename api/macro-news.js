// Vercel Serverless Function: /api/macro-news
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const feedsConfig = [
    {
      category: 'FED & JUROS',
      query: 'Federal+Reserve+interest+rates+when:3d',
      tickers: ['QDVE', 'GOOGL', 'AMZN', 'META', '2B70'],
      categoryColor: 'bg-blue-100 text-blue-900 border-blue-300',
      impactTitle: 'Impacto nas Tuas Ações dos EUA (QDVE, Tech & Biotech):',
      impactText: 'Decisões da Fed sobre taxas e inflação impactam o custo de capital e múltiplos de avaliação (P/E) das tuas tecnológicas americanas.'
    },
    {
      category: 'BCE & EUROPA',
      query: 'ECB+interest+rates+OR+Deutsche+Boerse+OR+European+Central+Bank+when:4d',
      tickers: ['DB1'],
      categoryColor: 'bg-amber-100 text-amber-900 border-amber-300',
      impactTitle: 'Impacto no Teu Pilar Europeu (Deutsche Börse):',
      impactText: 'Cortes do BCE direcionam fluxos de liquidez e poupança para a bolsa XETRA e índices STOXX da Deutsche Börse (DB1).'
    },
    {
      category: 'BIG TECH & IA',
      query: 'Meta+Platforms+OR+Amazon+AWS+OR+Google+Alphabet+AI+when:3d',
      tickers: ['META', 'AMZN', 'GOOGL', 'QDVE'],
      categoryColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      impactTitle: 'Impacto na Big Tech (META 5%, AMZN 5%, GOOGL 5%):',
      impactText: 'Investimentos de capital (Capex) em centros de dados e novos modelos de IA impulsionam o fluxo de caixa livre futuro.'
    },
    {
      category: 'SEMICONDUTORES',
      query: 'Nvidia+OR+TSMC+OR+ASML+semiconductor+chips+when:3d',
      tickers: ['CHIP'],
      categoryColor: 'bg-purple-100 text-purple-900 border-purple-300',
      impactTitle: 'Impacto nos Teus 20% em Semicondutores (CHIP):',
      impactText: 'Procura global por chips e máquinas litográficas EUV sustenta o maior motor de crescimento composto do teu portfólio.'
    },
    {
      category: 'BIOTECNOLOGIA',
      query: 'Biotechnology+FDA+OR+Vertex+OR+CRISPR+when:4d',
      tickers: ['2B70'],
      categoryColor: 'bg-rose-100 text-rose-900 border-rose-300',
      impactTitle: 'Impacto nos Teus 16% em Biotecnologia (2B70):',
      impactText: 'Novas aprovações da FDA e fusões farmacêuticas valorizam o cabaz de genómica e saúde descorrelacionado com tech.'
    },
    {
      category: 'INFRAESTRUTURA FINANCEIRA',
      query: 'Deutsche+Boerse+OR+Clearstream+OR+Eurex+OR+XETRA+when:7d',
      tickers: ['DB1'],
      categoryColor: 'bg-indigo-100 text-indigo-900 border-indigo-300',
      impactTitle: 'Impacto nos Teus 12% em Deutsche Börse (DB1):',
      impactText: 'Monopólio de compensação da Clearstream e negociação na Xetra mantêm margens operacionais >50% sem risco de crédito.'
    }
  ];

  const itemsList = [];
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
          // Extract items with regex
          const itemMatches = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].slice(0, 2);
          for (const m of itemMatches) {
            const itemXml = m[1];
            const titleMatch = itemXml.match(/<title>([\s\S]*?)<\/title>/);
            const pubDateMatch = itemXml.match(/<pubDate>([\s\S]*?)<\/pubDate>/);
            const linkMatch = itemXml.match(/<link>([\s\S]*?)<\/link>/);

            const rawTitle = titleMatch ? titleMatch[1].replace(/<!\[CDATA\[|\]\]>/g, '').trim() : '';
            const parts = rawTitle.split(' - ');
            const title = parts.length > 1 ? parts.slice(0, -1).join(' - ') : rawTitle;
            const source = parts.length > 1 ? parts[parts.length - 1] : 'Mercados Globais';

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
              summary: `Notícia de última hora com relevância para a tua carteira: "${title}". Noticiado por ${source}.`,
              portfolioImpact: 'POSITIVO',
              impactTitle: f.impactTitle,
              impactText: f.impactText,
              bulletPoints: [
                `Publicado por ${source} (${timeLabel}).`,
                `Impacto e monitorização em tempo real para os teus ativos ${f.tickers.join(', ')}.`
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
