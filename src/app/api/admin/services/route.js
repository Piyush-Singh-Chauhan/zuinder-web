import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Service from "@/models/service";
import jwt from "jsonwebtoken";

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

// GET - Fetch all services (public + admin)
export async function GET(req) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || "";
    const isAdmin = searchParams.get("admin") === "true";

    let query = {};
    
    // If not admin request, only show active services
    if (!isAdmin) {
      query.isActive = true;
    }

    // Search functionality
    if (search) {
      query.$or = [
        { "title.en": { $regex: search, $options: "i" } },
        { "title.pt": { $regex: search, $options: "i" } },
        { "description.en": { $regex: search, $options: "i" } },
        { "description.pt": { $regex: search, $options: "i" } }
      ];
    }

    const skip = (page - 1) * limit;
    
    const services = await Service.find(query)
      .sort({ order: 1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(); // Use lean() for better performance

    // Ensure all services have an image field (for backward compatibility)
    const servicesWithImages = services.map(service => ({
      ...service,
      image: service.image || '' // Add empty image field if missing
    }));

    const totalServices = await Service.countDocuments(query);
    const totalPages = Math.ceil(totalServices / limit);

    return NextResponse.json({
      success: true,
      data: servicesWithImages,
      pagination: {
        currentPage: page,
        totalPages,
        totalServices,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });

  } catch (error) {
    console.error("❌ Get services error:", error.message);
    return NextResponse.json(
      { success: false, message: "Failed to fetch services" },
      { status: 500 }
    );
  }
}

// POST - Create new service (admin only)
export async function POST(req) {
  try {
    // Verify admin authentication
    await verifyAdmin(req);
    
    await connectDB();
    const serviceData = await req.json();

    // Validate required fields
    const { title, description, image } = serviceData;
    
    if (!title?.en || !title?.pt || !description?.en || !description?.pt || !image) {
      return NextResponse.json(
        { success: false, message: "All required fields must be provided in both languages" },
        { status: 400 }
      );
    }

    // Create service
    const newService = await Service.create(serviceData);

    return NextResponse.json({
      success: true,
      message: "Service created successfully",
      data: newService
    });

  } catch (error) {
    if (error.message === "No token provided" || error.name === "JsonWebTokenError") {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
    
    console.error("❌ Create service error:", error.message);
    return NextResponse.json(
      { success: false, message: "Failed to create service" },
      { status: 500 }
    );
  }
}