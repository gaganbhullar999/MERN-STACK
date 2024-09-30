const mongoose = require("mongoose");

const VehicleSchema = new mongoose.Schema({
  make: {
    type: String,
  },
  model: {
    type: String,
  },
  year: {
    type: String,
  },
  price: {
    type: Number,
  },
  status: {
    type: String,
    enum: ["Live", "Sold"],
    default: "Live",
  },
});

const VehicleModel = mongoose.model("vehicles", VehicleSchema);
module.exports = VehicleModel;
