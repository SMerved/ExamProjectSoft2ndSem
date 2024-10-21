import { completedTaskAPI } from "../api/tasks";
import { Task } from "../types/tasks";

export const completedTask = async (
  completedTaskId: string,
  isCompleted: boolean
): Promise<Task> => {
  try {
    return await completedTaskAPI(completedTaskId, isCompleted);
  } catch (error) {
    console.error("Error changing completion state of task:", error);
    throw error;
  }
};
