import React from "react";
import { SearchInputProps } from "./types";
import { BiSearchAlt } from "react-icons/bi";

export default function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div className="relative w-full max-w-4xl">
      <BiSearchAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={24}/>
    <input
      type="search"
      value={value}
      onChange={onChange}
      placeholder="research a character or planet"
      className="border p-4 pl-12 rounded w-full h-16 sm:w-3/4 md:w-1/2"
      />
    </div>
  );
}
