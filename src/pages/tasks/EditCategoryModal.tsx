import React, { useEffect, useState } from "react";
import { Button, Modal, Form, ModalProps } from "react-bootstrap";
import { CategoryModel } from "../../model/CategoryModel";

interface EditCategoryModalProps extends ModalProps {
  taskId: number;
  category: CategoryModel | null;
  onEditCategory: (updatedCategory: CategoryModel) => void;
}

const EditCategoryModal: React.FC<EditCategoryModalProps> = ({
  show,
  onHide,
  taskId,
  category,
  onEditCategory,
}) => {
  const [currentCategory, setCurrentCategory] = useState<CategoryModel | null>(
    null
  );
  

  useEffect(() => {
    if (category) {
      setCurrentCategory(category);
    }
  }, [category]);

  const handleSave = () => {
    if (!currentCategory) return;
    onEditCategory({
      id: currentCategory.id,
      name: currentCategory.name,
      description: currentCategory.description,
      taskId,
    });
    onHide?.();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="categoryName">
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter category name"
              value={currentCategory?.name}
              onChange={(e) => {
                if (!currentCategory) return;
                setCurrentCategory({
                  ...currentCategory,
                  name: e.target.value,
                });
              }}
            />
          </Form.Group>
          <Form.Group controlId="categoryDescription">
            <Form.Label>Category Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter category description"
              value={currentCategory?.description}
              onChange={(e) => {
                if (!currentCategory) return;
                setCurrentCategory({
                  ...currentCategory,
                  description: e.target.value,
                });
              }}
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

export default EditCategoryModal;
