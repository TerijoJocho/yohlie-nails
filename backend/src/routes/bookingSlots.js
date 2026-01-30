/**
 * Route pour le client
 */

import express from "express";
import { postBook } from "../controllers/bookingControllers.js";

const router = express.Router();

router.post("/", postBook);

export default router;