// FILE: src/models/SearchFilters.ts

import { ComboBoxDto } from "./ComboBoxDto";
import { ValueRangesDto } from "./ValueRangesDto";

export interface SearchFilters {
    actionName: string;
    searchTerm: string;
    propertyTypes: string[];
    rooms: string[];
    locations: string[];
    locationsAreaCity: string[];
    priceRange: number[];
    areaRange: number[];
    features: string[];
    bathrooms: string[];
    floor: string[];
    heating: string[];
    parking: string[];
    newBuilding: number;
  }
  
  export const SearchFiltersEmpty: SearchFilters = {
    actionName: '',
    searchTerm: '',
    propertyTypes: [],
    rooms: [],
    locations: [],
    locationsAreaCity: [],
    priceRange: [],
    areaRange: [],
    features: [],
    bathrooms: [],
    floor: [],
    heating: [],
    parking: [],
    newBuilding: 0,
  };

  export interface SearchFiltersLists {
    actionName: ComboBoxDto[];
    searchTerm: string;
    propertyTypes: ComboBoxDto[];
    rooms: ComboBoxDto[];
    locations: ComboBoxDto[];
    locationsAreaCity: ComboBoxDto[];
    priceRange: ValueRangesDto[];
    areaRange: ValueRangesDto[];
    features: ComboBoxDto[];
    bathrooms: ComboBoxDto[];
    floor: ComboBoxDto[];
    heating: ComboBoxDto[];
    parking: ComboBoxDto[];
    newBuilding: 0;
  }

  export const SearchFiltersListsEmpty: SearchFiltersLists = {
    actionName: [],
    searchTerm: '',
    propertyTypes: [],
    rooms: [],
    locations: [],
    locationsAreaCity: [],
    priceRange: [],
    areaRange: [],
    features: [],
    bathrooms: [],
    floor: [],
    heating: [],
    parking: [],
    newBuilding: 0,
  };