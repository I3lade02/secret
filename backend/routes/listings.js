const express = require('express');
const router = express.Router();
const Listing = require('../models/Listing');
const authMiddleware = require('../middleware/authMiddleware');

// Get all listings
router.get('/', async (req, res) => {
  try {
    const listings = await Listing.find().populate('seller', 'username email');
    res.json(listings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching listings' });
  }
});

// Get single listing by ID
router.get('/:id', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id).populate('seller', 'username email');
    if (!listing) return res.status(404).json({ message: 'Listing not found' });

    res.json(listing);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching listing' });
  }
});

// Create new listing
router.post('/', authMiddleware, async (req, res) => {
  const { title, category, platform, condition, price } = req.body;

  if (!title || !category || !platform || !condition || !price) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newListing = new Listing({
      title,
      category,
      platform,
      condition,
      price,
      seller: req.userId
    });

    const savedListing = await newListing.save();
    res.status(201).json(savedListing);
  } catch (err) {
    res.status(500).json({ message: 'Error creating listing' });
  }
});

// Delete listing
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    if (listing.seller.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this listing' });
    }

    await listing.deleteOne();
    res.json({ message: 'Listing deleted' });
  } catch (err) {
    console.error('DELETE ERROR:', err);
    res.status(500).json({ message: 'Error deleting listing' });
  }
});

// PUT /api/listings/:id
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: 'Listing not found' });

    if (listing.seller.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Update listing fields
    Object.assign(listing, req.body);
    const updated = await listing.save();

    res.json(updated);
  } catch (err) {
    console.error('Error updating listing:', err);
    res.status(500).json({ message: 'Error updating listing' });
  }
});



module.exports = router;
