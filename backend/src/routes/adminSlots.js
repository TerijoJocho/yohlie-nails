/**
 * Routes pour l'admin
 */

import express from "express";
import {
  getSlots,
  addSlot,
  deleteSlot,
} from "../controllers/adminSlotsController.js";

const router = express.Router();

router.get("/", getSlots);
router.post("/", addSlot);
router.delete("/:id", deleteSlot);

export default router;
