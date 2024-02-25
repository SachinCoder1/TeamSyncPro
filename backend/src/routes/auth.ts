import express from "express";
import { loginWithEmail, signupWithEmail } from "~/controller/auth";
import { authRefreshMiddleware } from "~/middleware";
import { validateLoginBody, validateSignupBody } from "~/middleware/schema-validator";

const router = express.Router();

router.post("/signup-email", validateSignupBody, signupWithEmail);
router.post("/login-email", validateLoginBody, loginWithEmail);
router.post("/refresh", authRefreshMiddleware);
export default router;