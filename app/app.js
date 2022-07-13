const express = require("express");
const cors = require('cors');
const port = process.env.PORT || 2000
const cookieParser = require('cookie-parser');
require("./db/connect");
const app = express();
const userRouter = require("./router/userRouter");
const blogRouter = require("./router/blogRouter");
const tagRouter = require("./router/tagRouter");
const categoryRouter = require("./router/categorizeRouter");
const commentRouter = require("./router/commentRouter");
const authRouter = require("./router/authorRouter");
const adminRouter = require("./router/adminRouter");
const contactRouter = require("./router/contactRouter");

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(userRouter);
app.use(blogRouter);
app.use(tagRouter);
app.use(categoryRouter);
app.use(commentRouter);
app.use(authRouter);
app.use(adminRouter);
app.use(contactRouter);
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
    console.log(`this page port number ${port}`);
});