import React from "react";
import { CardProps } from "./types";

export const Card = <T,>({ items = [], renderItem, title }: CardProps<T>) => {
  return (
    <div className="flex items-center justify-items-center">
      {title && <h1 className="text-2xl font-bold mb-4">{title}</h1>}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="p-4 text-base rounded-lg 
            shadow-md hover:shadow-lg transition-shadow flex
            items-center justify-center filter drop-shadow
            border-double border-4 border-light-white-500"
            style={{ height: "21.75rem", width: "17.25rem" }}
          >
            {renderItem(item)}
          </div>
        ))}
      </div>
    </div>
  );
};
