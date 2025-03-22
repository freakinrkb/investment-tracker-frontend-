import React from "react";
import { Button, Form, Row, Col } from "react-bootstrap";

const HeaderControls = ({
  darkMode,
  setDarkMode,
  sortOrder,
  setSortOrder,
  currency,
  setCurrency,
  handleLogout,
  currentUser,
}) => (
  <div className="header-controls mb-4">
    <Row className="align-items-center justify-content-center g-2">
      <Col xs={12} sm={6} md={3} className="d-flex justify-content-center">
        <Form.Check
          type="switch"
          id="dark-mode-switch"
          label={darkMode ? "Dark Mode" : "Light Mode"}
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
        />
      </Col>
      <Col xs={12} sm={6} md={3} className="d-flex justify-content-center">
        <Form.Select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="w-100"
        >
          <option value="desc">Sort: Newest First</option>
          <option value="asc">Sort: Oldest First</option>
        </Form.Select>
      </Col>
      <Col xs={12} sm={6} md={3} className="d-flex justify-content-center">
        <Form.Select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-100"
        >
          <option value="USD">USD</option>
          <option value="INR">INR</option>
        </Form.Select>
      </Col>
      <Col xs={12} sm={6} md={3} className="d-flex justify-content-center align-items-center">
        <span className="me-2 text-nowrap">Welcome, {currentUser}</span>
        <Button variant="danger" onClick={handleLogout}>
          Logout
        </Button>
      </Col>
    </Row>
  </div>
);

export default HeaderControls;