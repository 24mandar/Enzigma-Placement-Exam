import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteModal = ({ task, onClose, onConfirm }) => {
  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Do you want to delete the task ?</p>
        <p>ID:"{task?.id }" </p>
        <p>Assigned to :"{task?.assignedTo}" </p>
        <p>Status :"{task?.status}"</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>No</Button>
        <Button variant="danger" onClick={onConfirm}>Yes</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
