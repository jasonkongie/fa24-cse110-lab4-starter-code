import React, { useContext } from "react";
import { Expense } from "../../types/types";
import { AppContext } from "../../context/AppContext";

const ExpenseItem = ({ id, name, cost }: Expense) => {
  const { expenses, setExpenses } = useContext(AppContext);

  const handleDeleteExpense = () => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(updatedExpenses);
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>{name}</div>
      <div>${cost}</div>
      <div>
        <button onClick={handleDeleteExpense} aria-label="Delete Expense">
          x
        </button>
      </div>
    </li>
  );
};

export default ExpenseItem;