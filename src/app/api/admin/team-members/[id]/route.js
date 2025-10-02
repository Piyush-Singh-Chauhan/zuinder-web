import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import TeamMember from "@/models/teamMember";
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

// GET - Fetch single team member by ID
export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    const teamMember = await TeamMember.findById(id).lean();
    if (!teamMember) {
      return NextResponse.json(
        { success: false, message: "Team member not found" },
        { status: 404 }
      );
    }

    // Ensure team member has an image field (for backward compatibility)
    const teamMemberWithImage = {
      ...teamMember,
      image: teamMember.image || '' // Add empty image field if missing
    };

    return NextResponse.json({
      success: true,
      data: teamMemberWithImage
    });

  } catch (error) {
    console.error("❌ Get team member error:", error.message);
    return NextResponse.json(
      { success: false, message: "Failed to fetch team member" },
      { status: 500 }
    );
  }
}

// PUT - Update team member (admin only)
export async function PUT(req, { params }) {
  try {
    // Verify admin authentication
    await verifyAdmin(req);
    
    await connectDB();
    const { id } = await params;
    const updateData = await req.json();

    // Check if team member exists
    const existingTeamMember = await TeamMember.findById(id);
    if (!existingTeamMember) {
      return NextResponse.json(
        { success: false, message: "Team member not found" },
        { status: 404 }
      );
    }

    // Remove fields that shouldn't be updated directly
    const { _id, __v, createdAt, updatedAt, ...cleanUpdateData } = updateData;

    // Update team member
    const updatedTeamMember = await TeamMember.findByIdAndUpdate(
      id,
      cleanUpdateData,
      { new: true, runValidators: true }
    );

    return NextResponse.json({
      success: true,
      message: "Team member updated successfully",
      data: updatedTeamMember
    });

  } catch (error) {
    if (error.message === "No token provided" || error.name === "JsonWebTokenError") {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
    
    console.error("❌ Update team member error:", error.message);
    return NextResponse.json(
      { success: false, message: "Failed to update team member" },
      { status: 500 }
    );
  }
}

// DELETE - Delete team member (admin only)
export async function DELETE(req, { params }) {
  try {
    // Verify admin authentication
    await verifyAdmin(req);
    
    await connectDB();
    const { id } = await params;

    // Check if team member exists
    const teamMember = await TeamMember.findById(id);
    if (!teamMember) {
      return NextResponse.json(
        { success: false, message: "Team member not found" },
        { status: 404 }
      );
    }

    // Delete associated image from Cloudinary if it exists
    if (teamMember.image && teamMember.image.includes('cloudinary.com')) {
      try {
        await deleteFromCloudinary(teamMember.image);
        console.log('Successfully deleted image from Cloudinary:', teamMember.image);
      } catch (cloudinaryError) {
        console.error('Failed to delete image from Cloudinary:', cloudinaryError);
        // Continue with team member deletion even if image deletion fails
      }
    }

    // Delete team member from database
    await TeamMember.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Team member deleted successfully"
    });

  } catch (error) {
    if (error.message === "No token provided" || error.name === "JsonWebTokenError") {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
    
    console.error("❌ Delete team member error:", error.message);
    return NextResponse.json(
      { success: false, message: "Failed to delete team member" },
      { status: 500 }
    );
  }
}