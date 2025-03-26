import nodemailer from "nodemailer";
import dotenv from "dotenv";
import otpGenerator from "otp-generator";

dotenv.config();

const generateOTP = () => {
  return otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false
  });
};

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT), 
  secure: process.env.MAIL_PORT === "465", 
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

async function sendOTP() {
  const otp = generateOTP(); 
  console.log("Generated OTP:", otp);


  
console.log("MAIL_HOST:", process.env.MAIL_HOST);
console.log("MAIL_USER:", process.env.MAIL_USER);
console.log("MAIL_PASS:", process.env.MAIL_PASS);
console.log("MAIL_PORT:", process.env.MAIL_PORT);

  try {
    const info = await transporter.sendMail({
      from: `"Your App" <${process.env.MAIL_USER}>`, 
      to: "nellusoni03175@gmail.com",
      subject: "Your OTP Code",
      text: `Your OTP is: ${otp}`, // Plain text email
      html: `<h3>Your OTP is: <b>${otp}</b></h3>` // HTML formatted email
    });

    console.log("Message sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

sendOTP().catch(console.error);

