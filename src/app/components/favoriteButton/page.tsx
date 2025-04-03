import React, { useEffect } from "react";
import { FavoriteButtonProps } from "./types";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({ itemName }) => {
  const [isFavorite, setIsFavorite] = React.useState(false);

  useEffect(() => {
    const storedFavorites: [string, string][] = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setIsFavorite( 
      storedFavorites.some(
      (fav) => fav[0] === itemName[0] && fav[1] === itemName[1]
    )
  );
  }, [itemName]);

  const toggleFavorite = () => {
    const storedFavorites: [string, string][] = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    let updatedFavorites;
    if (isFavorite) {
      updatedFavorites = storedFavorites.filter(
        (fav) => fav[0] !== itemName[0] || fav[1] !== itemName[1]
      );
    } else {
      updatedFavorites = [...storedFavorites, itemName];
    }
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <button
      className={"absolute top-2 right-2 items-center justify-items-end"}
      onClick={toggleFavorite}
    >
      {!isFavorite ? <MdFavoriteBorder size={32} /> : <MdFavorite className="text-pink-500" size={32}/>}
    </button>
  );
};
