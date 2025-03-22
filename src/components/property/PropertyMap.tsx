import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet/dist/leaflet.css';

interface PropertyMapProps {
  address: string;
  location: {
    lat: number;
    lng: number;
  };
}

export default function PropertyMap({ address }: PropertyMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<L.Circle | null>(null);
  const [mapLocation, setMapLocation] = useState<[number, number] | null>(null);
  const initialRadius = 200; // Početni radijus kruga u metrima

  // Funkcija za ažuriranje veličine kruga prema nivou zuma
  const updateCircleRadius = () => {
    if (mapRef.current && circleRef.current && mapLocation) {
      const zoom = mapRef.current.getZoom();
      // Prilagođavanje radijusa prema nivou zuma
      // Koristi se eksponencijalna funkcija da bi odnos bio konstantan
      const newRadius = initialRadius * Math.pow(2, (15 - zoom));
      circleRef.current.setRadius(newRadius);
    }
  };

  useEffect(() => {
    const initializeMap = async () => {
      if (!mapContainerRef.current) return;

      // Inicijalizacija geocoding providera
      const provider = new OpenStreetMapProvider();

      try {
        // Tražimo lokaciju po adresi
        const results = await provider.search({ query: address });
        
        if (results.length > 0) {
          const { x: lng, y: lat } = results[0];
          setMapLocation([lat, lng]);

          // Inicijalizacija mape
          if (!mapRef.current) {
            const map = L.map(mapContainerRef.current).setView([lat, lng], 15);
            mapRef.current = map;

            // Dodajemo tile layer
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '© OpenStreetMap contributors',
              maxZoom: 19,
              className: 'map-tiles'
            }).addTo(map);

            // Dodajemo krug koji će se prilagođavati zumu
            const circle = L.circle([lat, lng], {
              color: '#2563eb',      // Primary blue color
              fillColor: '#2563eb',  // Fill with primary blue
              fillOpacity: 0.2,      // Semi-transparent
              weight: 2,             // Border width
              radius: initialRadius  // Početni radijus u metrima
            }).addTo(map);
            
            circleRef.current = circle;

            // Dodajemo event listener za zoom događaj
            map.on('zoomend', updateCircleRadius);
          } else {
            // Ako mapa već postoji, samo ažuriramo view
            mapRef.current.setView([lat, lng], 15);
            
            // Ako krug postoji, ažuriramo njegovu poziciju
            if (circleRef.current) {
              circleRef.current.setLatLng([lat, lng]);
              updateCircleRadius();
            }
          }
        }
      } catch (error) {
        console.error('Error geocoding address:', error);
      }
    };

    initializeMap();

    // Cleanup
    return () => {
      if (mapRef.current) {
        mapRef.current.off('zoomend', updateCircleRadius);
        mapRef.current.remove();
        mapRef.current = null;
        circleRef.current = null;
      }
    };
  }, [address]);

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-primary-blue mb-4">Lokacija</h2>
      <div 
        ref={mapContainerRef} 
        className="w-full h-[400px] rounded-lg overflow-hidden"
      />
    </div>
  );
}

