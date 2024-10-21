import { editTaskAPI } from '../api/tasks';
import { Task } from '../types/tasks';

export const editTask = async (updatedTask: Task): Promise<Task> => {
    try {
      return await editTaskAPI(updatedTask);
    } catch (error) {
      console.error('Error adding task:', error);
      throw error;
    }
  };