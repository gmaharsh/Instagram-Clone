const express = require('express');
const app = express();
const PORT = 5000;
//Middlwares


//Routes
app.get("/", (req, res) => {
    res.send("Hello World")
})

//Listener
app.listen(PORT, () => {
    console.log("Server is running on", PORT)
})