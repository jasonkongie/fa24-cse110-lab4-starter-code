import React from 'react';
import { render, fireEvent, screen, within } from '@testing-library/react';
import { AppProvider } from '../context/AppContext';
import AddExpenseForm from '../components/Expense/AddExpenseForm';
import ExpenseList from '../components/Expense/ExpenseList';
import ExpenseTotal from '../components/Expense/ExpenseTotal';
import Remaining from '../components/Remaining';

describe('AddExpenseForm', () => {
  test('adds a new expense and updates total and remaining', () => {
    render(
      <AppProvider>
        <AddExpenseForm />
        <ExpenseList />
        <ExpenseTotal />
        <Remaining />
      </AppProvider>
    );

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Test Expense' } });
    fireEvent.change(screen.getByLabelText(/Cost/i), { target: { value: '100' } });

    // Submit the form
    fireEvent.click(screen.getByText(/Save/i));

    // Check if the expense is added
    const expenseItem = screen.getByText(/Test Expense/i);
    expect(expenseItem).toBeInTheDocument();

    // Verify the cost within the expense item
    const expenseCost = within(expenseItem.parentElement!).getByText('$100');
    expect(expenseCost).toBeInTheDocument();

    // Check if total expenses and remaining budget are updated
    expect(screen.getByText(/Spent so far: \$100/i)).toBeInTheDocument();
    expect(screen.getByText(/Remaining: \$900/i)).toBeInTheDocument();
  });
});