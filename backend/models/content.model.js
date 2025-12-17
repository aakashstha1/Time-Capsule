import mongoose from "mongoose";

const contentSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["text", "image", "video", "audio", "file"],
      required: true,
    },
    body: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    openDate: {
      type: String,
      required: true,
    },
    openTime: {
      type: String,
      required: true,
    },
    isSealed: {
      type: Boolean,
      default: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Content", contentSchema);
