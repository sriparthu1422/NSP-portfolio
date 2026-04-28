import express from 'express';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { protect } from '../middleware/auth.js';
import asyncHandler from '../middleware/asyncHandler.js';

const router = express.Router();

// @desc    Fetch metadata from a URL (LinkedIn or other)
// @route   POST /api/v1/blogs/fetch-metadata
// @access  Private
router.post('/fetch-metadata', protect, asyncHandler(async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ message: 'Please provide a URL' });
  }

  try {
    const { data: html } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    });

    const $ = cheerio.load(html);
    
    // Check if we hit a LinkedIn challenge/login page
    const isLinkedIn = url.includes('linkedin.com');
    const pageTitle = $('title').text();
    
    if (isLinkedIn && (pageTitle.includes('Sign In') || pageTitle.includes('Security Check'))) {
      return res.status(200).json({
        success: true,
        data: {
          title: 'LinkedIn Post',
          preview: 'Click the link to view this post on LinkedIn.',
          externalUrl: url,
          tag: 'LinkedIn',
          image: null
        }
      });
    }

    const metadata = {
      title: $('meta[property="og:title"]').attr('content') || $('title').text(),
      preview: $('meta[property="og:description"]').attr('content') || $('meta[name="description"]').attr('content'),
      image: $('meta[property="og:image"]').attr('content'),
      externalUrl: url,
      tag: url.includes('linkedin.com') ? 'LinkedIn' : 
           url.includes('hashnode.com') ? 'Hashnode' :
           (url.includes('edu') || url.includes('course')) ? 'Education' : 'Technical',
    };

    res.status(200).json({
      success: true,
      data: metadata,
    });
  } catch (err) {
    console.error('Metadata fetch failed:', err.message);
    
    // If it's a LinkedIn URL, return a placeholder instead of an error
    if (url.includes('linkedin.com')) {
      return res.status(200).json({
        success: true,
        data: {
          title: 'LinkedIn Post',
          preview: 'Click to view the post content on LinkedIn.',
          externalUrl: url,
          tag: 'LinkedIn',
          image: null
        }
      });
    }

    res.status(500).json({ message: 'Could not fetch metadata from this URL' });
  }
}));

export default router;
