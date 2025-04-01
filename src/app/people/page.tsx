"use client";
import React, { useEffect } from "react";
import { PeopleProps, PeopleResult } from "./types";
import { Card } from "../components/card/page";
import { FavoriteButton } from "../components/favoriteButton/page";
import { useApiData } from "../service/api";
import EntityLink from "../components/navigation/page";

export default function PeoplePage({
  currentPage,
  onTotalPagesChange = () => {},
  searchQuery,
}: PeopleProps) {
  const {
    data: people,
    loading,
    error,
    totalPages,
  } = useApiData<PeopleResult>("/people", currentPage, 3, searchQuery);

  useEffect(() => {
    if (totalPages !== undefined) {
      onTotalPagesChange(totalPages);
    }
  }, [totalPages, onTotalPagesChange]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <Card
        items={people}
        renderItem={(person) => (
          <div
            key={person.name}
            className="flex justify-items-stretch items-stretch flex-col cursor-pointer"
          >
            <FavoriteButton itemName={person.name} />
            <h2 className="text-lg font-bold">{person.name}</h2>
            <p className="text-sm text-gray-600">Height: {person.height}</p>
            <p className="text-sm text-gray-600">Mass: {person.mass}</p>
            <EntityLink
              url={person.url}
              type="charactersDetails?id="
              label="More Details"
            />
          </div>
        )}
      />
    </div>
  );
}
