"use client";
import React, { useEffect, useState } from "react";
import { PeopleProps } from "./types";
import { fetchPeople } from "../service/api";
import { Card } from "../components/card/page";

export default function PeoplePage({}: PeopleProps) {
  const [people, setPeople] = useState<PeopleProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPeople();
        console.log("Fetched data:", data);
        setPeople(data.results || []);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    //console.log("Fetching data...");
  }, []);

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
          <>
            <h2 className="text-lg font-bold">{person.name}</h2>

            <p className="text-sm text-gray-600">
              height:{" "}
              {person.height.length}
            </p>
            <p className="text-sm text-gray-600">
              mass:{" "}
              {person.mass}
            </p>
          </>
        )}
      />
    </div>
  );
}
