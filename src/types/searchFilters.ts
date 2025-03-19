export interface SearchFilters {
  transactionType: 'buy' | 'rent';
  searchTerm: string;
  propertyTypes: string[];
  rooms: string[];
  locations: string[];
  priceRange: number[];
  areaRange: number[];
  features: string[];
  state: string[];
  floor: string[];
  // Remove the heating property
  // heating: string[];
  parking: string[];
} 