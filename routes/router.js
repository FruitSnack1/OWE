import express from 'express'
import userService from '../services/user.service.js'
import listingService from '../services/listing.service.js'
const router = express.Router()

router.post('/users/register', userService.register)
router.post('/users/login', userService.login)
router.get('/users', userService.getUser)

router.get('/listings', listingService.getListings)
router.post('/listings', listingService.createListing)

export default router
