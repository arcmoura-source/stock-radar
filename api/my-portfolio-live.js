// Vercel Serverless Function: /api/my-portfolio-live
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=120');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const symbols = {
    'sp500-it': 'QDVE.DE',
    'deutsche-boerse': 'DB1.DE',
    'euro-banks': 'DB1.DE',
    'msci-semis': 'CHIP.PA',
    'nasdaq-biotech': '2B70.DE',
    'googl-stock': 'GOOGL',
    'amzn-stock': 'AMZN',
    'meta-stock': 'META'
  };

  const quotes = {};

  await Promise.all(
    Object.entries(symbols).map(async ([key, sym]) => {
      try {
        const url = `https://query1.finance.yahoo.com/v8/finance/chart/${sym}?interval=1d&range=5d`;
        const response = await fetch(url, {
          headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
        });
        if (response.ok) {
          const json = await response.json();
          const meta = json?.chart?.result?.[0]?.meta;
          if (meta) {
            const curP = meta.regularMarketPrice || meta.previousClose || 0;
            const prevC = meta.previousClose || meta.chartPreviousClose || curP;
            const chgPct = prevC ? ((curP - prevC) / prevC) * 100 : 0;
            quotes[key] = {
              symbol: sym,
              price: Math.round(curP * 100) / 100,
              changePercent: Math.round(chgPct * 100) / 100
            };
          }
        }
      } catch (err) {
        console.warn(`Error fetching ${sym}:`, err.message);
      }
    })
  );

  return res.status(200).json({
    status: 'live_cloud',
    timestamp: new Date().toISOString(),
    quotes
  });
}
