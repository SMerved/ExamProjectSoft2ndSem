import { deleteTaskAPI } from "../api/tasks";
import { Task } from "../types/tasks";

export const deleteTask = async (deleteTaskId: string): Promise<Task> => {
  try {
    return await deleteTaskAPI(deleteTaskId);
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};
