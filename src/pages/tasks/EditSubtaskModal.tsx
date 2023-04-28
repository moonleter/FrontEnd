import React, { useEffect, useState } from "react";
import { Button, Modal, Form, ModalProps } from "react-bootstrap";
import { SubtaskModel } from "../../model/SubtaskModel";
import { SubtaskApiClient } from "../../client/SubtaskApiClient";

interface EditSubtaskModalProps extends ModalProps {
  taskId: number;
  subtask: SubtaskModel | null;
  onEditSubtask: (updatedSubtask: SubtaskModel) => void;
}

const EditSubtaskModal: React.FC<EditSubtaskModalProps> = ({
  show,
  onHide,
  taskId,
  subtask,
  onEditSubtask,
}) => {
  const [currentSubtask, setCurrentSubtask] = useState<SubtaskModel | null>(
    null
  );

  useEffect(() => {
    if (subtask) {
      setCurrentSubtask(subtask);
    }
  }, [subtask]);

  const handleSave = async () => {
    if (!currentSubtask) return;
    try {
      const updatedSubtaskFromApi = await SubtaskApiClient.updateSubtask({
        ...currentSubtask,
        taskId,
      });
      onEditSubtask({ ...updatedSubtaskFromApi, taskId });
      onHide?.();
    } catch (error) {
      console.error("Failed to update subtask:", error);
    }
  };

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: keyof SubtaskModel
  ) => {
    if (currentSubtask && event.target instanceof HTMLInputElement) {
      setCurrentSubtask({ ...currentSubtask, [field]: event.target.checked });
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Subtask</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="subtaskName">
            <Form.Label>Subtask Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter subtask name"
              value={currentSubtask?.name}
              onChange={(e) => {
                if (!currentSubtask) return;
                setCurrentSubtask({ ...currentSubtask, name: e.target.value });
              }}
            />
          </Form.Group>
          <Form.Group controlId="subtaskDescription">
            <Form.Label>Subtask Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter subtask description"
              value={currentSubtask?.description}
              onChange={(e) => {
                if (!currentSubtask) return;
                setCurrentSubtask({
                  ...currentSubtask,
                  description: e.target.value,
                });
              }}
            />
          </Form.Group>

          <Form.Group>
            <Form.Check
              type="checkbox"
              label="Completed"
              checked={currentSubtask?.completed || false}
              onChange={(e) => handleCheckboxChange(e, "completed")}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditSubtaskModal;
