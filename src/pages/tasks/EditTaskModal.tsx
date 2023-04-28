import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { TaskModel } from "../../model/TaskModel";
import { TodoApiClient } from "../../client/TodoApiClient";
import { PriorityModel } from "../../model/PriorityModel";

interface EditTaskModalProps {
  show: boolean;
  onHide: () => void;
  taskId: number;
  onEditTask: (updatedTask: TaskModel) => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({
  show,
  onHide,
  taskId,
  onEditTask,
}) => {
  const [task, setTask] = useState<TaskModel>({
    id: taskId,
    name: "",
    description: "",
    completed: false,
    created: new Date(),
    priority: PriorityModel.LOW,
    subtasks: [],
    category: [],
  });

  useEffect(() => {
    if (show && taskId) {
      TodoApiClient.getTaskById(taskId).then((fetchedTask) => {
        setTask(fetchedTask);
      });
    }
  }, [show, taskId]);

  const handleSave = () => {
    TodoApiClient.updateTask(task).then((updatedTask) => {
      onEditTask(updatedTask);
      onHide();
    });
  };

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    field: keyof TaskModel
  ) => {
    if (
      event.target instanceof HTMLInputElement ||
      event.target instanceof HTMLTextAreaElement ||
      event.target instanceof HTMLSelectElement
    ) {
      if (typeof event.target.value !== "undefined") {
        const value =
          field === "priority"
            ? (event.target.value as PriorityModel)
            : event.target.value;

        setTask({ ...task, [field]: value });
      }
    }
  };

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: keyof TaskModel
  ) => {
    if (event.target instanceof HTMLInputElement) {
      setTask({ ...task, [field]: event.target.checked });
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Task name</Form.Label>
            <Form.Control
              type="text"
              value={task.name}
              onChange={(event) => handleInputChange(event, "name")}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              value={task.description}
              onChange={(event) => handleInputChange(event, "description")}
            />
          </Form.Group>
          <Form.Group>
            <Form.Check
              type="checkbox"
              label="Completed"
              checked={task.completed}
              onChange={(event) => handleCheckboxChange(event, "completed")}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Priority</Form.Label>
            <Form.Control
              as="select"
              value={task.priority}
              onChange={(event) => handleInputChange(event, "priority")}
            >
              {Object.values(PriorityModel).map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="success" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditTaskModal;
