import React from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import statedata from "./india_district.json";

function MapComponent({ data, district, handleDistrict, selectedDistrict }) {
  if (!data) return <></>;
  // const [selectedDistrict, setSelectedDistrict] = useState('Alappuzha');

  function getColor(addictionLevel) {
    if (addictionLevel < 800) {
      return "green";
    } else if (addictionLevel < 900) {
      return "yellow";
    } else if (addictionLevel < 1000) {
      return "orange";
    } else if (addictionLevel < 1100) {
      return "brown";
    } else {
      return "red";
    }
  }

  function style(feature) {
    const district_name = feature.properties.NAME_2;
    const obj = data[district.indexOf(district_name)];
    console.log(data);
    const addictionLevel =
      obj.substanceUsed[0].bar +
      obj.substanceUsed[1].bar +
      obj.substanceUsed[2].bar +
      obj.substanceUsed[3].bar;

    const color = getColor(addictionLevel);

    return {
      fillColor: color,
      fillOpacity: 0.3,
      color: "black",
      weight: 1,
    };
  }

  function handleDistrictClick(event) {
    const districtName = event.layer.feature.properties.NAME_2;
    handleDistrict(districtName);
  }

  const geoJsonLayers = [];
  for (let index = 0; index < 14; index++) {
    geoJsonLayers.push(
      <GeoJSON
        key={index}
        data={statedata.features[index]}
        style={style}
        eventHandlers={{
          click: (event) => handleDistrictClick(event),
          // click: (event) => handleDistrict,
        }}
      />
    );
  }

  return (
    <div style={{ height: "100%", width: "100%", transform: "rotate(90deg)" }}>
      <MapContainer
        center={[10.8505, 76.2711]}
        zoom={8}
        style={{ height: "100%", width: "100%", transform: "rotate(-90deg)" }}
      >
        <TileLayer url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=0N1JdnQUtV4h7tKLX5fT" />
        {geoJsonLayers}
      </MapContainer>
    </div>
  );
}
export default MapComponent;
