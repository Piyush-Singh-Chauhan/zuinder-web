import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema(
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
    category: {
      en: {
        type: String,
        required: [true, "English category is required"],
        maxlength: [100, "Category must not exceed 100 characters"],
      },
      pt: {
        type: String,
        required: [true, "Portuguese category is required"],
        maxlength: [100, "Category must not exceed 100 characters"],
      },
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    link: {
      type: String,
      required: [true, "Link is required"],
    },
    technologies: {
      type: [String],
      default: [],
    },
    client: {
      type: String,
      default: "",
    },
    projectDate: {
      type: Date,
      default: Date.now,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Create index for search functionality
portfolioSchema.index({ 
  "title.en": "text", 
  "title.pt": "text", 
  "description.en": "text", 
  "description.pt": "text" 
});

// Prevent model overwrite issue
const Portfolio = mongoose.models.Portfolio || mongoose.model("Portfolio", portfolioSchema);

export default Portfolio;