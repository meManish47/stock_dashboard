"use client";

import { useEffect, useState } from "react";
import { GridPatternLinearGradient } from "../pattern/gridpattern";
import { getCompanyProfile } from "@/actions/actions";
import { LuExternalLink } from "react-icons/lu";
import { Button } from "../ui/button";
import { CompanyWithQuote } from "../table/tabledata";

type CompanyProfile = {
  name: string;
  ticker: string;
  logo: string;
  marketCapitalization: number;
  finnhubIndustry?: string;
  exchange?: string;
  weburl?: string;
};

export default function CompanyOverview({
  symbol,
  getTableData,
}: {
  symbol: string;
  getTableData: (value: CompanyWithQuote) => void;
}) {
  const [company, setCompany] = useState<CompanyProfile | null>(null);
  const [quote, setQuote] = useState<{ c: number; dp: number } | null>(null);
  const [allQuote, setAllQuote] = useState<
    | {
        c: number;
        d: number;
        dp: number;
        h: number;
        l: number;
        o: number;
        pc: number;
        t: number;
      }
    | undefined
  >();
  useEffect(() => {
    getCompanyProfile(symbol).then((profile) => {
      setCompany(profile);
    });
    async function fetchQuote() {
      const res = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${process.env.NEXT_PUBLIC_FINNHUB_API_KEY}`
      );
      const data = await res.json();
      setAllQuote(data);
      setQuote({
        c: data.c,
        dp: ((data.c - data.pc) / data.pc) * 100,
      });
    }
    fetchQuote();
  }, [symbol]);
  useEffect(() => {
    if (!company || !allQuote) return;

    const tableData: CompanyWithQuote = {
      c: allQuote.c,
      d: allQuote.d,
      dp: allQuote.dp,
      h: allQuote.h,
      l: allQuote.l,
      o: allQuote.o,
      pc: allQuote.pc,
      t: allQuote.t,
      companyName: company.name,
      symbol: company.ticker,
    };

    getTableData(tableData);
  }, [company, allQuote]);
  if (!company) return <div className="relative w-full h-60">Loading...</div>;

  return (
    <div className="relative w-full h-40 sm:h-60">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0">
        <GridPatternLinearGradient />
      </div>

      {/* Company Details Overlay */}
      <div className="absolute inset-0 flex flex-col justify-center p-6 rounded-lg">
        <div className="flex gap-8 items-center">
          {/* Company Logo */}
          <img
            src={company.logo}
            alt={company.name}
            className="h-24 w-24 object-contain rounded-md"
          />

          {/* Company Info */}
          <div className="w-full sm:pe-10 flex justify-between">
            <div>
              <h2 className="text-lg sm:text-4xl font-bold  dark:text-gray-200 line-clamp-2 ">
                {company.name} ({company.ticker})
              </h2>
              <p className="flex text-muted-foreground text-[8px] sm:text-xs">
                <div className="mt-2  dark:text-gray-300">
                  Market Cap: ${company.marketCapitalization.toLocaleString()} M
                  <br />
                  Industry: {company.finnhubIndustry || "-"}
                  <br />
                  Exchange: {company.exchange || "-"}
                </div>
              </p>
              <p className="mt-2 ">
                ${quote?.c.toFixed(2)}{" "}
                <span
                  className={
                    quote && quote?.dp >= 0 ? "text-green-400" : "text-red-500"
                  }
                >
                  {quote && quote?.dp >= 0 ? "↑" : "↓"} {quote?.dp.toFixed(2)}%
                </span>
              </p>
            </div>
            <div>
              {" "}
              {company.weburl && (
                <a
                  href={company.weburl}
                  target="_blank"
                  className=" hover:underline "
                >
                  <Button variant={"secondary"} className="cursor-pointer">
                    <span className="hidden sm:block">Visit Website</span>{" "}
                    <LuExternalLink size={20} />
                  </Button>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
