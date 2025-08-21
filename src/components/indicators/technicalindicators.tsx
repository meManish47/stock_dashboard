"use client";

import React, { useEffect, useState } from "react";
import MinimalCard, {
  MinimalCardContent,
  MinimalCardDescription,
  MinimalCardTitle,
} from "@/components/ui/minimal-card";

interface TechnicalData {
  rsi: number | null;
  macd: number | null;
  sma50: number | null;
  sma200: number | null;
}

export default function TechnicalIndicators({ symbol = "AAPL" }) {
  const [data, setData] = useState<TechnicalData>({
    rsi: null,
    macd: null,
    sma50: null,
    sma200: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTechnical() {
      try {
        setLoading(true);
        setError(null);

        // Fetch RSI
        const rsiRes = await fetch(
          `https://www.alphavantage.co/query?function=RSI&symbol=${symbol}&interval=daily&time_period=14&series_type=close&apikey=${process.env.NEXT_PUBLIC_ALPHA_API_KEY}`
        );
        const rsiData = (await rsiRes.json()) as Record<string, any>;
        const rsiValues = rsiData["Technical Analysis: RSI"];
        const rsi = rsiValues
          ? parseFloat(Object.values(rsiValues)[0]["RSI"])
          : null;

        // Fetch MACD
        const macdRes = await fetch(
          `https://www.alphavantage.co/query?function=MACD&symbol=${symbol}&interval=daily&series_type=close&apikey=${process.env.NEXT_PUBLIC_ALPHA_API_KEY}`
        );
        const macdData = (await macdRes.json()) as Record<string, any>;
        const macdValues = macdData["Technical Analysis: MACD"];
        const macd = macdValues
          ? parseFloat(Object.values(macdValues)[0]["MACD_Hist"])
          : null;

        // Fetch SMA 50
        const sma50Res = await fetch(
          `https://www.alphavantage.co/query?function=SMA&symbol=${symbol}&interval=daily&time_period=50&series_type=close&apikey=${process.env.NEXT_PUBLIC_ALPHA_API_KEY}`
        );
        const sma50Data = (await sma50Res.json()) as Record<string, any>;
        const sma50Values = sma50Data["Technical Analysis: SMA"];
        const sma50 = sma50Values
          ? parseFloat(Object.values(sma50Values)[0]["SMA"])
          : null;

        // Fetch SMA 200
        const sma200Res = await fetch(
          `https://www.alphavantage.co/query?function=SMA&symbol=${symbol}&interval=daily&time_period=200&series_type=close&apikey=${process.env.NEXT_PUBLIC_ALPHA_API_KEY}`
        );
        const sma200Data = (await sma200Res.json()) as Record<string, any>;
        const sma200Values = sma200Data["Technical Analysis: SMA"];
        const sma200 = sma200Values
          ? parseFloat(Object.values(sma200Values)[0]["SMA"])
          : null;

        setData({ rsi, macd, sma50, sma200 });
      } catch (err) {
        console.error(err);
        setError("Failed to fetch technical indicators");
      } finally {
        setLoading(false);
      }
    }

    fetchTechnical();
  }, [symbol]);

  return (
    <MinimalCard className="w-full max-w-4xl mx-auto  shadow-xl rounded-xl border border-gray-700">
      <MinimalCardContent className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <MinimalCardTitle className="text-2xl font-bold">
            Technical Indicators
          </MinimalCardTitle>
          <span className="px-3 py-1 bg-indigo-600  rounded-full text-sm font-semibold shadow">
            {symbol.toUpperCase()}
          </span>
        </div>

        {/* Loading / Error */}
        {loading ? (
          <MinimalCardDescription className="text-gray-300">
            Loading...
          </MinimalCardDescription>
        ) : error ? (
          <MinimalCardDescription className="text-red-500">
            {error}
          </MinimalCardDescription>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-4">
            <div className=" rounded-lg p-4 flex flex-col items-center shadow hover:scale-105 transform transition">
              <span className="text-gray-400 text-sm">RSI</span>
              <span className="text-xl font-bold">
                {data.rsi?.toFixed(2) ?? "N/A"}
              </span>
            </div>
            <div className=" rounded-lg p-4 flex flex-col items-center shadow hover:scale-105 transform transition">
              <span className="text-gray-400 text-sm">MACD Histogram</span>
              <span className="text-xl font-bold">
                {data.macd?.toFixed(2) ?? "N/A"}
              </span>
            </div>
            <div className=" rounded-lg p-4 flex flex-col items-center shadow hover:scale-105 transform transition">
              <span className="text-gray-400 text-sm">SMA 50</span>
              <span className="text-xl font-bold">
                {data.sma50?.toFixed(2) ?? "N/A"}
              </span>
            </div>
            <div className=" rounded-lg p-4 flex flex-col items-center shadow hover:scale-105 transform transition">
              <span className="text-gray-400 text-sm">SMA 200</span>
              <span className="text-xl font-bold">
                {data.sma200?.toFixed(2) ?? "N/A"}
              </span>
            </div>
          </div>
        )}
      </MinimalCardContent>
    </MinimalCard>
  );
}
