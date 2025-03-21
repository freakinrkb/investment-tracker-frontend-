import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditModal = ({ editModal, setEditModal, editData, setEditData, saveEdit, currency }) => (
  <Modal show={editModal} onHide={() => setEditModal(false)}>
    <Modal.Header closeButton><Modal.Title>Edit Investment</Modal.Title></Modal.Header>
    <Modal.Body>
      {editData && (
        <Form>
          <Form.Group>
            <Form.Label>Team 1</Form.Label>
            <Form.Control
              type="text"
              name="team1"
              value={editData.team1}
              onChange={(e) => setEditData(prev => ({ ...prev, [e.target.name]: e.target.value }))}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Team 2</Form.Label>
            <Form.Control
              type="text"
              name="team2"
              value={editData.team2}
              onChange={(e) => setEditData(prev => ({ ...prev, [e.target.name]: e.target.value }))}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={editData.date}
              onChange={(e) => setEditData(prev => ({ ...prev, [e.target.name]: e.target.value }))}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Winner</Form.Label>
            <Form.Control
              as="select"
              name="winner"
              value={editData.winner}
              onChange={(e) => setEditData(prev => ({ ...prev, [e.target.name]: e.target.value }))}
            >
              <option value="none">Select Winner</option>
              <option value="team1">Team 1</option>
              <option value="team2">Team 2</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Cash Out Team</Form.Label>
            <Form.Control
              as="select"
              name="cashOutTeam"
              value={editData.cashOutTeam}
              onChange={(e) => setEditData(prev => ({ ...prev, [e.target.name]: e.target.value }))}
            >
              <option value="">None</option>
              <option value="team1">Team 1</option>
              <option value="team2">Team 2</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Custom Cash Out Amount ({currency})</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              name="customCashOut"
              value={editData.customCashOut || ""}
              onChange={(e) => setEditData(prev => ({ ...prev, [e.target.name]: e.target.value }))}
              placeholder={`Enter custom amount in ${currency}`}
            />
          </Form.Group>
        </Form>
      )}
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={() => setEditModal(false)}>Close</Button>
      <Button variant="primary" onClick={saveEdit}>Save Changes</Button>
    </Modal.Footer>
  </Modal>
);

export default EditModal;