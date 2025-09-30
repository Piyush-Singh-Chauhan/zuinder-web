import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
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
        maxlength: [1000, "Description must not exceed 1000 characters"],
      },
      pt: {
        type: String,
        required: [true, "Portuguese description is required"],
        maxlength: [1000, "Description must not exceed 1000 characters"],
      },
    },
    image: {
      type: String,
      required: [true, "Service image is required"],
    },
    features: {
      en: [{
        type: String,
        maxlength: [200, "Feature must not exceed 200 characters"],
      }],
      pt: [{
        type: String,
        maxlength: [200, "Feature must not exceed 200 characters"],
      }],
    },
    price: {
      type: String,
      default: "",
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
serviceSchema.index({ 
  "title.en": "text", 
  "title.pt": "text", 
  "description.en": "text", 
  "description.pt": "text" 
});

// Clear cached model to ensure fresh schema
if (mongoose.models.Service) {
  delete mongoose.models.Service;
}

// Prevent model overwrite issue
const Service = mongoose.model("Service", serviceSchema);

export default Service;