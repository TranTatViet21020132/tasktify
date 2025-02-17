import useTablePageHook from "./TablePageHook";
import { DataTable } from "@/components/DataTable/DataTable";
import { useTasksQueries } from "@/queries/Tasks/useTasksQueries";
import { WarningModal } from "@/components/ModalDialog/WarningModal/WarningModal";
import TaskModal from "@/components/ModalDialog/TaskModal/TaskModal";
import { Helmet } from "react-helmet-async";

const TablePage = () => {
  const { columns } = useTablePageHook();
  const { memoizedTotalTasks, isError, initialLoading } = useTasksQueries();

  return (
    <section className="w-full h-[calc(100vh-4rem)] flex flex-col group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-[calc(100vh-3rem)]">
      <Helmet>
        <title>Task Table</title>
        <meta name="description" content="Welcome to the Table Page" />
      </Helmet>
      
      <div className="flex-1 overflow-hidden px-2 pb-2">
        <DataTable
          columns={columns}
          data={memoizedTotalTasks || []}
          isError={isError}
          isLoading={initialLoading}
        />
      </div>

      <TaskModal />
      <WarningModal />
    </section>
  );
};

export default TablePage;