import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

const InvestmentForm = ({ handleSubmit, isLoading, exchangeRate, currency }) => {
  const [formData, setFormData] = useState({
    team1: "",
    team2: "",
    date: "",
    odds1: "",
    odds2: "",
    sixTeam1: false,
    sixTeam2: false,
    winner: "none",
    cashOutTeam: "",
    customCashOut: 0,
    bettingId: "",
    customBaseAmount: 25,
    currency: currency || "INR",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "number" ? (value === "" ? 0 : parseFloat(value)) : type === "checkbox" ? checked : value;
    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
    console.log(`${name} changed to ${newValue}`); // Debug log
  };

  // Function to manually reset the form
  const handleClearForm = () => {
    setFormData({
      team1: "",
      team2: "",
      date: "",
      odds1: 0,
      odds2: 0,
      sixTeam1: false,
      sixTeam2: false,
      winner: "none",
      cashOutTeam: "",
      customCashOut: 0,
      bettingId: "",
      customBaseAmount: 25,
      currency: currency || "INR",
    });
  };

  return (
    <div className="form-section mb-4">
      <Form onSubmit={(e) => handleSubmit(e, formData, setFormData)}>
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Team 1</Form.Label>
              <Form.Control
                type="text"
                name="team1"
                value={formData.team1}
                onChange={handleChange}
                placeholder="Enter Team 1"
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Team 2</Form.Label>
              <Form.Control
                type="text"
                name="team2"
                value={formData.team2}
                onChange={handleChange}
                placeholder="Enter Team 2"
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                placeholder="dd/mm/yyyy"
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Odds Team 1</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                min="0.01"
                name="odds1"
                value={formData.odds1}
                onChange={handleChange}
                placeholder="Odds Team 1"
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Odds Team 2</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                min="0.01"
                name="odds2"
                value={formData.odds2}
                onChange={handleChange}
                placeholder="Odds Team 2"
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Winner</Form.Label>
              <Form.Select name="winner" value={formData.winner} onChange={handleChange} required>
                <option value="none">Select Winner</option>
                <option value="team1">Team 1</option>
                <option value="team2">Team 2</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Team 1 Hit Six"
                name="sixTeam1"
                checked={formData.sixTeam1}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Team 2 Hit Six"
                name="sixTeam2"
                checked={formData.sixTeam2}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}></Col> {/* Placeholder to balance the layout */}
        </Row>
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Cash Out Team (if applicable)</Form.Label>
              <Form.Select name="cashOutTeam" value={formData.cashOutTeam} onChange={handleChange}>
                <option value="">None</option>
                <option value="team1">Team 1</option>
                <option value="team2">Team 2</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Custom Cash Out Amount ({currency})</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                min="0"
                name="customCashOut"
                value={formData.customCashOut}
                onChange={handleChange}
                placeholder={`Enter custom amount in ${currency}`}
              />
            </Form.Group>
          </Col>
          <Col md={4}></Col> {/* Placeholder to balance the layout */}
        </Row>
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Betting ID</Form.Label>
              <Form.Control
                type="text"
                name="bettingId"
                value={formData.bettingId}
                onChange={handleChange}
                placeholder="name of both id's"
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Custom Base Amount (USD)</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                min="0.01"
                name="customBaseAmount"
                value={formData.customBaseAmount}
                onChange={handleChange}
                placeholder="Enter base amount in USD (default is 25)"
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}></Col> {/* Placeholder to balance the layout */}
        </Row>
        <div className="d-flex gap-2">
          <Button variant="primary" type="submit" disabled={isLoading}>
            Add Investment ({currency})
          </Button>
          <Button variant="secondary" type="button" onClick={handleClearForm}>
            Clear Form
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default InvestmentForm;