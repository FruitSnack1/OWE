import mongoose from 'mongoose'

const listingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    img: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: Number, required: true },
    type: { type: Number, required: true },
    user: {
        type: mongoose.ObjectId,
        ref: 'User'
    },
    created: {
        type: Date,
        default: Date.now()
    }
})

export default mongoose.model('Listing', listingSchema)