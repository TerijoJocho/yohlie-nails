/**
 * Route que pour les clients
*/

import express from "express";
import { getSlots} from "../controllers/slotsController.js";

const router = express.Router();

router.get("/", getSlots);

export default router;