import { Expense } from "../../types/types";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";
import { deleteExpense } from "../../utils/expense-utils";

const ExpenseItem = (currentExpense: Expense) => {

  const {expenses, setExpenses} = useContext(AppContext);
  const handleDeleteExpense = (currentExpense: Expense) => {
  
    const newExpenses = expenses.filter((expense) => expense.id !== currentExpense.id);
    setExpenses(newExpenses);
    deleteExpense(currentExpense.id);
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>{currentExpense.name}</div>
      <div>${currentExpense.cost}</div>
      <div>
        <button onClick={() => handleDeleteExpense(currentExpense)}>x</button>
      </div>
    </li>
  );
};

export default ExpenseItem;
