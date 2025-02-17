import { TaskSchema } from '@/interface/Data/Data';
import { ITask } from '@/interface/Components/Tasks/Task';
import useTaskStore from '@/zustand/tasks/useTaskStore';
import useToggleStore from '@/zustand/toggle/useToggleStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTasksQueries } from '@/queries/Tasks/useTasksQueries';
import { useEffect, useState } from 'react';
import React from 'react';
import { isSameDay } from 'date-fns';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

const useTaskModalHook = () => {
  const useTaskFormModal = () => {
    const closeModal = useToggleStore((state) => state.closeModal);
    return {
      close: () => closeModal('table-task-modal')
    };
  };

  const { task, setTask } = useTaskStore();
  const { t } = useTranslation();

  const { close } = useTaskFormModal();
  const { createMutation, updateMutation } = useTasksQueries();
  const [isCompleted, setIsCompleted] = useState(task?.completed || false);
  const [loading, setLoading] = useState(false);

  const { memoizedTotalTasks } = useTasksQueries();

  const [date, setDate] = React.useState<Date | undefined>(() => {
    const now = task?.date ? new Date(task.date) : new Date();
    now.setHours(0, 0, 0, 0);
    return now;
  });

  const hasTasksOnDate = (dateToCheck: Date) => {
    return memoizedTotalTasks?.some((task) => {
      const taskDate = new Date(task.date);
      return isSameDay(taskDate, dateToCheck);
    }) || false;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue
  } = useForm<Partial<ITask>>({
    defaultValues: {
      title: task?.title || '',
      content: task?.content || '',
      completed: task?.completed || false,
      date: task?.date || new Date(),
    },
    resolver: zodResolver(TaskSchema),
  });
  
  useEffect(() => {
    if (task) {
      reset({
        title: task.title || '',
        content: task.content || '',
        completed: task.completed || false,
        date: task.date ? new Date(task.date) : new Date(),
      });
      setDate(task.date ? new Date(task.date) : new Date());
      setIsCompleted(task.completed || false);
    } else {
      reset({
        title: '',
        content: '',
        completed: false,
        date: new Date(),
      });
      setDate(new Date());
    }
  }, [task, reset]);
  
  const handleFormSubmit: SubmitHandler<Partial<ITask>> = (data) => {
    const mutation = task ? updateMutation : createMutation;
  
    const payload = task
      ? { ...data, id: task.id, completed: isCompleted, date: date }
      : { ...data, date: date, completed: isCompleted };
  
    setLoading(true);
  
    mutation.mutate(payload, {
      onSuccess: () => {
        toast.success(task ? 
          t("toast.updated.success", {
            taskID: task.id
          })
           : 'Task created successfully');
        reset();
        setDate(new Date());
        setTask(null);
        setLoading(false);
        close();
      },
      onError: () => {
        setLoading(false);
      },
    });
  };
  

  const handleCancel = () => {
    reset();
    setDate(new Date());
    setTask(null);
    close();
  };
  
  return {
    handleFormSubmit,
    handleCancel,
    loading,
    register,
    errors,
    isCompleted,
    setIsCompleted,
    handleSubmit,
    task,
    watch,
    setValue,
    date,
    setDate,
    hasTasksOnDate
  }
}

export default useTaskModalHook