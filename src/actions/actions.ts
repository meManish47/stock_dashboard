"use server";

export async function getCompanyProfile(symbol: string) {
  const res = await fetch(
    `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${process.env.NEXT_PUBLIC_FINNHUB_API_KEY}`
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch profile for ${symbol}`);
  }

  const data = await res.json();
  return data;
}
