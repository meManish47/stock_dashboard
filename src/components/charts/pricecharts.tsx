"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import MinimalCard, {
  MinimalCardContent,
  MinimalCardTitle,
} from "@/components/ui/minimal-card";

// Define the type for intraday data (5min intervals)
type IntradayDataPoint = {
  time: string;
  close: number;
};

// Define the type for historical daily data
type HistoricalDataPoint = {
  time: string;
  close: number;
};

export default function PriceCharts({ symbol }: { symbol: string }) {
  const [intraday, setIntraday] = useState<IntradayDataPoint[]>([]);
  const [historical, setHistorical] = useState<HistoricalDataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!symbol) return;

    async function fetchIntraday() {
      try {
        const res = await fetch(
          `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&outputsize=compact&apikey=${process.env.NEXT_PUBLIC_ALPHA_API_KEY}`
        );
        const data = await res.json();
        console.log("Intraday raw response:", data);

        if (data["Time Series (5min)"]) {
          const formatted: IntradayDataPoint[] = Object.entries(
            data["Time Series (5min)"]
          ).map(([time, values]: [string, any]) => ({
            time,
            close: parseFloat(values["4. close"]),
          }));
          setIntraday(formatted.reverse());
        } else if (data.Note || data["Error Message"]) {
          console.warn("Alpha Vantage intraday API returned error:", data);
        }
      } catch (err) {
        console.error("Intraday fetch error:", err);
      }
    }

    async function fetchHistorical() {
      try {
        const res = await fetch(
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&apikey=${process.env.NEXT_PUBLIC_ALPHA_API_KEY}`
        );
        const data = await res.json();
        console.log("Historical raw response:", data);

        if (data["Time Series (Daily)"]) {
          const formatted: HistoricalDataPoint[] = Object.entries(
            data["Time Series (Daily)"]
          ).map(([date, values]: [string, any]) => ({
            time: date,
            close: parseFloat(values["4. close"]),
          }));
          setHistorical(formatted.reverse());
        } else if (data.Note || data["Error Message"]) {
          console.warn("Alpha Vantage historical API returned error:", data);
        }
      } catch (err) {
        console.error("Historical fetch error:", err);
      }
    }

    setLoading(true);
    Promise.all([fetchIntraday(), fetchHistorical()]).finally(() =>
      setLoading(false)
    );
  }, [symbol]);

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Intraday Chart Card */}
      <MinimalCard className="flex-1 h-[400px]">
        <MinimalCardContent>
          <MinimalCardTitle>Intraday Chart ({symbol})</MinimalCardTitle>
          {loading ? (
            <p className="text-center mt-10 text-gray-500">
              Loading intraday...
            </p>
          ) : (
            <div className="w-full h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={intraday}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" minTickGap={20} />
                  <YAxis domain={["auto", "auto"]} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="close"
                    stroke="#8884d8"
                    dot={false}
                    name="Close Price"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </MinimalCardContent>
      </MinimalCard>

      {/* Historical Chart Card */}
      <MinimalCard className="flex-1 h-[400px]">
        <MinimalCardContent>
          <MinimalCardTitle>Historical Chart ({symbol})</MinimalCardTitle>
          {loading ? (
            <p className="text-center mt-10 text-gray-500">
              Loading historical...
            </p>
          ) : (
            <div className="w-full h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={historical}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" minTickGap={20} />
                  <YAxis domain={["auto", "auto"]} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="close"
                    stroke="#82ca9d"
                    dot={false}
                    name="Close Price"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </MinimalCardContent>
      </MinimalCard>
    </div>
  );
}
