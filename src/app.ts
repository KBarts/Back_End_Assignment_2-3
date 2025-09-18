import express from "express";
import morgan from "morgan";

const app = express();

// Parse JSON request bodies for API endpoints.
app.use(express.json());

// HTTP request logging (assignment requires 'combined' format).
app.use(morgan("combined"));

// Health check for basic server status.
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

export default app;

