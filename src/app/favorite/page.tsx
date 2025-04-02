"use client";
import React, { useEffect, useState } from "react";
import { FavoritesPageProps } from "./types";
import { Card } from "../components/card/page";

export default function FavoritesPage({ searchQuery }: FavoritesPageProps) {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavorites(storedFavorites);
  }, []);

  const filteredFavorites = favorites.filter((item) =>
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (favorites.length === 0) {
    return <p className="text-center mt-4">No favorites added yet.</p>;
  }

  return (

      <div className="flex">
        {filteredFavorites.map((item) => (
          <Card
            key={item}
            items={[item]}
            renderItem={(item: string) => 
              <div  className="p-4">
              <h2 className="text-lg font-bold">{item}</h2>
            </div>
            }
          />
        ))}
      </div>
  );
}
