import { PaginationState, Table } from "@tanstack/react-table";
import { Dispatch, SetStateAction } from "react";

export interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  pagination?: PaginationState;
  setPagination?: Dispatch<SetStateAction<PaginationState>>;
}
