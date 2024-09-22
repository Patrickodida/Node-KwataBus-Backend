const express = require('express');
const fs = require("node:fs");
const path = require("node:path");
const cors = require('cors');
const busRoutesRouter = require('./Routes/busRoutesRoute');
const busServicesRouter = require('./Routes/busServicesRoute');
const seatsRouter = require("./Routes/seatsRoute");

const app = express();

// Middleware for Logging Requests
app.use((req, res, next) => {
  // get start time
  const startTime = new Date();
  // Listen to the 'finish' listener to capture 'endTime'
  res.on("finish", () => {
    // After response is sent get the end time
    const endTime = new Date();
    // Get the duration in Miliseconds
    const duration = endTime - startTime;
    // Log Details; TImestamp, method, URL, and response status
    const logDetails = `[Start Time: ${startTime}] ${req.method} ${req.url} ${
      res.statusCode
    } [End Time: ${endTime}] [Duration: ${duration}ms]\n`;
    // Append the log details to 'request_logs.txt' file
    fs.appendFile(
      path.join(__dirname, "Logs", "request_logs.txt"),
      logDetails,
      (err) => {
        if (err) {
          console.log("Failed to write logs:", err);
        }
      }
    );
  });
  // Move to the next Middleware
  next();
});

// Middleware to parse JSON bodies
app.use(express.json());

// Define CORS Options
const corsOptions = {
  origin: '*',
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"]
}

// Enable CORS
app.use(cors(corsOptions));

app.use("/api/v1/busRoutes", busRoutesRouter);
app.use("/api/v1/busServices", busServicesRouter);
app.use("/api/v1/seats", seatsRouter);

// Use request handles based on the API endpoint
app.get("/api/v1", (req, res)=>{
    res.send(`<h1 style="color: blue">Welcome to my KwataBus API</h1>`)
})

// Export app
module.exports = app;