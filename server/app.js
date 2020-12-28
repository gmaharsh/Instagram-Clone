const express = require('express');
const app = express();
const PORT = 5000;
const mongoose = require('mongoose');
const {MONGO_URI} = require('./keys')

//Middlwares


//Database Connection
const connection_url = `mongodb+srv://gmaharsh:Admin@456123@one-stop.n0brx.mongodb.net/<dbname>?retryWrites=true&w=majority`;
mongoose.connect(connection_url, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(() => {
        console.log("Connected to Database")
    })
    .catch((error) => {
        console.log("Error:-",error)
    })

//Routes


//Listener
app.listen(PORT, () => {
    console.log("Server is running on", PORT)
})