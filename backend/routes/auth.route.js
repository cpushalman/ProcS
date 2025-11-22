import express from 'express'
import { checkAuth, login, logout, signup,updateProfile } from '../controller/auth.controller.js';
import { validateToken } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post("/signup", signup)
router.post("/login",login)
router.post("/logout",logout)
router.put("/update-profile", validateToken, updateProfile);
router.get("/check-auth",validateToken, checkAuth)
export default router;