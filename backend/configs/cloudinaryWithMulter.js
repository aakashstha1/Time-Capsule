import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ quiet: true });

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET_KEY,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let resourceType = "raw";

    if (file.mimetype.startsWith("image/")) resourceType = "image";
    else if (
      file.mimetype.startsWith("video/") ||
      file.mimetype.startsWith("audio/")
    )
      resourceType = "video";
    else if (file.mimetype === "application/pdf") resourceType = "auto";

    const fileName = path
      .parse(file.originalname)
      .name.replace(/\s+/g, "-")
      .toLowerCase();

    return {
      folder: "TimeCapsule",
      public_id: `${fileName}-${Date.now()}`,
      resource_type: resourceType,
    };
  },
});

const upload = multer({ storage });

export default upload;
