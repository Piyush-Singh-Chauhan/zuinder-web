// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/mongodb";
// import Newsletter from "@/models/newsletter";
// import nodemailer from "nodemailer";

// export async function POST(req) {
//   try {
//     await connectDB();
//     const { email } = await req.json();

//     if (!email) {
//       return NextResponse.json(
//         { error: "Email is required" },                                                                                     
//         { status: 400 }
//       );
//     }

//     // Get client info
//     const forwarded = req.headers.get("x-forwarded-for");
//     const ip = forwarded ? forwarded.split(/, /)[0] : req.headers.get("x-real-ip") || "unknown";
//     const userAgent = req.headers.get("user-agent") || "unknown";

//     // Check if email already exists
//     const existingSubscriber = await Newsletter.findOne({ email: email.toLowerCase() });
//     if (existingSubscriber) {
//       if (existingSubscriber.isActive) {
//         return NextResponse.json(
//           { error: "You are already subscribed to our newsletter" },
//           { status: 400 }
//         );
//       } else {
//         // Reactivate existing subscriber
//         await Newsletter.findByIdAndUpdate(existingSubscriber._id, {
//           isActive: true,
//           ipAddress: ip,
//           userAgent: userAgent
//         });
//       }
//     } else {
//       // Create new subscriber
//       await Newsletter.create({
//         email: email.toLowerCase(),
//         ipAddress: ip,
//         userAgent: userAgent
//       });
//     }

//     // Send welcome email if SMTP is configured
//     if (process.env.SMTP_USER && process.env.SMTP_PASS) {
//       try {
//         const transporter = nodemailer.createTransporter({
//           service: "gmail",
//           auth: {
//             user: process.env.SMTP_USER,
//             pass: process.env.SMTP_PASS,
//           },
//         });

//         await transporter.sendMail({
//           from: `"Zuinder" <${process.env.SMTP_USER}>`,
//           to: email,
//           subject: "Thanks for Subscribing to Zuinder Newsletter!",
//           text: `Hello, Thanks for subscribing to our newsletter. Stay tuned for updates!`,
//           html: `
//             <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//               <h2 style="color: #F15A29;">Welcome to Zuinder Newsletter! 🎉</h2>
//               <p>Hello,</p>
//               <p>Thanks for subscribing to our newsletter. We're excited to share our latest updates, insights, and innovations with you.</p>
//               <p>Stay tuned for amazing content!</p>
//               <br>
//               <p>Best regards,</p>
//               <p><strong>Zuinder Team</strong></p>
//             </div>
//           `,
//         });
//       } catch (emailError) {
//         console.warn("⚠️ Email sending failed but subscription saved:", emailError.message);
//       }
//     }

//     return NextResponse.json({ success: true }, { status: 200 });
//   } catch (error) {
//     console.error("❌ Newsletter subscription error:", error.message);
//     return NextResponse.json(
//       { error: "Failed to process subscription" },
//       { status: 500 }
//     );
//   }
// }


import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Newsletter from "@/models/newsletter";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    await connectDB();
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Get client info (IP + User Agent)
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded
      ? forwarded.split(/, /)[0]
      : req.headers.get("x-real-ip") || "unknown";
    const userAgent = req.headers.get("user-agent") || "unknown";

    // Check if email already exists in DB
    const existingSubscriber = await Newsletter.findOne({ email: email.toLowerCase() });
    if (existingSubscriber) {
      if (existingSubscriber.isActive) {
        return NextResponse.json(
          { error: "You are already subscribed to our newsletter" },
          { status: 400 }
        );
      } else {
        // Reactivate existing subscriber
        await Newsletter.findByIdAndUpdate(existingSubscriber._id, {
          isActive: true,
          ipAddress: ip,
          userAgent: userAgent,
        });
      }
    } else {
      // Create new subscriber
      await Newsletter.create({
        email: email.toLowerCase(),
        ipAddress: ip,
        userAgent: userAgent,
      });
    }

    // Send welcome email if SMTP is configured
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        // ✅ fixed createTransporter → createTransport
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        console.log("📧 Attempting to send email to:", email);

        await transporter.sendMail({
          from: `"Zuinder" <${process.env.SMTP_USER}>`,
          to: email,
          subject: "Thanks for Subscribing to Zuinder Newsletter!",
          text: `Hello, Thanks for subscribing to our newsletter. Stay tuned for updates!`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #F15A29;">Welcome to Zuinder Newsletter! 🎉</h2>
              <p>Hello,</p>
              <p>Thanks for subscribing to our newsletter. We're excited to share our latest updates, insights, and innovations with you.</p>
              <p>Stay tuned for amazing content!</p>
              <br>
              <p>Best regards,</p>
              <p><strong>Zuinder Team</strong></p>
            </div>
          `,
        });

        console.log("✅ Email sent successfully!");
      } catch (emailError) {
        console.warn("⚠️ Email sending failed but subscription saved:", emailError);
      }
    } else {
      console.warn("⚠️ SMTP not configured. Skipping welcome email.");
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("❌ Newsletter subscription error:", error.message);
    return NextResponse.json(
      { error: "Failed to process subscription" },
      { status: 500 }
    );
  }
}