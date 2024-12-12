import Order from '../models/Order.js';

async function getMyOrders(req, res) {
    try {
        const orders = await Order.find({ userId: req.userId })
            .where('status').ne('Delivered');
        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error occurred" });
    }
}

async function addOrder(req, res) {
    try {
        const { items, shippingAddress, paymentMethod } = req.body;
        if (!items || !shippingAddress || !paymentMethod) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const newOrder = new Order({
            userId: req.userId,
            items,
            shippingAddress,
            paymentMethod
        });
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error occurred" });
    }
}

export { getMyOrders, addOrder };