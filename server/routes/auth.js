import { Router } from "express";
import { signup, login, logout, checkAuth } from "../controllers/authController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = Router();

router.post("/check-auth", verifyToken, checkAuth)
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export { router as authRouter };