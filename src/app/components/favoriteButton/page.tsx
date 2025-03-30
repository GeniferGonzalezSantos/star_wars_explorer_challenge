import React, { useEffect } from "react";
import { FavoriteButtonProps } from "./types";

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({ itemName }) => {
  const [isFavorite, setIsFavorite] = React.useState(false);

  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setIsFavorite(storedFavorites.includes(itemName));
  }, [itemName]);

  const toggleFavorite = () => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    let updatedFavorites;

    if (isFavorite) {
      updatedFavorites = storedFavorites.filter(
        (fav: string) => fav !== itemName
      );
    } else {
      updatedFavorites = [...storedFavorites, itemName];
    }
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <button
      className={`mt-2 px-4 py-2 rounded ${
        isFavorite ? "bg-red-500 text-white" : "bg-gray-200 text-black"
      }`}
      onClick={toggleFavorite}
    >
      {isFavorite ? "Unfavorite" : "Favorite"}
    </button>
  );
};
