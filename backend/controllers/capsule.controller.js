import { DateTimeValidator } from "../utils/DateTimeValidator.js";
import Capsule from "../models/capsule.model.js";
import { validateBodyByType } from "../utils/ValidateBodyByType.js";

// ----------------------------------------------------- Add capsule ---------------------------------------
export const addCapsule = async (req, res) => {
  try {
    const userId = req.user.userId;

    const { type, body, openDate, openTime } = req.body;
    if (!type || !openDate || !openTime) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const result = DateTimeValidator(openDate, openTime);
    if (!result.valid) {
      return res.status(400).json({ message: result.message });
    }

    // Body validation based on type
    const bodyError = validateBodyByType(type, body, req.file);

    if (bodyError) {
      return res.status(400).json({ message: bodyError });
    }

    let capsuleBody;

    // TEXT capsule
    if (type === "text") {
      if (!body || typeof body !== "string") {
        return res.status(400).json({ message: "Text body is required" });
      }
      capsuleBody = body;
    }

    // FILE BASED capsule
    else {
      if (!req.file) {
        return res.status(400).json({ message: "File is required" });
      }

      // if using Cloudinary → upload here
      capsuleBody = {
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size,
        url: req.file.path,
      };
    }

    // console.log(capsuleBody);

    const newCapsule = await Capsule.create({
      user: userId,
      type,
      body: capsuleBody,
      openDate,
      openTime,
    });

    res
      .status(201)
      .json({ success: true, message: "Capsule added successfully" });
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
    if (!capsule)
      return res.status(404).json({ message: "capsule not found." });

    if (capsule.user.toString() !== userId)
      return res.status(403).json({ message: "Unauthorized." });

    if (capsule.isSealed)
      return res.status(400).json({ message: "Cannot delete sealed capsule." });

    await capsule.findByIdAndDelete(capsuleId);

    res
      .status(200)
      .json({ success: true, message: "Capsule deleted successfully" });
  } catch (error) {
    console.error("Delete capsule Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
