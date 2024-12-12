import { Router } from "express";
import { getAllBrands, getBrandById, getMyAllBrands, updateBrandById, deleteBrandById, addBrand } from "../controllers/brandController.js";

const router = Router();

router.get("/", getAllBrands);
router.get("/my-brands", getMyAllBrands);
router.get("/:id", getBrandById);
router.delete("/:id", deleteBrandById);
router.put("/:id" , updateBrandById);
router.post("/", addBrand);

export { router as brandRouter };