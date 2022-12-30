const express = require("express");
const cors = require("cors");

const app = express();
const userRouter = require('./app/routes/Routes.js')
require("dotenv").config();

app.use(express.json())
var corsOption = {
    origin : "http://localhost:5000"
};

/* Allowing the server to accept requests from the client. */
app.use(cors(corsOption));

app.use("/user",userRouter)

 app.listen(process.env.PORT ,()=>{
    console.log("Server up and  running ",process.env.PORT , corsOption.origin);
 })