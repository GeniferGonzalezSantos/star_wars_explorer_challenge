"use client";
import React, { useEffect, useState } from "react";
import { PeopleProps } from "./types";
import { fetchPeople } from "../service/api";
import { Card } from "../components/card/page";
import InputSearch from "../components/input_search/page";
import Pagination from "../components/pagination/page";

export default function PeoplePage() {
  const [people, setPeople] = useState<PeopleProps[]>([]);
  const [filteredPeople, setFilteredPeople] = useState<PeopleProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ItemsPerPage = 3;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPeople();
        console.log("Fetched data:", data);
        setPeople(data.results || []);
        setFilteredPeople(data.results || []);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (query: string) => {
    const filtered = people.filter((person) =>
      person.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPeople(filtered);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredPeople.length / ItemsPerPage);
  const startIndex = (currentPage -1 ) * ItemsPerPage;
  const endIndex = startIndex + ItemsPerPage;
  const currentItems = filteredPeople.slice(startIndex, endIndex);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <InputSearch onSearch={handleSearch} />
      <Card
        title="Star Wars Characters"
        items={currentItems}
        renderItem={(person) => (
          <>
            <h2 className="text-lg font-bold">{person.name}</h2>
            <p className="text-sm text-gray-600">
              Homeworld: {person.homeworld}
            </p>
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
      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={(page) => setCurrentPage(page)} 
      />
    </div>
  );
}
