import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    thumbnailImage: {
        type: String,
        required: true
    },
    images: {
        type: [{
            type: String,
            required: true
        }],
        default: []
    },
    additionalData: {
        type: [
            {
                key: {
                    type: String,
                    required: true
                },
                value: {
                    type: String,
                    required: true
                }
            }
        ],
        default : []
    },
    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
        required: true
    },
}, {
    timestamps: true
})

export default mongoose.model('Product', productSchema)