import axios from "axios";
import { ApiActionName, ApiLocation, ApiLocationArea, ApiLocationAreaCity, ApiLocationAreaCountyCity, ApiPropertyType, ApiRealEstate, ApiRealEstateFeatured, ApiRealEstateFromList, ApiRoomsNo, ApiValueRanges } from "./Api";
import { LocationDto, RealEstateDto } from "./models/RealEstate";
import { ApiRequest, ApiResponse } from "./models/ApiResponse";
import { SearchFilters } from "./models/SearchFilters"
import { ComboBoxDto } from "./models/ComboBoxDto";
import { ValueRangesDto } from "./models/ValueRangesDto";


const realEstate = {
  // Osnovna funkcija za dobijanje jedne stranice nekretnina
  async getSearchData(options: ApiRequest<SearchFilters> = {}): Promise<ApiResponse<RealEstateDto[]>> {
    try {
      console.log("REAL ESTATE DATA - GET SEARCH DATA");
      const pageNumber = options.pageNumber || 1;
      const pageSize = options.pageSize || 1;
      const url = `${ApiRealEstate}?pageNumber=${pageNumber}&pageSize=${pageSize}`;
      
      //console.log(`Fetching page ${pageNumber} from ${url}`);
      //console.log(options.data);
      let response;
      if (options.data) {
        response = await axios.post(url, options.data);
      } else {
        if (options.queryString)
        {
          response = await axios.get(url, { params: options.queryString });
        } else {
          response = await axios.get(url);
        }
      }
      
      if (response.data && response.data.data) {
        console.log(`Received ${response.data.data.length} properties for page ${pageNumber}`);
      }
      
      return response.data;
    } catch (err) {
        console.error(`Error fetching data for page ${options.pageNumber}:`, err);
      throw err;
    }
  },



  async getRealEstateFeatured(langCode?: string): Promise<RealEstateDto[]> {
    try {
      const url = langCode ? `${ApiRealEstateFeatured}?langCode=${langCode}` : `${ApiRealEstateFeatured}`;
      const response = await axios.get(url);
      //console.error("data:", response);
      return response.data;
    } catch (err) {
      console.error("Error fetching featured data:", err);
      throw err;
    }
  },

  async getRealEstateList(langCode?: string, listRe?: number[]): Promise<RealEstateDto[]> {
    try {
      const url = langCode ? `${ApiRealEstateFromList}?langCode=${langCode}` : `${ApiRealEstateFromList}`;
      const response = await axios.post(url, listRe );
      //console.error("data:", response);
      return response.data;
    } catch (err) {
      console.error("Error fetching featured data:", err);
      throw err;
    }
  },

  async getData(id: number, langCode?: string): Promise<RealEstateDto> {
    try {
      const url = langCode ? `${ApiRealEstate}/${id}?langCode=${langCode}` : `${ApiRealEstate}/${id}`;
      const response = await axios.get(url);
      return response.data;
    } catch (err) {
      console.error("Error fetching featured data:", err);
      throw err;
    }
  },

  async getActionName(langCode?: string): Promise<ComboBoxDto[]> {
    try {
      const url = langCode ? `${ApiActionName}?langCode=${langCode}` : `${ApiActionName}`;
      const response = await axios.get(url);
      return response.data;
    } catch (err) {
      console.error("Error fetching action names:", err);
      throw err;
    }
  },

  async getPropertyType(langCode?: string): Promise<ComboBoxDto[]> {
    try {
      const url = langCode ? `${ApiPropertyType}?langCode=${langCode}` : `${ApiPropertyType}`;
      const response = await axios.get(url);
      return response.data;
    } catch (err) {
      console.error("Error fetching property types:", err);
      throw err;
    }
  },

  async getLocationArea(langCode?: string): Promise<ComboBoxDto[]> {
    try {
      const url = langCode ? `${ApiLocationArea}?langCode=${langCode}` : `${ApiLocation}`;
      const response = await axios.get(url);
      return response.data;
    } catch (err) {
      console.error("Error fetching locations:", err);
      throw err;
    }
  },
  async getLocationAreaCountyCity(langCode?: string): Promise<ComboBoxDto[]> {
    try {
      const url = langCode ? `${ApiLocationAreaCountyCity}?langCode=${langCode}` : `${ApiLocationAreaCountyCity}`;
      const response = await axios.get(url);
      return response.data;
    } catch (err) {
      console.error("Error fetching locations:", err);
      throw err;
    }
  },

  async getLocationAreaCity(langCode?: string): Promise<ComboBoxDto[]> {
    try {
      const url = langCode ? `${ApiLocationAreaCity}?langCode=${langCode}` : `${ApiLocationAreaCity}`;
      const response = await axios.get(url);
      return response.data;
    } catch (err) {
      console.error("Error fetching locations area city:", err);
      throw err;
    }
  },
  
  async getRoomsNo(langCode?: string): Promise<ComboBoxDto[]> {
    try {
      const url = langCode ? `${ApiRoomsNo}?langCode=${langCode}` : `${ApiRoomsNo}`;
      const response = await axios.get(url);
      return response.data;
    } catch (err) {
      console.error("Error fetching RoomsNo:", err);
      throw err;
    }
  },

  async getLocation(langCode?: string): Promise<LocationDto[]> {
    try {
      const url = langCode ? `${ApiLocation}?langCode=${langCode}` : `${ApiLocation}`;
      const response = await axios.get(url);
      return response.data;
    } catch (err) {
      console.error("Error fetching locations:", err);
      throw err;
    }
  },

  async getValueRanges(): Promise<ValueRangesDto[]> {
    try {
      const response = await axios.get(ApiValueRanges);
      return response.data;
    } catch (err) {
      console.error("Error fetching locations:", err);
      throw err;
    }
  },
  /**
   * Searches for properties based on query parameters
  //  */
  // async getSearchProperty(filters: SearchFilters): Promise<ApiResponse<RealEstateDto[]>> {
  //   try {
  //     console.log('Searching with filters:', filters);
      
  //     // Build query parameters
  //     const params = new URLSearchParams();
      
  //     // Add filters to query params
  //     params.append('actionName', filters.actionName);
      
  //     if (filters.searchTerm) {
  //       params.append('searchTerm', filters.searchTerm);
  //     }
      
  //     if (filters.propertyTypes.length > 0) {
  //       filters.propertyTypes.forEach(type => {
  //         params.append('propertyTypes', type);
  //       });
  //     }
      
  //     if (filters.rooms.length > 0) {
  //       filters.rooms.forEach(room => {
  //         params.append('roomsNo', room);
  //       });
  //     }
      
  //     if (filters.locations.length > 0) {
  //       filters.locations.forEach(location => {
  //         params.append('locations', location);
  //       });
  //     }
      
  //     // Add price range if values are different from default
  //     if (filters.priceRange[0] > 0) {
  //       params.append('minPrice', filters.priceRange[0].toString());
  //     }
  //     if (filters.priceRange[1] < 1000000) {
  //       params.append('maxPrice', filters.priceRange[1].toString());
  //     }
      
  //     // Add area range if values are different from default
  //     if (filters.areaRange[0] > 0) {
  //       params.append('minArea', filters.areaRange[0].toString());
  //     }
  //     if (filters.areaRange[1] < 500) {
  //       params.append('maxArea', filters.areaRange[1].toString());
  //     }
      
  //     // Add additional filters if they exist
  //     if (filters.features.length > 0) {
  //       filters.features.forEach(feature => {
  //         params.append('features', feature);
  //       });
  //     }
      
  //     if (filters.bathrooms.length > 0) {
  //       filters.bathrooms.forEach(bathroom => {
  //         params.append('bathrooms', bathroom);
  //       });
  //     }
      
  //     if (filters.floor.length > 0) {
  //       filters.floor.forEach(floor => {
  //         params.append('floor', floor);
  //       });
  //     }
      
  //     if (filters.heating.length > 0) {
  //       filters.heating.forEach(heating => {
  //         params.append('heating', heating);
  //       });
  //     }
      
  //     if (filters.parking.length > 0) {
  //       filters.parking.forEach(parking => {
  //         params.append('parking', parking);
  //       });
  //     }

  //     const url = `${ApiRealEstate}?${params.toString()}`;
  //     console.log('Request URL:', url);
      
  //     const response = await axios.get(url);
      
  //     if (response.data && response.data.data) {
  //       return {
  //         isSuccess: true,
  //         data: response.data.data,
  //         totalRecords: response.data.totalRecords || response.data.data.length,
  //         totalPages: response.data.totalPages || 1
  //       };
  //     }
      
  //     return {
  //       isSuccess: false,
  //       data: [],
  //       totalRecords: 0,
  //       totalPages: 0
  //     };
      
  //   } catch (err) {
  //     console.error("Error during search:", err);
  //     return {
  //       isSuccess: false,
  //       data: [],
  //       totalRecords: 0,
  //       totalPages: 0,
  //     };
  //   }
  // }
};

export default realEstate;