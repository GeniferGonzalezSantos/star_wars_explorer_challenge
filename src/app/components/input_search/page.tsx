import React from "react";
import { SearchInputProps } from "./types";
import { BiSearchAlt } from "react-icons/bi";

export default function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div className="relative w-full max-w-4xl">
      <div className="flex items-center border rounded w-full h-16 sm:w-3/4 md:w-1/2">
        <input
          type="search"
          value={value}
          onChange={onChange}
          placeholder="research a character or planet"
          className="flex-grow p-4 h-full rounded-l outline-none"
        />
        <BiSearchAlt className="text-gray-500 mr-4" size={24} />
      </div>
    </div>
  );
}