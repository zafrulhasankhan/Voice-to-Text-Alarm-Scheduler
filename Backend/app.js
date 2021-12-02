const express = require('express');
const app  = express(); 
var cors = require('cors');
app.use(cors());

app.use(express.json());

const port = process.env.port || 4001;

const con = require('./config/mysql');
//Routes 
app.use("/",require("./routes/users")); 
// app.use('/users',require('./routes/users'));

app.listen(port,console.log(`Server is running on port ${port}`));