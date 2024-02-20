import express from "express";
import { MyDetails, loginWithEmail, signupWithEmail } from "~/controller/user";
import { authMiddleware, authRefreshMiddleware } from "~/middleware";
import { validateLoginBody, validateSignupBody } from "~/middleware/schema-validator";

const router = express.Router();

router.post("/signup-email", validateSignupBody, signupWithEmail);
router.post("/login-email", validateLoginBody, loginWithEmail);
router.get("/", authMiddleware, MyDetails);
router.post("/refresh", authRefreshMiddleware);
export default router;
