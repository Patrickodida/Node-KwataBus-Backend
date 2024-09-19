const express = require('express');
const busRoutesRouter = require('./Routes/busRoutesRoute');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.use("/api/v1/busRoutes", busRoutesRouter);

// Use request handles based on the API endpoint
app.get("/api/v1", (req, res)=>{
    res.send(`<h1 style="color: blue">Welcome to my KwataBus API</h1>`)
})

// Export app
module.exports = app;