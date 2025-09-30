import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/blog";
import Portfolio from "@/models/portfolio";
import Contact from "@/models/contact";
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

// GET - Dashboard stats (admin only)
export async function GET(req) {
  try {
    // Verify admin authentication
    await verifyAdmin(req);
    
    await connectDB();

    // Get counts
    const [
      totalBlogs,
      publishedBlogs,
      totalPortfolios,
      activePortfolios,
      totalContacts,
      totalSubscribers,
      activeSubscribers
    ] = await Promise.all([
      Blog.countDocuments().lean(),
      Blog.countDocuments({ isPublished: true }).lean(),
      Portfolio.countDocuments().lean(),
      Portfolio.countDocuments({ isActive: true }).lean(),
      Contact.countDocuments().lean(),
      Newsletter.countDocuments().lean(),
      Newsletter.countDocuments({ isActive: true }).lean()
    ]);

    // Get recent items
    const [recentBlogs, recentPortfolios, recentContacts, recentSubscribers] = await Promise.all([
      Blog.find().sort({ createdAt: -1 }).limit(5).select("title createdAt isPublished").lean(),
      Portfolio.find().sort({ createdAt: -1 }).limit(5).select("title createdAt isActive").lean(),
      Contact.find().sort({ createdAt: -1 }).limit(5).select("name email createdAt").lean(),
      Newsletter.find().sort({ createdAt: -1 }).limit(5).select("email createdAt isActive").lean()
    ]);

    // Get monthly stats for charts (simplified)
    const currentDate = new Date();
    const sixMonthsAgo = new Date(currentDate.getFullYear(), currentDate.getMonth() - 6, 1);

    // Initialize empty arrays for chart data
    let blogStats = [];
    let contactStats = [];
    let subscriberStats = [];

    try {
      const monthlyStats = await Promise.all([
        Blog.aggregate([
          { $match: { createdAt: { $gte: sixMonthsAgo } } },
          { 
            $group: {
              _id: { 
                year: { $year: "$createdAt" },
                month: { $month: "$createdAt" }
              },
              count: { $sum: 1 }
            }
          },
          { $sort: { "_id.year": 1, "_id.month": 1 } }
        ]),
        Contact.aggregate([
          { $match: { createdAt: { $gte: sixMonthsAgo } } },
          {
            $group: {
              _id: {
                year: { $year: "$createdAt" },
                month: { $month: "$createdAt" }
              },
              count: { $sum: 1 }
            }
          },
          { $sort: { "_id.year": 1, "_id.month": 1 } }
        ]),
        Newsletter.aggregate([
          { $match: { createdAt: { $gte: sixMonthsAgo } } },
          {
            $group: {
              _id: {
                year: { $year: "$createdAt" },
                month: { $month: "$createdAt" }
              },
              count: { $sum: 1 }
            }
          },
          { $sort: { "_id.year": 1, "_id.month": 1 } }
        ])
      ]);
      
      blogStats = monthlyStats[0] || [];
      contactStats = monthlyStats[1] || [];
      subscriberStats = monthlyStats[2] || [];
    } catch (aggregateError) {
      console.warn('Dashboard chart aggregation failed:', aggregateError.message);
      // Continue with empty arrays if aggregation fails
    }

    return NextResponse.json({
      success: true,
      data: {
        stats: {
          blogs: { total: totalBlogs, published: publishedBlogs },
          portfolios: { total: totalPortfolios, active: activePortfolios },
          contacts: { total: totalContacts },
          subscribers: { total: totalSubscribers, active: activeSubscribers }
        },
        recent: {
          blogs: recentBlogs,
          portfolios: recentPortfolios,
          contacts: recentContacts,
          subscribers: recentSubscribers
        },
        charts: {
          blogs: blogStats,
          contacts: contactStats,
          subscribers: subscriberStats
        }
      }
    });

  } catch (error) {
    if (error.message === "No token provided" || error.name === "JsonWebTokenError") {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
    
    console.error("❌ Get dashboard stats error:", error.message);
    return NextResponse.json(
      { success: false, message: "Failed to fetch dashboard stats" },
      { status: 500 }
    );
  }
}