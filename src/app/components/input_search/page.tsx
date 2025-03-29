import React from "react";
import { SearchInputProps } from "./types";

export default function SearchInput({ value, onChange }: SearchInputProps) {
    return (
      <input
        type="search"
        value={value}
        onChange={onChange}
        placeholder="research a character or planet"
        className="border p-2 rounded"
      />
    );
};
