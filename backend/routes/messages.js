const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Message = require('../models/Message');
const Notification = require('../models/Notification');

// ✅ GET /api/messages/conversations — Must be defined BEFORE the dynamic route
router.get('/conversations', authMiddleware, async (req, res) => {
    try {
        const userId = req.userId;
        console.log('📨 Getting conversations for user:', userId);

        const messages = await Message.find({
            $or: [{ sender: userId }, { receiver: userId }]
        }).populate('sender receiver', 'username');

        console.log('📬 Messages found:', messages.length);

        const uniqueUsers = {};

        messages.forEach((msg) => {
            const senderId = msg.sender?._id.toString();
            const receiverId = msg.receiver?._id?.toString();

            if (!senderId || !receiverId) {
                console.warn('Incomplete message data: ', msg);
                return;
            }

            const otherUser = senderId === userId ? msg.receiver : msg.sender;

            uniqueUsers[otherUser._id] = otherUser;
        });

        res.json(Object.values(uniqueUsers));
    } catch (err) {
        console.error('Error loading conversations: ', err);
        res.status(500).json({ message: 'Failed to load conversations' });
    }
});

// ✅ GET /api/messages/:userId — Fetch messages between current user and another user
router.get('/:userId', authMiddleware, async (req, res) => {
  const currentUserId = req.userId;
  const otherUserId = req.params.userId;

  try {
    const messages = await Message.find({
      $or: [
        { sender: currentUserId, receiver: otherUserId },
        { sender: otherUserId, receiver: currentUserId }
      ]
    })
      .sort({ timestamp: 1 })
      .populate('sender', 'username');

    res.json(messages);
  } catch (err) {
    console.error('Error fetching messages:', err);
    res.status(500).json({ message: 'Failed to fetch messages' });
  }
});

// ✅ POST /api/messages — Send a new message
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

    await new Notification({
        user: receiver,
        type: 'message',
        text: `You have a new message from ${req.user.username}`,
    }).save();
  } catch (err) {
    console.error('Error sending message:', err);
    res.status(500).json({ message: 'Failed to send message' });
  }
});

module.exports = router;
