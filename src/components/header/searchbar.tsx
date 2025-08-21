"use client";
import { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { IoSearch } from "react-icons/io5";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SelectStocks() {
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!inputValue) {
      router.push("/");
      return;
    }
    let url = "/";
    router.push(`${url}?q=${inputValue}`);
  }
  return (
    <main>
      <form className="flex gap-1 items-center" onSubmit={handleSubmit}>
        <div className="flex ">
          <Input
            placeholder="Search stocks "
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button type="submit" variant={"ghost"} className="cursor-pointer">
            <IoSearch />
          </Button>
        </div>
      </form>
    </main>
  );
}
