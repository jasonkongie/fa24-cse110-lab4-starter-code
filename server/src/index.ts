import { Request, Response } from "express";
import { expenses } from "./constants";
import { createExpenseEndpoints } from "./expenses/expense-endpoints";
import { deleteExpense } from "./expenses/expense-utils";
import { getBudget } from "./budget/budget-utils";

const express = require("express");
const cors = require("cors");

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

// Start the server
app.delete("/expenses/:id", (req: Request, res: Response) => {
  deleteExpense(req, res, expenses);
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// Root endpoint to get test if the server is running
app.get("/", (req: Request, res: Response) => {
  res.send({ "data": "Hello, TypeScript Express!" });
  res.status(200);
});
app.get("/budget", getBudget);

createExpenseEndpoints(app, expenses);