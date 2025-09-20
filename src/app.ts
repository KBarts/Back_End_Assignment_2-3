import express from "express";
import morgan from "morgan";
import employeesRouter from "./api/v1/routes/employees.routes";
import branchesRouter from "./api/v1/routes/branches.routes";

const app = express();

// Parse JSON request bodies for API endpoints.
app.use(express.json());

// HTTP request logging.
app.use(morgan("combined"));

// Health check for basic server status
app.get("/health", (_req, res) => {
  res.status(200).send("Server is healthy");
});

// Employees API
app.use("/api/v1/employees", employeesRouter);

// Branches API
app.use("/api/v1/branches", branchesRouter);

export default app;
