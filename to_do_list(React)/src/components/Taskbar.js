import React, { useState } from 'react';
import { Button, Navbar, Modal, Form } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Api from '../services/TaskService'; // Ensure the correct path to your API service

const Taskbar = ({ onRefreshClick, onTaskSubmit }) => {
  const [showModal, setShowModal] = useState(false);
  const [taskDetails, setTaskDetails] = useState({
    assignedTo: '',
    status: 'NOT_STARTED', // Set default status to NOT_STARTED
    dueDate: '',
    priority: 'LOW',
    comments: '',
  });

  // Handler to open the modal
  const handleNewTaskClick = () => {
    setShowModal(true);
  };

  // Handler to close the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setTaskDetails({
      assignedTo: '',
      status: 'NOT_STARTED',
      dueDate: '',
      priority: 'LOW',
      comments: '',
    }); // Reset form fields
  };

  // Handler for form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskDetails({ ...taskDetails, [name]: value }); // Convert priority to uppercase
  };

  // Handler to submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Sending Data :" + JSON.stringify(taskDetails));
      await onTaskSubmit(taskDetails); // Pass the task details to the parent component
      handleCloseModal(); // Close the modal after submission
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <>
      <Navbar bg="light" className="justify-content-between">
        <Navbar.Brand>
          <i className="bi bi-list-ul"></i> Tasks
        </Navbar.Brand>
        <div>
          <Button variant="primary" onClick={handleNewTaskClick}>New Task</Button>
          <Button variant="secondary" onClick={onRefreshClick} className="ms-2">Refresh</Button>
        </div>
      </Navbar>

      {/* Modal for New Task */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Assigned To</Form.Label>
              <Form.Control
                type="text"
                name="assignedTo"
                value={taskDetails.assignedTo}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="status">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={taskDetails.status}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Status</option>
                <option value="NOT_STARTED">Not Started</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                name="dueDate"
                value={taskDetails.dueDate}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Priority</Form.Label>
              <Form.Select
                name="priority"
                value={taskDetails.priority}
                onChange={handleInputChange}
                required
              >
                <option value="LOW">Low</option>
                <option value="NORMAL">Normal</option>
                <option value="HIGH">High</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Comments</Form.Label>
              <Form.Control
                as="textarea"
                name="comments"
                value={taskDetails.comments}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">Add Task</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Taskbar;
