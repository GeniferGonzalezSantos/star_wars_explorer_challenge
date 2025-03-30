import { useEffect, useState, useMemo } from "react";
import { fetchFromApi } from "../service/api";

export function useFetchData<T extends { name: string }>(
  endpoint: string,
  currentPage: number,
  itemsPerPage = 3,
  searchQuery: string,
  filterFunction?: (item: T) => boolean
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [rawData, setRawData] = useState<T[]>([]);

  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearchQuery(searchQuery), 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchFromApi<{ results: T[]; count: number }>(
          `${endpoint}`
        );
        setRawData(response.results);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  const filteredData = useMemo(() => {
    const filtered = rawData.filter((item) => {
      const matchesSearchQuery = item.name
        .toLowerCase()
        .includes(debouncedSearchQuery.toLowerCase());
      return filterFunction
        ? filterFunction(item) && matchesSearchQuery
        : matchesSearchQuery;
    });

    setTotalPages(Math.ceil(filtered.length / itemsPerPage));

    const startIndex = (currentPage - 1) * itemsPerPage;
    return filtered.slice(startIndex, startIndex + itemsPerPage);
  }, [
    rawData,
    debouncedSearchQuery,
    filterFunction,
    currentPage,
    itemsPerPage,
  ]);

  useEffect(() => {
    setData(filteredData);
  }, [filteredData]);

  return { data, loading, error, totalPages };
}
