"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import BackButton from "../components/backButton/page";
import EntityLink from "../components/navigation/page";
import { SpeciesProps } from "./types";

const SpeciesPage: React.FC = () => {
  const [species, setSpecies] = useState<SpeciesProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const speciesId = searchParams.get("id");

  useEffect(() => {
    const fetchSpecies = async () => {
      setLoading(true);
      setError(null);
      try {
        if (speciesId) {
          const response = await fetch(
            `https://swapi.dev/api/species/${speciesId}/`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch species data");
          }
          const data = await response.json();
          setSpecies(data);
        } else {
          setError("Species ID not provided");
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSpecies();
  }, [speciesId]);

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

  if (!species) {
    return <p>Species not found.</p>;
  }

  return (
    <>
      <BackButton onClick={() => window.history.back()} />
      <div className="p-4 mx-4 leading-6">
        <h1 className="text-2xl font-bold">{species.name}</h1>
        <p>
          <span className="underline text-pink-400 font-semibold">
            Classification:{" "}
          </span>
          {species.classification}
        </p>
        <p>
          <span className="underline text-pink-400 font-semibold">
            Designation:{" "}
          </span>
          {species.designation}
        </p>
        <p>
          <span className="underline text-pink-400 font-semibold">
            Average Height:{" "}
          </span>
          {species.average_height}
        </p>
        <p>
          <span className="underline text-pink-400 font-semibold">
            Skin Colors:{" "}
          </span>
          {species.skin_colors}
        </p>
        <p>
          <span className="underline text-pink-400 font-semibold">
            Hair Colors:{" "}
          </span>
          {species.hair_colors}
        </p>
        <p>
          <span className="underline text-pink-400 font-semibold">
            Eye Colors:{" "}
          </span>
          {species.eye_colors}
        </p>
        <p>
          <span className="underline text-pink-400 font-semibold">
            Average Lifespan:{" "}
          </span>
          {species.average_lifespan}
        </p>
        <p>
          <span className="underline text-pink-400 font-semibold">
            Language:{" "}
          </span>
          {species.language}
        </p>
        <p>
          <span className="underline text-pink-400 font-semibold">
            Homeworld:{" "}
          </span>
          {species.homeworld ? (
            <EntityLink
              url={species.homeworld}
              type="planetsDetails?id="
              label="Homeworld"
            />
          ) : (
            "Unknown"
          )}
        </p>

        <div className="mt-4">
          <h2 className="text-xl font-bold">People</h2>
          <ul>
            {species.people.map((person, index) => (
              <li key={index} className="text-blue-500 cursor-pointer">
                <EntityLink
                  url={person}
                  type="charactersDetails?id="
                  label={`Character ${index + 1}`}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4">
          <h2 className="text-xl font-bold">Films</h2>
          <ul>
            {species.films.map((film, index) => (
              <li key={index} className="text-blue-500 cursor-pointer">
                <EntityLink
                  url={film}
                  type="films?id="
                  label={`Film ${index + 1}`}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SpeciesPage;
