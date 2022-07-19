const express = require("express");
const mongoose = require("mongoose");
const config = require("config");

const app = express();

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
