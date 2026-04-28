import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
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

// Enable CORS
app.use(cors({
  origin: [process.env.FRONTEND_URL, 'http://localhost:5173'],
  credentials: true
}));

// Set security headers
app.use(helmet());

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
