
export interface IModalState {
  modalStates: Record<string, boolean>;
  toggleModal: (modalId: string) => void;
  openModal: (modalId: string) => void;
  closeModal: (modalId: string) => void;
  resetModals: () => void;
}
