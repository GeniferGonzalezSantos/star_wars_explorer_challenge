import { PeopleProps } from "../people/types";

const BASE_URL = "https://swapi.dev/api";

export async function fetchFromApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
    throw error;
  }
}

export async function fetchPeople() {
  return fetchFromApi<{ results: PeopleProps[] }>("/people");
}

// export async function fetchPlanets() {
//   return fetchFromApi<{ results: any[] }>("/planets");
//}
