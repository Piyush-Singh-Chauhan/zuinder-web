import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [2, "Name must be at least 2 characters long"],
      maxlength: [50, "Name must not exceed 50 characters"],
      validate: {
        validator: function (v) {
          return /^[A-Za-z\s]+$/.test(v); // Only alphabets and spaces
        },
        message: "Name should contain only alphabets",
      },
      set: (v) =>
        v.charAt(0).toUpperCase() + v.slice(1).toLowerCase(), // First letter capital
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
    },

    company : {
      type : String,
      maxlength : [100]
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      match: [
        /^\+?[1-9]\d{1,14}$/, // E.164 format
        "Please enter a valid phone number",
      ],
    },

    message: {
      type: String,
      required: [true, "Message is required"],
      minlength: [10, "Message must be at least 10 characters long"],
      maxlength: [500, "Message must not exceed 500 characters"],
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model overwrite issue
const Contact =
  mongoose.models.Contact || mongoose.model("Contact", contactSchema);

export default Contact;
