import { DateTimeValidator } from "../utils/DateTimeValidator.js";
import Capsule from "../models/capsule.model.js";
import { validateBodyByType } from "../utils/ValidateBodyByType.js";
import { v2 as cloudinary } from "cloudinary";

// ----------------------------------------------------- Get loggedin User capsules ---------------------------------------
export const getCapsules = async (req, res) => {
  try {
    const userId = req.user.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const capsules = await Capsule.find({ user: userId }).sort({
      createdAt: -1,
    });
    res.status(200).json(capsules);
  } catch (error) {
    console.log("Capsule Fetch error", error);
    res.status(500).json({ message: "Failed to fetch capsules" });
  }
};

// ----------------------------------------------------- Add capsule ---------------------------------------
export const addCapsule = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { type, body, openDate, openTime } = req.body;
    const file = req.file;

    if (!type || !openDate || !openTime) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate open date & time
    const result = DateTimeValidator(openDate, openTime);
    if (!result.valid) {
      return res.status(400).json({ message: result.message });
    }

    // Validate body/file based on type
    const bodyError = validateBodyByType(type, body, file);
    if (bodyError) {
      return res.status(400).json({ message: bodyError });
    }

    let capsuleData = { user: userId, type, openDate, openTime };

    if (type === "text") {
      // TEXT capsule
      if (!body)
        return res.status(400).json({ message: "Text body is required" });
      capsuleData.body = body;
    } else {
      // FILE capsule (image, audio, video, generic file)
      if (!file) return res.status(400).json({ message: "File is required" });
      capsuleData.file = {
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        url: file.path,
        public_id: file.filename,
      };
    }

    const newCapsule = await Capsule.create(capsuleData);

    res.status(201).json({
      success: true,
      message: "Capsule added successfully",
      capsule: newCapsule,
    });
  } catch (error) {
    console.error("Add capsule Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// ----------------------------------------------------- Delete capsule ---------------------------------------
export const deleteCapsule = async (req, res) => {
  try {
    const { capsuleId } = req.params;
    const userId = req.user.userId;

    const capsule = await Capsule.findById(capsuleId);
    if (!capsule) {
      return res.status(404).json({ message: "Capsule not found." });
    }

    // ownership check
    if (capsule.user.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized." });
    }

    // sealed check
    if (capsule.isSealed) {
      return res.status(400).json({ message: "Cannot delete sealed capsule." });
    }

    //  DELETE FROM CLOUDINARY ONLY IF FILE EXISTS

    if (capsule.file?.public_id) {
      await cloudinary.uploader.destroy(capsule.file.public_id, {
        resource_type: "raw",
      });
    }

    await Capsule.findByIdAndDelete(capsuleId);

    return res.status(200).json({
      success: true,
      message: "Capsule deleted successfully",
    });
  } catch (error) {
    console.error("Delete capsule Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
