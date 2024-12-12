import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        }
    }],
    shippingAddress: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ['Online', 'Cash'],
        required: true
    },
    isCancelled: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered'],
        default: 'Pending'
    },
    steps: [{
        status: {
            type: String,
            enum: ['Pending', 'Processing', 'Shipped', 'Delivered'],
            required: true
        },
        date: {
            type: Date,
            required: true
        }
    }]
}, {
    timestamps: true
})

export default mongoose.model('Order', orderSchema)