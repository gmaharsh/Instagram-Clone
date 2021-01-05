const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
const { MONGO_URI } = require('./config/keys')



//Middlwares
require('./models/user');
require('./models/post');
require('./models/user');
app.use(express.json())

//Database Connection
mongoose.connect(MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
}).then(() => {
        console.log("Connected to Database")
    })
    .catch((error) => {
        console.log("Error:-",error)
})

//Routes Imports
const auth = require('./routes/auth')
const post = require('./routes/post')
const user = require('./routes/user')



//Routes
app.use("/", auth)
app.use("/", post)
app.use("/", user)

// if (process.env.NODE_ENV == "production") {
//     app.use(express.static('client/build'))
//     const path = require('path')
//     app.get("*", (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
//     })
// }

//Listener
app.listen(PORT, () => {
    console.log("Server is running on", PORT)
})
