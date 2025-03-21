import React from "react";
import { Row, Col, Button, Form } from "react-bootstrap";

const HeaderControls = ({
  darkMode,
  setDarkMode,
  sortOrder,
  setSortOrder,
  currency,
  setCurrency,
  handleLogout,
  currentUser,
}) => {
  return (
    <Row className="align-items-center justify-content-end">
      <Col xs="auto">
        <Button
          variant={darkMode ? "outline-light" : "outline-dark"}
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </Button>
      </Col>
      <Col xs="auto">
        <Button variant="outline-secondary" onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
          Sort: {sortOrder === "asc" ? "Ascending" : "Descending"}
        </Button>
      </Col>
      <Col xs="auto">
        <Form.Select value={currency} onChange={(e) => setCurrency(e.target.value)}>
          <option value="USD">USD</option>
          <option value="INR">INR</option>
        </Form.Select>
      </Col>
      <Col xs="auto">
        <Button variant="outline-danger" onClick={handleLogout}>
          Logout ({currentUser})
        </Button>
      </Col>
    </Row>
  );
};

export default HeaderControls;