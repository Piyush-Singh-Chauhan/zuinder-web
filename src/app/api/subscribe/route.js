// src/app/api/subscribe/route.js
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required" }), {
        status: 400,
      });
    }

    // Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // ya Outlook / SMTP provider
      auth: {
        user: process.env.SMTP_USER, // tumhara email
        pass: process.env.SMTP_PASS, // app password
      },
    });

    // Send mail
    await transporter.sendMail({
      from: `"Your Website" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Thanks for Subscribing!",
      text: `Hello, Thanks for subscribing to our newsletter.`,
      html: `<p>Hello,</p><p>Thanks for subscribing to our newsletter 🎉</p>`,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to send email" }), {
      status: 500,
    });
  }
}
