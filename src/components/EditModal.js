import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditModal = ({ editModal, setEditModal, editData, setEditData, saveEdit, currency }) => {
  // Handle changes for text, select, and number inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: name === 'customCashOut' ? (value ? Number(value) : '') : value,
    }));
  };

  // Handle form submission with validation
  const handleSave = () => {
    if (editData.customCashOut && Number(editData.customCashOut) < 0) {
      alert('Custom Cash Out Amount cannot be negative');
      return;
    }

    const updatedData = {
      ...editData,
      customCashOut: editData.customCashOut ? Number(editData.customCashOut) : null,
    };

    saveEdit(updatedData);
  };

  return (
    <Modal show={editModal} onHide={() => setEditModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Investment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {editData && (
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Team 1</Form.Label>
              <Form.Control
                type="text"
                name="team1"
                value={editData.team1 || ''}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Team 2</Form.Label>
              <Form.Control
                type="text"
                name="team2"
                value={editData.team2 || ''}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={editData.date ? new Date(editData.date).toISOString().split('T')[0] : ''}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Winner</Form.Label>
              <Form.Control
                as="select"
                name="winner"
                value={editData.winner || 'team1'} // Default to 'team1' if undefined
                onChange={handleChange}
              >
                <option value="team1">Team 1</option>
                <option value="team2">Team 2</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Cash Out Team</Form.Label>
              <Form.Control
                as="select"
                name="cashOutTeam"
                value={editData.cashOutTeam || ''}
                onChange={handleChange}
              >
                <option value="">None</option>
                <option value="team1">Team 1</option>
                <option value="team2">Team 2</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Custom Cash Out Amount ({currency})</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="customCashOut"
                value={editData.customCashOut ?? ''} // Use nullish coalescing to avoid converting 0 to ''
                onChange={handleChange}
                placeholder={`Enter custom amount in ${currency}`}
              />
            </Form.Group>
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setEditModal(false)}>Close</Button>
        <Button variant="primary" onClick={handleSave}>Save Changes</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModal;