import { CustomColorDemo, DefaultDemo } from "./expandables";
import { ModeToggle } from "./mode-toggle";
import { RiStockFill } from "react-icons/ri";
import SearchBar from "./searchbar";
import SelectStocks from "./searchbar";

export default function HeaderComponent() {
  return (
    <header className="w-full h-18 flex px-20 items-center justify-between">
      <div className="h-full w-max px-4 flex gap-14 items-center">
        <div className="text-[#2B7FFF] flex items-center gap-2">
          <RiStockFill size={24} />
          <p className="font-bold text-2xl text-black tracking-wider dark:text-white">
            StockTrak
          </p>
        </div>
        <CustomColorDemo />
      </div>
      <div className="flex gap-4 items-center">
        <SelectStocks />
        <ModeToggle />
      </div>
    </header>
  );
}
