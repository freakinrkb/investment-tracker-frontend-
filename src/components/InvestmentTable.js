import React from "react";
import { Table, Button } from "react-bootstrap";
import { formatNumber } from "../utils/calculations";

const InvestmentTable = ({ investments, onEdit, onDelete, currency, sortOrder, toggleSortOrder }) => {
  return (
    <Table striped bordered hover responsive className="mt-4">
      <thead>
        <tr>
          <th>#</th>
          <th onClick={toggleSortOrder} style={{ cursor: 'pointer' }}>
            Teams {sortOrder === 'desc' ? '↓' : '↑'}
          </th>
          <th>Odds</th>
          <th>Winner</th>
          <th>Investment ({currency})</th>
          <th>Total Invested ({currency})</th>
          <th>Total Winnings ({currency})</th>
          <th>Profit/Loss ({currency})</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {investments.map((investment, index) => (
          <tr key={investment._id}>
            <td>{index + 1}</td>
            <td>{`${investment.team1} vs ${investment.team2} (${investment.bettingId || 'Unknown'})`}</td>
            <td>{`${investment.odds1} / ${investment.odds2}`}</td>
            <td>{investment.winner}</td>
            <td>
              {formatNumber(
                currency === "USD" ? investment.investmentTeam1USD : investment.investmentTeam1INR,
                currency
              )}{" "}
              /{" "}
              {formatNumber(
                currency === "USD" ? investment.investmentTeam2USD : investment.investmentTeam2INR,
                currency
              )}
            </td>
            <td>
              {formatNumber(
                currency === "USD" ? investment.totalInvestedUSD : investment.totalInvestedINR,
                currency
              )}
            </td>
            <td>
              {investment.totalWinningsUSD || investment.totalWinningsINR
                ? formatNumber(
                    currency === "USD" ? investment.totalWinningsUSD : investment.totalWinningsINR,
                    currency
                  )
                : "N/A"}
            </td>
            <td>
              {investment.profitLossUSD || investment.profitLossINR
                ? formatNumber(
                    currency === "USD" ? investment.profitLossUSD : investment.profitLossINR,
                    currency
                  )
                : "N/A"}
            </td>
            <td>
              <div className="d-flex gap-2">
                <Button variant="warning" onClick={() => onEdit(index)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => onDelete(index)}>
                  Delete
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default InvestmentTable;