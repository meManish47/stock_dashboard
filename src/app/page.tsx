"use client";
import PriceCharts from "@/components/charts/pricecharts";
import CompanyOverview from "@/components/company/company_overview";
import CompanyTable, { CompanyWithQuote } from "@/components/table/tabledata";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const s = useSearchParams();
  const q = s.get("q");
  const symbol = q ? q.toUpperCase() : "AAPL";
  const [tabledata, settableData] = useState<CompanyWithQuote>();
  function getTabledata(data: CompanyWithQuote) {
    settableData(data);
  }
  // console.log("tbaledata on page", tabledata);
  return (
    <main className="h-full w-full flex flex-col gap-8 px-2 sm:px-20 py-10">
      {/*  Stock Overview  */}
      <CompanyOverview symbol={symbol} getTableData={getTabledata} />
      <CompanyTable companyWithQuote={tabledata} />
      {/*  Price Charts  */}
      <PriceCharts symbol={symbol} />
    </main>
  );
}
