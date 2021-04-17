import Listing from '../models/listing.model.js'
import fs from 'fs'

class ListingService {
    //vytvoření inzerátu
    async createListing(req, res) {
        try {
            const listing = new Listing({ user: req.user.id, ...req.body })
            const newListing = await listing.save()
            res.json(newListing)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    //získání všech inzerátů
    async getListings(req, res) {
        try {
            const listings = await Listing.find()
            res.json(listings)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    //získání konkrétního inzerátu + uživatele
    async getListing(req, res) {
        try {
            const listing = await Listing.findOne({ _id: req.params.id }).populate('user')
            res.json(listing)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    //úprava inzerátu
    async updateListing(req, res) {
        try {
            const listing = await Listing.findOne({ _id: req.params.id })
            if (listing.user != req.user.id)
                return res.status(403).json({ message: 'Unauthorized' })
            const newListing = await Listing.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
            res.json(newListing)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    //odstranění inzerátu
    async deleteListing(req, res) {
        try {
            const { id } = req.params
            const listing = await Listing.findOne({ _id: id })
            if (listing.user != req.user.id)
                return res.status(403).json({ message: 'Unauthorized' })

            //odstranení obrázku
            if (listing.img)
                fs.unlinkSync(`upload/${listing.img}`)

            const deletedListing = await Listing.deleteOne({ _id: id })
            res.json(deletedListing)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    //nahrání obrázku
    async uploadImage(req, res) {
        try {
            if (req.file.filename)
                res.json({ image: req.file.filename })
        } catch (error) {
            res.status(500).json(error)
        }
    }

}

const listingService = new ListingService()
export default listingService