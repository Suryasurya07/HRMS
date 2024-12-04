// src/components/HR/MapRadiusSetter.js

import React, { useState } from 'react';
import { MapContainer, TileLayer, Circle, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapRadiusSetter = () => {
  // Set initial center to the specified location
  const initialCenter = [11.0032367, 76.9758161]; // Coordinates for the map center
  const [center, setCenter] = useState(initialCenter);
  const [radius, setRadius] = useState(100); // Default radius in meters

  // Custom hook to handle map events
  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        setCenter([e.latlng.lat, e.latlng.lng]);
      },
    });
    return null;
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Set Workplace Radius</h2>
      <label>
        Radius (in meters):
        <input
          type="number"
          value={radius}
          onChange={(e) => setRadius(Number(e.target.value))}
          className="ml-2 p-1 rounded border"
        />
      </label>
      <MapContainer center={center} zoom={13} style={{ height: '400px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapClickHandler />
        <Circle center={center} radius={radius} color="blue" fillOpacity={0.2} />
      </MapContainer>
    </div>
  );
};

export default MapRadiusSetter;
