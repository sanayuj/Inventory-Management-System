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


dbconnection.dbConnect()

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//Routes
app.use("/",userRouter );

app.use(cors());


app.listen(4000, () => {
  console.log("Sever started at port 4000");
});





module.exports = app;
