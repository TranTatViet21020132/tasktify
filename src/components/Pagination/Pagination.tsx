import { Table } from "@tanstack/react-table"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useSearchParams } from "react-router";
import { useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface DataTablePaginationProps<TData> {
  table: Table<TData>,
  disabled?: boolean,
  filterValue?: string
}

export function DataTablePagination<TData>({
  table,
  disabled,
  filterValue,
}: DataTablePaginationProps<TData>) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation(); 

  const handlePageChange = (pageIndex: number) => {
    table.setPageIndex(pageIndex);
    searchParams.set("page", String(pageIndex + 1));
    setSearchParams(searchParams);
  };

  const handleNextPage = () => {
    const nextPageIndex = table.getState().pagination.pageIndex + 1;
    handlePageChange(nextPageIndex);
  };

  const handlePreviousPage = () => {
    const previousPageIndex = table.getState().pagination.pageIndex - 1;
    handlePageChange(previousPageIndex);
  };

  const handleFirstPage = () => {
    handlePageChange(0);
  };

  const handleLastPage = () => {
    handlePageChange(table.getPageCount() - 1);
  };

  useLayoutEffect(() => {
    const currentPage = searchParams.get("page");
    const currentLimit = searchParams.get("limit");

    if (filterValue) {
      setLoading(true);
      searchParams.set("page", "1");
      table.setPageIndex(0);
    } else if (!currentPage) {
      searchParams.set("page", "1");
    } else {
      const pageIndex = Math.max(0, parseInt(currentPage) - 1);
      table.setPageIndex(pageIndex);
    }

    if (currentLimit) {
      table.setPageSize(Number(currentLimit));
    } else {
      searchParams.set("limit", String(table.getState().pagination.pageSize));
    }

    setSearchParams(searchParams);
    setLoading(false);
  }, [searchParams, setSearchParams, table, filterValue]);

  if (disabled) {
    return null;
  }

  return (
    <div className="flex items-center justify-between space-x-6 lg:space-x-8 w-full px-2">
      <div className="flex items-center space-x-2">
        <p className="text-sm font-medium">{t("toolbar.pagination.rowsPerPage")}</p>
        <Select
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={(value) => {
            table.setPageSize(Number(value));
            searchParams.set("limit", value);
            setSearchParams(searchParams);
            handlePageChange(0);
          }}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={table.getState().pagination.pageSize} />
          </SelectTrigger>
          <SelectContent side="top">
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex w-[100px] items-center justify-center text-sm font-medium">
        {!loading ? t("toolbar.pagination.pageOf", {
          current: table.getState().pagination.pageIndex + 1,
          total: table.getPageCount()
        }) : <></>}
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={handleFirstPage}
          disabled={!table.getCanPreviousPage()}
        >
          <span className="sr-only">Go to first page</span>
          <ChevronsLeft />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={handlePreviousPage}
          disabled={!table.getCanPreviousPage()}
        >
          <span className="sr-only">Go to previous page</span>
          <ChevronLeft />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={handleNextPage}
          disabled={!table.getCanNextPage()}
        >
          <span className="sr-only">Go to next page</span>
          <ChevronRight />
        </Button>
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={handleLastPage}
          disabled={!table.getCanNextPage()}
        >
          <span className="sr-only">Go to last page</span>
          <ChevronsRight />
        </Button>
      </div>
    </div>
  )
}