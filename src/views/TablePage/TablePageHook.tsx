import { ColumnDef } from "@tanstack/react-table";
import { ITask } from "@/interface/Components/Tasks/Task";
import { DataTableColumnHeader } from "@/components/TableHeader/TableHeader";
import { TaskActions } from "@/components/TaskActions/TaskActions";
import { endOfDay, isWithinInterval, startOfDay } from "date-fns";
import DOMPurify from 'dompurify';
import { CircleCheckBig, Timer } from "lucide-react";
import { t } from "i18next";

const useTablePageHook = () => {
  const columns: ColumnDef<ITask>[] = [
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.header.ID")} />
      ),
      cell: ({ row }) => {
        const ID = row.getValue("id") as string;
        return <div className="font-medium">{ID}</div>;
      },
      size: 20,
    },
    {
      accessorKey: "title",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.header.title")} />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[150px] truncate">
              {row.getValue("title")}
            </span>
          </div>
        )
      },
      size: 180,
    },
    {
      accessorKey: "content",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.header.content")} />
      ),
      cell: ({ row }) => {
        const sanitizedHtml = DOMPurify.sanitize(row.getValue("content") as string);
        return (
          <div className="flex">
            <div 
              className="max-w-[300px] truncate" 
              dangerouslySetInnerHTML={{ __html: sanitizedHtml }} 
            />
          </div>
        )
      },
      size: 300,
    },
    {
      accessorKey: "date",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.header.date")} />
      ),
      cell: ({ row }) => {
        const dateStr = row.getValue("date");
        const date = new Date(dateStr as string);
        const formattedDate = date.toLocaleDateString("vi-VN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
        return <div className="font-medium">{formattedDate}</div>;
      },
      filterFn: (row, columnId, filterValue: { from: Date; to: Date }) => {
        const rowDate = new Date(row.getValue(columnId) as string);
        const { from, to } = filterValue;
        
        return isWithinInterval(rowDate, { start: startOfDay(from), end: endOfDay(to) });
      },
      size: 180,
    },
    {
      accessorKey: "completed",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.header.status")} />
      ),
      cell: ({ row }) => {
        const completed = row.getValue("completed") as boolean;
        return (
          <div className={`inline-flex items-center space-x-2 px-4 py-1 rounded-full text-sm font-medium ${
            completed
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}>
            {completed ? <CircleCheckBig className="w-4 h-4" /> : <Timer className="w-4 h-4" />}
            <span>{completed ? t("table.statuses.label.completed") : t("table.statuses.label.onGoing")}</span>
          </div>
        );
      },
      filterFn: (row, columnId, filterValue) => {
        return filterValue.includes(String(row.getValue(columnId)));
      },
      size: 180,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const task = row.original;
        return (
          <TaskActions task={task} />
        )
      },
      size: 60
    },
  ];

  return {
    columns,
  };
};

export default useTablePageHook;