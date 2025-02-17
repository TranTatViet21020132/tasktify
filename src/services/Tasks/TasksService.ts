import { ITask } from '@/interface/Components/Tasks/Task'
import { ITaskFilter } from '@/interface/Components/Tasks/TaskFilter';
import AxiosClient from '@/services/Tasks/TasksClient';

export const getTasks = async (filter?: ITaskFilter): Promise<ITask[]> => {
  try {  
    const response = await AxiosClient.get(`/tasks`, { params: filter });
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const createTask = async (task: Partial<ITask>): Promise<ITask> => {
  try {
    const response = await AxiosClient.post(`/tasks`, task);
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

export const updateTask = async (task: Partial<ITask>): Promise<ITask> => {
  try {
    const response = await AxiosClient.put(`/tasks/${task.id}`, task);
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

export const deleteTask = async (taskId: string): Promise<void> => {
  try {
    await AxiosClient.delete(`/tasks/${taskId}`);
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};
