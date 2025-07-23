import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function Hero() {
  return (
    <section className="flex justify-center min-h-screen">
      <div className="flex justify-center flex-col text-center ">
        <h1 className="text-green text-6xl">Blomsterkartan</h1>
        <p className="text-blue text-2xl">Upptäck Sveriges blommor</p>
        <div className=" flex relative mt-4">
          <Input
            placeholder="Sök efter blommor..."
            className="border-blue rounded-full"
          />
          <Search className="h-full text-blue absolute right-2" />
        </div>
        </div>
    </section>
  );
}
