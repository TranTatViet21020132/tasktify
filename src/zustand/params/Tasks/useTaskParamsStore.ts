import { FilterStore, ITaskState } from '@/interface/Zustand/Params/Tasks/Filter';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useTaskParamsStore = create<FilterStore>()(
  persist(
    (set) => ({
      filter: { page: 1, limit: 10 },
      setFilter: (newFilter: ITaskState['filter']) => {
        set((state) => ({
          filter: { ...state.filter, ...newFilter },
        }));
      },
      resetFilter: () => {
        set({ filter: { page: 1, limit: 10 } });
      },
    }),
    {
      name: 'filter-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ filter: state.filter }),
      merge: (persistedState, currentState) => ({
        ...currentState,
        ...(persistedState || {}),
        filter: (persistedState as ITaskState)?.filter || { page: 1, limit: 10 },
      }),
    }
  )
);

export default useTaskParamsStore;