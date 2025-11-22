import express from "express";
import { validateToken } from "../middleware/auth.middleware.js";
import { getUsersForSideBar } from "../controller/message.controller.js";

const router = express.Router();
  
router.get("/users", validateToken, getUsersForSideBar)
export default router;