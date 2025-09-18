import express from "express";
import morgan from "morgan";

const app = express();

// Parse JSON request bodies for API endpoints.
app.use(express.json());

// HTTP request logging.
app.use(morgan("combined"));

// Health check for basic server status (matches example test).
app.get("/health", (_req, res) => {
  res.status(200).send("Server is healthy");
});

export default app;
