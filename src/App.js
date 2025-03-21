import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Alert } from "react-bootstrap";
import { motion } from "framer-motion";
import axios from "axios";
import "./App.css";
import InvestmentForm from "./components/InvestmentForm";
import InvestmentTable from "./components/InvestmentTable";
import InvestmentSummary from "./components/InvestmentSummary";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import HeaderControls from "./components/HeaderControls";
import EditModal from "./components/EditModal";
import DeleteModal from "./components/DeleteModal";
import { validateForm } from "./utils/calculations";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
console.log("API_BASE_URL:", API_BASE_URL);

const App = () => {
  const [exchangeRate, setExchangeRate] = useState(null);
  const [investments, setInvestments] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loginForm, setLoginForm] = useState({ userId: "", password: "" });
  const [registerForm, setRegisterForm] = useState({ userId: "", password: "" });
  const [showRegister, setShowRegister] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [sortOrder, setSortOrder] = useState("desc");
  const [currency, setCurrency] = useState("USD");

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    document.body.setAttribute("data-bs-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch(
          `https://open.er-api.com/v6/latest?base=USD&symbols=INR`
        );
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        const data = await response.json();
        if (!data.rates?.INR) throw new Error("Invalid exchange rate data");
        setExchangeRate(data.rates.INR);
      } catch (err) {
        console.error("Exchange rate fetch error:", err);
        setError(`Exchange rate error: ${err.message}`);
        setExchangeRate(83);
      }
    };
    fetchExchangeRate();
  }, []);

  useEffect(() => {
    const fetchInvestments = async () => {
      if (!token || !currentUser) return;
      try {
        const response = await axios.get(`${API_BASE_URL}/investments`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setInvestments(response.data);
      } catch (err) {
        console.error("Fetch investments error:", err);
        setError(err.response?.data?.message || "Failed to fetch investments");
      }
    };
    fetchInvestments();
  }, [token, currentUser]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const { userId, password } = loginForm;
    try {
      if (!API_BASE_URL) {
        throw new Error("API_BASE_URL is not defined");
      }
      const response = await axios.post(`${API_BASE_URL}/auth/login`, { userId, password });
      setToken(response.data.token);
      setCurrentUser(response.data.userId);
      localStorage.setItem("token", response.data.token);
      setLoginForm({ userId: "", password: "" });
      setError(null);
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Login failed - check console for details");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { userId, password } = registerForm;
    try {
      if (!API_BASE_URL) {
        throw new Error("API_BASE_URL is not defined");
      }
      await axios.post(`${API_BASE_URL}/auth/register`, { userId, password });
      setError(null);
      setRegisterForm({ userId: "", password: "" });
      setShowRegister(false);
      setError("Registration successful! Please log in.");
    } catch (err) {
      console.error("Register error:", err);
      setError(err.response?.data?.message || "Registration failed - check console for details");
    }
  };

  const handleLogout = () => {
    setToken(null);
    setCurrentUser(null);
    localStorage.removeItem("token");
    setInvestments([]);
  };

  const handleSubmit = async (e, formData, setFormData) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setError(Object.values(validationErrors)[0]);
      return;
    }
    try {
      const response = await axios.post(
        `${API_BASE_URL}/investments`,
        { ...formData, currency },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setInvestments((prev) => [...prev, response.data]);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
      setFormData({
        team1: "",
        team2: "",
        date: "",
        odds1: "",
        odds2: "",
        sixTeam1: false,
        sixTeam2: false,
        winner: "none",
        cashOutTeam: "",
        customCashOut: "",
        bettingId: "",
      });
      setError(null);
    } catch (err) {
      console.error("Submit investment error:", err);
      setError(err.response?.data?.message || "Failed to add investment");
    }
  };

  const handleEdit = (index) => {
    setEditData({ ...investments[index], index });
    setShowEditModal(true);
  };

  const saveEdit = async (updatedData) => {
    if (!updatedData) return;
    try {
      console.log('Sending updated data to backend:', updatedData);
      const response = await axios.put(
        `${API_BASE_URL}/investments/${updatedData._id}`,
        { ...updatedData, currency },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('Backend response:', response.data);
      setInvestments((prev) =>
        prev.map((inv, i) => (i === updatedData.index ? response.data : inv))
      );
      setShowEditModal(false);
      setError(null);
    } catch (err) {
      console.error('Update error:', err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to update investment");
    }
  };

  const handleDelete = async (index) => {
    try {
      await axios.delete(`${API_BASE_URL}/investments/${investments[index]._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInvestments((prev) => prev.filter((_, i) => i !== index));
      setShowDeleteConfirm(false);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete investment");
    }
  };

  const investmentSummary = investments.reduce(
    (summary, inv) => {
      summary.totalInvestedUSD += parseFloat(inv.totalInvestedUSD) || 0;
      summary.totalWinningsUSD += parseFloat(inv.totalWinningsUSD) || 0;
      summary.profitLossUSD += parseFloat(inv.profitLossUSD) || 0;
      summary.totalInvestedINR += parseFloat(inv.totalInvestedINR) || 0;
      summary.totalWinningsINR += parseFloat(inv.totalWinningsINR) || 0;
      summary.profitLossINR += parseFloat(inv.profitLossINR) || 0;
      summary.successfulBets += inv.winner !== "none" && inv.winner === "team1" ? 1 : 0;
      return summary;
    },
    {
      totalInvestedUSD: 0,
      totalWinningsUSD: 0,
      profitLossUSD: 0,
      totalInvestedINR: 0,
      totalWinningsINR: 0,
      profitLossINR: 0,
      successfulBets: 0,
    }
  );

  const sortedInvestments = [...investments].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
  });

  if (!currentUser || !token) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 login-container">
        {error && (
          <Alert variant="danger" style={{ maxWidth: "400px", width: "100%", marginBottom: "20px" }}>
            {error}
          </Alert>
        )}
        <div className="w-100" style={{ maxWidth: "400px" }}>
          {showRegister ? (
            <RegisterForm
              registerForm={registerForm}
              setRegisterForm={setRegisterForm}
              handleRegister={handleRegister}
              toggleLogin={() => setShowRegister(false)}
            />
          ) : (
            <LoginForm
              loginForm={loginForm}
              setLoginForm={setLoginForm}
              handleLogin={handleLogin}
              toggleRegister={() => setShowRegister(true)}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <Container className="py-4 mt-5">
      <Row className="mb-4 align-items-center justify-content-center">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          Investment Tracker
        </motion.h1>
        <HeaderControls
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          currency={currency}
          setCurrency={setCurrency}
          handleLogout={handleLogout}
          currentUser={currentUser}
        />
      </Row>
      {showSuccess && <Alert variant="success">Investment added successfully!</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <InvestmentSummary
        investments={sortedInvestments}
        investmentSummary={investmentSummary}
        currency={currency}
        darkMode={darkMode}
      />
      <InvestmentForm
        handleSubmit={handleSubmit}
        isLoading={!exchangeRate}
        exchangeRate={exchangeRate}
        currency={currency}
      />
      <EditModal
        editModal={showEditModal}
        setEditModal={setShowEditModal}
        editData={editData}
        setEditData={setEditData}
        saveEdit={saveEdit}
        currency={currency}
      />
      <DeleteModal
        showDeleteConfirm={showDeleteConfirm}
        setShowDeleteConfirm={setShowDeleteConfirm}
        handleDelete={handleDelete}
      />
      <InvestmentTable
        investments={sortedInvestments}
        onEdit={handleEdit}
        onDelete={(index) => setShowDeleteConfirm(index)}
        currency={currency}
      />
    </Container>
  );
};

export default App;