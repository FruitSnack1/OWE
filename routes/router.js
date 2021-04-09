import express from 'express'
import userService from '../services/user.service.js'
const router = express.Router()

router.post('/users/register', userService.register)
router.post('/users/login', userService.login)

export default router
