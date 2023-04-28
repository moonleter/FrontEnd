import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { CategoryModel } from "../../model/CategoryModel";
import { CategoryApiClient } from "../../client/CategoryApiClient";
import { TaskModel } from "../../model/TaskModel";

interface CreateCategoryModalProps {
  show: boolean;
  onHide: () => void;
  parentId: number;
  tasks: TaskModel[];
  onCreateCategory: (createdCategory: CategoryModel) => void;
}

const CreateCategoryModal: React.FC<CreateCategoryModalProps> = ({
  show,
  onHide,
  parentId,
  onCreateCategory,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    if (name.trim() === "") {
      alert("Category name cannot be empty");
      return;
    }

    const newCategory: CategoryModel = {
      id: 0,
      name,
      description,
      taskId: parentId,
    };

    const createdCategory = await CategoryApiClient.createCategory(newCategory);
    onCreateCategory(createdCategory);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Create Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="categoryName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="categoryDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Create Category
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateCategoryModal;
