import { editTask } from "../utils/editTask";
import * as api from "../api/tasks";
import { Task, TASK_CATEGORIES } from "../types/tasks";

jest.mock("../api/tasks", () => ({
  editTaskAPI: jest.fn(),
}));

describe("editTask", () => {
    const updatedTask: Task = {
        id: '2',
        text: 'Updated Task',
        category: TASK_CATEGORIES.WORK,
        isCompleted: false,
      };
  it("should return the updated task", async () => {
    (api.editTaskAPI as jest.Mock).mockResolvedValue(updatedTask);

    const returnedTask = await editTask(updatedTask);

    expect(returnedTask).toEqual(updatedTask);
    expect(api.editTaskAPI).toHaveBeenCalledWith(updatedTask);
  });

  it("should handle API failure gracefully", async () => {
    (api.editTaskAPI as jest.Mock).mockRejectedValue(
      new Error("Failed to update task")
    );

    await expect(editTask(updatedTask)).rejects.toThrow("Failed to update task");
    expect(api.editTaskAPI).toHaveBeenCalledWith(updatedTask);
  });
});
