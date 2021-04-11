import express from 'express'
import multer from 'multer'
import userService from '../services/user.service.js'
import listingService from '../services/listing.service.js'
import { verifyToken } from '../middleware/auth.js'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.jpg')
    }
})

const upload = multer({ storage })

const router = express.Router()

router.post('/users/register', userService.register)
router.post('/users/login', userService.login)
router.get('/users', verifyToken, userService.getUser)
router.put('/users', verifyToken, userService.updateUser)

router.get('/listings', listingService.getListings)
router.get('/listings/owned', verifyToken, listingService.getOwnedListings)
router.get('/listings/:id', listingService.getListing)
router.post('/listings', verifyToken, upload.single('img'), listingService.createListing)

export default router
