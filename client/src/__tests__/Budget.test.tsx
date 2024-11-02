// src/__tests__/Budget.test.tsx

import React from "react";
import { render, screen } from "@testing-library/react";
import { AppProvider } from "../context/AppContext";
import Budget from "../components/Budget/Budget";
import ExpenseTotal from "../components/Expense/ExpenseTotal";
import Remaining from "../components/Remaining";

describe("Budget Balance Verification", () => {
  test("verifies that Budget = Remaining + Spent so far", () => {
    render(
      <AppProvider>
        <Budget />
        <Remaining />
        <ExpenseTotal />
      </AppProvider>
    );

    const budgetText = screen.getByText(/Budget: \$/i).textContent || "";
    const remainingText = screen.getByText(/Remaining: \$/i).textContent || "";
    const spentText = screen.getByText(/Spent so far: \$/i).textContent || "";

    const budget = parseInt(budgetText.replace(/[^0-9]/g, ""));
    const remaining = parseInt(remainingText.replace(/[^0-9-]/g, ""));
    const spent = parseInt(spentText.replace(/[^0-9]/g, ""));

    expect(budget).toBe(remaining + spent);
  });
});