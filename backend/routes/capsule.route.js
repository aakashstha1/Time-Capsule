import express from "express";

import { verifyToken } from "../middlewares/verifyToken.js";
import upload from "../configs/cloudinaryWithMulter.js";
import {
  addCapsule,
  deleteCapsule,
  getCapsules,
} from "../controllers/capsule.controller.js";
const router = express.Router();

router.get("/", verifyToken, getCapsules);
router.post("/add", verifyToken, upload.single("file"), addCapsule);
router.delete("/:capsuleId", verifyToken, deleteCapsule);

export default router;
