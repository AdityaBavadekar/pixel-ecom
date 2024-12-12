import Product from "../models/Product.js";
import Brand from "../models/Brand.js";

async function getProductById(req, res) {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res
                .status(404)
                .json({
                    message: "Product with the provided id does not exist",
                });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error occurred" });
    }
}

async function deleteProductById(req, res) {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res
                .status(404)
                .json({
                    message: "Product with the provided id does not exist",
                });
        }
        const brand = await Brand.findById(product.brandId);
        if (!brand) {
            return res
                .status(404)
                .json({
                    message: "Brand with the provided id does not exist",
                });
        }
        if (!brand.brandManagers.includes(req.user.id)) {
            return res
                .status(403)
                .json({ message: "You are not authorized to delete this product" });
        }
        await product.deleteOne();
        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error occurred" });
    }
}

async function updateProductById(req, res) {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res
                .status(404)
                .json({
                    message: "Product with the provided id does not exist",
                });
        }
        const brand = await Brand.findById(product.brandId);
        if (!brand) {
            return res
                .status(404)
                .json({
                    message: "Brand with the provided id does not exist",
                });
        }
        if (!brand.brandManagers.includes(req.user.id)) {
            return res
                .status(403)
                .json({ message: "You are not authorized to delete this product" });
        }
        await product.updateOne(req.body);
        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error occurred" });
    }
}

async function search(req, res) {
    try {
        const pageIndex = parseInt(req.query.pageIndex) || 0;
        const searchQuery = req.query.query || "";
        const sort = req.query.sort || "rating";
        const sortOrder = req.query.sortOrder || "desc";
        const limitItems = req.query.limit || 10;

        const products = await Product.find({
            title: { $regex: searchQuery, $options: "i" },
        })
            .sort({ [sort]: sortOrder })
            .skip(pageIndex * limitItems)
            .limit(limitItems);

        const totalItems = await Product.countDocuments({
            $or: [
                { title: { $regex: searchQuery, $options: "i" } },
                { description: { $regex: searchQuery, $options: "i" } },
            ]
        });

        const response = {
            error: false,
            total: totalItems,
            pageIndex: pageIndex,
            searchQuery: searchQuery,
            sort: sort,
            sortOrder: sortOrder,
            limit: limitItems,
            products: products,
        };

        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error occurred" });
    }
}

async function addProduct(req, res) {
    const {
        title,
        description,
        price,
        thumbnailImage,
        images,
        additionalData,
        brandId
    } = req.body;

    if (!title || !description || !price || !thumbnailImage || !brandId) {
        return res.status(400).json({ message: "Incomplete data" });
    }
    
    const brand = await Brand.findById(brandId);
    if (!brand) {
        return res
            .status(404)
            .json({
                message: "Brand with the provided id does not exist",
            });
    }
    if (!brand.brandManagers.includes(req.userId)) {
        return res
            .status(403)
            .json({ message: "You are not authorized to delete this product" });
    }

    try {
        if (!title || !description || !price || !thumbnailImage || !brandId) {
            return res.status(400).json({ message: "Incomplete data" });
        }
        const product = new Product({
            title,
            description,
            price,
            thumbnailImage,
            images,
            additionalData,
            brandId
        });
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error occurred" });
    }
}

export { getProductById, deleteProductById, updateProductById, addProduct, search };
