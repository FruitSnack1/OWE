import express from 'express'
import multer from 'multer'
import userService from '../services/user.service.js'
import listingService from '../services/listing.service.js'
import codesService from '../services/codes.service.js'
import { verifyToken } from '../middleware/auth.js'

//konfigurace multeru
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '.jpg')
    }
})

const upload = multer({ storage })
const router = express.Router()

//routy pro operace s uživateli
router.post('/users/register', userService.register)
router.post('/users/login', userService.login)
router.get('/users', verifyToken, userService.getUser)
router.put('/users', verifyToken, userService.updateUser)

//routy pro operace s inzeráty
router.get('/listings', listingService.getListings)
router.get('/listings/:id', listingService.getListing)
router.post('/listings', verifyToken, listingService.createListing)
router.post('/listings/image', verifyToken, upload.single('img'), listingService.uploadImage)
router.put('/listings/:id', verifyToken, listingService.updateListing)
router.delete('/listings/:id', verifyToken, listingService.deleteListing)

router.get('/codes/categories', codesService.getCategories)

export default router
