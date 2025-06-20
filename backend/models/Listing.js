const mongoose = require('mongoose');

const ListingSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    platform: { type: String, required: true },
    condition: { type: String, required: true },
    price: { type: Number, required: true },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('Listing', ListingSchema);