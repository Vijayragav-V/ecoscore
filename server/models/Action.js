const mongoose = require("mongoose");

const actionSchema = new mongoose.Schema({
  actionName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  CO2Saved: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Action", actionSchema);
