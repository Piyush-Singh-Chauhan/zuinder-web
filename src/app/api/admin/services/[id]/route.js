import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Service from "@/models/service";
import jwt from "jsonwebtoken";
import { deleteFromCloudinary } from "@/lib/cloudinary";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Middleware to verify admin token
async function verifyAdmin(req) {
  const token = req.cookies.get("admin_token")?.value;
  if (!token) {
    throw new Error("No token provided");
  }
  
  const decoded = jwt.verify(token, JWT_SECRET);
  return decoded;
}

// GET - Fetch single service by ID
export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    const service = await Service.findById(id).lean();
    if (!service) {
      return NextResponse.json(
        { success: false, message: "Service not found" },
        { status: 404 }
      );
    }

    // Ensure service has an image field (for backward compatibility)
    const serviceWithImage = {
      ...service,
      image: service.image || '' // Add empty image field if missing
    };

    return NextResponse.json({
      success: true,
      data: serviceWithImage
    });

  } catch (error) {
    console.error("❌ Get service error:", error.message);
    return NextResponse.json(
      { success: false, message: "Failed to fetch service" },
      { status: 500 }
    );
  }
}

// PUT - Update service (admin only)
export async function PUT(req, { params }) {
  try {
    // Verify admin authentication
    await verifyAdmin(req);
    
    await connectDB();
    const { id } = params;
    const updateData = await req.json();

    // Check if service exists
    const existingService = await Service.findById(id);
    if (!existingService) {
      return NextResponse.json(
        { success: false, message: "Service not found" },
        { status: 404 }
      );
    }

    // Update service
    const updatedService = await Service.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    return NextResponse.json({
      success: true,
      message: "Service updated successfully",
      data: updatedService
    });

  } catch (error) {
    if (error.message === "No token provided" || error.name === "JsonWebTokenError") {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
    
    console.error("❌ Update service error:", error.message);
    return NextResponse.json(
      { success: false, message: "Failed to update service" },
      { status: 500 }
    );
  }
}

// DELETE - Delete service (admin only)
export async function DELETE(req, { params }) {
  try {
    // Verify admin authentication
    await verifyAdmin(req);
    
    await connectDB();
    const { id } = params;

    // Check if service exists
    const service = await Service.findById(id);
    if (!service) {
      return NextResponse.json(
        { success: false, message: "Service not found" },
        { status: 404 }
      );
    }

    // Delete associated image from Cloudinary if it exists
    if (service.image && service.image.includes('cloudinary.com')) {
      try {
        await deleteFromCloudinary(service.image);
        console.log('Successfully deleted image from Cloudinary:', service.image);
      } catch (cloudinaryError) {
        console.error('Failed to delete image from Cloudinary:', cloudinaryError);
        // Continue with service deletion even if image deletion fails
      }
    }

    // Delete service from database
    await Service.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Service deleted successfully"
    });

  } catch (error) {
    if (error.message === "No token provided" || error.name === "JsonWebTokenError") {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
    
    console.error("❌ Delete service error:", error.message);
    return NextResponse.json(
      { success: false, message: "Failed to delete service" },
      { status: 500 }
    );
  }
}