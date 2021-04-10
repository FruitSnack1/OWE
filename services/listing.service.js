import Listing from '../models/listing.model.js'

class ListingService {
    async createListing(req, res) {
        try {
            const listing = new Listing(req.body)
            const newListing = await listing.save()
            res.json(newListing)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    async getListings(req, res) {
        try {
            const listing = await Listing.find()
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