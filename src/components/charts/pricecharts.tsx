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

const symbol = "AAPL";

export default function PriceCharts() {
  const [intraday, setIntraday] = useState<any[]>([]);
  const [historical, setHistorical] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchIntraday() {
      try {
        const res = await fetch(
          `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&outputsize=compact&apikey=${process.env.NEXT_PUBLIC_ALPHA_API_KEY}`
        );
        const data = await res.json();
        const timeSeries = data["Time Series (5min)"];
        if (timeSeries) {
          const formatted = Object.entries(timeSeries).map(
            ([time, values]: any) => ({
              time,
              close: parseFloat(values["4. close"]),
            })
          );
          setIntraday(formatted.reverse());
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
        const timeSeries = data["Time Series (Daily)"];
        if (timeSeries) {
          const formatted = Object.entries(timeSeries).map(
            ([date, values]: any) => ({
              time: date,
              close: parseFloat(values["4. close"]),
            })
          );
          setHistorical(formatted.reverse());
        }
      } catch (err) {
        console.error("Historical fetch error:", err);
      }
    }

    Promise.all([fetchIntraday(), fetchHistorical()]).finally(() =>
      setLoading(false)
    );
  }, []);

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
