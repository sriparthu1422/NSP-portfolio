import express from 'express';
import {
  getBlogs,
  getBlog,
  getBlogBySlug,
  importBlog,
  createBlog,
  updateBlog,
  deleteBlog,
} from '../controllers/blogController.js';
import { protect, optionalProtect } from '../middleware/auth.js';
import { importAuth } from '../middleware/importAuth.js';

const router = express.Router();

router.get('/slug/:slug', optionalProtect, getBlogBySlug);
router.post('/import', importAuth, importBlog);
router.route('/').get(optionalProtect, getBlogs).post(protect, createBlog);
router.route('/:id').get(optionalProtect, getBlog).put(protect, updateBlog).delete(protect, deleteBlog);

export default router;
