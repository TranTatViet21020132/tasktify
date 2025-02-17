import { keepPreviousData, useQuery } from '@tanstack/react-query';
import useWeatherParamsStore from '@/zustand/params/Weather/useWeatherParamsStore';
import { getWeatherData } from '@/services/Weather/WeatherService';

export const useWeatherQueries = () => {
  const { params } = useWeatherParamsStore();

  const { data: weatherData, isError, isLoading } = useQuery({
    queryKey: ['weather', params],
    queryFn: () => getWeatherData(params),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    gcTime: 300000,
    staleTime: 300000,
  });

  return {
    weatherData,
    isError,
    isLoading
  };
};
