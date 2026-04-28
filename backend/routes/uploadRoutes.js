import express from 'express';
import { upload } from '../config/cloudinary.js';
import { protect } from '../middleware/auth.js';
import asyncHandler from '../middleware/asyncHandler.js';

const router = express.Router();

// @desc    Upload image to Cloudinary
// @route   POST /api/v1/upload
// @access  Private
router.post('/', protect, upload.single('image'), asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Please upload an image' });
  }

  res.status(200).json({
    success: true,
    data: {
      url: req.file.path,
      publicId: req.file.filename,
    },
  });
}));

export default router;
