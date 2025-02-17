"use client";

import * as React from "react";
import {
  Column,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTableToolbar } from "@/components/Toolbar/Toolbar";
import { DataTablePagination } from "@/components/Pagination/Pagination";
import { Skeleton } from "../ui/skeleton";
import { DataTableProps } from "@/interface/Components/DataTable/DataTable";
import { useResponsive } from "@/hooks/useResponsive";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import NoDataPlaceholder from "@/components/NoData/NoDataPlaceHolder";
import { useSearchParams } from "react-router-dom";

export function DataTable<TData, TValue>({
  columns,
  data,
  isError,
  isLoading: initialLoading,
}: DataTableProps<TData, TValue>) {
  const [searchParams] = useSearchParams();
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const { isTablet, isMobile } = useResponsive();

  const getCommonPinningStyles = (
    column: Column<TData, unknown>,
    isHeader: boolean
  ): React.CSSProperties => {
    const isPinned = column.getIsPinned();
    const isLastLeftPinnedColumn =
      isPinned === "left" && column.getIsLastColumn("left");
    const isFirstRightPinnedColumn =
      isPinned === "right" && column.getIsFirstColumn("right");

    return {
      boxShadow: isLastLeftPinnedColumn
        ? "-4px 0 4px -4px gray inset"
        : isFirstRightPinnedColumn
        ? "4px 0 4px -4px gray inset"
        : undefined,
      left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
      right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
      opacity: isPinned ? 0.95 : 1,
      position: isPinned ? "sticky" : "relative",
      width: column.getSize(),
      backdropFilter: isPinned ? "blur(10rem)" : undefined,
      zIndex: isPinned ? (isHeader ? 3 : 2) : 0,
    };
  };

  const initialPageIndex = React.useMemo(() => {
    const page = searchParams.get("page");
    return page ? Math.max(0, parseInt(page, 10) - 1) : 0;
  }, [searchParams]);

  const initialPageLimit = React.useMemo(() => {
    const limit = searchParams.get("limit");
    return limit ? parseInt(limit, 10) : 10;
  }, [searchParams]);

  const table = useReactTable({
    data,
    columns,
    autoResetPageIndex: false,
    state: {
      sorting,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageIndex: initialPageIndex,
        pageSize: initialPageLimit
      }
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const [filterValue, setFilterValue] = React.useState<string>(
    (table.getColumn("title")?.getFilterValue() as string) ?? ""
  );

  React.useEffect(() => {
    if (isMobile || isTablet) {
      table.getAllColumns()[0].pin("left");
      table.getAllColumns()[table.getAllColumns().length - 1].pin("right");
    } else {
      table.getAllColumns().forEach((column) => column.pin(false));
    }
  }, [isMobile, isTablet, table]);

  return (
    <div className="h-full flex flex-col space-y-4">
      <DataTableToolbar table={table} filterValue={filterValue} setFilterValue={setFilterValue}/>
      <div className="rounded-md border flex-1 flex flex-col overflow-hidden">
        <ScrollArea className="w-full" type="hover">
          <Table>
            <TableHeader className="sticky top-0 z-20 bg-background shadow-lg dark:shadow-slate-800">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      style={getCommonPinningStyles(header.column, true)}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {initialLoading ? (
                Array.from({ length: 10 }).map((_, idx) => (
                  <TableRow key={`skeleton-row-${idx}`}>
                    {columns.map((_, colIdx) => (
                      <TableCell key={`skeleton-cell-${idx}-${colIdx}`}>
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : isError ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-full text-center"
                  >
                    Error fetching data. Please try again.
                  </TableCell>
                </TableRow>
              ) : table.getFilteredRowModel().rows.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-full text-center w-full"
                  >
                    <NoDataPlaceholder />
                  </TableCell>
                </TableRow>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        style={getCommonPinningStyles(cell.column, false)}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" className="mt-2" />
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </div>
      <DataTablePagination 
        table={table} 
        disabled={initialLoading}
        filterValue={filterValue}
      />
    </div>
  );
}