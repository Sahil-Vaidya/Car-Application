const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: [String],
  images: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

CarSchema.index({ title: "text", description: "text", tags: "text" });

module.exports = mongoose.model("Car", CarSchema);
