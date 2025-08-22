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

// Type for each intraday data point (5min intervals)
type IntradayDataPoint = {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};

// Type for each historical data point (daily)
type HistoricalDataPoint = {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};

// Alpha Vantage intraday API response type
type IntradayAPIResponse = {
  "Meta Data": Record<string, string>;
  "Time Series (5min)": Record<
    string,
    {
      "1. open": string;
      "2. high": string;
      "3. low": string;
      "4. close": string;
      "5. volume": string;
    }
  >;
  Note?: string;
  "Error Message"?: string;
};

// Alpha Vantage historical daily API response type
type HistoricalAPIResponse = {
  "Meta Data": Record<string, string>;
  "Time Series (Daily)": Record<
    string,
    {
      "1. open": string;
      "2. high": string;
      "3. low": string;
      "4. close": string;
      "5. volume": string;
    }
  >;
  Note?: string;
  "Error Message"?: string;
};

export default function PriceCharts({ symbol }: { symbol: string }) {
  const [intraday, setIntraday] = useState<IntradayDataPoint[]>([]);
  const [historical, setHistorical] = useState<HistoricalDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    if (!symbol) return;

    async function fetchIntraday() {
      try {
        const res = await fetch(
          `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&outputsize=compact&apikey=${process.env.NEXT_PUBLIC_ALPHA_API_KEY}`
        );
        if (!res.ok) {
          setError(true);
        }

        const data: IntradayAPIResponse = await res.json();
        console.log("Intraday raw response:", data);

        if (data["Time Series (5min)"]) {
          const formatted: IntradayDataPoint[] = Object.entries(
            data["Time Series (5min)"]
          ).map(([time, values]) => ({
            time,
            open: parseFloat(values["1. open"]),
            high: parseFloat(values["2. high"]),
            low: parseFloat(values["3. low"]),
            close: parseFloat(values["4. close"]),
            volume: parseInt(values["5. volume"]),
          }));
          setIntraday(formatted.reverse());
        } else if (data.Note || data["Error Message"]) {
          console.warn("Alpha Vantage intraday API returned error:", data);
        }
      } catch (err) {
        console.error("Intraday fetch error:", err);
        setError(true);
      }
    }

    async function fetchHistorical() {
      try {
        const res = await fetch(
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&apikey=${process.env.NEXT_PUBLIC_ALPHA_API_KEY}`
        );
        if (!res.ok) {
          setError(true);
        }
        const data: HistoricalAPIResponse = await res.json();
        console.log("Historical raw response:", data);

        if (data["Time Series (Daily)"]) {
          const formatted: HistoricalDataPoint[] = Object.entries(
            data["Time Series (Daily)"]
          ).map(([date, values]) => ({
            time: date,
            open: parseFloat(values["1. open"]),
            high: parseFloat(values["2. high"]),
            low: parseFloat(values["3. low"]),
            close: parseFloat(values["4. close"]),
            volume: parseInt(values["5. volume"]),
          }));
          setHistorical(formatted.reverse());
        } else if (data.Note || data["Error Message"]) {
          console.warn("Alpha Vantage historical API returned error:", data);
        }
      } catch (err) {
        console.error("Historical fetch error:", err);
        setError(true);
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
      <MinimalCard className="flex-1 h-[250px] sm:h-[400px]">
        <MinimalCardContent>
          <MinimalCardTitle>Intraday Chart ({symbol})</MinimalCardTitle>
          {loading ? (
            <p className="text-center mt-10 text-gray-500">
              Loading intraday...
            </p>
          ) : error ? (
            <div className="w-full px-5 py-20 text-muted-foreground text-xl">
              Cant show at the moment:/{" "}
            </div>
          ) : (
            <div className="w-full h-60 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={intraday}
                  margin={{ top: 15, right: 10, left: 10, bottom: 5 }}
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
      <MinimalCard className="flex-1 h-[200px] sm:h-[400px]">
        <MinimalCardContent>
          <MinimalCardTitle>Historical Chart ({symbol})</MinimalCardTitle>
          {loading ? (
            <p className="text-center mt-10 text-gray-500">
              Loading historical...
            </p>
          ) : error ? (
            <div className="w-full px-5 py-20 text-muted-foreground text-xl">
              Cant show at the moment:/{" "}
            </div>
          ) : (
            <div className="w-full h-60 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={historical}
                  margin={{ top: 15, right: 10, left: 10, bottom: 5 }}
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
