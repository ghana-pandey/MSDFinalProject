const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose
  .connect(
    "mongodb+srv://test-user:GHane352202@cluster0.ni3ei.mongodb.net/finalprojectdatabase?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Database sucessfuly connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => console.log(" 🌍 listening port 3000"));
