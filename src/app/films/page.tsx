"use client";
import React, { useEffect, useState } from "react";
import { FilmProps } from "./types";

const FilmsPage: React.FC = () => {
  const [films, setFilms] = useState<FilmProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await fetch("https://swapi.dev/api/films/");
        const data = await response.json();
        setFilms(data.results);
      } catch (error) {
        console.error("Error fetching films:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilms();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Star Wars Films</h1>
      <ul>
        {films.map((film) => (
          <li key={film.episode_id}>
            <h2>
              {film.title} (Episode {film.episode_id})
            </h2>
            <p>Director: {film.director}</p>
            <p>Producer: {film.producer}</p>
            <p>
              Release Date: {new Date(film.release_date).toLocaleDateString()}
            </p>
            <details>
              <summary>Opening Crawl</summary>
              <p>{film.opening_crawl}</p>
            </details>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilmsPage;
