const multer = require('multer');
const path = require('path');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Directory to save uploaded files
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // File name: unique + original extension
  }
});

// Multer file filter to accept only image files
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true); // Accept image files
  } else {
    cb(new Error('Invalid file type. Please upload an image.'), false); // Reject non-image files
  }
};

// Multer instance
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 } // 5 MB file size limit
});

module.exports = upload;
