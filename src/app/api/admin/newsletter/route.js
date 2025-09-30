import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Newsletter from "@/models/newsletter";
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

// GET - Fetch all newsletter subscribers (admin only)
export async function GET(req) {
  try {
    // Verify admin authentication
    await verifyAdmin(req);
    
    await connectDB();
    
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || "";
    const active = searchParams.get("active");

    let query = {};

    // Filter by active status
    if (active !== null && active !== undefined && active !== "") {
      query.isActive = active === "true";
    }

    // Search functionality
    if (search) {
      query.email = { $regex: search, $options: "i" };
    }

    const skip = (page - 1) * limit;
    
    const subscribers = await Newsletter.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalSubscribers = await Newsletter.countDocuments(query);
    const totalPages = Math.ceil(totalSubscribers / limit);

    // Get stats
    const totalActive = await Newsletter.countDocuments({ isActive: true });
    const totalInactive = await Newsletter.countDocuments({ isActive: false });

    return NextResponse.json({
      success: true,
      data: subscribers,
      stats: {
        totalActive,
        totalInactive,
        total: totalActive + totalInactive
      },
      pagination: {
        currentPage: page,
        totalPages,
        totalSubscribers,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });

  } catch (error) {
    if (error.message === "No token provided" || error.name === "JsonWebTokenError") {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
    
    console.error("❌ Get newsletter subscribers error:", error.message);
    return NextResponse.json(
      { success: false, message: "Failed to fetch newsletter subscribers" },
      { status: 500 }
    );
  }
}

// DELETE - Delete newsletter subscriber (admin only)
export async function DELETE(req) {
  try {
    // Verify admin authentication
    await verifyAdmin(req);
    
    await connectDB();
    
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Subscriber ID is required" },
        { status: 400 }
      );
    }

    // Check if subscriber exists
    const subscriber = await Newsletter.findById(id);
    if (!subscriber) {
      return NextResponse.json(
        { success: false, message: "Subscriber not found" },
        { status: 404 }
      );
    }

    // Delete subscriber
    await Newsletter.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Subscriber deleted successfully"
    });

  } catch (error) {
    if (error.message === "No token provided" || error.name === "JsonWebTokenError") {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
    
    console.error("❌ Delete newsletter subscriber error:", error.message);
    return NextResponse.json(
      { success: false, message: "Failed to delete subscriber" },
      { status: 500 }
    );
  }
}