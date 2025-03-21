import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteModal = ({ showDeleteConfirm, setShowDeleteConfirm, handleDelete, triggerButton }) => {
  const [show, setShow] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  // Show modal and set index when triggered
  const handleShow = (index) => {
    setShow(true);
    setDeleteIndex(index);
    setShowDeleteConfirm(index); // Keep App.js state in sync
  };

  const handleClose = () => {
    setShow(false);
    setDeleteIndex(null);
    setShowDeleteConfirm(false);
  };

  const handleDeleteAndClose = () => {
    if (deleteIndex !== null) {
      handleDelete(deleteIndex); // Pass the index to handleDelete
    }
    handleClose();
  };

  // Update show state based on showDeleteConfirm from App.js
  React.useEffect(() => {
    if (showDeleteConfirm !== false && typeof showDeleteConfirm === 'number') {
      setShow(true);
      setDeleteIndex(showDeleteConfirm);
    } else {
      setShow(false);
      setDeleteIndex(null);
    }
  }, [showDeleteConfirm]);

  return (
    <>
      {triggerButton && React.cloneElement(triggerButton, { onClick: () => handleShow(showDeleteConfirm) })}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this investment?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="danger" onClick={handleDeleteAndClose}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteModal;