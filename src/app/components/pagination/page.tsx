import React from "react";
import { PaginationProps } from "./types";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {

  return (
    <div className="flex justify-center items-center gap-4 mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 border rounded"
      >
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 border rounded"
      >
        Next
      </button>
    </div>
  );
}
