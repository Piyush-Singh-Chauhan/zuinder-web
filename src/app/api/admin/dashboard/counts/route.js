import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Service from "@/models/service";
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

// GET - Additional dashboard counts (admin only)
export async function GET(req) {
  try {
    // Verify admin authentication
    await verifyAdmin(req);
    
    await connectDB();

    // Get service and team member counts
    const [totalServices, totalTeamMembers] = await Promise.all([
      Service.countDocuments().lean(),
      TeamMember.countDocuments().lean()
    ]);

    return NextResponse.json({
      success: true,
      data: {
        services: { total: totalServices },
        teamMembers: { total: totalTeamMembers }
      }
    });

  } catch (error) {
    if (error.message === "No token provided" || error.name === "JsonWebTokenError") {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
    
    console.error("❌ Get dashboard counts error:", error.message);
    return NextResponse.json(
      { success: false, message: "Failed to fetch dashboard counts" },
      { status: 500 }
    );
  }
}