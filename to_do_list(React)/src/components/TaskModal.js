import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const TaskModal = ({ task, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    } else {
      setTitle('');
      setDescription('');
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description });
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{task ? 'Edit Task' : 'New Task'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
            />
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Label>Description</Form.Label>
            <Form.Control 
              as="textarea" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              required 
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">Save</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default TaskModal;
