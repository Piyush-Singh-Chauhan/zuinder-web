// scripts/test-email.js
require('dotenv').config({ path: '.env.local' });
const nodemailer = require('nodemailer');

async function testEmail() {
  console.log('🧪 Testing Email Configuration...\n');
  
  // Check environment variables
  console.log('📧 SMTP Configuration:');
  console.log('SMTP_USER:', process.env.SMTP_USER || 'NOT SET');
  console.log('SMTP_PASS:', process.env.SMTP_PASS ? '****** (SET)' : 'NOT SET');
  
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log('\n❌ SMTP credentials not configured!');
    console.log('Please set SMTP_USER and SMTP_PASS in your .env.local file');
    return;
  }
  
  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      debug: true,
      logger: true
    });
    
    console.log('\n🔄 Verifying SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection verified successfully!');
    
    // Send test email
    console.log('\n📤 Sending test email...');
    const testEmail = process.env.SMTP_USER; // Send to yourself for testing
    
    const result = await transporter.sendMail({
      from: `"Zuinder Test" <${process.env.SMTP_USER}>`,
      to: testEmail,
      subject: 'Test Email from Zuinder Newsletter System',
      text: 'This is a test email to verify the newsletter system is working correctly.',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #F15A29;">🧪 Test Email Successful!</h2>
          <p>Hello,</p>
          <p>This is a test email to verify that your Zuinder newsletter system is working correctly.</p>
          <p>If you received this email, your SMTP configuration is working properly!</p>
          <br>
          <p>Best regards,</p>
          <p><strong>Zuinder Team</strong></p>
          <hr>
          <p style="color: #999; font-size: 12px;">This is an automated test email.</p>
        </div>
      `,
    });
    
    console.log('✅ Test email sent successfully!');
    console.log('📬 Message ID:', result.messageId);
    console.log('\n🎉 Email system is working correctly!');
    console.log('Check your inbox for the test email.');
    
  } catch (error) {
    console.error('\n❌ Email test failed:');
    console.error('Error:', error.message);
    console.error('Code:', error.code);
    
    if (error.code === 'EAUTH') {
      console.log('\n💡 Solution:');
      console.log('1. Enable 2-Factor Authentication on your Google account');
      console.log('2. Generate an App Password: https://myaccount.google.com/apppasswords');
      console.log('3. Use the App Password (16 characters) instead of your regular password');
      console.log('4. Update SMTP_PASS in your .env.local file with the App Password');
    }
  }
}

testEmail();