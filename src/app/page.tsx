"use client";
import React from "react";
import { Card } from "./components/card/page";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen gap-16 font-[family-name:var(--font-Orbitron-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center">
        <Card
          items={["All", "Personagem", "Planeta", "Favoritos"]}
          renderItem={(item: string) => (
            <div
              onClick={() => {
                if (item === "Personagem") {
                  window.location.href = "/people";
                }
              }}
              className="cursor-pointer"
            >
              {item}
            </div>
          )}
        />
      </main>
    </div>
  );
}
