import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function Hero() {
  return (
    <div className="flex justify-center h-screen bg-fog ">
      <div className="flex justify-center flex-col text-center">
        <h1 className="text-green text-6xl">Blomsterkartan</h1>
        <p className="text-blue text-2xl">Upptäck Sveriges blommor</p>
        <div className=" flex relative">
          <Input
            placeholder="Sök efter blommor..."
            className=" border-blue rounded-full"
          />
          <Search className="h-full text-blue absolute right-2" />
        </div>
      </div>
    </div>
  );
}
