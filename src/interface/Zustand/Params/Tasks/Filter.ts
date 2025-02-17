export interface ITaskState {
  filter: {
    page: number;
    limit: number;
  };
}

export interface ITaskActions {
  setFilter: (filter: ITaskState['filter']) => void;
  resetFilter: () => void;
}

export type FilterStore = ITaskState & ITaskActions;