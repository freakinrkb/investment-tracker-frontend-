import React from 'react';
import { Form, Button, Card } from 'react-bootstrap';

const LoginForm = ({ loginForm, setLoginForm, handleLogin, toggleRegister }) => {
  const isFormValid = loginForm.userId.trim() !== "" && loginForm.password.trim() !== "";

  return (
    <Card className="p-4 shadow-sm login-card" style={{ maxWidth: "400px", width: "100%" }}>
      <Card.Body>
        <h4 className="mb-4 text-center text-primary">Login</h4>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>User ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter User ID"
              value={loginForm.userId}
              onChange={(e) => setLoginForm(prev => ({ ...prev, userId: e.target.value }))}
              required
              aria-label="User ID"
              className="rounded-pill"
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={loginForm.password}
              onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
              required
              aria-label="Password"
              autoComplete="current-password"
              className="rounded-pill"
            />
          </Form.Group>
          <Button
            type="submit"
            variant="primary"
            className="w-100 rounded-pill mb-3"
            disabled={!isFormValid}
          >
            Login
          </Button>
          <div className="text-center">
            <Button
              variant="link"
              onClick={toggleRegister}
              className="p-0"
              style={{ textDecoration: "none", color: "#0d6efd", fontSize: "0.9rem" }}
            >
              Don't have an account? Register
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default LoginForm;