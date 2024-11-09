// user.model.js
const mongoose = require("mongoose");

// Define sub-schema for lifestyle data
const lifestyleDataSchema = new mongoose.Schema({
  transportationMiles: {
    type: Number,
    required: true,
    default: 0,  // Annual mileage
  },
  vehicleType: {
    type: String,
    enum: ["gasoline", "electric", "hybrid", "public_transport", "none"],
    required: true,
    default: "none",
  },
  energyConsumption: {
    type: Number,  // Monthly energy consumption in kWh
    default: 0,
  },
  dietType: {
    type: String,
    enum: ["meat-based", "vegetarian", "plant-based", "other"],
    default: "meat-based",
  },
  flyingFrequency: {
    type: Number,  // Number of flights per year
    default: 0,
  },
  recycling: {
    type: Boolean,
    default: false,
  }
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 20,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 50,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  ecoScore: {
    type: Number,
    default: 0,
    required: true,
  },
  lifestyleData: {
    type: lifestyleDataSchema,
    required: true,
  },
  actionsCompleted: [
    {
      actionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Action",
      },
      dateCompleted: {
        type: Date,
        default: Date.now,
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

userSchema.index({ email: 1 });

module.exports = mongoose.model("User", userSchema);
