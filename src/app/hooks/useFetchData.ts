import { useEffect, useState } from "react";
import { fetchFromApi } from "../service/api";

export function useFetchData<T>(
  endpoint: string,
  currentPage: number,
  itemsPerPage = 3,
  filterFunction?: (item: T) => boolean
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchFromApi<{ results: T[]; count: number }>(
          `${endpoint}?page=${currentPage}`
        );

        const filteredData = filterFunction
          ? response.results.filter(filterFunction)
          : response.results;

        setTotalPages(Math.ceil(filteredData.length / itemsPerPage));

        const startIndex = (currentPage - 1) * itemsPerPage;
        const paginatedData = filteredData.slice(
          startIndex,
          startIndex + itemsPerPage
        );
        setData(paginatedData);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, currentPage, itemsPerPage, filterFunction]);

  return { data, loading, error, totalPages };
}
