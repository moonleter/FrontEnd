import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { TaskModel } from "../../model/TaskModel";
import TaskRow from "./TaskRow";
import { TodoApiClient } from "../../client/TodoApiClient";
import { SubtaskModel } from "../../model/SubtaskModel";
import { CategoryModel } from "../../model/CategoryModel";
import CreateTaskModal from "./CreateTaskModal";
import { SubtaskApiClient } from "../../client/SubtaskApiClient";
import { CategoryApiClient } from "../../client/CategoryApiClient";
import { Form } from "react-bootstrap";

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<TaskModel[]>([]);

  const [createTaskModalVisible, setCreateTaskModalVisible] = useState(false); // Stav pro zobrazení/skrytí modalu

  useEffect(() => {
    const fetchTasks = async () => {
      const fetchedTasks = await TodoApiClient.getTasks();
      setTasks(fetchedTasks);
    };

    fetchTasks();
  }, []);
  const filterTasks = () => {
    const filtered = tasks.filter((task) => {
      const inTaskName = task.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const inTaskDescription = task.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const inSubtasks = task.subtasks.some((subtask) =>
        subtask.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const inCategories = task.category.some((category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      return inTaskName || inTaskDescription || inSubtasks || inCategories;
    });

    setTasks(filtered);
  };

  const updateTask = (updatedTask: TaskModel) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };
  const deleteTask = async (taskId: number) => {
    await TodoApiClient.deleteTaskById(taskId);
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const deleteSubtask = async (taskId: number, subtaskId: number) => {
    await SubtaskApiClient.deleteSubtaskById(subtaskId);
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subtasks: task.subtasks.filter(
                (subtask) => subtask.id !== subtaskId
              ),
            }
          : task
      )
    );
  };

  const deleteCategory = async (taskId: number, categoryId: number) => {
    await CategoryApiClient.deleteCategoryById(categoryId);
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              category: task.category.filter(
                (category) => category.id !== categoryId
              ),
            }
          : task
      )
    );
  };

  const addTask = (createdTask: TaskModel) => {
    setTasks([...tasks, createdTask]);
  };
  const addSubtask = (taskId: number, createdSubtask: SubtaskModel) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            subtasks: [...task.subtasks, createdSubtask],
          };
        } else {
          return task;
        }
      })
    );
  };

  const addCategory = (taskId: number, createdCategory: CategoryModel) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            category: [...task.category, createdCategory],
          };
        } else {
          return task;
        }
      })
    );
  };

  const openCreateTaskModal = () => setCreateTaskModalVisible(true);
  const closeCreateTaskModal = () => setCreateTaskModalVisible(false);

  const updateSubtask = (updatedSubtask: SubtaskModel) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        const subtaskIndex = task.subtasks.findIndex(
          (subtask) => subtask.id === updatedSubtask.id
        );

        if (subtaskIndex === -1) {
          return task;
        }

        const updatedSubtasks = [...task.subtasks];
        updatedSubtasks[subtaskIndex] = updatedSubtask;

        return {
          ...task,
          subtasks: updatedSubtasks,
        };
      })
    );
  };

  const updateCategory = (updatedCategory: CategoryModel) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        const categoryIndex = task.category.findIndex(
          (category) => category.id === updatedCategory.id
        );

        if (categoryIndex === -1) {
          return task;
        }

        const updatedCategories = [...task.category];
        updatedCategories[categoryIndex] = updatedCategory;

        return {
          ...task,
          category: updatedCategories,
        };
      })
    );
  };

  const [searchTerm, setSearchTerm] = useState("");

  const filteredTasks = tasks.filter((task) => {
    const inTaskName = task.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const inTaskDescription = task.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const inSubtasks = task.subtasks.some((subtask) =>
      subtask.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const inCategories = task.category.some((category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return inTaskName || inTaskDescription || inSubtasks || inCategories;
  });

  return (
    <div>
      <h1>Tasks</h1>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={openCreateTaskModal}>Create Task</Button>{" "}
        <div style={{ display: "flex" }}>
          <Form.Control
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search tasks"
          />
          <Button onClick={filterTasks}>Search Tasks</Button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Description</th>
            <th>Status</th>
            <th>Created</th>
            <th>Priority</th>
            <th>Subtasks</th>
            <th>Categories</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <TaskRow
              key={task.id}
              task={task}
              onEditTask={updateTask}
              onEditSubtask={updateSubtask}
              onEditCategory={updateCategory}
              onDeleteTask={deleteTask}
              onDeleteSubtask={deleteSubtask}
              onDeleteCategory={deleteCategory}
              onCreateSubtask={addSubtask}
              onCreateCategory={addCategory}
              tasks={tasks}
            />
          ))}
        </tbody>
      </table>
      <CreateTaskModal
        show={createTaskModalVisible}
        onHide={closeCreateTaskModal}
        onCreateTask={addTask}
      />
    </div>
  );
};

export default Tasks;
