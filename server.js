const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// import routes
const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");

// app
const app = express();

// middlewares
app.use(cors());
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));

// db
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

// route middleware
app.use("/api", postRoutes);
app.use("/api", authRoutes);

// port
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
