import { Router } from "express";
import { getReviewsByProductId, addReview, deleteReviewById } from "../controllers/reviewController.js";

const router = Router();

router.get("/:productId", getReviewsByProductId);
router.post("/", addReview);
router.delete("/:id", deleteReviewById);

export { router as reviewRouter };