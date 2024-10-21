import { addTaskAPI } from "../api/tasks";
import { Task } from "../types/tasks";

describe("addTaskAPI", () => {
  const mockTask: Task = { id: "1", text: "Test task" };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should add a task successfully", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockTask),
      })
    ) as jest.Mock;

    const result = await addTaskAPI({ text: "Test task" });
    expect(result).toEqual(mockTask);
    expect(global.fetch).toHaveBeenCalledWith("http://localhost:3001/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: "Test task" }),
    });
  });

  it("should throw an error when the API call fails", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
      })
    ) as jest.Mock;

    await expect(addTaskAPI({ text: "Test task" })).rejects.toThrow(
      "Failed to add task"
    );
    expect(global.fetch).toHaveBeenCalledWith("http://localhost:3001/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: "Test task" }),
    });
  });
});
