import React from "react";
import { CardProps } from "./types";

export const Card = <T,>({ items = [], renderItem, title }: CardProps<T>) => {
  return (
    <div>
      {title && <h1 className="text-2xl font-bold mb-4">{title}</h1>}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            {renderItem(item)}
          </div>
        ))}
      </div>
    </div>
  );
};
