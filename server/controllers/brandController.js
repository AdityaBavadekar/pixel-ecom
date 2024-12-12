import Brand from "../models/Brand.js";

async function getAllBrands(req, res) {
    try {
        const brands = await Brand.find();
        res.status(200).json(brands);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Error occurred"})        
    }
}

async function getMyAllBrands(req, res) {
    try {
        const brands = await Brand.find({ brandManagers: req.userId });
        res.status(200).json(brands);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Error occurred"})        
    }
}

async function getBrandById(req, res) {
    try {
        const { id } = req.params;
        const brand  = await Brand.findById(id)
        if (!brand){
            return res.status(404).json({message:"Brand with the provided id does not exist"})
        }
        res.status(200).json(brand);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Error occurred"})
    }
}

async function updateBrandById(req, res) {
    try {
        const { id } = req.params;
        const brand  = await Brand.findById(id);
        // TODO: Disallow setting brandManagers to empty list
        if (!brand){
            return res.status(404).json({message:"Brand with the provided id does not exist"})
        }
        if (!brand.brandManagers.includes(req.userId)){
            return res.status(400).json({ message: "You are not authorized for this action" });
        }
        await brand.updateOne(req.body);
        res.status(200).json(brand);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Error occurred"})
    }
}

async function addBrand(req, res) {
    try {
        const { name, logo } = req.body;
        if (!name){
            return res.status(400).json({message: "Incomplete data"})
        }
        const brand = new Brand({
            name,
            logo,
            brandManagers: [req.userId]
        });
        await brand.save();
        res.status(201).json(brand);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Error occurred"})
    }
}

async function deleteBrandById(req, res) {
    try {
        const { id } = req.params;
        const brand  = await Brand.findById(id);
        if (!brand){
            return res.status(404).json({message:"Brand with the provided id does not exist"})
        }
        if (!brand.brandManagers.includes(req.userId)){
            return res.status(400).json({ message: "You are not authorized for this action" });
        }
        await brand.deleteOne();
        res.status(200).json(brand);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Error occurred"})
    }
}

export { getAllBrands, getBrandById, getMyAllBrands, updateBrandById, deleteBrandById, addBrand }