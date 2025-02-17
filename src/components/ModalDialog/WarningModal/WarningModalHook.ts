import { useTasksQueries } from "@/queries/Tasks/useTasksQueries";
import useTaskStore from "@/zustand/tasks/useTaskStore";
import useToggleStore from "@/zustand/toggle/useToggleStore";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

const useWarningModalHook = () => {
  const { task, setTask } = useTaskStore();
  const closeModal = useToggleStore((state) => state.closeModal);
  const { deleteMutation } = useTasksQueries();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleDeleteTask = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (task?.id) {
      deleteMutation.mutate(task.id, {
        onSuccess: () => {
          toast.success(t('toast.delete.success', { taskID: task.id }));
          setLoading(false);
          setTask(null);
          closeModal('table-delete-modal');
        }
      });
    }
  };

  const handleCancel = () => {
    setTask(null);
    closeModal('table-delete-modal');
  };

  return {
    handleDeleteTask,
    handleCancel,
    loading
  }
}

export default useWarningModalHook