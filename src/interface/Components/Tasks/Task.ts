export interface ITask {
  id: string;
  title: string;
  content: string;
  date: Date;
  completed: boolean;
}

export interface ITaskStore {
  task: ITask | null;
  setTask: (task: ITask | null) => void;
}

export interface ITaskDrop {
  task: ITask;
}

export type TodoStatus = "false" | "true";