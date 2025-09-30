import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      en: {
        type: String,
        required: [true, "English title is required"],
        maxlength: [200, "Title must not exceed 200 characters"],
      },
      pt: {
        type: String,
        required: [true, "Portuguese title is required"],
        maxlength: [200, "Title must not exceed 200 characters"],
      },
    },
    description: {
      en: {
        type: String,
        required: [true, "English description is required"],
        maxlength: [500, "Description must not exceed 500 characters"],
      },
      pt: {
        type: String,
        required: [true, "Portuguese description is required"],
        maxlength: [500, "Description must not exceed 500 characters"],
      },
    },
    content: {
      en: {
        type: String,
        required: [true, "English content is required"],
      },
      pt: {
        type: String,
        required: [true, "Portuguese content is required"],
      },
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      lowercase: true,
      match: [/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens"],
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    tags: {
      type: [String],
      default: [],
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    author: {
      type: String,
      default: "Zuinder Team",
    },
    readTime: {
      type: Number,
      default: 5,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Create index for search functionality
blogSchema.index({ 
  "title.en": "text", 
  "title.pt": "text", 
  "description.en": "text", 
  "description.pt": "text" 
});

// Prevent model overwrite issue
const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export default Blog;