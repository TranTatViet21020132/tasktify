"use client";

import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import useToolbarHook from "./ToolbarHook";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filterValue: string;
  setFilterValue: (value: string) => void;
}

export function DataTableToolbar<TData>({
  table,
  filterValue,
  setFilterValue,
}: DataTableToolbarProps<TData>) {
  const { isMobile, isTablet, toolbarContent, handleAddTask, t } = useToolbarHook(table, setFilterValue, filterValue);
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {isMobile || isTablet ? (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="h-8">
                Filter Options
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-4">
              <div className="flex flex-col space-y-4">{toolbarContent}</div>
            </PopoverContent>
          </Popover>
        ) : (
          <div className="flex flex-1 items-center space-x-2">
            {toolbarContent}
          </div>
        )}
      </div>
      <div className="flex justify-end items-center">
        <Button
          onClick={handleAddTask}
          variant="default"
          className="bg-primary-light-500 text-white hover:brightness-75 hover:bg-primary-light-500"
        >
          {t("modal.addTask.title")}
        </Button>
      </div>
    </div>
  );
}
