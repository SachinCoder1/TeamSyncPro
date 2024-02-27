import express from "express";
import { onboardUser } from "~/controller/onboard";
import { authMiddleware } from "~/middleware";

const router = express.Router();

router.post("/", authMiddleware, onboardUser);
export default router;
