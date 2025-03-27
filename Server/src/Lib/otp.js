import nodemailer from "nodemailer";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();
// Generate a secure 6-digit OTP
const generateOTP = () => {
  //! debug
  //console.log("Full process.env:", process.env);
  // console.log(process.env.MAIL_PASS);
  //console.log(process.env.MAIL_USER);

  const randomBytes = crypto.randomBytes(4); // 4 bytes
  const randomNumber = parseInt(randomBytes.toString("hex"), 16);
  return 100000 + (randomNumber % 900000); // Ensures 6 digits (100000-999999)
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

const sendOtpEmail = async (recipientEmail) => {
  const otp = generateOTP();

  const mailOptions = {
    from: '"Your Buddy Vishal" <vsoni0882@gmail.com>',
    to: recipientEmail,
    subject: "Your One-Time Password (OTP)",
    text: `Your OTP is: ${otp}\nThis code will expire in 10 minutes.`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Your One-Time Password</h2>
        <p>Here's your OTP for authentication:</p>
        <div style="background: #f3f4f6; padding: 16px; text-align: center; 
                    margin: 16px 0; font-size: 24px; font-weight: bold;">
          ${otp}
        </div>
        <p style="color: #6b7280; font-size: 14px;">
          This code will expire in 10 minutes. Please don't share it with anyone.
        </p>
      </div>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    // console.log("OTP email sent to:", recipientEmail);
    // console.log("Message ID:", info.messageId);
    return otp;
  } catch (error) {
    console.error("Error sending OTP email:", error.message);
    return { success: false, error: error.message };
  }
};

// sendOtpEmail("vsoni0882@gmail.com")

export default sendOtpEmail;
