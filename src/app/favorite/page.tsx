"use client";
import React, { useEffect, useState } from "react";
import { FavoritesPageProps } from "./types";
import { Card } from "../components/card/page";
import EntityLink from "../components/navigation/page";
import { TfiMore } from "react-icons/tfi";

export default function FavoritesPage({
  currentPage,
  onTotalPagesChange,
  searchQuery,
}: FavoritesPageProps & { searchQuery: string }) {
  const [favorites, setFavorites] = useState<[string, string][]>([]);
  const itemsPerPage = 3;

  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    if (Array.isArray(storedFavorites)) {
      setFavorites(storedFavorites);
    }
  }, []);

  useEffect(() => {
    onTotalPagesChange(Math.ceil(favorites.length / itemsPerPage));
  }, [favorites, onTotalPagesChange]);

  const uniqueFavorites = Array.from(
    new Map(favorites.map((item) => [item[0], item])).values()
  );

  const filteredFavorites = uniqueFavorites.filter(([, value]) => {
    const parsedItem = JSON.parse(value);
    return parsedItem.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const startIndex = (Math.max(currentPage, 1) - 1) * itemsPerPage;
  const paginationFavorites = filteredFavorites.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (paginationFavorites.length === 0) {
    return <p className="text-center mt-4">No favorites match your search.</p>;
  }
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 justify-items-center items-center">
      {paginationFavorites.map((item) => {
        const parsedItem = JSON.parse(item[1]);

        if (parsedItem.url.substring(22, 28) === "people") {
          return (
            <div key={item[0]}>
              <Card
                key={item[0]}
                items={[parsedItem]}
                renderItem={() => (
                  <div
                    key={parsedItem.name}
                    className="flex flex-col cursor-pointer"
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
            </div>
          );
        } else {
          return (
            <div key={item[0]}>
              <Card
                items={[parsedItem]}
                key={item[0]}
                renderItem={() => (
                  <div key={parsedItem.name} className="flex flex-col">
                    <h2 className="text-lg font-bold">{parsedItem.name}</h2>
                    <p className="text-sm text-gray-600">
                      Rotation Period: {parsedItem.rotation_period}
                    </p>
                    <p className="text-sm text-gray-600">
                      Orbital Period: {parsedItem.orbital_period}
                    </p>
                    <EntityLink
                      url={parsedItem.url}
                      type="planetsDetails?id="
                      label={
                        <span className="absolute bottom-1 mb-4 rigth-1 flex items-center space-x-1">
                          <span className="text-md text-pink-400">
                            More Details
                          </span>
                          <TfiMore className="self-end " />
                        </span>
                      }
                    />
                  </div>
                )}
              />
            </div>
          );
        }
      })}
    </div>
  );
}
