import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { SubtaskModel } from "../../model/SubtaskModel";
import { SubtaskApiClient } from "../../client/SubtaskApiClient";
import { TaskModel } from "../../model/TaskModel";

interface CreateSubtaskModalProps {
  show: boolean;
  onHide: () => void;
  parentId: number;
  tasks: TaskModel[];
  onCreateSubtask: (createdSubtask: SubtaskModel) => void;
}

const CreateSubtaskModal: React.FC<CreateSubtaskModalProps> = ({
  show,
  onHide,
  parentId,
  onCreateSubtask,
  tasks,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);

  const handleSubmit = async () => {
    if (name.trim() === "") {
      alert("Subtask name cannot be empty");
      return;
    }

    const task: TaskModel | undefined = tasks.find(
      (task) => task.id === parentId
    );

    if (!task) {
      console.error(`Task with id ${parentId} not found`);
      return;
    }

    const newSubtask: Omit<SubtaskModel, "id"> = {
      name,
      description,
      completed,
      taskId: task.id,
    };

    const createdSubtask = await SubtaskApiClient.createSubtask(newSubtask);
    onCreateSubtask(createdSubtask);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Create Subtask</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="subtaskName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="subtaskDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Check
            type="checkbox"
            label="Completed"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Create Subtask
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateSubtaskModal;
