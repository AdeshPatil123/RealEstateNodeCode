const mongoose = require("mongoose");

const property1Schema = new mongoose.Schema({
  name: String,
  city: String,
  location_id: Number,
  city_id: Number,
  Address: String,
  location: String,
  images: Array,
  propertyType_id: Number,
  min_price: Number,
  contact_number: Number,
  banner: String,
  gmapURL: String,
  description: String,
});

module.exports = mongoose.model("property1", property1Schema, "property1");
