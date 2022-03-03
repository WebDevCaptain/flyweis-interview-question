const express = require("express");
const cors = require("cors");
const app = express();

if (process.env.NODE_ENV !== "production") {
  console.log("Env variables loaded");
  require("dotenv").config();
}

const connectDB = require("./utils/db");

const authRouter = require("./routes/auth");
const coursesRouter = require("./routes/courses");

const PORT = process.env.PORT || 3000;

connectDB();
// Content-Type JSON parsed and attached to req.body
app.use(express.json());

// Enabling all CORS for now
app.use(cors());

app.use("/auth", authRouter);
app.use("/courses", coursesRouter);

app.get("*", (req, res) => {
  res.json({
    msg: "Hello, Welcome to this interview project",
  });
});

app.listen(PORT, () => {
  console.log(`Server is up on PORT ${PORT}`);
});
