import React, { useState } from "react";
import { InputSearchProps } from "./types";

export default function InputSearch({ onSearch }: InputSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="w-full max-w-[400px]">
      <input
        type="search"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="research a character or planet"
        className="w-full px-4 py-2 text-sm text-gray-800 placeholder-gray-400 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
};
