"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FilmProps } from "./types";
import BackButton from "../components/backButton/page";
import EntityLink from "../components/navigation/page";

const FilmsPage: React.FC = () => {
  const [film, setFilm] = useState<FilmProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const filmId = searchParams.get("id");

  useEffect(() => {
    const fetchFilm = async () => {
      setLoading(true);
      setError(null);
      try {
        if (filmId) {
          const response = await fetch(
            `https://swapi.dev/api/films/${filmId}/`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch film data");
          }
          const data = await response.json();
          setFilm(data);
        } else {
          setError("Film ID not provided");
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFilm();
  }, [filmId]);

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

  if (!film) {
    return <p>Film not found.</p>;
  }

  return (
    <>
      <BackButton onClick={() => window.history.back()} />
      <div className="p-4 mx-4 leading-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h1>
              {film.title} (Episode {film.episode_id})
            </h1>
            <p>
              <span className="underline text-pink-400 font-semibold">
                Director:{" "}
              </span>
              {film.director}
            </p>
            <p>
              <span className="underline text-pink-400 font-semibold">
                Producer:{" "}
              </span>
              {film.producer}
            </p>
            <p>
              <span className="underline text-pink-400 font-semibold">
                Release Date:{" "}
              </span>
              {new Date(film.release_date).toLocaleDateString()}
            </p>

            <div className="mt-4">
              <h2 className="text-xl font-bold">Planets</h2>
              <ul>
                {film.planets.map((planet, index) => (
                  <li key={index} className="text-blue-500 cursor-pointer">
                    <EntityLink
                      url={planet}
                      type="planetsDetails?id="
                      label={`Planet ${index + 1}`}
                    />
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4">
              <h2 className="text-xl font-bold">Starships</h2>
              <ul>
                {film.starships.map((starship, index) => (
                  <li key={index} className="text-blue-500 cursor-pointer">
                    <EntityLink
                      url={starship}
                      type="starships?id="
                      label={`Startship ${index + 1}`}
                    />
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4">
              <h2 className="text-xl font-bold">Vehicles</h2>
              <ul>
                {film.vehicles.map((vehicles, index) => (
                  <li key={index} className="text-blue-500 cursor-pointer">
                    <EntityLink
                      url={vehicles}
                      type="vehicles?id="
                      label={`Vehicles ${index + 1}`}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <div className="mt-4">
              <h2 className="text-xl font-bold">Opening Crawl</h2>
              <select className="w-full md:w-1/2 p-2 mt-2 border border-gray-300 rounded bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                {film.opening_crawl.split("\n").map((line, index) => (
                  <option key={index} value={line}>
                    {line}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-4">
              <h2 className="text-xl font-bold">Characters</h2>
              <ul>
                {film.characters.map((character, index) => (
                  <li key={index} className="text-blue-500 cursor-pointer">
                    <EntityLink
                      url={character}
                      type="charactersDetails?id="
                      label={`Character ${index + 1}`}
                    />
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4">
              <h2 className="text-xl font-bold">Species</h2>
              <ul>
                {film.species.map((species, index) => (
                  <li key={index} className="text-blue-500 cursor-pointer">
                    <EntityLink
                      url={species}
                      type="species?id="
                      label={`Species ${index + 1}`}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilmsPage;