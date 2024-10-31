const express = require('express');
const fs = require("node:fs");
const path = require("node:path");
const cors = require('cors');
const busRoutesRouter = require('./Routes/busRoutesRoute');
const busServicesRouter = require('./Routes/busServicesRoute');
const seatsRouter = require("./Routes/seatsRoute");
const bookingsRouter = require("./Routes/bookingsRouter");
const usersRouter = require("./Routes/usersRoute");
const paymentsRouter = require("./Routes/paymentsRouter");

const app = express();
const PORT = process.env.PORT || 6500; // Use Render's assigned port or default to 6500

// Middleware for Logging Requests (disabled in production)
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    const startTime = new Date();
    res.on("finish", () => {
      const endTime = new Date();
      const duration = endTime - startTime;
      const logDetails = `[Start Time: ${startTime}] ${req.method} ${req.url} ${
        res.statusCode
      } [End Time: ${endTime}] [Duration: ${duration}ms]\n`;
      
      // Check if the Logs directory exists, and create if it doesn't (only on local development)
      const logDir = path.join(__dirname, "Logs");
      if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir);
      }

      fs.appendFile(
        path.join(logDir, "request_logs.txt"),
        logDetails,
        (err) => {
          if (err) {
            console.log("Failed to write logs:", err);
          }
        }
      );
    });
    next();
  });
}

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS
app.use(cors());

// API Endpoints
app.use("/api/v1/busRoutes", busRoutesRouter);
app.use("/api/v1/busServices", busServicesRouter);
app.use("/api/v1/seats", seatsRouter);
app.use("/api/v1/bookings", bookingsRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/payments", paymentsRouter);

// Default Route
app.get("/api/v1", (req, res) => {
  res.send(`<h1 style="color: blue">Welcome to my KwataBus API</h1>`);
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;

// Define CORS Options
/* const corsOptions = {
  origin: '*',
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"]
} */

/* const express = require('express');
const fs = require("node:fs");
const path = require("node:path");
const cors = require('cors');
const busRoutesRouter = require('./Routes/busRoutesRoute');
const busServicesRouter = require('./Routes/busServicesRoute');
const seatsRouter = require("./Routes/seatsRoute");
const bookingsRouter = require("./Routes/bookingsRouter");
const usersRouter = require("./Routes/usersRoute");
const paymentsRouter = require("./Routes/paymentsRouter");

const app = express();

app.use((req, res, next) => {
  const startTime = new Date();
  res.on("finish", () => {
    const endTime = new Date();
    const duration = endTime - startTime;
    const logDetails = `[Start Time: ${startTime}] ${req.method} ${req.url} ${
      res.statusCode
    } [End Time: ${endTime}] [Duration: ${duration}ms]\n`;
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
  next();
});

app.use(express.json());

app.use(cors());

app.use("/api/v1/busRoutes", busRoutesRouter);
app.use("/api/v1/busServices", busServicesRouter);
app.use("/api/v1/seats", seatsRouter);
app.use("/api/v1/bookings", bookingsRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/payments", paymentsRouter);

app.get("/api/v1", (req, res)=>{
    res.send(`<h1 style="color: blue">Welcome to my KwataBus API</h1>`)
})

module.exports = app; */