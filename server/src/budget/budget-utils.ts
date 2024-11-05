import { Response } from 'express';

export function getBudget(res: Response, budget: number) {
    res.status(200).send({ "data": budget });
}

export function updateBudget(res: Response, body: any, budget: { amount: number }) {
    const { amount } = body;

    console.log(amount)

    budget.amount = amount;
    res.status(200).send({ amount });
}
