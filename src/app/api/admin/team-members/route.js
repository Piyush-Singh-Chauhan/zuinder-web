import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import TeamMember from "@/models/teamMember";
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

// GET - Fetch all team members (public + admin)
export async function GET(req) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || "";
    const isAdmin = searchParams.get("admin") === "true";

    let query = {};
    
    // If not admin request, only show active team members
    if (!isAdmin) {
      query.isActive = true;
    }

    // Search functionality
    if (search) {
      query.$or = [
        { "name.en": { $regex: search, $options: "i" } },
        { "name.pt": { $regex: search, $options: "i" } },
        { "role.en": { $regex: search, $options: "i" } },
        { "role.pt": { $regex: search, $options: "i" } }
      ];
    }

    const skip = (page - 1) * limit;
    
    const teamMembers = await TeamMember.find(query)
      .sort({ order: 1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(); // Use lean() for better performance

    // Ensure all team members have an image field (for backward compatibility)
    const teamMembersWithImages = teamMembers.map(member => ({
      ...member,
      image: member.image || '' // Add empty image field if missing
    }));

    const totalTeamMembers = await TeamMember.countDocuments(query);
    const totalPages = Math.ceil(totalTeamMembers / limit);

    return NextResponse.json({
      success: true,
      data: teamMembersWithImages,
      pagination: {
        currentPage: page,
        totalPages,
        totalTeamMembers,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });

  } catch (error) {
    console.error("❌ Get team members error:", error.message);
    return NextResponse.json(
      { success: false, message: "Failed to fetch team members" },
      { status: 500 }
    );
  }
}

// POST - Create new team member (admin only)
export async function POST(req) {
  try {
    // Verify admin authentication
    await verifyAdmin(req);
    
    await connectDB();
    const teamMemberData = await req.json();

    // Validate required fields
    const { name, role, image } = teamMemberData;
    
    if (!name?.en || !name?.pt || !role?.en || !role?.pt || !image) {
      return NextResponse.json(
        { success: false, message: "All required fields must be provided in both languages" },
        { status: 400 }
      );
    }

    // Create team member
    const newTeamMember = await TeamMember.create(teamMemberData);

    return NextResponse.json({
      success: true,
      message: "Team member created successfully",
      data: newTeamMember
    });

  } catch (error) {
    if (error.message === "No token provided" || error.name === "JsonWebTokenError") {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
    
    console.error("❌ Create team member error:", error.message);
    return NextResponse.json(
      { success: false, message: "Failed to create team member" },
      { status: 500 }
    );
  }
}