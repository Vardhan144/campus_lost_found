const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: [
        "Electronics",
        "Documents",
        "Accessories",
        "Bags",
        "Clothing",
        "Keys",
        "Books",
        "Other",
      ],
      default: "Other",
    },
    status: {
      type: String,
      enum: ["lost", "found", "claimed", "resolved"],
      default: "lost",
    },
    location: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now },
    imageUrl: { type: String },
    contactInfo: { type: String },
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    claimedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

itemSchema.index({ title: "text", description: "text", location: "text" });

module.exports = mongoose.model("Item", itemSchema);
