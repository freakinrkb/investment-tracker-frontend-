/**
 * Validate investment form data.
 * @param {Object} data - The form data object.
 * @returns {Object} - Errors object.
 */
export const validateForm = (data) => {
  const errors = {};
  if (!data.team1.trim()) errors.team1 = "Team 1 is required.";
  if (!data.team2.trim()) errors.team2 = "Team 2 is required.";
  if (!data.date) errors.date = "Date is required.";
  if (!data.odds1 || data.odds1 <= 1) errors.odds1 = "Odds must be greater than 1.";
  if (!data.odds2 || data.odds2 <= 1) errors.odds2 = "Odds must be greater than 1.";
  if (data.winner === "none") errors.winner = "Please select a winner.";
  if (!data.bettingId || !data.bettingId.trim()) errors.bettingId = "Betting ID is required."; // Validate bettingId
  return errors;
};

/**
 * Format a number as currency.
 * @param {number} num - The number to format.
 * @param {string} curr - The currency code ("USD" or "INR").
 * @returns {string} - Formatted currency string.
 */
export const formatNumber = (num, curr) => {
  if (isNaN(num)) return "N/A";
  const locale = curr === "INR" ? "en-IN" : "en-US";
  return parseFloat(num).toLocaleString(locale, {
    style: "currency",
    currency: curr,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};