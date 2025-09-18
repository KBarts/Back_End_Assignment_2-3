import app from "./app";

const PORT = Number(process.env.PORT) || 3000;

// Start the HTTP server for local development.
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
