import { ITask, ITaskStore } from "@/interface/Components/Tasks/Task";
import { create } from "zustand";

const useTaskStore = create<ITaskStore>((set) => ({
  task: null,
  setTask: (task: ITask | null) => set({ task }),
}));

export default useTaskStore;
