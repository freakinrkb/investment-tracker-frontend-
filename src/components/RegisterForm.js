import React from 'react';
import { Form, Button, Card } from 'react-bootstrap';

const RegisterForm = ({ registerForm, setRegisterForm, handleRegister, toggleLogin }) => {
  const isFormValid = registerForm.userId.trim() !== "" && registerForm.password.trim() !== "";

  return (
    <Card className="p-4 shadow-sm login-card" style={{ maxWidth: "400px", width: "100%" }}>
      <Card.Body>
        <h4 className="mb-4 text-center text-primary">Register</h4>
        <Form onSubmit={handleRegister}>
          <Form.Group className="mb-3" controlId="formUserId">
            <Form.Label>User ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter user ID"
              value={registerForm.userId}
              onChange={(e) =>
                setRegisterForm({ ...registerForm, userId: e.target.value })
              }
              required
              aria-label="User ID"
              className="rounded-pill"
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={registerForm.password}
              onChange={(e) =>
                setRegisterForm({ ...registerForm, password: e.target.value })
              }
              required
              aria-label="Password"
              autoComplete="new-password"
              className="rounded-pill"
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="w-100 rounded-pill mb-3"
            disabled={!isFormValid}
          >
            Register
          </Button>
          <div className="text-center">
            <Button
              variant="link"
              onClick={toggleLogin}
              className="p-0"
              style={{ textDecoration: "none", color: "#0d6efd", fontSize: "0.9rem" }}
            >
              Already have an account? Login
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default RegisterForm;