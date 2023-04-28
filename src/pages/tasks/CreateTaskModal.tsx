import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { TaskModel } from "../../model/TaskModel";
import { TodoApiClient } from "../../client/TodoApiClient";
import { PriorityModel } from "../../model/PriorityModel";

interface CreateTaskModalProps {
  show: boolean;
  onHide: () => void;
  onCreateTask: (createdTask: TaskModel) => void;
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
  show,
  onHide,
  onCreateTask,
}) => {
  const [task, setTask] = useState<TaskModel>({
    id: 0,
    name: "",
    description: "",
    completed: false,
    created: new Date(),
    priority: PriorityModel.LOW,
    subtasks: [],
    category: [],
  });

  const handleSave = () => {
    if (task.name.trim() !== "") {
      TodoApiClient.createTask(task).then((createdTask) => {
        onCreateTask(createdTask);
        onHide();
      });
    } else {
      alert("Task name cannot be empty");
    }
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
      setTask({ ...task, [field]: event.target.value });
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Create Task</Modal.Title>
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
          Create Task
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default CreateTaskModal;
