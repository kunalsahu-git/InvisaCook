
"use client"

import 'leaflet/dist/leaflet.css';
import L, { Icon, Map as LeafletMap } from 'leaflet';
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

export const Map = ({ dealers, selectedDealer, setSelectedDealer }: { dealers: Dealer[], selectedDealer: Dealer | null, setSelectedDealer: (dealer: Dealer | null) => void }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<LeafletMap | null>(null);
  const markers = useRef<{ [key: string]: L.Marker }>({});

  // Initialize map
  useEffect(() => {
    if (mapRef.current && !mapInstance.current) {
      const map = L.map(mapRef.current, {
        center: [39.8283, -98.5795],
        zoom: 4,
        scrollWheelZoom: false,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      mapInstance.current = map;

      // Add markers
      dealers.forEach(dealer => {
        const popupContent = `
            <div class="p-1 space-y-1">
                <h3 class="font-bold text-base">${dealer.name}</h3>
                <p class="text-sm">${dealer.email}</p>
                <p class="text-sm">${dealer.address}</p>
                <p class="text-sm">${dealer.phone}</p>
                <a 
                    href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(dealer.address)}" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    class="text-blue-600 hover:underline font-semibold"
                >
                    Directions
                </a>
            </div>
        `;
        const marker = L.marker([dealer.lat, dealer.lon], { icon: customIcon })
          .addTo(map)
          .bindPopup(popupContent)
          .on('click', () => {
            setSelectedDealer(dealer);
          });
        markers.current[dealer.name] = marker;
      });
    }

    // Cleanup on unmount
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [dealers, setSelectedDealer]);

  // Handle selected dealer change
  useEffect(() => {
    if (mapInstance.current) {
      // Reset all icons to default
      Object.values(markers.current).forEach(marker => marker.setIcon(customIcon));

      if (selectedDealer) {
        // Pan to selected dealer and set selected icon
        mapInstance.current.flyTo([selectedDealer.lat, selectedDealer.lon], 13);
        const selectedMarker = markers.current[selectedDealer.name];
        if (selectedMarker) {
          selectedMarker.setIcon(selectedIcon);
          selectedMarker.openPopup();
        }
      }
    }
  }, [selectedDealer]);

  return <div ref={mapRef} className="h-full w-full" />;
}
