const express = require('express');
const cors = require("cors");
const app = express();
const dotenv = require("dotenv").config();
const todoRouter = require("./routers/todoRouters");
const connecDB = require("./db/DbServer");
app.use(express.json());
app.use(cors());
app.use(express.json({ extended: true }));
connecDB();
app.use("/api/v1/todo", todoRouter);
app;
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});