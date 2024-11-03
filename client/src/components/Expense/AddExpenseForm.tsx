import React, { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Expense } from "../../types/types";
import { createExpense } from "../../utils/expense-utils";

const AddExpenseForm = () => {

  const {expenses, setExpenses} = useContext(AppContext);
  
  const [name, setName] = useState("");
  const [cost, setCost] = useState<number>(0); 

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

   
    const newExpense: Expense = {
      name, cost,
      id: (expenses.length + 1).toString()
    }
    const newExpenseList = [...expenses, newExpense]
    createExpense(newExpense); 
    setExpenses(newExpenseList);
    setName("");
    setCost(0);
  };

const handleNameChange = (e: any) => {
  setName(e.target.value);
}
const handleCostChange = (e: any) => {
  const value = e.target.value; 
    const numericValue = Number(value); 

    
    if (!isNaN(numericValue)) {
      setCost(numericValue); 
    } else {
      setCost(0); 
    }

}


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
            
            onChange={handleNameChange}
          ></input>
        </div>
        <div className="col-sm">
          <label htmlFor="cost">Cost</label>
          <input
            required
            type="text"
            className="form-control"
            id="cost"
            value={cost}
            // HINT: onChange={}
            onChange={handleCostChange}
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
