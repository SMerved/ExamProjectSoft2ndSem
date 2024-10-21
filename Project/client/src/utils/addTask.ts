import { addTaskAPI } from '../api/tasks';
import { Task } from '../types/tasks';

export const addTask = async (newTask: Task): Promise<Task> => {
    try {
      return await addTaskAPI(newTask);
    } catch (error) {
      console.error('Error adding task:', error);
      throw error;
    }
  };