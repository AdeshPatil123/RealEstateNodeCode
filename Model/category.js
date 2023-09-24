const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: String,
  propertyType_id: Number,
  content: String,
  image: String,
});

module.exports = mongoose.model("category",categorySchema,"category");
