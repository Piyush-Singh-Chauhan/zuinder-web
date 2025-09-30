import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/blog";
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

// GET - Fetch all blogs (public + admin)
export async function GET(req) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || "";
    const isAdmin = searchParams.get("admin") === "true";

    let query = {};
    
    // If not admin request, only show published blogs
    if (!isAdmin) {
      query.isPublished = true;
    }

    // Search functionality
    if (search) {
      query.$or = [
        { "title.en": { $regex: search, $options: "i" } },
        { "title.pt": { $regex: search, $options: "i" } },
        { "description.en": { $regex: search, $options: "i" } },
        { "description.pt": { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } }
      ];
    }

    const skip = (page - 1) * limit;
    
    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalBlogs = await Blog.countDocuments(query);
    const totalPages = Math.ceil(totalBlogs / limit);

    return NextResponse.json({
      success: true,
      data: blogs,
      pagination: {
        currentPage: page,
        totalPages,
        totalBlogs,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });

  } catch (error) {
    console.error("❌ Get blogs error:", error.message);
    return NextResponse.json(
      { success: false, message: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

// POST - Create new blog (admin only)
export async function POST(req) {
  try {
    // Verify admin authentication
    await verifyAdmin(req);
    
    await connectDB();
    const blogData = await req.json();

    // Validate required fields
    const { title, description, content, slug, image } = blogData;
    
    if (!title?.en || !title?.pt || !description?.en || !description?.pt || 
        !content?.en || !content?.pt || !slug || !image) {
      return NextResponse.json(
        { success: false, message: "All required fields must be provided in both languages" },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existingBlog = await Blog.findOne({ slug: slug.toLowerCase() });
    if (existingBlog) {
      return NextResponse.json(
        { success: false, message: "Slug already exists" },
        { status: 400 }
      );
    }

    // Create blog
    const newBlog = await Blog.create({
      ...blogData,
      slug: slug.toLowerCase()
    });

    return NextResponse.json({
      success: true,
      message: "Blog created successfully",
      data: newBlog
    });

  } catch (error) {
    if (error.message === "No token provided" || error.name === "JsonWebTokenError") {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
    
    console.error("❌ Create blog error:", error.message);
    return NextResponse.json(
      { success: false, message: "Failed to create blog" },
      { status: 500 }
    );
  }
}