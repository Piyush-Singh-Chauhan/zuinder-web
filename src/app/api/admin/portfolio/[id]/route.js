import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Portfolio from "@/models/portfolio";
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

// GET - Fetch single portfolio by ID or slug
export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = params;

    // Determine if the parameter is an ObjectId or a slug
    let portfolio;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      // It's a valid ObjectId, search by ID
      portfolio = await Portfolio.findById(id);
    } else {
      // It's likely a slug, search by slug
      portfolio = await Portfolio.findOne({ slug: id });
    }

    if (!portfolio) {
      return NextResponse.json(
        { success: false, message: "Portfolio not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: portfolio
    });

  } catch (error) {
    console.error("❌ Get portfolio error:", error.message);
    return NextResponse.json(
      { success: false, message: "Failed to fetch portfolio" },
      { status: 500 }
    );
  }
}

// PUT - Update portfolio (admin only)
export async function PUT(req, { params }) {
  try {
    // Verify admin authentication
    await verifyAdmin(req);
    
    await connectDB();
    const { id } = params;
    const updateData = await req.json();

    // Check if portfolio exists
    const existingPortfolio = await Portfolio.findById(id);
    if (!existingPortfolio) {
      return NextResponse.json(
        { success: false, message: "Portfolio not found" },
        { status: 404 }
      );
    }

    // Update portfolio
    const updatedPortfolio = await Portfolio.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    return NextResponse.json({
      success: true,
      message: "Portfolio updated successfully",
      data: updatedPortfolio
    });

  } catch (error) {
    if (error.message === "No token provided" || error.name === "JsonWebTokenError") {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
    
    console.error("❌ Update portfolio error:", error.message);
    return NextResponse.json(
      { success: false, message: "Failed to update portfolio" },
      { status: 500 }
    );
  }
}

// DELETE - Delete portfolio (admin only)
export async function DELETE(req, { params }) {
  try {
    // Verify admin authentication
    await verifyAdmin(req);
    
    await connectDB();
    const { id } = params;

    // Check if portfolio exists
    const portfolio = await Portfolio.findById(id);
    if (!portfolio) {
      return NextResponse.json(
        { success: false, message: "Portfolio not found" },
        { status: 404 }
      );
    }

    // Delete associated image from Cloudinary if it exists
    if (portfolio.image && portfolio.image.includes('cloudinary.com')) {
      try {
        await deleteFromCloudinary(portfolio.image);
        console.log('Successfully deleted image from Cloudinary:', portfolio.image);
      } catch (cloudinaryError) {
        console.error('Failed to delete image from Cloudinary:', cloudinaryError);
        // Continue with portfolio deletion even if image deletion fails
      }
    }

    // Delete portfolio from database
    await Portfolio.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Portfolio deleted successfully"
    });

  } catch (error) {
    if (error.message === "No token provided" || error.name === "JsonWebTokenError") {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
    
    console.error("❌ Delete portfolio error:", error.message);
    return NextResponse.json(
      { success: false, message: "Failed to delete portfolio" },
      { status: 500 }
    );
  }
}