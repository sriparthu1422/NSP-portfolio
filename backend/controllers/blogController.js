import asyncHandler from '../middleware/asyncHandler.js';
import Blog from '../models/Blog.js';
import slugify from 'slugify';
import { parseBlogMarkdown, toBlogPayload } from '../utils/parseBlogMarkdown.js';

// @desc    Get all blogs
// @route   GET /api/v1/blogs
// @access  Public
export const getBlogs = asyncHandler(async (req, res, next) => {
  const query = {};
  
  // If not authenticated, only show published blogs
  if (!req.user) {
    query.isPublished = true;
  }

  const blogs = await Blog.find(query).sort('-createdAt');

  res.status(200).json({
    success: true,
    count: blogs.length,
    data: blogs,
  });
});

// @desc    Get single blog by slug
// @route   GET /api/v1/blogs/slug/:slug
// @access  Public
export const getBlogBySlug = asyncHandler(async (req, res, next) => {
  const query = { slug: req.params.slug };
  if (!req.user) query.isPublished = true;

  const blog = await Blog.findOne(query);

  if (!blog) {
    return res.status(404).json({ message: 'Blog not found' });
  }

  res.status(200).json({
    success: true,
    data: blog,
  });
});

// @desc    Import or update blog from markdown
// @route   POST /api/v1/blogs/import
// @access  Private (JWT or x-import-key)
export const importBlog = asyncHandler(async (req, res, next) => {
  const { markdown, ...fields } = req.body;

  let payload = fields;
  if (markdown) {
    const { frontmatter, body } = parseBlogMarkdown(markdown);
    payload = { ...toBlogPayload(frontmatter, body), ...fields };
  }

  const { title, preview, content, tag = 'Technical', isPublished = true } = payload;

  if (!title || !preview || !content) {
    return res.status(400).json({
      message: 'title, preview, and content are required (or provide markdown)',
    });
  }

  const slug = slugify(title, { lower: true });
  let blog = await Blog.findOne({ slug });
  const isUpdate = Boolean(blog);

  if (blog) {
    blog = await Blog.findByIdAndUpdate(
      blog._id,
      { title, preview, content, tag, isPublished, slug },
      { new: true, runValidators: true }
    );
  } else {
    blog = await Blog.create({ title, preview, content, tag, isPublished, slug });
  }

  res.status(isUpdate ? 200 : 201).json({
    success: true,
    data: blog,
    action: isUpdate ? 'updated' : 'created',
  });
});

// @desc    Get single blog
// @route   GET /api/v1/blogs/:id
// @access  Public
export const getBlog = asyncHandler(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return res.status(404).json({ message: 'Blog not found' });
  }

  res.status(200).json({
    success: true,
    data: blog,
  });
});

// @desc    Create new blog
// @route   POST /api/v1/blogs
// @access  Private
export const createBlog = asyncHandler(async (req, res, next) => {
  if (req.body.title) {
    req.body.slug = slugify(req.body.title, { lower: true });
  }

  const blog = await Blog.create(req.body);

  res.status(201).json({
    success: true,
    data: blog,
  });
});

// @desc    Update blog
// @route   PUT /api/v1/blogs/:id
// @access  Private
export const updateBlog = asyncHandler(async (req, res, next) => {
  let blog = await Blog.findById(req.params.id);

  if (!blog) {
    return res.status(404).json({ message: 'Blog not found' });
  }

  if (req.body.title) {
    req.body.slug = slugify(req.body.title, { lower: true });
  }

  blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: blog,
  });
});

// @desc    Delete blog
// @route   DELETE /api/v1/blogs/:id
// @access  Private
export const deleteBlog = asyncHandler(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return res.status(404).json({ message: 'Blog not found' });
  }

  await blog.deleteOne();

  res.status(200).json({
    success: true,
    data: {},
  });
});
