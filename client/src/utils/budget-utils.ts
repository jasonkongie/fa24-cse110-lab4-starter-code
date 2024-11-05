import { API_BASE_URL } from "../constants/constants";

export const fetchBudget = async (): Promise<number> => {
    const response = await fetch(`${API_BASE_URL}/budget`);
	if (!response.ok) {
    	throw new Error('Failed to fetch expenses');
	}
	const budget = await response.json();

	console.log("response in fetchBudget", budget);
	return budget.data;
};

export const updateBudget = async (newBudget: number): Promise<number> => {
	const response = await fetch(`${API_BASE_URL}/budget`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: newBudget }),
    });

    if (!response.ok) {
        throw new Error('Failed to update budget');
    }
    const updatedBudget = await response.json();

    console.log("response in updateBudget", updatedBudget);
    return updatedBudget;
};