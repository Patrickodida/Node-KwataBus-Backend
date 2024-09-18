const express = require('express');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Use request handles based on the API endpoint
app.get("/", (req, res)=>{
    res.send(`<h1 style="color: blue">Welcome to my KwataBus API</h1>`)
})

// Export app
module.exports = app;