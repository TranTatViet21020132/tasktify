import { ITask, TodoStatus } from "@/interface/Components/Tasks/Task";

export interface IColumn {
  id: TodoStatus;
  title: string;
};

export type IColumnProps = {
  column: IColumn;
  tasks: ITask[] | undefined;
};
