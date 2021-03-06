import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { generateToken } from '../middleware/auth.js'

class UserService {
    //registrace uživatele
    async register(req, res) {
        const { password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        req.body.password = hashedPassword
        try {
            const user = new User(req.body)
            const newUser = await user.save()
            res.status(201).json(newUser)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    //přihlášení uživatele
    async login(req, res) {
        const { username, password } = req.body
        try {
            const user = await User.findOne({ username })
            if (!user)
                res.status(404).json({ message: 'not found' })
            const valid = await bcrypt.compare(password, user.password)
            if (!valid)
                res.status(403).json({ message: 'wrong password' })

            const accesstoken = generateToken({ id: user._id, username: user.username })
            res.status(200).json({
                message: 'logged in',
                accesstoken,
                username: user.username,
                id: user._id
            })
        } catch (error) {
            res.status(500).json(error)
        }
    }

    //úprava uživatele
    async updateUser(req, res) {
        try {
            const newUser = await User.findOneAndUpdate({ _id: req.user.id }, req.body, { new: true })
            res.send(newUser)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    //získání uživatele
    async getUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.user.id })
            res.json(user)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

const userService = new UserService()
export default userService