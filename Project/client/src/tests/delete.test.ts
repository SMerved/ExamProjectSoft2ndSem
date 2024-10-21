import { deleteTask } from "../utils/deleteTask";
import * as api from "../api/tasks";
import { Task } from "../types/tasks";

jest.mock("../api/tasks", () => ({
  deleteTaskAPI: jest.fn(),
}));

describe("deleteTask", () => {
  it("should delete the task and return success response", async () => {
    const mockTaskId = "2";
    (api.deleteTaskAPI as jest.Mock).mockResolvedValue({ success: true });

    const response = await deleteTask(mockTaskId);

    expect(response).toEqual({ success: true });
    expect(api.deleteTaskAPI).toHaveBeenCalledWith(mockTaskId);
  });

  it("should handle API failure gracefully", async () => {
    (api.deleteTaskAPI as jest.Mock).mockRejectedValue(
      new Error("Failed to delete task")
    );

    const taskId = "999";

    await expect(deleteTask(taskId)).rejects.toThrow("Failed to delete task");
    expect(api.deleteTaskAPI).toHaveBeenCalledWith(taskId);
  });
});
