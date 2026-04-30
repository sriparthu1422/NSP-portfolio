# Security Audit & Implementation Report

This project has been fully audited and fortified against common web vulnerabilities.

## Implemented Security Measures

### 🛡️ HTTP Security Headers (Helmet)
- **Content-Security-Policy (CSP):** Configured to only allow scripts, styles, and images from trusted sources (including our domain, Unsplash, and Cloudinary).
- **X-Frame-Options:** Set to `SAMEORIGIN` to prevent Clickjacking.
- **Referrer-Policy:** Set to `strict-origin-when-cross-origin`.
- **Permissions-Policy:** Disabled sensitive browser features like geolocation, microphone, and camera.

### 🚫 Attack Protections
- **Rate Limiting:** Global rate limit applied to API routes (`100 requests per 10 minutes`) to prevent Brute Force and DDoS attacks.
- **XSS Protection:** Enforced strict input validation and secure cookies.
- *(Note: `express-mongo-sanitize`, `xss-clean`, and `hpp` were intentionally removed as they are incompatible with Express 5's read-only `req.query` getter properties. Strict validation via Zod is used instead).*

### ✅ Strict Input Validation (Zod)
- All user input (e.g., Contact Forms) is heavily validated using Zod.
- Ensures dirty or malformed data never touches the database layer.

### 🔑 Secure Authentication
- **HTTP-Only Cookies:** Replaced vulnerable `localStorage` JWT storage with highly secure `httpOnly` and `secure` cookies.
- **CSRF Consideration:** Using `sameSite: 'strict'` for cookies to prevent Cross-Site Request Forgery.
- **Logout Endpoint:** Destroys the cookie instantly on the server side.

## Pre-Deployment Verification

A script is provided to verify security configurations locally before deploying. Run:
```bash
node security-check.js
```
This ensures no critical security packages or middlewares are accidentally removed in the future.
