import { IWeatherData } from '@/interface/Weather/Weather';
import { IWeatherParams } from '@/interface/Zustand/Params/Weather/Params';
import WeatherClient from '@/services/Weather/WeatherClient';

export const getWeatherData = async (params?: IWeatherParams): Promise<IWeatherData> => {
  try {  
    const response = await WeatherClient.get(`/forecast.json`, { params: params });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};
