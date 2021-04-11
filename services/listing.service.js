import Listing from '../models/listing.model.js'

class ListingService {
    async createListing(req, res) {
        try {
            const json = JSON.parse(req.body.listing)
            json.img = req.file.filename
            json.user = req.user.id
            const listing = new Listing(json)
            const newListing = await listing.save()
            res.json(newListing)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    async getListings(req, res) {
        try {
            const listings = await Listing.find()
            res.json(listings)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    async getOwnedListings(req, res) {
        try {
            const listings = await Listing.find({ user: req.user.id })
            res.json(listings)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    async getListing(req, res) {
        try {
            const listing = await Listing.findOne({ _id: req.params.id }).populate('user')
            res.json(listing)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    async updateListing(req, res) {
        try {
            const newListing = await Listing.findOneAndUpdate({ _id: '' }, req.body, { new: true })
            res.json(newListing)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    async deleteListing(req, res) {
        try {
            const deletedListing = await Listing.deleteOne({ _id: '' })
            res.json(deletedListing)
        } catch (error) {
            res.status(500).json(error)
        }
    }

}

const listingService = new ListingService()
export default listingService