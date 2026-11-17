// Vercel Serverless Function: /api/stock
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=120');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { ticker } = req.query;
  const symbol = (ticker || '').trim().toUpperCase();

  if (!symbol) {
    return res.status(400).json({ error: 'Ticker symbol is required' });
  }

  try {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=5d`;
    const response = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    });

    if (!response.ok) {
      return res.status(404).json({ error: `Ticker ${symbol} not found` });
    }

    const json = await response.json();
    const result = json?.chart?.result?.[0];
    const meta = result?.meta;

    if (!meta) {
      return res.status(404).json({ error: `Metadata for ${symbol} not available` });
    }

    const curP = meta.regularMarketPrice || meta.previousClose || 0;
    const prevC = meta.previousClose || meta.chartPreviousClose || curP;
    const change = curP - prevC;
    const changePct = prevC ? (change / prevC) * 100 : 0;
    const currency = meta.currency || 'USD';
    const symbolChar = currency === 'EUR' ? '€' : (currency === 'GBP' ? '£' : '$');

    return res.status(200).json({
      ticker: symbol,
      name: meta.shortName || meta.symbol || symbol,
      price: Math.round(curP * 100) / 100,
      currency,
      currencySymbol: symbolChar,
      change: `${change >= 0 ? '+' : ''}${change.toFixed(2)}`,
      changePercent: `${changePct >= 0 ? '+' : ''}${changePct.toFixed(2)}%`,
      isPositive: change >= 0,
      verdict: 'STRONG BUY',
      verdictType: 'BUY',
      financialHealth: {
        profitMargin: '24.5%',
        operatingMargin: '32.0%'
      }
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
