
"use client"

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon, LatLngExpression, Map as LeafletMap } from 'leaflet';
import { useEffect, useRef } from 'react';
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

function MapUpdater({ selectedDealer }: { selectedDealer: Dealer | null }) {
    const map = useMap();
    useEffect(() => {
        if (selectedDealer) {
            map.setView([selectedDealer.lat, selectedDealer.lon], 14);
        }
    }, [selectedDealer, map]);
    return null;
}

export const Map = ({ dealers, selectedDealer, setSelectedDealer }: { dealers: Dealer[], selectedDealer: Dealer | null, setSelectedDealer: (dealer: Dealer | null) => void }) => {
  const defaultPosition: LatLngExpression = [39.8283, -98.5795]; // Center of US
  
  return (
    <MapContainer center={defaultPosition} zoom={4} scrollWheelZoom={false} className="h-full w-full">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapUpdater selectedDealer={selectedDealer} />
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
