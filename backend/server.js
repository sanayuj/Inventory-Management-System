require("dotenv").config();
const dbconnection=require("./DB_Config/DB_Config")
const cors = require("cors");
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const app = express();
const userRouter=require("./Routes/userRoutes")

const maxAge = 3 * 24 * 60 * 60;

//database
dbconnection.dbConnect()

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));



//middleware to parse data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));



//Routes

app.use("/",userRouter );


//CORS
app.use(cors());

//Server Port
app.listen(4000, () => {
  console.log("Sever started at port 4000");
});





module.exports = app;
