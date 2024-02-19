import express from "express";
import { signupWithEmail } from "~/controller/user";
import { validateSignupBody } from "~/middleware";

const router = express.Router();

router.post("/signup-email", validateSignupBody, signupWithEmail);
export default router;
