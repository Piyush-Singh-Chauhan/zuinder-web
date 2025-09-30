import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/models/admin";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectDB();

    // Check if any admin exists
    const existingAdmin = await Admin.findOne({});
    if (existingAdmin) {
      return NextResponse.json({
        success: true,
        message: "Admin already exists",
        adminExists: true
      });
    }

    // Default admin data
    const adminData = {
      email: "admin@zuinder.com",
      password: "admin123", // Change this to a secure password
      name: "Zuinder Admin",
      role: "super_admin"
    };

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(adminData.password, saltRounds);

    // Create admin
    const newAdmin = await Admin.create({
      email: adminData.email.toLowerCase(),
      password: hashedPassword,
      name: adminData.name.trim(),
      role: adminData.role
    });

    console.log("✅ Auto-created admin successfully!");
    console.log("📧 Email:", adminData.email);
    console.log("🔑 Password:", adminData.password);

    return NextResponse.json({
      success: true,
      message: "Admin created successfully",
      adminExists: false,
      admin: {
        id: newAdmin._id,
        name: newAdmin.name,
        email: newAdmin.email,
        role: newAdmin.role
      },
      credentials: {
        email: adminData.email,
        password: adminData.password
      }
    });

  } catch (error) {
    console.error("❌ Auto-create admin error:", error.message);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}