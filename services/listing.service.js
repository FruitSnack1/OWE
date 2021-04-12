import Listing from '../models/listing.model.js'

class ListingService {
    async createListing(req, res) {
        try {
            const listing = new Listing({ user: req.user.id, ...req.body })
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
            const listing = await Listing.findOne({ _id: req.params.id })
            if (listing.user != req.user.id)
                return res.status(403).json({ message: 'Unauthorized' })
            const newListing = await Listing.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
            res.json(newListing)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    async deleteListing(req, res) {
        const { id } = req.params
        try {
            const listing = await Listing.findOne({ _id: id })
            if (listing.user != req.user.id)
                return res.status(403)
            const deletedListing = await Listing.deleteOne({ _id: id })
            res.json(deletedListing)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    async uploadImage(req, res) {
        if (req.file.filename)
            res.json({ image: req.file.filename })
        else
            res.json({})
    }

}

const listingService = new ListingService()
export default listingService