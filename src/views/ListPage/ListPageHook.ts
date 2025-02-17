import { useTasksQueries } from '@/queries/Tasks/useTasksQueries';
import { IColumn } from '@/interface/Components/Column/Column';
import { DragEndEvent } from '@dnd-kit/core';
import { endOfDay, isSameDay, isWithinInterval, startOfDay } from 'date-fns';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

const useTasksListHook = () => {
  const { t } = useTranslation();

  const COLUMNS: IColumn[] = [
    { id: 'false', title: t("table.statuses.label.onGoing") },
    { id: 'true', title: t("table.statuses.label.completed") },
  ];
  
  const { updateMutation, memoizedTotalTasks } = useTasksQueries();
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
  
    if (!over || active.id === over.id) return;
  
    const taskId = active.id as string;
    const targetColumnId = over.id as string;
  
    const draggedTask = memoizedTotalTasks?.find((task) => task.id === taskId);
  
    if (draggedTask && draggedTask.completed.toString() !== targetColumnId) {
      const updatedTask = {
        ...draggedTask,
        completed: !draggedTask.completed,
      };
      updateMutation.mutate(updatedTask, {
        onSuccess: () => {
          toast.success(t('task.updateSuccess'));
        },
      });
    }
  };
  
  const [date, setDate] = useState<Date | undefined>(new Date());

  const hasTasksOnDate = (dateToCheck: Date) => {
    return memoizedTotalTasks?.some((task) => {
      const taskDate = new Date(task.date);
      return isSameDay(taskDate, dateToCheck);
    }) || false;
  };

  const tasksForSelectedDate = useMemo(() => {
    return memoizedTotalTasks?.filter((task) => {
      const taskDate = new Date(task.date);
      return (
        date &&
        isWithinInterval(taskDate, {
          start: startOfDay(date),
          end: endOfDay(date),
        })
      );
    }) || [];
  }, [date, memoizedTotalTasks]);

  return {
    COLUMNS,
    handleDragEnd,
    date,
    setDate,
    hasTasksOnDate,
    tasksForSelectedDate,
  };
};


export default useTasksListHook;