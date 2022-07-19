const express = require("express");
const mongoose = require("mongoose");
const config = require("config");

const authRouter = require("./routes/auth.route");

const app = express();

app.use(express.json());
app.use("/api/auth", authRouter);

const PORT = config.get("serverPort");
const mongoDbUrl = config.get("mongoDbUrl");

const start = async () => {
  try {
    await mongoose.connect(mongoDbUrl);

    app.listen(PORT, () => {
      console.log(`Server running in PORT ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
