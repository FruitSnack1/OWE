import mongoose from 'mongoose'

const listingSchema = new mongoose.Schema({
    name: String,
    description: String,
    img: String,
    price: Number
})

export default mongoose.model('Listing', listingSchema)