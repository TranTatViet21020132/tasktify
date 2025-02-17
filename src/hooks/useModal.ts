import useToggleStore from "@/zustand/toggle/useToggleStore";

const useModal = () => {
  const modalStates = useToggleStore((state) => state.modalStates);
  
  return {
    isTaskModalOpen: modalStates['table-task-modal'] ?? false,
    isWarningModalOpen: modalStates['table-delete-modal'] ?? false,
  };
};

export default useModal;