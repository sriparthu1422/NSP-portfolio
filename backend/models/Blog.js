import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
      unique: true,
      trim: true,
    },
    slug: String,
    content: {
      type: String,
      required: [true, 'Please add content'],
    },
    preview: {
      type: String,
      maxlength: [200, 'Preview cannot be more than 200 characters'],
    },
    image: {
      url: String,
      publicId: String,
    },
    tag: {
      type: String,
      enum: ['LinkedIn', 'Hashnode', 'Education', 'Custom', 'Technical'],
      default: 'Technical',
    },
    externalUrl: String,
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Blog', blogSchema);
