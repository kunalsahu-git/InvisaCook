
"use client"

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon, LatLngExpression } from 'leaflet';
import { useEffect } from 'react';
import type { Dealer } from '../sections/dealer-finder';

const customIcon = new Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const selectedIcon = new Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

function ChangeView({ center, zoom }: { center: LatLngExpression, zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

export const Map = ({ dealers, selectedDealer, setSelectedDealer }: { dealers: Dealer[], selectedDealer: Dealer | null, setSelectedDealer: (dealer: Dealer | null) => void }) => {
  const defaultPosition: LatLngExpression = [39.8283, -98.5795]; // Center of US
  const center = selectedDealer ? [selectedDealer.lat, selectedDealer.lon] as LatLngExpression : defaultPosition;
  const zoom = selectedDealer ? 14 : 4;
  
  return (
    <MapContainer center={center} zoom={zoom} scrollWheelZoom={false} className="h-full w-full">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ChangeView center={center} zoom={zoom} />
      {dealers.map(dealer => (
        <Marker 
          key={dealer.name} 
          position={[dealer.lat, dealer.lon]} 
          icon={selectedDealer?.name === dealer.name ? selectedIcon : customIcon}
          eventHandlers={{
            click: () => {
              setSelectedDealer(dealer);
            }
          }}
        >
          <Popup>
            <div className="font-bold">{dealer.name}</div>
            {dealer.address}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
