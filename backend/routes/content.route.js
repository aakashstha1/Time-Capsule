import express from "express";
import {
  addContent,
  deleteContent,
} from "../controllers/content.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import upload from "../configs/cloudinaryWithMulter.js";
const router = express.Router();

router.post("/add", verifyToken, upload.single("file"), addContent);
router.delete("/:contentId", verifyToken, deleteContent);

export default router;
