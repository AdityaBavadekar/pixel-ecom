import { Router } from "express";
import { getMyCart, clearCart, updateCartItemById, addItemToCard, removeItemFromCart } from "../controllers/cartController.js";

const router = Router();

router.post("/checkout", clearCart);
router.get("/", getMyCart);
router.post("/", addItemToCard);
router.delete("/", removeItemFromCart);
router.put("/", updateCartItemById);

export { router as cartRouter };