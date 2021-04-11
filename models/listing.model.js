import mongoose from 'mongoose'

const listingSchema = new mongoose.Schema({
    name: String,
    description: String,
    img: String,
    price: Number,
    user: {
        type: mongoose.ObjectId,
        ref: 'User'
    }
})

export default mongoose.model('Listing', listingSchema)