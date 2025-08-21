import { GridPatternLinearGradient } from "../pattern/gridpattern";

export default function CompanyOverview() {
  return (
    <div className="relative w-full h-60">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0">
        <GridPatternLinearGradient />
      </div>

      {/* Company Details Overlay */}
      <div className="absolute inset-0 flex flex-col  justify-center  p-6 rounded-lg ">
        <div className="flex gap-8">
          <div className="h-30 w-30 bg-cyan-300"></div>
          <div>
            <h2 className="text-4xl font-bold  dark:text-gray-200">
              Apple Inc. (AAPL)
            </h2>
            <p className=" dark:text-gray-300 mt-2 ">
              Current Price: $228.5{" "}
              <span className="text-green-400">↑1.2%</span>
              <br />
              Market Cap: $2.8T | P/E: 28.4 | EPS: 8.5
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
