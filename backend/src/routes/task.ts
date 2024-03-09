import express from "express";


import { authMiddleware } from "~/middleware";
import { validateUpdateTaskBody } from "~/middleware/schema-validator/task";


const router = express.Router();


router.post("/create", validateUpdateTaskBody,authMiddleware,);

export default router;
