import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";

const Remaining = () => {
  const { expenses } = useContext(AppContext);
  const budget = 1000; // Hardcoded budget for Exercise 2

  const totalExpenses = expenses.reduce((total, item) => {
    return total + item.cost;
  }, 0);

  const remaining = budget - totalExpenses;
  const alertType = remaining < 0 ? "alert-danger" : "alert-success";

  // Show a physical alert when remaining goes below zero
  useEffect(() => {
    if (remaining < 0) {
      alert("Warning: Your remaining budget is below zero!");
    }
  }, [remaining]);

  return (
    <div className={`alert ${alertType} p-3 d-flex align-items-center justify-content-between`}>
      <span>Remaining: ${remaining}</span>
    </div>
  );
};

export default Remaining;