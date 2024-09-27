import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const TaskDetailModal = ({ task, show, onHide, onSave }) => {
  const [editedTask, setEditedTask] = useState(task);

  useEffect(() => {
    setEditedTask(task);
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  const handleSave = () => {
    onSave(editedTask); // Call the save function passed as prop
    onHide(); // Close the modal after saving
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="assignedTo">
            <Form.Label>Assigned To</Form.Label>
            <Form.Control
              type="text"
              name="assignedTo"
              value={editedTask.assignedTo}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="status">
            <Form.Label>Status</Form.Label>
            <Form.Select
              name="status"
              value={editedTask.status}
              onChange={handleChange}
              required
            >
              <option value="">Select Status</option>
              <option value="NOT_STARTED">Not Started</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="dueDate">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              name="dueDate"
              value={editedTask.dueDate}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="priority">
            <Form.Label>Priority</Form.Label>
            <Form.Select
              name="priority"
              value={editedTask.priority}
              onChange={handleChange}
              required
            >
              <option value="">Select Priority</option>
              <option value="LOW">Low</option>
              <option value="NORMAL">Normal</option>
              <option value="HIGH">High</option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="comments">
            <Form.Label>Comments</Form.Label>
            <Form.Control
              as="textarea"
              name="comments"
              value={editedTask.comments}
              onChange={handleChange}
              required
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

export default TaskDetailModal;
