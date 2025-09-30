import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/blog";
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

// GET - Fetch single blog by ID or slug
export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = params;

    // Determine if the parameter is an ObjectId or a slug
    let blog;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      // It's a valid ObjectId, search by ID
      blog = await Blog.findById(id);
    } else {
      // It's likely a slug, search by slug
      blog = await Blog.findOne({ slug: id, isPublished: true });
    }

    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    // Increment views for public access
    const { searchParams } = new URL(req.url);
    const incrementViews = searchParams.get("view") === "true";
    
    if (incrementViews) {
      if (id.match(/^[0-9a-fA-F]{24}$/)) {
        await Blog.findByIdAndUpdate(id, { $inc: { views: 1 } });
      } else {
        await Blog.findOneAndUpdate({ slug: id }, { $inc: { views: 1 } });
      }
    }

    return NextResponse.json({
      success: true,
      data: blog
    });

  } catch (error) {
    console.error("❌ Get blog error:", error.message);
    return NextResponse.json(
      { success: false, message: "Failed to fetch blog" },
      { status: 500 }
    );
  }
}

// PUT - Update blog (admin only)
export async function PUT(req, { params }) {
  try {
    // Verify admin authentication
    await verifyAdmin(req);
    
    await connectDB();
    const { id } = params;
    const updateData = await req.json();

    // Check if blog exists
    const existingBlog = await Blog.findById(id);
    if (!existingBlog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    // If slug is being updated, check for uniqueness
    if (updateData.slug && updateData.slug !== existingBlog.slug) {
      const slugExists = await Blog.findOne({ 
        slug: updateData.slug.toLowerCase(),
        _id: { $ne: id }
      });
      
      if (slugExists) {
        return NextResponse.json(
          { success: false, message: "Slug already exists" },
          { status: 400 }
        );
      }
      
      updateData.slug = updateData.slug.toLowerCase();
    }

    // Update blog
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    return NextResponse.json({
      success: true,
      message: "Blog updated successfully",
      data: updatedBlog
    });

  } catch (error) {
    if (error.message === "No token provided" || error.name === "JsonWebTokenError") {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
    
    console.error("❌ Update blog error:", error.message);
    return NextResponse.json(
      { success: false, message: "Failed to update blog" },
      { status: 500 }
    );
  }
}

// DELETE - Delete blog (admin only)
export async function DELETE(req, { params }) {
  try {
    // Verify admin authentication
    await verifyAdmin(req);
    
    await connectDB();
    const { id } = params;

    // Check if blog exists
    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    // Delete associated image from Cloudinary if it exists
    if (blog.image && blog.image.includes('cloudinary.com')) {
      try {
        await deleteFromCloudinary(blog.image);
        console.log('Successfully deleted image from Cloudinary:', blog.image);
      } catch (cloudinaryError) {
        console.error('Failed to delete image from Cloudinary:', cloudinaryError);
        // Continue with blog deletion even if image deletion fails
      }
    }

    // Delete blog from database
    await Blog.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Blog deleted successfully"
    });

  } catch (error) {
    if (error.message === "No token provided" || error.name === "JsonWebTokenError") {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
    
    console.error("❌ Delete blog error:", error.message);
    return NextResponse.json(
      { success: false, message: "Failed to delete blog" },
      { status: 500 }
    );
  }
}