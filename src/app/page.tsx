import PriceCharts from "@/components/charts/pricecharts";
import CompanyOverview from "@/components/company/company_overview";
import TechnicalIndicators from "@/components/indicators/technicalindicators";
import LatestNews from "@/components/latestnews";

export default function Home() {
  return (
    <main className="h-full w-full flex flex-col gap-8 px-20 py-10">
      {/*  Stock Overview  */}
      <CompanyOverview />

      {/*  Price Charts  */}
      <PriceCharts />

      {/*  Technical Indicators  */}
      <TechnicalIndicators />

      {/*  Latest News  */}
      <LatestNews />
    </main>
  );
}
