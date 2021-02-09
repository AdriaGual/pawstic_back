require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());
app.get("/", function (req, res) {
  //when we get an http get request to the root/homepage
  res.send("Hello World");
});
const publishingsRouter = require("./routes/publishings");
app.use("/publishings", publishingsRouter);

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

app.listen(process.env.PORT || 3000, () => console.log("Server Started"));
