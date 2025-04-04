"use client";
import React, { useEffect } from "react";
import { PlanetsProps, PlanetsResult } from "./types";
import { Card } from "../components/card/page";
import { FavoriteButton } from "../components/favoriteButton/page";
import { useApiData } from "../service/api";
import EntityLink from "../components/navigation/page";
import { TfiMore } from "react-icons/tfi";

export default function PlanetsPage({
  currentPage,
  onTotalPagesChange = () => {},
  searchQuery,
}: PlanetsProps) {
  const {
    data: planets,
    loading,
    error,
    totalPages,
  } = useApiData<PlanetsResult>("/planets", currentPage, 3, searchQuery);

  useEffect(() => {
    if (totalPages !== undefined) {
      onTotalPagesChange(totalPages);
    }
  }, [totalPages, onTotalPagesChange]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-5xl mx-4">Loading...</h1>
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <Card
        items={planets}
        renderItem={(planet) => (
          <div
            key={planet.name}
            className="flex justify-items-stretch items-stretch flex-col cursor-pointer"
          >
            <FavoriteButton itemName={[planet.name, JSON.stringify(planet)]} />
            <h2 className="text-xl font-bold overflow-ellipsis overflow-hidden">
              {planet.name}
            </h2>
            <p className="text-md text-gray-200">
              Rotation Period: {planet.rotation_period}
            </p>
            <p className="text-md text-gray-200">
              Orbital Period: {planet.orbital_period}
            </p>
            <EntityLink
              url={planet.url}
              type="planetsDetails?id="
              label={
                <span className="absolute bottom-1 mb-4 rigth-1 flex items-center space-x-1">
                  <span className="text-md text-pink-400">More Details</span>
                  <TfiMore className="self-end" />
                </span>
              }
            />
          </div>
        )}
      />
    </div>
  );
}
