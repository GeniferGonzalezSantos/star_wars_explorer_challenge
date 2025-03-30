"use client";
import React, { useEffect, useState } from "react";
import { FavoritesPageProps } from "./types";

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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Favorite Items</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFavorites.map((item) => (
          <div key={item} className="p-4 border rounded shadow">
            <h2 className="text-lg font-bold">{item}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
