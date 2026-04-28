import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

async function testSmtpConnection() {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false, // TLS
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS.replace(/\s+/g, ''), // Ensure spaces are removed just in case
      },
    });

    await transporter.verify();
    console.log('SUCCESS: Connected to SMTP Server');
    
    // Attempt to send a test email to verify full functionality
    const info = await transporter.sendMail({
      from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
      to: process.env.SMTP_USER, // Send to themselves as a test
      subject: "✅ Portfolio SMTP Test Successful",
      text: "Your Nodemailer configuration is working perfectly!",
      html: "<b>Your Nodemailer configuration is working perfectly!</b>",
    });
    
    console.log('SUCCESS: Test email sent: %s', info.messageId);

  } catch (error) {
    console.error('ERROR:', error.message);
  }
}

testSmtpConnection();
