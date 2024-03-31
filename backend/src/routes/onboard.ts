import express from "express";
import { onboardUser } from "~/controller/onboard";
import { authMiddleware } from "~/middleware";
import { validateOnboardUserBody } from "~/middleware/schema-validator/onboard";

const router = express.Router();

router.post("/",validateOnboardUserBody, authMiddleware, onboardUser);
export default router;
