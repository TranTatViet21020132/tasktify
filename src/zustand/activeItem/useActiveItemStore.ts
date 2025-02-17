import { HOME_ROUTE } from '@/configs/path-consts';
import { IActiveItemState, IActiveItem } from '@/interface/Zustand/ActiveItem/ActiveItem';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const useActiveItemStore = create<IActiveItemState>()(
  persist(
    (set) => ({
      activeItem: { title: "Home", url: HOME_ROUTE },
      setActiveItem: (item: IActiveItem) => set({ activeItem: item }),
    }),
    {
      name: 'activeItem-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        activeItem: state.activeItem,
      }),
    }
  )
);

export default useActiveItemStore;
