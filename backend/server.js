import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import connectDB from './config/db.js';

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Route files
import authRoutes from './routes/authRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import metadataRoutes from './routes/metadataRoutes.js';
import errorHandler from './middleware/errorMiddleware.js';

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Express 5 Compatibility fix for xss-clean and express-mongo-sanitize
// In Express 5, req.query is a read-only getter, which crashes older middlewares that try to reassign it.
// We make it writable before passing it to them.
app.use((req, res, next) => {
  Object.defineProperty(req, 'query', {
    value: req.query,
    writable: true,
    enumerable: true,
    configurable: true,
  });
  next();
});

// Sanitize data (Prevent NoSQL Injection)
app.use(mongoSanitize());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100,
  message: 'Too many requests, please try again later.'
});
app.use('/api/', limiter);

// Enable CORS
const allowedOrigins = [process.env.FRONTEND_URL, 'http://localhost:5173'].filter(Boolean);
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// Set security headers
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https://res.cloudinary.com", "https://images.unsplash.com"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        connectSrc: ["'self'", process.env.FRONTEND_URL, "http://localhost:5173"],
      },
    },
    crossOriginEmbedderPolicy: false,
    xFrameOptions: { action: 'sameorigin' },
  })
);

app.use(helmet.referrerPolicy({ policy: 'strict-origin-when-cross-origin' }));

app.use((req, res, next) => {
  res.setHeader(
    'Permissions-Policy',
    'geolocation=(), microphone=(), camera=(), payment=()'
  );
  next();
});

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routers
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/projects', projectRoutes);
app.use('/api/v1/blogs', blogRoutes);
app.use('/api/v1/contacts', contactRoutes);
app.use('/api/v1/upload', uploadRoutes);
app.use('/api/v1/metadata', metadataRoutes);

// Error handler middleware
app.use(errorHandler);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to NSP Portfolio API' });
});

const PORT = process.env.PORT || 5000;

if (!process.env.VERCEL) {
  const server = app.listen(
    PORT,
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
  );

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    // Close server & exit process
    server.close(() => process.exit(1));
  });
}

export default app;
