import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    username: String,
    password: String,
})

export default mongoose.model('User', userSchema)