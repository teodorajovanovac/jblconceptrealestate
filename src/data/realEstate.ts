import axios from "axios";
import { ApiActionName, ApiLocation, ApiPropertyType, ApiRealEstate, ApiRealEstateFeatured } from "./api";
import { LocationDto, RealEstateDto, ShortListDto } from "./models/realEstate";
import { ApiResponse } from "./models/apiResponse";

interface GetAllOptions {
  page?: number;
  pageSize?: number;
}

const realEstate = {
  // Osnovna funkcija za dobijanje jedne stranice nekretnina
  async getAllData(options: GetAllOptions = {}): Promise<ApiResponse<RealEstateDto[]>> {
    try {
      const page = options.page || 1;
      const pageSize = options.pageSize || 87; // Changed to fetch all properties at once
      const url = `${ApiRealEstate}?page=${page}&pageSize=${pageSize}`;
      
      console.log(`Fetching page ${page} from ${url}`);
      const response = await axios.get(url);
      
      if (response.data && response.data.data) {
        console.log(`Received ${response.data.data.length} properties for page ${page}`);
      }
      
      return response.data;
    } catch (err) {
      console.error(`Error fetching data for page ${options.page}:`, err);
      throw err;
    }
  },

  // Funkcija koja učitava SVE stranice potpuno sekvencijalno
  async getAllProperties(): Promise<RealEstateDto[]> {
    try {
      console.log("======= STARTING PROPERTY FETCH =======");
      
      // Prvo dobijamo prvu stranicu da znamo koliko ima ukupno stranica
      const firstPageResponse = await this.getAllData({ page: 1 });
      
      if (!firstPageResponse.isSuccess || !firstPageResponse.data) {
        console.error("API response not successful or no data returned");
        throw new Error("Failed to fetch first page of properties");
      }
      
      const totalPages = firstPageResponse.totalPages || 1;
      const totalRecords = firstPageResponse.totalRecords || 0;
      
      console.log(`API reports total records: ${totalRecords} in ${totalPages} pages`);
      
      // Počinjemo sa prvom stranicom podataka
      let allProperties: RealEstateDto[] = [...firstPageResponse.data];
      console.log(`Loaded ${allProperties.length} properties from page 1`);
      
      // SEKVENCIJALNO učitavamo ostale stranice (ne paralelno)
      if (totalPages > 1) {
        for (let page = 2; page <= totalPages; page++) {
          console.log(`Fetching page ${page} of ${totalPages}...`);
          const pageResponse = await this.getAllData({ page });
          
          if (pageResponse.isSuccess && pageResponse.data) {
            console.log(`Successfully loaded ${pageResponse.data.length} properties from page ${page}`);
            
            // Dodaj svojstvo page za lakše praćenje
            const propertiesWithPageInfo = pageResponse.data.map(property => ({
              ...property,
              _sourcePage: page
            }));
            
            allProperties = [...allProperties, ...propertiesWithPageInfo];
            console.log(`Current total: ${allProperties.length} properties`);
          } else {
            console.error(`Failed to load page ${page}`);
          }
        }
      }
      
      console.log(`Total properties before deduplication: ${allProperties.length}`);
      
      // Uklanjamo duplikate po ID-u
      const uniquePropertiesMap = new Map<number, RealEstateDto>();
      
      allProperties.forEach(property => {
        if (property.id && !uniquePropertiesMap.has(property.id)) {
          uniquePropertiesMap.set(property.id, property);
        }
      });
      
      const uniqueProperties = Array.from(uniquePropertiesMap.values());
      
      console.log(`Total properties after deduplication: ${uniqueProperties.length}`);
      console.log("======= COMPLETED PROPERTY FETCH =======");
      
      return uniqueProperties;
    } catch (error) {
      console.error("Error loading all properties:", error);
      return [];
    }
  },

  async getRealEstateFeatured(): Promise<ApiResponse<RealEstateDto[]>> {
    try {
      const response = await axios.get(ApiRealEstateFeatured);
      return response.data;
    } catch (err) {
      console.error("Error fetching featured data:", err);
      throw err;
    }
  },

  async getData(id?: number): Promise<ApiResponse<RealEstateDto[]>> {
    try {
      const page = 1;
      const pageSize = 87;
      console.log(`Fetching page ${page} from ${ApiRealEstate}?page=${page}&pageSize=${pageSize}`);
      
      const response = await fetch(`${ApiRealEstate}?page=${page}&pageSize=${pageSize}`);
      const data = await response.json();
      
      console.log(`Received ${data.data?.length} properties for page ${page}`);
      
      return {
        isSuccess: true,
        data: data.data || [],
        totalRecords: data.totalRecords || 0,
        totalPages: data.totalPages || 0
      };
    } catch (error) {
      console.error('Error fetching real estate data:', error);
      return {
        isSuccess: false,
        data: [],
        totalRecords: 0,
        totalPages: 0
      };
    }
  },

  async getActionName(): Promise<ApiResponse<string[]>> {
    try {
      const response = await axios.get(ApiActionName);
      return response.data;
    } catch (err) {
      console.error("Error fetching action names:", err);
      throw err;
    }
  },

  async getPropertyType(): Promise<ApiResponse<string[]>> {
    try {
      const response = await axios.get(ApiPropertyType);
      return response.data;
    } catch (err) {
      console.error("Error fetching property types:", err);
      throw err;
    }
  },

  async getLocation(): Promise<ApiResponse<string[]>> {
    try {
      const response = await axios.get(ApiLocation);
      return response.data;
    } catch (err) {
      console.error("Error fetching locations:", err);
      throw err;
    }
  },

  // Improved search function with better error handling
  async search(queryString: string): Promise<ApiResponse<RealEstateDto[]>> {
    try {
      console.log(`Searching with query: ${queryString}`);
      const url = `${ApiRealEstate}/search?${queryString}`;
      
      const response = await axios.get(url);
      
      if (response.data && response.data.data) {
        console.log(`Search returned ${response.data.data.length} properties`);
      }
      
      return response.data;
    } catch (err) {
      console.error("Error during search:", err);
      // Return empty successful response instead of throwing
      return {
        isSuccess: true,
        data: [],
        totalRecords: 0,
        totalPages: 0
      };
    }
  }
};

export default realEstate;