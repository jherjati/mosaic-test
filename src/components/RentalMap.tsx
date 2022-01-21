import React from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { IRental } from "mosaic";

export const DEFAULT_CENTER: L.LatLngExpression = L.latLng(52.3676, 4.9041);

const activeIcon = L.icon({
  iconUrl: "../images/marker-icon-2x-green.png",
  shadowUrl: "../images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const defaultIcon = L.icon({
  iconUrl: "../images/marker-icon-2x-blue.png",
  shadowUrl: "../images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export const RentalMap = ({
  center = DEFAULT_CENTER,
  bounds,
  zoom = 14,
  rentals,
}: {
  center?: L.LatLngExpression;
  bounds: L.LatLngBounds;
  zoom?: number;
  updatePosition?: Function;
  rentals: IRental[];
}) => {
  return (
    <MapContainer center={center} bounds={bounds} zoom={zoom} maxZoom={17}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />

      <Marker position={center}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>

      <>
        {rentals.map((rental: IRental) => {
          return (
            <Marker
              key={rental.id}
              position={rental.coordinates}
              icon={rental.id === 0 ? activeIcon : defaultIcon}
            />
          );
        })}
      </>
    </MapContainer>
  );
};
