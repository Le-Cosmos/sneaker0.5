const mongoose = require("mongoose");

const userSchema = new moongoose.Schema({
      id: Number,
      fName: String,
      lName: String,
      mail: String,
      fav:[String]
})
