import React, { useState } from "react";
import { TaskModel } from "../../model/TaskModel";
import { Button } from "react-bootstrap";
import EditTaskModal from "./EditTaskModal";
import EditSubtaskModal from "./EditSubtaskModal";
import EditCategoryModal from "./EditCategoryModal";
import { SubtaskModel } from "../../model/SubtaskModel";
import { CategoryModel } from "../../model/CategoryModel";
import CreateSubtaskModal from "./CreateSubtaskModal";
import CreateCategoryModal from "./CreateCategoryModal";

interface TaskRowProps {
  task: TaskModel;
  onEditTask: (updatedTask: TaskModel) => void;
  onEditSubtask: (updatedSubtask: SubtaskModel) => void;
  onEditCategory: (updatedCategory: CategoryModel) => void;
  onCreateSubtask: (taskId: number, createdSubtask: SubtaskModel) => void;
  onCreateCategory: (taskId: number, createdCategory: CategoryModel) => void;
  tasks: TaskModel[];
  onDeleteTask: (taskId: number) => void;
  onDeleteSubtask: (taskId: number, subtaskId: number) => void;
  onDeleteCategory: (taskId: number, categoryId: number) => void;
}

const TaskRow: React.FC<TaskRowProps> = ({
  task,
  onEditTask,
  onEditSubtask,
  onEditCategory,
  onDeleteTask,
  onDeleteSubtask,
  onDeleteCategory,
  onCreateSubtask,
  onCreateCategory,
  tasks,
}) => {
  const [editTaskModalVisible, setEditTaskModalVisible] = useState(false);
  const [editSubtaskModalVisible, setEditSubtaskModalVisible] = useState(false);
  const [editCategoryModalVisible, setEditCategoryModalVisible] =
    useState(false);
  const [createSubtaskModalVisible, setCreateSubtaskModalVisible] =
    useState(false);
  const [createCategoryModalVisible, setCreateCategoryModalVisible] =
    useState(false);
  const [activeSubtask, setActiveSubtask] = useState<SubtaskModel | null>(null);
  const [activeCategory, setActiveCategory] = useState<CategoryModel | null>(
    null
  );

  const openCreateSubtaskModal = () => {
    setCreateSubtaskModalVisible(true);
  };
  const closeCreateSubtaskModal = () => setCreateSubtaskModalVisible(false);

  const openCreateCategoryModal = () => {
    setCreateCategoryModalVisible(true);
  };
  const closeCreateCategoryModal = () => setCreateCategoryModalVisible(false);

  const openEditTaskModal = () => setEditTaskModalVisible(true);
  const closeEditTaskModal = () => setEditTaskModalVisible(false);

  const openEditSubtaskModal = (subtask: SubtaskModel) => {
    setActiveSubtask(subtask);
    setEditSubtaskModalVisible(true);
  };
  const closeEditSubtaskModal = () => setEditSubtaskModalVisible(false);

  const openEditCategoryModal = (category: CategoryModel) => {
    setActiveCategory(category);
    setEditCategoryModalVisible(true);
  };
  const closeEditCategoryModal = () => setEditCategoryModalVisible(false);

  return (
    <>
      <tr className="task-row">
        <td>{task.name}</td>
        <td>{task.description}</td>
        <td>{task.completed ? "Completed" : "Not completed"}</td>
        <td>{new Date(task.created).toLocaleDateString()}</td>
        <td>{task.priority}</td>
        <td>
          {task.subtasks.map((subtask) => (
            <div key={`subtask-${subtask.id}`}>
              <p>
                {subtask.name} - {subtask.description} -{" "}
                {subtask.completed ? "Completed" : "Not completed"}
              </p>
              <Button onClick={() => openEditSubtaskModal(subtask)}>
                Edit Subtask
              </Button>
              <Button
                variant="danger"
                onClick={() => onDeleteSubtask(task.id, subtask.id)}
              >
                Delete Subtask
              </Button>
            </div>
          ))}
        </td>
        <td>
          {task.category.map((category) => (
            <div key={`category-${category.id}`}>
              <p>
                {category.name} - {category.description}
              </p>
              <Button onClick={() => openEditCategoryModal(category)}>
                Edit Category
              </Button>
              <Button
                variant="danger"
                onClick={() => onDeleteCategory(task.id, category.id)}
              >
                Delete Category
              </Button>
            </div>
          ))}
        </td>
        <td>
          <Button onClick={openEditTaskModal}>Edit Task</Button>
          <Button variant="danger" onClick={() => onDeleteTask(task.id)}>
            Delete Task
          </Button>
          <Button onClick={openCreateSubtaskModal}>Create Subtask</Button>
          <Button onClick={openCreateCategoryModal}>Create Category</Button>
        </td>
      </tr>
      <EditTaskModal
        show={editTaskModalVisible}
        onHide={closeEditTaskModal}
        taskId={task.id}
        onEditTask={onEditTask}
      />
      <EditSubtaskModal
        show={editSubtaskModalVisible}
        onHide={closeEditSubtaskModal}
        taskId={task.id}
        subtask={activeSubtask}
        onEditSubtask={onEditSubtask}
      />
      <EditCategoryModal
        show={editCategoryModalVisible}
        onHide={closeEditCategoryModal}
        taskId={task.id}
        category={activeCategory}
        onEditCategory={onEditCategory}
      />
      <CreateSubtaskModal
        show={createSubtaskModalVisible}
        onHide={closeCreateSubtaskModal}
        parentId={task.id}
        onCreateSubtask={(createdSubtask) =>
          onCreateSubtask(task.id, createdSubtask)
        }
        tasks={tasks}
      />
      <CreateCategoryModal
        show={createCategoryModalVisible}
        onHide={closeCreateCategoryModal}
        parentId={task.id}
        onCreateCategory={(createdCategory) =>
          onCreateCategory(task.id, createdCategory)
        }
        tasks={tasks}
      />
    </>
  );
};

export default TaskRow;
