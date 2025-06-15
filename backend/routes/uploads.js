const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Save in /uploads
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // e.g., 123123123.jpg
  },
});

// File filter (image only)
const fileFilter = (req, file, cb) => {
  const isImage = file.mimetype.startsWith('image/');
  cb(null, isImage);
};

const upload = multer({ storage, fileFilter });

router.post('/', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

  const fileUrl = `/uploads/${req.file.filename}`;
  res.status(200).json({ imageUrl: fileUrl });
});

module.exports = router;