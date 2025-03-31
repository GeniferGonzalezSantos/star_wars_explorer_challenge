"use client";
import React, { useEffect } from "react";
import { PeopleProps, PeopleResult } from "./types";
import { Card } from "../components/card/page";
import { FavoriteButton } from "../components/favoriteButton/page";
import { useApiData } from "../service/api";

export default function PeoplePage({
  currentPage,
  onTotalPagesChange,
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
        title="Star Wars Characters"
        items={people}
        renderItem={(person) => (
          <div key={person.name} className="p-4 border rounded shadow">
            <FavoriteButton itemName={person.name} />
            <h2 className="text-lg font-bold">{person.name}</h2>
            <p className="text-sm text-gray-600">Height: {person.height}</p>
            <p className="text-sm text-gray-600">Mass: {person.mass}</p>
          </div>
        )}
      />
    </div>
  );
}
