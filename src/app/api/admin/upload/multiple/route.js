import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from 'cloudinary';

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

// Middleware to verify admin token
async function verifyAdmin(req) {
  const token = req.cookies.get("admin_token")?.value;
  if (!token) {
    throw new Error("No token provided");
  }
  
  const decoded = jwt.verify(token, JWT_SECRET);
  return decoded;
}

// Upload single image to Cloudinary
async function uploadToCloudinary(buffer, filename) {
  return new Promise((resolve, reject) => {
    // Use simpler upload options to avoid signature issues
    const uploadOptions = {
      resource_type: "image",
      folder: "zuinder-blog-portfolio",
      public_id: filename,
      overwrite: true,
      // Apply transformations as eager transformations to avoid signature issues
      eager: [
        { width: 1200, height: 800, crop: "limit", quality: "auto", fetch_format: "auto" }
      ],
      eager_async: false
    };

    cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          console.error('Upload options:', uploadOptions);
          reject(error);
        } else {
          console.log('Cloudinary upload success:', result.public_id);
          resolve(result);
        }
      }
    ).end(buffer);
  });
}

export async function POST(req) {
  try {
    // Verify admin authentication
    await verifyAdmin(req);

    const formData = await req.formData();
    const files = formData.getAll("files"); // Get all files

    if (!files || files.length === 0) {
      return NextResponse.json(
        { success: false, message: "No files uploaded" },
        { status: 400 }
      );
    }

    // Validate number of files (max 5 at once)
    if (files.length > 5) {
      return NextResponse.json(
        { success: false, message: "Maximum 5 files allowed at once" },
        { status: 400 }
      );
    }

    // Check if Cloudinary is configured
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      return NextResponse.json(
        { success: false, message: "Cloudinary configuration is missing" },
        { status: 500 }
      );
    }

    const uploadResults = [];
    const uploadErrors = [];

    // Process each file
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      try {
        // Validate file type
        const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
        if (!allowedTypes.includes(file.type)) {
          uploadErrors.push({
            index: i,
            filename: file.name,
            error: "Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed."
          });
          continue;
        }

        // Validate file size (10MB limit)
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSize) {
          uploadErrors.push({
            index: i,
            filename: file.name,
            error: "File size exceeds 10MB limit."
          });
          continue;
        }

        // Convert file to buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create unique filename
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(2, 15);
        const filename = `${timestamp}_${i}_${randomString}`;

        // Upload to Cloudinary
        const cloudinaryResult = await uploadToCloudinary(buffer, filename);

        uploadResults.push({
          index: i,
          originalName: file.name,
          url: cloudinaryResult.secure_url,
          publicId: cloudinaryResult.public_id,
          width: cloudinaryResult.width,
          height: cloudinaryResult.height,
          format: cloudinaryResult.format,
          bytes: cloudinaryResult.bytes
        });

      } catch (error) {
        uploadErrors.push({
          index: i,
          filename: file.name,
          error: error.message
        });
      }
    }

    // Return results
    return NextResponse.json({
      success: uploadResults.length > 0,
      message: `${uploadResults.length} files uploaded successfully, ${uploadErrors.length} failed`,
      uploaded: uploadResults,
      errors: uploadErrors,
      total: files.length
    });

  } catch (error) {
    if (error.message === "No token provided" || error.name === "JsonWebTokenError") {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
    
    console.error("❌ Multiple upload error:", error.message);
    return NextResponse.json(
      { success: false, message: `Failed to upload files: ${error.message}` },
      { status: 500 }
    );
  }
}