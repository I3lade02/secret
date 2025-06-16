const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Message = require('../models/Message');

// Fetch messages between current user and another user
router.get('/:userId', authMiddleware, async (req, res) => {
  const currentUserId = req.userId;
  const otherUserId = req.params.userId;

  try {
    const messages = await Message.find({
      $or: [
        { sender: currentUserId, receiver: otherUserId },
        { sender: otherUserId, receiver: currentUserId }
      ]
    }).sort({ timestamp: 1 }).populate('sender', 'username');

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch messages' });
  }
});

router.post('/', authMiddleware, async (req, res) => {
    const { receiver, text, listing } = req.body;

    if (!receiver || !text) {
        return res.status(400).json({ message: 'Receiver and text are required' });
    }

    try {
        const newMessage = new Message({
            sender: req.userId,
            receiver,
            text,
            listing
        });

        const saved = await newMessage.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(500).json({ message: 'Failed to send message' });
    }
});

// GET /api/messages/conversations
router.get('/conversations', authMiddleware, async (req, res) => {
    try { 
        const userId = req.userId;

        const messages = await Message.find({
            $or: [{ sender: userId }, { receiver: userId }]
        }).populate('sender receiver', 'username');

        const uniqueUsers = {};

        messages.forEach((msg) => {
            const otherUser = msg.sender._id.toString() === userId
                ? msg.receiver
                : msg.sender;

            uniqueUsers[otherUser._id] = otherUser;
        });
        res.json(Object.values(uniqueUsers));
    } catch (err) {
        res.status(500).json({ message: 'Failed to load conversations' });
    }
});

module.exports = router;