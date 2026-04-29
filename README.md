# NSP Portfolio & Blog

A professional, full-stack MERN application featuring a GSAP-powered premium cursor, dynamic scroll reveals, and a robust admin dashboard for content management.

## Project Structure

This project is organized as a monorepo:

- **`/frontend`**: React + Vite + Tailwind CSS. Handles the UI, animations, and admin panel interface.
- **`/backend`**: Node.js + Express + MongoDB. Manages API routes, authentication, and metadata scraping.

## Key Features

- **Modern UI**: Dual-layer GSAP cursor, glassmorphism design, and fluid entrance animations.
- **Admin Dashboard**: Secure management of projects and blog posts.
- **LinkedIn Bridge**: Automated metadata extraction for social media posts.
- **Cloudinary Integration**: High-performance image hosting for all assets.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop.

## Deployment Status

- **Frontend**: Deployed on Vercel.
- **Backend**: Deployed on Render.
- **Database**: MongoDB Atlas.

## Manual Setup Requirements

To run this locally, ensure you have the following in `backend/.env`:
- `MONGO_URI`
- `JWT_SECRET`
- `CLOUDINARY_*` credentials
- `SMTP_*` credentials (for contact form)

For the frontend, set `VITE_API_URL` to point to your backend.

---
Created by Sri Parthu.
