export const formatNumber = (num, curr) => {
    const locale = curr === "INR" ? "en-IN" : "en-US";
    return parseFloat(num).toLocaleString(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };