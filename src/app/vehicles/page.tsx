"use client";
import React, { useEffect, useState } from "react";
import { Vehicle } from "./types";
import BackButton from "../components/backButton/page";
import { useSearchParams } from "next/navigation";
import EntityLink from "../components/navigation/page";

const VehiclesPage: React.FC = () => {
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const vehiclesId = searchParams.get("id");

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        if (vehiclesId) {
          const response = await fetch(
            `https://swapi.dev/api/vehicles/${vehiclesId}/`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch vehicles");
          }
          const data = await response.json();
          setVehicle(data);
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, [vehiclesId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-5xl mx-4">Loading...</h1>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <BackButton onClick={() => window.history.back()} />
      <div className="p-4 mx-4 leading-6">
        <h1>Vehicles</h1>
        <ul>
          {vehicle && (
            <>
              <li className="m-4">
                <h2>{vehicle.name}</h2>
                <p className="tracking-widest leading-6">
                  <span className="underline racking-widest leading-6 text-pink-400 font-semibold">
                    Model:
                  </span>
                  {vehicle.model}
                </p>
                <p className="tracking-widest leading-6">
                  <span className=" racking-widest leading-6 underline text-pink-400 font-semibold">
                    Manufacturer:
                  </span>
                  {vehicle.manufacturer}
                </p>
                <p className="tracking-widest leading-6">
                  <span className="underline racking-widest leading-6 text-pink-400 font-semibold">
                    Cost:
                  </span>
                  {vehicle.cost_in_credits}
                </p>
                <p className="tracking-widest leading-6">
                  <span className="underline racking-widest leading-6 text-pink-400 font-semibold">
                    Length:
                  </span>
                  {vehicle.length}
                </p>
                <p className="tracking-widest leading-6">
                  <span className="underline racking-widest leading-6 text-pink-400 font-semibold">
                    Max Speed:
                  </span>
                  {vehicle.max_atmosphering_speed}
                </p>
                <p className="tracking-widest leading-6">
                  <span className="underline racking-widest leading-6 text-pink-400 font-semibold">
                    Crew:
                  </span>
                  {vehicle.crew}
                </p>
                <p className="tracking-widest leading-6">
                  <span className="underline racking-widest leading-6 text-pink-400 font-semibold">
                    Passengers:
                  </span>
                  {vehicle.passengers}
                </p>
                <p className="tracking-widest leading-6">
                  <span className="underline racking-widest leading-6 text-pink-400 font-semibold">
                    Cargo Capacity:
                  </span>
                  {vehicle.cargo_capacity}
                </p>
                <p className="tracking-widest leading-6">
                  <span className="underline racking-widest leading-6 text-pink-400 font-semibold">
                    Consumables:
                  </span>
                  {vehicle.consumables}
                </p>
                <p className="tracking-widest leading-6">
                  <span className="underline racking-widest leading-6 text-pink-400 font-semibold">
                    Class:
                  </span>
                  {vehicle.vehicle_class}
                </p>
              </li>
              <div className="mt-4 tracking-widest leading-6">
                <h2 className="text-xl font-bold">Films</h2>
                <ul>
                  {vehicle.films.map((filmUrl, index) => (
                    <li key={index} className="text-blue-500 cursor-pointer">
                      <EntityLink
                        url={filmUrl}
                        type="films?id="
                        label={`Film ${index + 1}`}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default VehiclesPage;
