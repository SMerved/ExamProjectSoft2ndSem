import { completedTask } from "../utils/completedTask";
import * as api from "../api/tasks";
import { Task } from "../types/tasks";

jest.mock("../api/tasks", () => ({
  completedTaskAPI: jest.fn(),
}));

describe("completeTask", () => {
  it("should update the task completion status and return success response", async () => {
    const mockTaskId = "2";
    const mockIsCompleted = true;
    const mockTask: Task = {
      id: mockTaskId,
      text: "Test Task",
      isCompleted: mockIsCompleted,
    };
    (api.completedTaskAPI as jest.Mock).mockResolvedValue(mockTask);

    const response = await completedTask(mockTaskId, mockIsCompleted);

    expect(response).toEqual(mockTask);
    expect(api.completedTaskAPI).toHaveBeenCalledWith(
      mockTaskId,
      mockIsCompleted
    );
  });

  it("should handle API failure gracefully", async () => {
    const mockTaskId = "999";
    const mockIsCompleted = false;
    (api.completedTaskAPI as jest.Mock).mockRejectedValue(
      new Error("Failed to update task")
    );

    await expect(completedTask(mockTaskId, mockIsCompleted)).rejects.toThrow(
      "Failed to update task"
    );
    expect(api.completedTaskAPI).toHaveBeenCalledWith(
      mockTaskId,
      mockIsCompleted
    );
  });
});
