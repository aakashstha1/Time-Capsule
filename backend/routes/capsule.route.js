import express from "express";

import { verifyToken } from "../middlewares/verifyToken.js";
import upload from "../configs/cloudinaryWithMulter.js";
import {
  addCapsule,
  deleteCapsule,
} from "../controllers/capsule.controller.js";
const router = express.Router();

router.post("/add", verifyToken, upload.single("file"), addCapsule);
router.delete("/:contentId", verifyToken, deleteCapsule);

export default router;
