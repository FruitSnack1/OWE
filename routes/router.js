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
router.get('/listings/:id', listingService.getListing)
router.post('/listings', verifyToken, listingService.createListing)
router.delete('/listings/:id', verifyToken, listingService.deleteListing)
router.post('/listings/image', verifyToken, upload.single('img'), listingService.uploadImage)
router.put('/listings/:id', verifyToken, listingService.updateListing)

export default router
