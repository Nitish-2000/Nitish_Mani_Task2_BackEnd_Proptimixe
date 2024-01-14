// import express from 'express'

const express = require("express"); // for creating folder structure we are going for this methode
const app = express();
const cors = require('cors')
const approuter = require("./src/Routes/index");

//                          
require('dotenv').config();
const port = process.env.PORT

app.use(cors())
app.use(express.json());
app.use("/", approuter);

app.listen(port, () => {
  console.log(`Server listening to port ${port}`)
});
