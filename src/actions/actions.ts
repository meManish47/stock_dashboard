"use server";
const symbols = ["AAPL", "TSLA", "MSFT", "GOOGL", "AMZN"];

export async function getMultipleCompanyProfiles(symbols: string[]) {
  const promises = symbols.map((symbol) =>
    fetch(
      `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${process.env.NEXT_PUBLIC_FINNHUB_API_KEY}`
    ).then((res) => res.json())
  );
  return Promise.all(promises);
}

export async function getMultipleQuotes(symbols: string[]) {
  const promises = symbols.map((symbol) =>
    fetch(
      `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${process.env.NEXT_PUBLIC_FINNHUB_API_KEY}`
    ).then((res) => res.json())
  );
  const results = await Promise.all(promises);

  return symbols.map((symbol, idx) => ({
    symbol,
    ...results[idx],
  }));
}

export async function getMultipleHistorical(symbols: string[]) {
  const to = Math.floor(Date.now() / 1000);
  const from = to - 60 * 60 * 24 * 180; // last 6 months
  const promises = symbols.map((symbol) =>
    fetch(
      `https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=D&from=${from}&to=${to}&token=${process.env.NEXT_PUBLIC_FINNHUB_API_KEY}`
    ).then((res) => res.json())
  );
  const results = await Promise.all(promises);
  return symbols.map((symbol, idx) => ({ symbol, data: results[idx] }));
}
