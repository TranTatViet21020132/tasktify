import { ITask } from '@/interface/Components/Tasks/Task';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import useTaskStore from '@/zustand/tasks/useTaskStore';
import useToggleStore from '@/zustand/toggle/useToggleStore';
import { t } from 'i18next';

interface TaskActionsProps {
  task: ITask;
}

export const TaskActions = ({ task }: TaskActionsProps) => {
  const { setTask } = useTaskStore();
  const { openModal } = useToggleStore();

  const handleOpenUpdateTask = () => {
    setTask(task);
    openModal('table-task-modal');
  };
  
  const handleOpenDeleteTask = () => {
    setTask(task);
    openModal('table-delete-modal');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 p-0 w-8">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleOpenUpdateTask}>{t("table.action.edit")}</DropdownMenuItem>
        <DropdownMenuItem onClick={handleOpenDeleteTask}>{t("table.action.delete")}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};