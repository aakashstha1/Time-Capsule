import mongoose from "mongoose";

const capsuleSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["text", "image", "video", "audio", "file"],
      required: true,
    },
    body: {
      type: String,
    },
    file: {
      originalName: String,
      mimeType: String,
      size: Number,
      url: String,
      public_id: String,
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

export default mongoose.model("Capsule", capsuleSchema);
