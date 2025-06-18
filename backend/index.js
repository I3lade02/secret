require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

//Routes
const listingRoutes = require('./routes/listings');
const uploadRoutes = require('./routes/upload');
const messageRoutes = require('./routes/messages');
const userRoutes = require('./routes/users');
const notificationRoutes = require('./routes/notifications');
const authRoutes = require('./routes/auth');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});

//middleware
app.use(cors());
app.use(express.json());

//DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error('MongoDB error: ', err));

// Routes v2
app.use('/api/auth', authRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/upload', uploadRoutes);

//server images upload
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//socket.io reat-time messaging
const connectedUsers = new Map();

io.on('connection', (socket) => {
    console.log('New client connected: ', socket.id);

    socket.on('register', (userId) => {
        connectedUsers.set(userId, socket.id);
        console.log(`Registered user: ${userId} -> ${socket.id}`);
    });

    socket.on('sendMessage', ({ sender, receiver, text }) => {
        const targetSocketId = connectedUsers.get(receiver);
        if (targetSocketId) {
            io.to(targetSocketId).emit('receiveMessage', { sender, text});
        }
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected: ', socket.id);
        for (const [userId, socketId] of connectedUsers.entries()) {
            if (socketId === socket.id) {
                connectedUsers.delete(userId);
                break;
            }
        }
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));