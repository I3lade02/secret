const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Notification = require('../models/Notification');

router.get('/', authMiddleware, async (req, res) => {
    try { 
        const notifications = await Notification.find({ user: req.userId }).sort({ createdAt: -1 });
        res.json(notifications);
    } catch (err) {
        res.status(500).json({ message: 'Failed to load notifications' });
    }
});

router.patch('/:id', authMiddleware, async (req, res) => {
    try {
        const notif = await Notification.findById(req.params.id);
        if (!notif || notif.user.toString() !== req.userId) {
            return res.status(403).json({ message: 'Not allowed' });
        }
        notif.isRead = true;
        await notif.save();
        res.json({ message: 'Notification marked as read' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to update notification' });
    }
});

module.exports = router;