"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import EntityLink from "../components/navigation/page";
import { Planet } from "./types";
import BackButton from "../components/backButton/page";

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
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-5xl mx-4">Loading...</h1>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!planet) {
    return <div>No planet found</div>;
  }

  return (
    <>
      <BackButton onClick={() => window.history.back()} />
      <div className="p-4 mx-4">
        <h1 className="text-2xl font-bold mb-4">{planet.name} Details</h1>
        <p>Rotation Period: {planet.rotation_period}</p>
        <p>Orbital Period: {planet.orbital_period}</p>
        <p>Diameter: {planet.diameter}</p>
        <p>Climate: {planet.climate}</p>
        <p>Gravity: {planet.gravity}</p>
        <p>Terrain: {planet.terrain}</p>
        <p>Surface Water: {planet.surface_water}</p>
        <p>Population: {planet.population}</p>
        <p>Residents:</p>
        <ul>
          {planet.residents.length > 0 ? (
            planet.residents.map((residentUrl, index) => {
              return (
                <li key={index} className="text-blue-500 cursor-pointer">
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
        <p>Films:</p>
        <ul>
          {planet.films.length > 0 ? (
            planet.films.map((filmUrl, index) => {
              return (
                <>
                  <li key={index} className="text-blue-500 cursor-pointer">
                    <EntityLink
                      url={filmUrl}
                      type="films?id="
                      label={`Film ${index + 1}`}
                    />
                  </li>
                </>
              );
            })
          ) : (
            <li>None</li>
          )}
        </ul>
      </div>
    </>
  );
};

export default PlanetsDetailsPage;
