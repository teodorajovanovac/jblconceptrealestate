import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface PropertyMapProps {
  address: string;
  location: {
    lat: number;
    lng: number;
  };
}

export default function PropertyMap({ address, location }: PropertyMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Custom map style
    const mapStyle = {
      color: '#2563eb',
      weight: 2,
      fillColor: '#2563eb',
      fillOpacity: 0.2
    };

    // Initialize map
    mapRef.current = L.map(mapContainerRef.current).setView([location.lat, location.lng], 15);

    // Add custom tile layer with JBL branding
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
      className: 'map-tiles'
    }).addTo(mapRef.current);

    // Add marker with custom icon
    const customIcon = L.divIcon({
      className: 'custom-marker',
      html: `
        <div class="w-6 h-6 bg-primary-blue rounded-full border-4 border-white shadow-lg flex items-center justify-center">
          <div class="w-2 h-2 bg-white rounded-full"></div>
        </div>
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });

    L.marker([location.lat, location.lng], { icon: customIcon })
      .bindPopup(`
        <div class="p-2">
          <div class="font-medium text-primary-blue">${address}</div>
          <div class="text-sm text-gray-600">JBL Concept Real Estate</div>
        </div>
      `)
      .addTo(mapRef.current);

    // Add custom styling
    const style = document.createElement('style');
    style.textContent = `
      .map-tiles {
        filter: grayscale(1) brightness(1.1);
      }
      .custom-marker {
        background: none;
        border: none;
      }
      .leaflet-popup-content-wrapper {
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }
      .leaflet-popup-content {
        margin: 8px;
      }
    `;
    document.head.appendChild(style);

    // Cleanup
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
      document.head.removeChild(style);
    };
  }, [location, address]);

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-primary-blue mb-4">Location</h2>
      <div 
        ref={mapContainerRef} 
        className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg"
      />
    </div>
  );
}

