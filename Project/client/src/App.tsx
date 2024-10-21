import { useEffect, useState } from "react";
import { editTaskAPI, getAllTasksAPI } from "./api/tasks";
import { Task } from "./types/tasks";
import { deleteTask } from "./utils/deleteTask";
import { completedTask } from "./utils/completedTask";
import { addTask } from "./utils/addTask";
import "./App.css";
import checkmark from "./misc/Checkmark.png";
import xMark from "./misc/X-Mark.png";
import edit from "./misc/Edit.png";

const App = () => {
  const [tasks, setTasks] = useState<Task[]>();
  const [editTask, setEditTask] = useState<Task>();
  const [text, setText] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<number>(4);
  const [editTaskId, setEditTaskId] = useState<string>("");

  const fetchTasks = async () => {
    try {
      const tasks = await getAllTasksAPI();
      console.log("Tasks:", tasks);
      setTasks(tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleAddTask = async () => {
    try {
      const newTask: Task = {
        text: text,
        isCompleted: false,
        ...(deadline && { deadline: deadline }),
      };
      await addTask(newTask);
      setText("");
      setDeadline("");
      await fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleEditFullTask = async () => {
    console.log("Check");

    try {
      const editedTask = {
        ...editTask,
        text: text,
        deadline: deadline,
      };
      console.log(editedTask);
      const updatedTask = await editTaskAPI(editedTask);
      console.log("Updated task:", updatedTask);
      fetchTasks();
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleEditTask = async (
    e: React.ChangeEvent<HTMLSelectElement>,
    task: Task
  ) => {
    try {
      const editedTask = {
        ...task,
        category: parseInt(e.target.value),
      };
      console.log(editedTask);
      const updatedTask = await editTaskAPI(editedTask);
      console.log("Updated task:", updatedTask);
      fetchTasks();
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  async function handleButtonClick(id: string | undefined): Promise<void> {
    if (!id) return;
    try {
      await deleteTask(id);
      console.log("Task deleted:", id);
      await fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }

  async function handleImageClick(
    id: string | undefined,
    isCompleted: boolean | undefined
  ): Promise<void> {
    if (!id || typeof isCompleted !== "boolean") return;
    try {
      await completedTask(id, isCompleted);
      console.log("Task completed/uncompleted:", id);
      await fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }
  const handleTabChange = (category: number) => {
    setSelectedCategory(category);
  };

  async function handleEdit(
    id: string | undefined,
    isCompleted: boolean | undefined
  ): Promise<void> {
    if (!id || typeof isCompleted !== "boolean") return;
    try {
      await completedTask(id, isCompleted);
      console.log("Task completed/uncompleted:", id);
      await fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }

  const filteredTasks =
    selectedCategory === 4
      ? tasks
      : tasks?.filter((task) => task.category === selectedCategory);

  return (
    <div className="App">
      <div className="container" style={{ backgroundColor: "aliceblue" }}>
        <div className="header" style={{ marginBottom: "20px" }}>
          <input
            style={{
              backgroundColor: "white",
              borderColor: "black",
              borderWidth: "1.8px",
            }}
            type="text"
            disabled
            value={
              editTask?.id
                ? `Edit task: ${editTask?.id}`
                : 'Click "edit" on a task'
            }
            className="input-field"
          />
          <input
            type="text"
            id="c-task-text"
            placeholder="Task Text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="input-field"
          />
          <input
            type="date"
            id="c-task-date"
            placeholder="Task Deadline"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="input-field"
          />
          <button
            style={{
              marginRight: "20px",
              backgroundColor: "lightgreen",
              borderRadius: "8px",
            }}
            className="add-task-button"
            onClick={handleEditFullTask}
          >
            Edit Task
          </button>
          <button
            style={{ backgroundColor: "lightgreen", borderRadius: "8px" }}
            className="add-task-button"
            onClick={handleAddTask}
            id="c-add-button"
          >
            Add Task
          </button>
        </div>
        <div className="tabs">
          <button
            style={{
              backgroundColor: selectedCategory == 4 ? "lightgreen" : "white",
            }}
            onClick={() => handleTabChange(4)}
          >
            All
          </button>
          <button
            id="c-work-tab"
            style={{
              backgroundColor: selectedCategory == 1 ? "lightgreen" : "white",
            }}
            onClick={() => handleTabChange(1)}
          >
            Work
          </button>
          <button
            id="c-chores-tab"
            style={{
              backgroundColor: selectedCategory == 2 ? "lightgreen" : "white",
            }}
            onClick={() => handleTabChange(2)}
          >
            Chores
          </button>
          <button
            style={{
              backgroundColor: selectedCategory == 3 ? "lightgreen" : "white",
            }}
            onClick={() => handleTabChange(3)}
          >
            Leisure
          </button>
          <button
            style={{
              backgroundColor: selectedCategory == 0 ? "lightgreen" : "white",
            }}
            onClick={() => handleTabChange(0)}
          >
            None
          </button>
        </div>
        <div className="table-container">
          <table className="table-content">
            <thead>
              <tr>
                <th className="table-cell table-cell-header">Text</th>
                <th className="table-cell table-cell-header">Deadline</th>
                <th className="table-cell table-cell-header">Set category</th>
                <th className="table-cell table-cell-header">Completed</th>
                <th className="table-cell table-cell-header">Delete</th>
                <th className="table-cell table-cell-header">Edit</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks?.map((task) => (
                <tr key={task.id}>
                  <td className="table-cell">{task.text}</td>
                  <td className="table-cell">{task.deadline || "-"}</td>
                  <td className="table-cell">
                    <select
                      value={task.category}
                      onChange={(e) => handleEditTask(e, task)}
                    >
                      <option value="0">None</option>
                      <option value="1">Work</option>
                      <option value="2">Chores</option>
                      <option value="3">Leisure</option>
                    </select>
                  </td>
                  <td className="table-cell">
                    <img
                      src={task.isCompleted ? checkmark : xMark}
                      alt={task.isCompleted ? "complete" : "incomplete"}
                      style={{
                        width: "30px",
                        height: "30px",
                        cursor: "pointer",
                      }}
                      onClick={
                        () => handleImageClick(task.id, !task.isCompleted) //Changes to the opposite of what it currently is
                      }
                    />
                  </td>
                  <td className="table-cell">
                    <button
                      id={`c-delete-button-${task.id}`}
                      style={{
                        backgroundColor: "red",
                        marginBottom: "10px",
                        cursor: "pointer",
                        border: "2px solid black",
                        borderRadius: "4px",
                      }}
                      onClick={() => handleButtonClick(task.id)}
                    >
                      Delete
                    </button>
                  </td>
                  <td className="table-cell">
                    <img
                      src={edit}
                      alt="Edit"
                      style={{
                        width: "25px",
                        height: "25px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setEditTask(task);
                        setText(task?.text || "N/A");
                        setDeadline(
                          task?.deadline ||
                            (() => {
                              const today = new Date();
                              today.setDate(today.getDate() + 7);
                              return today.toISOString().split("T")[0];
                            })()
                        );
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default App;
