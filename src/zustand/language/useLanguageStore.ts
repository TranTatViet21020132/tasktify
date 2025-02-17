// import { IWeatherState, WeatherStore } from '@/interface/Weather/Weather';
// import { IWeatherParams } from '@/interface/Zustand/Params/Weather/Params';
// import { create } from 'zustand';
// import { persist, createJSONStorage } from 'zustand/middleware';

// const useWeatherParamsStore = create<WeatherStore>()(
//   persist(
//     (set) => ({
//       params: defaultParams,
//       setParams: (newParams: Partial<IWeatherParams>) => {
//         set((state) => ({
//           params: { ...state.params, ...newParams },
//         }));
//       },
//       resetParams: () => {
//         set({ params: defaultParams });
//       },
//     }),
//     {
//       name: 'weather-params-storage',
//       storage: createJSONStorage(() => localStorage),
//       partialize: (state) => ({ params: state.params }),
//       merge: (persistedState, currentState) => ({
//         ...currentState,
//         ...(persistedState || {}),
//         params: (persistedState as IWeatherState)?.params || defaultParams,
//       }),
//     }
//   )
// );

// export default useWeatherParamsStore;