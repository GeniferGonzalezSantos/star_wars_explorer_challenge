"use client";
import React, { useState } from "react";
import { Card } from "./components/card/page";
import SearchInput from "./components/input_search/page";
import Pagination from "./components/pagination/page";
import PeoplePage from "./people/page";
import PlanetsPage from "./planets/page";
import FavoritesPage from "./favorite/page";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activePage, setActivePage] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  const renderPage = () => {
    switch (activePage) {
      case "Character":
        return (
          <PeoplePage
            currentPage={currentPage}
            onTotalPagesChange={setTotalPages}
            searchQuery={searchQuery}
          />
        );
      case "Planets":
        return (
          <PlanetsPage
            currentPage={currentPage}
            onTotalPagesChange={setTotalPages}
            searchQuery={searchQuery}
          />
        );
      case "Favorites":
        return (
          <FavoritesPage
            name="Favorites"
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        );
      default:
        return <p>Select a category to explore</p>;
    }
  };

  return (
    <div
      className="grid grid-rows-[25px_1fr_25px] items-center 
    justify-items-center gap-16 
    font-[family-name:var(--font-Orbitron-sans)]"
    >
      <header className="row-start-1">
        {activePage !== "" && (
          <>
            <button
              onClick={() => setActivePage("")}
              className="text-white rounded m-4 underline hover:bg-gray-700 absolute left-0 top-0 h-16 w-16"
            >
              Voltar
            </button>
            <SearchInput
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </>
        )}
      </header>
      <main className="flex flex-col gap-[32px] row-start-2 items-center">
        {activePage === "" && (
          <Card
            items={["Character", "Planets", "Favorites"]}
            renderItem={(item: string) => (
              <div
                onClick={() => setActivePage(item)}
                className="cursor-pointer"
              >
                {item}
              </div>
            )}
          />
        )}
        {renderPage()}
      </main>
      <footer className="row-start-3">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </footer>
    </div>
  );
}
