const express = require("express");
const userRouter = require("./router/userRouter");
const session = require("express-session");
const dotenv = require("dotenv");
const path = require('path');
const friendRouter = require("./router/friendRouter");
const contentRouter = require("./router/contentRouter");
const messagerieRouter = require("./router/messagerieRouter");
const bodyParser = require("body-parser");
dotenv.config();
const app = express();


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true
}));


app.use(userRouter);
app.use(friendRouter);
app.use(contentRouter);
app.use(messagerieRouter);


app.listen(3000, () => {
    console.log("écoute sur le port 3000");
});
