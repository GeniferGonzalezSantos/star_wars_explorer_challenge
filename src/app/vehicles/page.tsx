"use client";
import React, { useEffect, useState } from 'react';
import { Vehicle } from './types';

const VehiclesPage: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch('https://swapi.dev/api/vehicles/');
        if (!response.ok) {
          throw new Error('Failed to fetch vehicles');
        }
        const data = await response.json();
        setVehicles(data.results);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Vehicles</h1>
      <ul>
        {vehicles.map((vehicle, index) => (
          <li key={index}>
            <h2>{vehicle.name}</h2>
            <p><strong>Model:</strong> {vehicle.model}</p>
            <p><strong>Manufacturer:</strong> {vehicle.manufacturer}</p>
            <p><strong>Cost:</strong> {vehicle.cost_in_credits}</p>
            <p><strong>Length:</strong> {vehicle.length}</p>
            <p><strong>Max Speed:</strong> {vehicle.max_atmosphering_speed}</p>
            <p><strong>Crew:</strong> {vehicle.crew}</p>
            <p><strong>Passengers:</strong> {vehicle.passengers}</p>
            <p><strong>Cargo Capacity:</strong> {vehicle.cargo_capacity}</p>
            <p><strong>Consumables:</strong> {vehicle.consumables}</p>
            <p><strong>Class:</strong> {vehicle.vehicle_class}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VehiclesPage;