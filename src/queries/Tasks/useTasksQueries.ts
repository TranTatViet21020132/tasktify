import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ITask } from '@/interface/Components/Tasks/Task';
import { createTask, updateTask, deleteTask, getTasks } from '@/services/Tasks/TasksService';
import { toast } from 'sonner';
// import useTaskFilterStore from '@/zustand/params/useTaskFilterStore';
import { useMemo } from 'react';

export const useTasksQueries = () => {
  const queryClient = useQueryClient();
  // const { filter } = useTaskFilterStore();

  // const { data: tasks = [], isError, isLoading: initialLoading } = useSuspendingQuery({
  //   queryKey: ['tasks', filter],
  //   queryFn: () => getTasks(filter),
  //   placeholderData: keepPreviousData,
  //   retry: 1,
  //   refetchOnWindowFocus: false,
  //   gcTime: 300000,
  //   staleTime: 300000,
  // });

  const { data: totalTasks, isError, isLoading: initialLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: () => getTasks(),
    placeholderData: keepPreviousData,
    gcTime: 300000,
    staleTime: 300000,
  });

  const memoizedTotalTasks = useMemo(() => totalTasks, [totalTasks]);
  const totalTasksCount = useMemo(() => memoizedTotalTasks?.length, [memoizedTotalTasks]);

  const createMutation = useMutation({
    mutationFn: (task: Partial<ITask>) => createTask(task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (task: Partial<ITask>) => updateTask(task),
    onMutate: async (updatedTask) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });

      const previousTasks = queryClient.getQueryData<ITask[]>(['tasks']);

      queryClient.setQueryData(['tasks'], (oldTasks: ITask[] | undefined) => {
        if (!oldTasks) return [];
        const index = oldTasks.findIndex((task) => task.id === updatedTask.id);
        if (index !== -1) {
          const updatedTasks = [...oldTasks];
          updatedTasks[index] = { ...updatedTasks[index], ...updatedTask };
          return updatedTasks;
        }
        return oldTasks;
      });

      return { previousTasks };
    },
    onError: (_, __, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(['tasks'], context.previousTasks);
      }
      toast.error('Failed to update task');
    },
    onSettled: (_, __, variables) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['tasks', variables?.id] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (taskId: string) => deleteTask(taskId),
    onMutate: async (taskId) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });

      const previousTasks = queryClient.getQueryData<ITask[]>(['tasks']);

      queryClient.setQueryData(['tasks'], (oldTasks: ITask[] | undefined) =>
        oldTasks ? oldTasks.filter((task) => task.id !== taskId) : []
      );

      return { previousTasks };
    },
    onError: (_, __, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(['tasks'], context.previousTasks);
      }
      toast.error('Failed to delete task');
    },
    onSettled: (_, __, taskId) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['tasks', taskId] });
    },
  });

  return {
    // tasks,
    memoizedTotalTasks,
    totalTasksCount,
    isError,
    initialLoading,
    createMutation,
    updateMutation,
    deleteMutation,
  };
};
