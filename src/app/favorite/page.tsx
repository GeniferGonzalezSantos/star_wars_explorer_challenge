"use client";
import React, { useEffect, useState } from "react";
import { FavoritesPageProps } from "./types";
import PlanetsPage from "../planets/page"; 
import { Card } from "../components/card/page";
import EntityLink from "../components/navigation/page";
import { TfiMore } from "react-icons/tfi";

export default function FavoritesPage({
  searchQuery,
  currentPage,
}: FavoritesPageProps) {
  const [favorites, setFavorites] = useState<[string, string][]>([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    console.log(storedFavorites, "storedFavorites");
    if (Array.isArray(storedFavorites)) {
      setFavorites(storedFavorites);
    }
  }, []);

  // Remove duplicatas com base no primeiro elemento do array (ID)
  const uniqueFavorites = Array.from(
    new Map(favorites.map((item) => [item[0], item])).values()
  );

  if (uniqueFavorites.length === 0) {
    return <p className="text-center mt-4">No favorites added yet.</p>;
  }

  console.log(uniqueFavorites, "uniqueFavorites");
  return (
    <div>
      {uniqueFavorites.map((item) => {
        const parsedItem = JSON.parse(item[1]);
        console.log(parsedItem, "parsedItem"); 
        if (parsedItem.url.substring(22, 28) === "people") {
          return (
            <Card
              key={item[0]}
              items={[parsedItem]} 
              renderItem={() => (
                <div
                  key={parsedItem.name}
                  className="flex justify-items-stretch items-stretch flex-col cursor-pointer"
                >
                  <h2 className="text-xl font-bold overflow-ellipsis overflow-hidden">
                    {parsedItem.name}
                  </h2>
                  <p className="text-md text-gray-200">
                    Height: {parsedItem.height}
                  </p>
                  <p className="text-md text-gray-200">
                    Mass: {parsedItem.mass}
                  </p>
                  <EntityLink
                    url={parsedItem.url}
                    type="charactersDetails?id="
                    label={
                      <span className="absolute bottom-1 mb-4 rigth-1 flex items-center space-x-1">
                        <span className="text-md text-pink-400">
                          More Details
                        </span>
                        <TfiMore className="self-end" />
                      </span>
                    }
                  />
                </div>
              )}
            />
          );
        } else if (parsedItem.url.substring(22, 28) === "planets") {
          return (
            <PlanetsPage
              key={item[0]}
              data={parsedItem}
              currentPage={currentPage}
              onTotalPagesChange={() => {}}
              searchQuery={searchQuery}
            />
          );
        }
      })}
    </div>
  );
}