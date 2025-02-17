import { IModalState } from '@/interface/Zustand/Toggle/Modal';
import { create } from 'zustand';

const useToggleStore = create<IModalState>((set) => ({
  modalStates: {},
  toggleModal: (modalId: string) =>
    set((state) => ({
      modalStates: {
        ...state.modalStates,
        [modalId]: !state.modalStates[modalId],
      },
    })),
  openModal: (modalId: string) =>
    set((state) => ({
      modalStates: {
        ...state.modalStates,
        [modalId]: true,
      },
    })),
  closeModal: (modalId: string) =>
    set((state) => ({
      modalStates: {
        ...state.modalStates,
        [modalId]: false,
      },
    })),
  resetModals: () => set({ modalStates: {} }),
}));

export default useToggleStore;