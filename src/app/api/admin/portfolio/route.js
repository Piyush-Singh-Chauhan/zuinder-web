import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Portfolio from "@/models/portfolio";
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

// GET - Fetch all portfolio items (public + admin)
export async function GET(req) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const isAdmin = searchParams.get("admin") === "true";

    let query = {};
    
    // If not admin request, only show active portfolio items
    if (!isAdmin) {
      query.isActive = true;
    }

    // Category filter
    if (category) {
      query.$or = [
        { "category.en": { $regex: category, $options: "i" } },
        { "category.pt": { $regex: category, $options: "i" } }
      ];
    }

    // Search functionality
    if (search) {
      const searchQuery = {
        $or: [
          { "title.en": { $regex: search, $options: "i" } },
          { "title.pt": { $regex: search, $options: "i" } },
          { "description.en": { $regex: search, $options: "i" } },
          { "description.pt": { $regex: search, $options: "i" } },
          { technologies: { $in: [new RegExp(search, "i")] } },
          { client: { $regex: search, $options: "i" } }
        ]
      };

      if (query.$or) {
        query = { $and: [{ $or: query.$or }, searchQuery] };
      } else {
        query = { ...query, ...searchQuery };
      }
    }

    const skip = (page - 1) * limit;
    
    const portfolios = await Portfolio.find(query)
      .sort({ order: 1, createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalPortfolios = await Portfolio.countDocuments(query);
    const totalPages = Math.ceil(totalPortfolios / limit);

    return NextResponse.json({
      success: true,
      data: portfolios,
      pagination: {
        currentPage: page,
        totalPages,
        totalPortfolios,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });

  } catch (error) {
    console.error("❌ Get portfolios error:", error.message);
    return NextResponse.json(
      { success: false, message: "Failed to fetch portfolios" },
      { status: 500 }
    );
  }
}

// POST - Create new portfolio (admin only)
export async function POST(req) {
  try {
    // Verify admin authentication
    await verifyAdmin(req);
    
    await connectDB();
    const portfolioData = await req.json();

    // Validate required fields
    const { title, description, category, image, link } = portfolioData;
    
    if (!title?.en || !title?.pt || !description?.en || !description?.pt || 
        !category?.en || !category?.pt || !image || !link) {
      return NextResponse.json(
        { success: false, message: "All required fields must be provided in both languages" },
        { status: 400 }
      );
    }

    // Create portfolio
    const newPortfolio = await Portfolio.create(portfolioData);

    return NextResponse.json({
      success: true,
      message: "Portfolio created successfully",
      data: newPortfolio
    });

  } catch (error) {
    if (error.message === "No token provided" || error.name === "JsonWebTokenError") {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
    
    console.error("❌ Create portfolio error:", error.message);
    return NextResponse.json(
      { success: false, message: "Failed to create portfolio" },
      { status: 500 }
    );
  }
}