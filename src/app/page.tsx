import PriceCharts from "@/components/charts/pricecharts";
import CompanyOverview from "@/components/company/company_overview";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;
  const symbol = q ? q : "AAPL";
  return (
    <main className="h-full w-full flex flex-col gap-8 px-20 py-10">
      {/*  Stock Overview  */}
      <CompanyOverview symbol={symbol} />

      {/*  Price Charts  */}
      <PriceCharts symbol={symbol} />
    </main>
  );
}
