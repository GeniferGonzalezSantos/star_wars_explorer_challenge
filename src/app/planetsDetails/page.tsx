"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import EntityLink from "../components/navigation/page";
import { Planet } from "./types";

const PlanetsDetailsPage: React.FC = () => {
  const searchParams = useSearchParams();
  const planetId = searchParams.get("id");
  const [planet, setPlanet] = useState<Planet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!planetId) {
      setError("No planet ID provided");
      setLoading(false);
      return;
    }

    const fetchPlanet = async () => {
      try {
        const response = await fetch(
          `https://swapi.dev/api/planets/${planetId}/`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch planet details");
        }
        const data = await response.json();
        setPlanet(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPlanet();
  }, [planetId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!planet) {
    return <div>No planet found</div>;
  }

  return (
    <div>
      <h1>{planet.name} Details</h1>
      <p>
        <strong>Rotation Period:</strong> {planet.rotation_period}
      </p>
      <p>
        <strong>Orbital Period:</strong> {planet.orbital_period}
      </p>
      <p>
        <strong>Diameter:</strong> {planet.diameter}
      </p>
      <p>
        <strong>Climate:</strong> {planet.climate}
      </p>
      <p>
        <strong>Gravity:</strong> {planet.gravity}
      </p>
      <p>
        <strong>Terrain:</strong> {planet.terrain}
      </p>
      <p>
        <strong>Surface Water:</strong> {planet.surface_water}
      </p>
      <p>
        <strong>Population:</strong> {planet.population}
      </p>
      <p>
        <strong>Residents:</strong>
      </p>
      <ul>
        {planet.residents.length > 0 ? (
          planet.residents.map((residentUrl, index) => {
            return (
              <li key={index}>
                <EntityLink
                  url={residentUrl}
                  type="charactersDetails?id="
                  label={`Resident ${index + 1}`}
                />
              </li>
            );
          })
        ) : (
          <li>None</li>
        )}
      </ul>
      <p>
        Films:
      </p>
      <ul>
        {planet.films.length > 0 ? (
          planet.films.map((filmUrl, index) => {
            return (
              <li key={index}>
                <EntityLink
                  url={filmUrl}
                  type="films?id="
                  label={`Film ${index + 1}`}
                />
              </li>
            );
          })
        ) : (
          <li>None</li>
        )}
      </ul>
    </div>
  );
};

export default PlanetsDetailsPage;
