import express from 'express';
import {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
} from '../controllers/blogController.js';
import { protect, optionalProtect } from '../middleware/auth.js';

const router = express.Router();

router.route('/').get(optionalProtect, getBlogs).post(protect, createBlog);
router.route('/:id').get(optionalProtect, getBlog).put(protect, updateBlog).delete(protect, deleteBlog);

export default router;
