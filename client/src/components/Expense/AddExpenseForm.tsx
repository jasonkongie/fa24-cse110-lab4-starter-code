import React, { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Expense } from "../../types/types";
import { v4 as uuidv4 } from "uuid"; // Install uuid if you haven't already
import { createExpense } from "../../utils/expense-utils";

const AddExpenseForm = () => {
  // Consume the AppContext here
  const { expenses, setExpenses } = useContext(AppContext);

  // Create name and cost state variables
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Add new expense to expenses context array
    const newExpense: Expense = {
      id: uuidv4(),
      name: name,
      cost: parseInt(cost),
    };
    createExpense(newExpense); 
    setExpenses([...expenses, newExpense]);

    // Reset form fields
    setName("");
    setCost("");
  };

  return (
    <form onSubmit={(event) => onSubmit(event)}>
      <div className="row">
        <div className="col-sm">
          <label htmlFor="name">Name</label>
          <input
            required
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          ></input>
        </div>
        <div className="col-sm">
          <label htmlFor="cost">Cost</label>
          <input
            required
            type="number"
            className="form-control"
            id="cost"
            value={cost}
            onChange={(event) => setCost(event.target.value)}
          ></input>
        </div>
        <div className="col-sm">
          <button type="submit" className="btn btn-primary mt-3">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddExpenseForm;