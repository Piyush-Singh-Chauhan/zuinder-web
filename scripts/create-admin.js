// scripts/create-admin.js
require('dotenv').config({ path: '.env.local' });
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Admin schema (copy from your model)
const adminSchema = new mongoose.Schema(
  {
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
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      maxlength: [50, "Name must not exceed 50 characters"],
    },
    role: {
      type: String,
      default: "admin",
      enum: ["admin", "super_admin"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);

async function createAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODBURL, {
      dbName: process.env.DB_NAME || "contactDB",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to MongoDB");

    // Admin details
    const adminData = {
      email: process.env.ADMIN_EMAIL || "admin@zuinder.com",
      password: process.env.ADMIN_PASSWORD || "admin123", // Change this to a secure password
      name: process.env.ADMIN_NAME || "Zuinder Admin",
      role: process.env.ADMIN_ROLE || "super_admin"
    };

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: adminData.email });
    if (existingAdmin) {
      console.log("⚠️ Admin already exists with email:", adminData.email);
      process.exit(0);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(adminData.password, 12);

    // Create admin
    const newAdmin = await Admin.create({
      ...adminData,
      password: hashedPassword
    });

    console.log("✅ Admin created successfully!");
    console.log("📧 Email:", adminData.email);
    console.log("🔑 Password:", adminData.password);
    console.log("⚠️ Please change the password after first login");

  } catch (error) {
    console.error("❌ Error creating admin:", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("👋 Disconnected from MongoDB");
  }
}

createAdmin();