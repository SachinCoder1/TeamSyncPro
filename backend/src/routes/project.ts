import express from "express";
import { MyDetails } from "~/controller/user";

import { authMiddleware } from "~/middleware";

const router = express.Router();


export default router;
