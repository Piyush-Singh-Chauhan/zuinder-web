import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Contact from "@/models/contact";

// POST API
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    console.log("Mongo URL:", process.env.MONGODBURL);


    // Save to DB
    const newContact = await Contact.create(body);

    return NextResponse.json({
      success: true,
      message: "✅ Thanks! We’ll get back to you soon.",
      data: newContact,
    });
  } catch (error) {
    console.error("❌ Contact form error:", error.message);
    return NextResponse.json(
      { success: false, message: "❌ Something went wrong." },
      { status: 500 }
    );
  }
}
