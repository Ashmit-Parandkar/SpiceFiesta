const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors');

const contactRoutes = require('./routes/contact.js');

const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/spicefiesta")
    .then(() => {console.log("Database Connected");})
    .catch((e) => {console.log("Error while connecting to database : ",e);})


app.use('/api/v1/contact', contactRoutes);



app.listen(4000,()=>{
    console.log("Server running !");
})