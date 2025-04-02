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
  onTotalPagesChange,
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

  if (!Array.isArray(planets) || planets.length === 0) {
    return <p>No planets found.</p>;
  }

  return (
    <div>
      <Card
        items={planets}
        renderItem={(p) => (
          <div
            key={p.name}
            className="flex justify-items-stretch items-stretch flex-col"
          >
            <FavoriteButton itemName={p.name} />
            <h2 className="text-lg font-bold">{p.name}</h2>
            <p className="text-sm text-gray-600">
              Rotation Period: {p.rotation_period}
            </p>
            <p className="text-sm text-gray-600">
              Orbital Period: {p.orbital_period}
            </p>
            <EntityLink
              url={p.url}
              type="planetsDetails?id="
              label={
                <span className="absolute bottom-1 mb-4 rigth-1 flex items-center space-x-1">
                  <span className="text-md text-pink-400">More Details</span>
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
