import axios from 'axios';
import { BASE_TASK_URL } from '@/configs/consts';

const TasksClient = axios.create({
  baseURL: BASE_TASK_URL,
});

export default TasksClient;