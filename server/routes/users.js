import { Router } from "express";
import { getMyUserProfile, updateUserById } from "../controllers/usersController.js";

const router = Router();

router.get('/', getMyUserProfile);
router.put('/:id', updateUserById);

export {router as usersRouter };