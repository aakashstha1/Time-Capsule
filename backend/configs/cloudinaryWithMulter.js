import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config({ quiet: true });

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET_KEY,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let resourceType = "raw";
    if (file.mimetype.startsWith("image/")) resourceType = "image";
    else if (
      file.mimetype.startsWith("video/") ||
      file.mimetype.startsWith("audio/")
    )
      resourceType = "video";

    return {
      folder: "TimeCapsule",
      public_id: file.originalname + "-" + Date.now(),
      resource_type: resourceType,
    };
  },
});

const upload = multer({ storage });

export default upload;
