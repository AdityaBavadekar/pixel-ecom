import { Router } from "express";
import { getProductById, deleteProductById, updateProductById, addProduct, search } from "../controllers/productController.js";

const router = Router();

router.get("/:id", getProductById);
router.delete("/:id", deleteProductById);
router.put("/:id", updateProductById);
router.post("/", addProduct);
router.get("/", search);

export { router as productRouter };