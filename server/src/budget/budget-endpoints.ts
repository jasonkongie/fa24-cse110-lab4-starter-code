import { getBudget, updateBudget } from "./budget-utils";
import { Request, Response } from 'express';

export function createBudgetEndpoints(app: any, budget: { amount: number }) {

    app.get("/budget", (req: Request, res: Response) => {

        getBudget(res, budget.amount);

    });
    app.put("/budget", (req: Request, res: Response) => {

        updateBudget(res, req.body, budget);

    });
}