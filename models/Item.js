const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Please add item name"],
  },
  quantity: {
    type: Number,
    required: [true, "Please add quantity"],
  },
  unit: {
    type: String,
    trim: true,
    required: [true, "Please add the unit"],
  },
  status: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Item", ItemSchema);
