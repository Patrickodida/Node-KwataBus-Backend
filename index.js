const app = require('./server.js');

// Set the server to listen on PORT 4800
const PORT = process.env.PORT || 6500;;
app.listen(PORT, ()=>{
    console.log(`Server is listening on http://localhost:${PORT}`);
})