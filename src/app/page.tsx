"use client";
import React, { useState} from "react";
import { Card } from "./components/card/page";
import SearchInput from "./components/input_search/page";
import Pagination from "./components/pagination/page";
import PeoplePage from "./people/page";
//import PlanetsPage from "./planets/page";
// import FavoritesPage from "./favorites/page";


export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activePage, setActivePage] = useState("All");

  const renderPage = () => {
    switch (activePage) {
      case "Character":
        return <PeoplePage searchQuery={searchQuery} currentPage={currentPage} name="" height="" mass="" />;
      case "Planet":
        // return <PlanetsPage searchQuery={searchQuery} currentPage={currentPage} />;
      case "Favorites":     
        // return <FavoritesPage />;
      default:
        return <p>Select a category to explore</p>
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen gap-16 font-[family-name:var(--font-Orbitron-sans)]">
      <header className="row-start-1">
        <SearchInput value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      </header>
      <main className="flex flex-col gap-[32px] row-start-2 items-center">
        {activePage === "All" && (
          <Card
          items={["All", "Character", "Planets", "Favorites"]}
          renderItem={(item: string) => (
            <div
              onClick={() => setActivePage(item)}
              className="cursor-pointer"
            >
              {item}
            </div>
          )}
        />
        )
          }
        
        {renderPage()}
      </main>
      <footer className="row-start-3">
        <Pagination currentPage={currentPage} totalPages={5} onPageChange={setCurrentPage} />
      </footer>

    </div>
  );
};
