import { WEATHER_API_KEY } from '@/configs/consts';
import { IWeatherState, WeatherStore } from '@/interface/Weather/Weather';
import { IWeatherParams } from '@/interface/Zustand/Params/Weather/Params';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const defaultParams: IWeatherParams = {
  key: WEATHER_API_KEY,
  q: '',
  days: 7,
  aqi: "no",
  alerts: "no"
};

const useWeatherParamsStore = create<WeatherStore>()(
  persist(
    (set) => {
      let isGeolocationFetched = false;

      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const location = `${position.coords.latitude},${position.coords.longitude}`;
          set((state) => ({
            params: { ...state.params, q: location },
          }));
          isGeolocationFetched = true;
        },
        (error) => {
          console.error("Geolocation error:", error);
          isGeolocationFetched = true;
        }
      );

      return {
        params: defaultParams,
        isGeolocationFetched,
        setParams: (newParams: Partial<IWeatherParams>) => {
          set((state) => ({
            params: { ...state.params, ...newParams },
          }));
        },
        resetParams: () => {
          set({ params: defaultParams });
        },
      };
    },
    {
      name: 'weather-params-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ params: state.params }),
      merge: (persistedState, currentState) => ({
        ...currentState,
        ...(persistedState || {}),
        params: (persistedState as IWeatherState)?.params || defaultParams,
      }),
    }
  )
);

export default useWeatherParamsStore;