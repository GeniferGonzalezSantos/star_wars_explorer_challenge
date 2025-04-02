"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchFromApi } from "../service/api";
import { CharacterDetails } from "./types";
import EntityLink from "../components/navigation/page";
import BackButton from "../components/backButton/page";

export default function CharacterDetailsPage() {
  const [character, setCharacter] = useState<CharacterDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const characterId = searchParams.get("id");

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        if (characterId) {
          const data = await fetchFromApi<CharacterDetails>(
            `/people/${characterId}/`
          );
          setCharacter(data);
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCharacterDetails();
  }, [characterId]);

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

  if (!character) {
    return <p>Character not found.</p>;
  }

  return (
    <>
      <BackButton onClick={() => window.history.back()} />
      <div className="p-4 mx-4">
        <h1 className="text-2xl font-bold">{character.name}</h1>
        <p>Height: {character.height}</p>
        <p>Mass: {character.mass}</p>
        <p>Hair Color: {character.hair_color}</p>
        <p>Skin Color: {character.skin_color}</p>
        <p>Eye Color: {character.eye_color}</p>
        <p>Birth Year: {character.birth_year}</p>
        <p>Gender: {character.gender}</p>

        <div className="mt-4">
          <h2 className="text-xl font-bold">Films</h2>
          <ul>
            {character.films.map((filmUrl, index) => (
              <li key={index} className="text-blue-500 cursor-pointer">
                <EntityLink
                  url={filmUrl}
                  type="films?id="
                  label={`Film ${index + 1}`}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4">
          <h2 className="text-xl font-bold">Vehicles</h2>
          <ul>
            {character.vehicles.map((vehicleUrl, index) => (
              <li key={index} className="text-blue-500 cursor-pointer">
                <EntityLink
                  url={vehicleUrl}
                  type="vehicles?id="
                  label={`Vehicles ${index + 1}`}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4">
          <h2 className="text-xl font-bold">Starships</h2>
          <ul>
            {character.starships.map((starshipUrl, index) => (
              <li key={index} className="text-blue-500 cursor-pointer">
                <EntityLink
                  url={starshipUrl}
                  type="starships?id="
                  label={`Startship ${index + 1}`}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
