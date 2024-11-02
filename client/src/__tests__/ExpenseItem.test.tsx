import React from 'react';
import { render, fireEvent, screen, within } from '@testing-library/react';
import { AppProvider } from '../context/AppContext';
import ExpenseList from '../components/Expense/ExpenseList';
import AddExpenseForm from '../components/Expense/AddExpenseForm';
import ExpenseTotal from '../components/Expense/ExpenseTotal';
import Remaining from '../components/Remaining';

describe('ExpenseItem', () => {
  test('deletes an expense and updates total and remaining', () => {
    render(
      <AppProvider>
        <AddExpenseForm />
        <ExpenseList />
        <ExpenseTotal />
        <Remaining />
      </AppProvider>
    );

    // Add an expense first
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Test Expense' } });
    fireEvent.change(screen.getByLabelText(/Cost/i), { target: { value: '100' } });
    fireEvent.click(screen.getByText(/Save/i));

    // Check that expense is added
    const expenseItem = screen.getByText(/Test Expense/i);
    expect(expenseItem).toBeInTheDocument();

    // Get the closest 'li' element
    const expenseItemContainer = expenseItem.closest('li');
    expect(expenseItemContainer).toBeInTheDocument();

    // Verify the cost within the expense item
    const expenseCost = within(expenseItemContainer!).getByText('$100');
    expect(expenseCost).toBeInTheDocument();

    // Delete the expense
    const deleteButton = within(expenseItemContainer!).getByRole('button', { name: /delete expense/i });
    fireEvent.click(deleteButton);

    // Check if the expense is removed
    expect(screen.queryByText(/Test Expense/i)).not.toBeInTheDocument();

    // Check if total expenses and remaining budget are updated
    expect(screen.getByText(/Spent so far: \$0/i)).toBeInTheDocument();
    expect(screen.getByText(/Remaining: \$1000/i)).toBeInTheDocument();
  });
});