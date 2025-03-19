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
  const [mapLocation, setMapLocation] = useState<[number, number] | null>(null);

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
            mapRef.current = L.map(mapContainerRef.current).setView([lat, lng], 15);

            // Dodajemo tile layer
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '© OpenStreetMap contributors',
              maxZoom: 19,
              className: 'map-tiles'
            }).addTo(mapRef.current);

            // Custom marker icon
            const customIcon = L.divIcon({
              className: 'custom-marker',
              html: `
                <div class="w-16 h-16 bg-primary-blue opacity-50 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                   
                </div>
              `,
              iconSize: [24, 24],
              iconAnchor: [12, 12]
            });
//<div class="w-2 h-2 bg-white opacity-100 rounded-full"></div>
            // Dodajemo marker
            L.marker([lat, lng], { icon: customIcon })
              .bindPopup(`
                <div class="p-2">
                  <div class="font-medium text-primary-blue">${address}</div>
                  <div class="text-sm text-gray-600">JBL Concept Real Estate</div>
                </div>
              `)
              .addTo(mapRef.current);
          } else {
            // Ako mapa već postoji, samo ažuriramo view
            mapRef.current.setView([lat, lng], 15);
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
        mapRef.current.remove();
        mapRef.current = null;
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

