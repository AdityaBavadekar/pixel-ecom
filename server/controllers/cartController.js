import Cart from "../models/Cart.js";

async function getMyCart(req, res) {
    try {
        var cart = await Cart.findOne({ userId: req.userId });
        if (!cart) {
            // Cart does not exist, create a new one
            cart = await createCart(req.userId);
        }
        res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error occurred" });
    }
}

async function updateCartItemById(req, res) {
    try {
        const { productId, quantity } = req.body;
        var cart = await Cart.findOne({ userId: req.userId });
        if (!cart) cart = [];
        else {
            // Subtract quantity from the item or remove it if quantity is 0
            const itemIndex = cart.items.findIndex(
                (item) => item.productId == productId
            );

            if (itemIndex !== -1) {
                const item = cart.items[itemIndex];
                item.quantity = quantity;
                if (item.quantity <= 0) {
                    delete cart.items[itemIndex];
                } else {
                    cart.items[itemIndex] = item;
                }
                await cart.save();
            }
        }
        res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error occurred" });
    }
}

async function createCart(userId, items = []) {
    const cart = new Cart({ userId, items });
    return await cart.save();
}

async function addItemToCard(req, res) {
    try {
        const { productId, quantity } = req.body;
        if (!productId || !quantity) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const newItem = { productId, quantity };
        var cart = await Cart.findByIdAndUpdate(
            { userId: req.userId },
            { $push: { items: newItem } }
        );
        if (!cart) {
            // Cart does not exist, create a new one
            cart = await createCart(req.userId, [newItem]);
        }
        res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error occurred" });
    }
}

async function removeItemFromCart(req, res) {
    try {
        const { productId, quantity } = req.body;
        var cart = await Cart.findOne({ userId: req.userId });
        if (!cart) cart = [];
        else {
            // Subtract quantity from the item or remove it if quantity is 0
            const itemIndex = cart.items.findIndex(
                (item) => item.productId == productId
            );

            if (itemIndex !== -1) {
                const item = cart.items[itemIndex];
                item.quantity -= quantity;
                if (item.quantity <= 0) {
                    delete cart.items[itemIndex];
                } else {
                    cart.items[itemIndex] = item;
                }
                await cart.save();
            }
        }
        res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error occurred" });
    }
}

async function clearCart(req, res) {
    try {
        var cart = await Cart.findOne({ userId: req.userId });
        if (cart) {
            cart.items = [];
            await cart.save();
        }
        res.status(200).json({ message: "Cart cleared" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error occurred" });
    }
}

export {
    getMyCart,
    clearCart,
    updateCartItemById,
    addItemToCard,
    removeItemFromCart,
};
