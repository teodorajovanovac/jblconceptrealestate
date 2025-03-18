import axios from "axios";
import { ApiActionName, ApiLocation, ApiPropertyType, ApiRealEstate, ApiRealEstateFeatured } from "./api";
import { LocationDto, RealEstateDto, ShortListDto } from "./models/realEstate";
import { ApiResponse } from "./models/apiResponse";

const getAllData = async (): Promise<ApiResponse<RealEstateDto[]>> => {
    try {
      const response = await axios.get<ApiResponse<RealEstateDto[]>>(ApiRealEstate);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // You might want to handle errors more gracefully in a real application
    }
  };

  const getRealEstateFeatured = async (): Promise<ApiResponse<RealEstateDto[]>> => {
    try {
      const response = await axios.get<ApiResponse<RealEstateDto[]>>(ApiRealEstateFeatured);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // You might want to handle errors more gracefully in a real application
    }
  };

const getData = async (id: number): Promise<ApiResponse<RealEstateDto>> => {
    try {
      const response = await axios.get<ApiResponse<RealEstateDto>>(ApiRealEstate+'/'+id);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // You might want to handle errors more gracefully in a real application
    }
  };

const getActionName = async (): Promise<ShortListDto[]> => {
    try {
      const response = await axios.get<ShortListDto[]>(ApiActionName);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // You might want to handle errors more gracefully in a real application
    }
  };

  const getPropertyType = async (): Promise<ShortListDto[]> => {
    try {
      const response = await axios.get<ShortListDto[]>(ApiPropertyType);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // You might want to handle errors more gracefully in a real application
    }
  };

  const getLocation = async (): Promise<LocationDto[]> => {
    try {
      const response = await axios.get<LocationDto[]>(ApiLocation);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // You might want to handle errors more gracefully in a real application
    }
  };
  
export default {getAllData, getData, getActionName, getPropertyType, getLocation, getRealEstateFeatured}