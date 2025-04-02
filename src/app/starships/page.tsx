"use client";
import React, { useEffect, useState } from "react";
import BackButton from "../components/backButton/page";
import { StarshipProps } from "./type";
import { useSearchParams } from "next/navigation";
import EntityLink from "../components/navigation/page";

const StarshipsPage: React.FC = () => {
  const [starships, setStarships] = useState<StarshipProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const vehiclesId = searchParams.get("id");

  useEffect(() => {
    const fetchStarships = async () => {
      try {
        if (vehiclesId) {
          const response = await fetch(
            `https://swapi.dev/api/starships/${vehiclesId}/`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch starships");
          }
          const data = await response.json();
          setStarships(data);
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchStarships();
  }, [vehiclesId]);

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

  return (
    <>
      <BackButton onClick={() => window.history.back()} />
      <div className="p-4 mx-4 leading-6">
        <h1>Starships</h1>
        <ul>
          {starships && (
            <>
              <li key={starships.name} className="m-4">
                <h2>{starships.name}</h2>
                <p className="tracking-widest leading-6">
                  <span className="underline racking-widest leading-6 text-pink-400 font-semibold">
                    Model:
                  </span>{" "}
                  {starships.model}
                </p>
                <p className="tracking-widest leading-6">
                  <span className="underline racking-widest leading-6 text-pink-400 font-semibold">
                    Manufacturer:
                  </span>{" "}
                  {starships.manufacturer}
                </p>
                <p className="tracking-widest leading-6">
                  <span className="underline racking-widest leading-6 text-pink-400 font-semibold">
                    Cost:
                  </span>{" "}
                  {starships.cost_in_credits} credits
                </p>
                <p className="tracking-widest leading-6">
                  <span className="underline racking-widest leading-6 text-pink-400 font-semibold">
                    Length:
                  </span>{" "}
                  {starships.length} meters
                </p>
                <p className="tracking-widest leading-6">
                  <span className="underline racking-widest leading-6 text-pink-400 font-semibold">
                    Crew:
                  </span>{" "}
                  {starships.crew}
                </p>
                <p className="tracking-widest leading-6">
                  <span className="underline racking-widest leading-6 text-pink-400 font-semibold">
                    Passengers:
                  </span>{" "}
                  {starships.passengers}
                </p>
                <p className="tracking-widest leading-6">
                  <span className="underline racking-widest leading-6 text-pink-400 font-semibold">
                    Class:
                  </span>{" "}
                  {starships.starship_class}
                </p>
              </li>
            </>
          )}
          <div className="m-4">
          <h2>Films</h2>
          {starships?.films?.map((filmUrl, index) => (
            <li key={index} className="text-blue-500 cursor-pointer">
              <EntityLink
                url={filmUrl}
                type="films?id="
                label={`Film ${index + 1}`}
              />
            </li>
          ))}
          </div>
        </ul>
      </div>
    </>
  );
};

export default StarshipsPage;
