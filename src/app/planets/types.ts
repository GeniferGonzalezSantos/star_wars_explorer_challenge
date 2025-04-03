export interface PlanetsProps {
  currentPage: number;
  onTotalPagesChange: (totalPages: number) => void;
  searchQuery: string;
  data: string[];
}

export interface Planet {
  count: number;
  next: string;
  previous: null;
  results: PlanetsResult[];
}

export interface PlanetsResult {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}
