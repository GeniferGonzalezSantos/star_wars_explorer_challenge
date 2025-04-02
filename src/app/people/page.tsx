"use client";
import React, { useEffect } from "react";
import { PeopleProps, PeopleResult } from "./types";
import { Card } from "../components/card/page";
import { FavoriteButton } from "../components/favoriteButton/page";
import { TfiMore } from "react-icons/tfi";
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
        items={people}
        renderItem={(person) => (
          <div
            key={person.name}
            className="flex justify-items-stretch items-stretch flex-col cursor-pointer"
          >
            <FavoriteButton itemName={person.name} />
            <h2 className="text-xl font-bold overflow-ellipsis overflow-hidden">
              {person.name}
            </h2>
            <p className="text-md text-gray-200">Height: {person.height}</p>
            <p className="text-md text-gray-200">Mass: {person.mass}</p>
            <EntityLink
              url={person.url}
              type="charactersDetails?id="
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
