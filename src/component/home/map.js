import React from "react";
import styles from "@/styles/division.module.css";
import { faStreetView } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  MapContainer,
  TileLayer,
  Polygon,
  Tooltip,
  Marker,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { divisionCoordinates } from "@/constant/divisionCoordinates";
import { divisionArea } from "@/constant";

const DensityMap = ({ division, year, child, populations }) => {
  const center = [23.685, 90.3563];

  // Calculate max density
  let maxDensity = 0;
  const density = [];
  division.forEach((data, index) => {
    const area = divisionArea[index];
    const populationDensity = data.population / area;
    if (populationDensity > maxDensity) {
      maxDensity = populationDensity;
    }
    density.push(populationDensity);
  });

  // Function to calculate color based on density
  const getColorForDensity = (den) => {
    const opacity = den / maxDensity;

    if (opacity > 0 && opacity < 0.4) return `rgba(128, 0, 32, ${opacity})`;
    else if (opacity >= 0.4 && opacity < 0.5)
      return `rgba(128, 0, 0, ${opacity})`;
    else if (opacity >= 0.5 && opacity < 0.6)
      return `rgba(178, 34, 34, ${opacity})`;
    else if (opacity >= 0.6) return `rgba(139, 0, 0, ${opacity})`;

    return `rgba(0, 0, 0, ${opacity})`;
  };

  return (
    <div className={styles.mapWrapper}>
      <div className={styles.title}>
        <FontAwesomeIcon icon={faStreetView} />
        <h3>Density of Population</h3>
      </div>
      <div className={styles.mapContainer}>
        {typeof window !== "undefined" && (
          <MapContainer
            center={center}
            zoom={7}
            style={{ width: "100%", height: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {divisionCoordinates.features.map((data, index) => {
              const coordinates = data.geometry.coordinates.map((item) => [
                item[1],
                item[0],
              ]);

              const fillColor = getColorForDensity(density[index]);

              return (
                <Polygon
                  key={data.properties.name}
                  pathOptions={{
                    fillColor: fillColor,
                    weight: 2,
                    opacity: 1,
                    fillOpacity: 0.8,
                    dashArray: 3,
                    color: "white",
                  }}
                  positions={coordinates}
                >
                  <Tooltip opacity={1}>
                    {data.properties.name} <br />
                    {density[index]?.toFixed(0)} per km²
                  </Tooltip>
                </Polygon>
              );
            })}

            <Marker position={[25.19953765242269, 91.0140927816002]}>
              <Tooltip direction="top" offset={[0, 20]} opacity={1} permanent>
                <div className={styles.mapDes}>
                  <span>
                    Overall density: {(populations / 148460).toFixed(0)} (km²)
                  </span>
                  <span>{`For Year: ${year} & Child: ${child}`}</span>
                </div>
              </Tooltip>
            </Marker>
          </MapContainer>
        )}
      </div>
    </div>
  );
};

export default DensityMap;
