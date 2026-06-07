import asyncHandler from './asyncHandler.js';
import { protect } from './auth.js';

/** Allow blog import via x-import-key or admin JWT. */
export const importAuth = asyncHandler(async (req, res, next) => {
  const key = req.headers['x-import-key'];
  if (
    process.env.BLOG_IMPORT_API_KEY &&
    key &&
    key === process.env.BLOG_IMPORT_API_KEY
  ) {
    return next();
  }
  return protect(req, res, next);
});
