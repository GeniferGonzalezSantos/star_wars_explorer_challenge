import React from "react";
import { CardProps } from "./types";


export function Card() {
  const cards: CardProps[] = [
    {
      title: "Characters",
      description: "87 characters",
      imageUrl: "/characters"
    },
    {
        title: "Planets",
        description: "60 planets",
        imageUrl: "/planets"
    },
    {
        title: "Starships",
        description: "37 starships",
        imageUrl: "/starships"
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
    {cards.map((card) => (
      <a key={card.title} href={card.imageUrl} className="card">
        <div className="p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-lg font-bold">{card.title}</h2>
          <p className="text-sm text-gray-600">{card.description}</p>
        </div>
      </a>
    ))}
    </div>
  );
}
