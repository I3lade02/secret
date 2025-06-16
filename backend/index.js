require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const listingRoutes = require('./routes/listings');
const uploadRoutes = require('./routes/upload');
const path = require('path');

const authRoutes = require('./routes/auth');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/listings', listingRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error(err));

//routes
app.use('/api/auth', authRoutes);
app.use('/api/listings', listingRoutes);

//Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//API route
app.use('/api/upload', uploadRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));