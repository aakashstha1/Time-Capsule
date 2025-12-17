import { DateTimeValidator } from "../utils/DateTimeValidator.js";
import Content from "../models/content.model.js";
import { validateBodyByType } from "../utils/ValidateBodyByType.js";

// ----------------------------------------------------- Add Content ---------------------------------------
export const addContent = async (req, res) => {
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

    let contentBody;

    // TEXT CONTENT
    if (type === "text") {
      if (!body || typeof body !== "string") {
        return res.status(400).json({ message: "Text body is required" });
      }
      contentBody = body;
    }

    // FILE BASED CONTENT
    else {
      if (!req.file) {
        return res.status(400).json({ message: "File is required" });
      }

      // if using Cloudinary → upload here
      contentBody = {
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size,
        url: req.file.path,
      };
    }

    // console.log(contentBody);

    const newContent = await Content.create({
      user: userId,
      type,
      body: contentBody,
      openDate,
      openTime,
    });

    res
      .status(201)
      .json({ success: true, message: "Content added successfully" });
  } catch (error) {
    console.error("Add Content Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// ----------------------------------------------------- Delete Content ---------------------------------------
export const deleteContent = async (req, res) => {
  try {
    const { contentId } = req.params;
    const userId = req.user.userId;

    const content = await Content.findById(contentId);
    if (!content)
      return res.status(404).json({ message: "Content not found." });

    if (content.user.toString() !== userId)
      return res.status(403).json({ message: "Unauthorized." });

    if (content.isSealed)
      return res.status(400).json({ message: "Cannot delete sealed content." });

    await Content.findByIdAndDelete(contentId);

    res
      .status(200)
      .json({ success: true, message: "Content deleted successfully" });
  } catch (error) {
    console.error("Delete Content Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
