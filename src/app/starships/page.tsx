"use client";
import React, { useEffect, useState } from "react";
import { StarshipProps } from "./type";

const StarshipsPage: React.FC = () => {
  const [starships, setStarships] = useState<StarshipProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStarships = async () => {
      try {
        const response = await fetch("https://swapi.dev/api/starships/");
        if (!response.ok) {
          throw new Error("Failed to fetch starships");
        }
        const data = await response.json();
        setStarships(data.results);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchStarships();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Starships</h1>
      <ul>
        {starships.map((starship, index) => (
          <li key={index}>
            <h2>{starship.name}</h2>
            <p>
              <strong>Model:</strong> {starship.model}
            </p>
            <p>
              <strong>Manufacturer:</strong> {starship.manufacturer}
            </p>
            <p>
              <strong>Cost:</strong> {starship.cost_in_credits} credits
            </p>
            <p>
              <strong>Length:</strong> {starship.length} meters
            </p>
            <p>
              <strong>Crew:</strong> {starship.crew}
            </p>
            <p>
              <strong>Passengers:</strong> {starship.passengers}
            </p>
            <p>
              <strong>Class:</strong> {starship.starship_class}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StarshipsPage;
