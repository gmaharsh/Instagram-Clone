const express = require('express');
const app = express();
const PORT = 5000;
const mongoose = require('mongoose');
const { MONGO_URI } = require('./keys')



//Middlwares
require('./models/user');
app.use(express.json())

//Database Connection
const connection_url = `mongodb+srv://gmaharsh:Maharsh@1997@cluster0.9gzq7.mongodb.net/<dbname>?retryWrites=true&w=majority`;
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

//Routes Imports
const auth  =  require('./routes/auth')
//Routes
app.use("/",auth)

//Listener
app.listen(PORT, () => {
    console.log("Server is running on", PORT)
})