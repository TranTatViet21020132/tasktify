"use client";

import { useMemo } from "react";
import { debounce } from "lodash";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { DataTableFacetedFilter } from "@/components/FacetedFilter/FacetedFilter";
import useToggleStore from "@/zustand/toggle/useToggleStore";
import React from "react";
import RangeDatePicker from "../RangeDatePicker/RangeDatePicker";
import { DateRange } from "react-day-picker";
import { useResponsive } from "@/hooks/useResponsive";
import { Table } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

const useToolbarHook = <TData,>(
  table: Table<TData>,
  setFilterValue: (value: string) => void,
  filterValue: string
) => {
  const { t } = useTranslation();

  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(
    (table.getColumn("date")?.getFilterValue() as DateRange) ?? undefined
  );

  const isFiltered =
    table.getState().columnFilters.length > 0 ||
    (dateRange?.from && dateRange?.to);

  const statuses = [
    { value: "true", label: t("table.statuses.label.completed") },
    { value: "false", label: t("table.statuses.label.onGoing") },
  ];

  const debouncedSetFilter = useMemo(
    () =>
      debounce((value: string) => {
        table.getColumn("title")?.setFilterValue(value);
      }, 400),
    [table]
  );

  const debouncedSetDateRangeFilter = useMemo(
    () =>
      debounce((range: DateRange | undefined) => {
        if (range?.from && range?.to) {
          table.getColumn("date")?.setFilterValue({
            from: range.from,
            to: range.to,
          });
        } else {
          table.getColumn("date")?.setFilterValue(undefined);
        }
      }, 400),
    [table]
  );

  const toggleTaskModal = useToggleStore((state) => state.toggleModal).bind(
    null,
    "table-task-modal"
  );

  const handleAddTask = () => {
    toggleTaskModal();
  };

  const handleChange = (value: string) => {
    setFilterValue(value);
    debouncedSetFilter(value);
  };

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
    debouncedSetDateRangeFilter(range);
  };

  const { isMobile, isTablet } = useResponsive();

  const toolbarContent = (
    <>
      <Input
        placeholder={t("toolbar.filter.placeholder.title")}
        value={filterValue}
        onChange={(event) => handleChange(event.target.value)}
        className="h-8 w-full lg:w-fit"
      />
      {table.getColumn("completed") && (
        <DataTableFacetedFilter
          column={table.getColumn("completed")}
          title={t("table.header.status")}
          options={statuses}
        />
      )}
      <RangeDatePicker
        dateRange={dateRange}
        setDateRange={handleDateRangeChange}
      />
      {isFiltered && (
        <Button
          variant="ghost"
          onClick={() => {
            table.resetColumnFilters();
            setFilterValue("");
            setDateRange(undefined);
          }}
          className="h-8 px-2 lg:px-3"
        >
          {t("toolbar.filter.reset")}
          <X />
        </Button>
      )}
    </>
  );

  return {
    toolbarContent,
    handleAddTask,
    isMobile,
    isTablet,
    t,
  };
};

export default useToolbarHook;
