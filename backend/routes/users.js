const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Listing = require('../models/Listing');
const authMiddleware = require('../middleware/authMiddleware');

//get user profile and their listings
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });

        const listings = await Listing.find({ seller: req.params.id });

        res.json({ user, listings });
    } catch (err) {
        console.error('Error fetching user profile: ', err);
        res.status(500).json({ message: 'Failed to fetch profile' });
    }
});

//update own profile 
router.put('/:id', authMiddleware, async (req, res) => {
    if (req.userId !== req.params.id) {
        return res.status(403).json({ message: 'Unauthorized' });
    }

    const { bio, avatar } = req.body;

    try {
        const updateUser = await User.findByIdAndUpdate(
            req.params.id,
            { bio, avatar },
            { new: true, runValidators: true }
        ).select('-password');

        res.json(updateUser);
    } catch (err) {
        console.error('Error updating profile: ', err);
        res.status(500).json({ message: 'Failed to update profile' });
    }
});

module.exports = router;

