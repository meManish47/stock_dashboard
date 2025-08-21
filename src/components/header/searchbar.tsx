"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { BiDownArrow } from "react-icons/bi";

export default function SelectStocks() {
  const router = useRouter();
  const [selectedStock, setSelectedStock] = useState<string | null>(null);

  const stocks = ["IBM", "AAPL", "AMZN"];

  const handleSelect = (symbol: string) => {
    setSelectedStock(symbol);
    router.push(`/?q=${symbol}`);
  };

  return (
    <main className="flex justify-center">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button className=" sm:w-48 " variant={"outline"}>
            <span className="hidden sm:block">Select Stock</span>
            <BiDownArrow />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          <DropdownMenuLabel>Choose a stock</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {stocks.map((stock) => (
            <DropdownMenuItem
              key={stock}
              onClick={() => handleSelect(stock)}
              className="cursor-pointer"
            >
              {stock}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </main>
  );
}
