const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  jobTitle: {
    type: String,
    required: true
  },

  company: {
    type: String,
    required: true
  },

  jobLink: {
    type: String
  },

  status: {
    type: String,
    enum: ["applied", "screening", "interview", "offer", "rejected"],
    default: "applied"
  },

  notes: {
    type: String
  },

  appliedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Job", JobSchema);
