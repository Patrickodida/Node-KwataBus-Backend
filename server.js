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

/* app.use((req, res, next) => {
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
}); */

app.use(express.json());

// Define CORS Options
/* const corsOptions = {
  origin: '*',
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"]
} */

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

module.exports = app;