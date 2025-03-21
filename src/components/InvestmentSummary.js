import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { formatNumber } from "../utils/calculations";

const InvestmentSummary = ({ investments, investmentSummary, currency, darkMode }) => {
  const textClass = darkMode ? "text-white" : "text-dark";

  return (
    <Card className={`mb-4 ${darkMode ? "bg-dark" : "bg-light"}`}>
      <Card.Body>
        <Card.Title className={textClass}>Investment Summary</Card.Title>
        <Row>
          <Col>
            <strong className={textClass}>Total Invested:</strong>{" "}
            {formatNumber(
              currency === "USD" ? investmentSummary.totalInvestedUSD : investmentSummary.totalInvestedINR,
              currency
            )}
          </Col>
          <Col>
            <strong className={textClass}>Total Winnings:</strong>{" "}
            {formatNumber(
              currency === "USD" ? investmentSummary.totalWinningsUSD : investmentSummary.totalWinningsINR,
              currency
            )}
          </Col>
          <Col>
            <strong className={textClass}>Profit/Loss:</strong>{" "}
            {formatNumber(
              currency === "USD" ? investmentSummary.profitLossUSD : investmentSummary.profitLossINR,
              currency
            )}
          </Col>
          <Col>
            <strong className={textClass}>Successful Bets:</strong>{" "}
            {investmentSummary.successfulBets}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default InvestmentSummary;