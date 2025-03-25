import React from "react";
import { Card } from "./components/card/page";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen gap-16 font-[family-name:var(--font-Orbitron-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center">
        <div className="w-full max-w-[400px]">
          <input
            type="search"
            placeholder="research a character or planet"
            className="w-full px-4 py-2 text-sm text-gray-800 placeholder-gray-400 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
          <Card />
      </main>
    </div>
  );
}
