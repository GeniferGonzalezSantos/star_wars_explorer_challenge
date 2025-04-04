export interface FavoritesPageProps {
  name: string;
  searchQuery: string;
  currentPage: number;
  onTotalPagesChange: (totalPages: number) => void;
}
