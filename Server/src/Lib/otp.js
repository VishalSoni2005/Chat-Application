import nodemailer from "nodemailer";

// Step one: generate OTP (using a more secure random generator)
const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP

// Step two: create a transporter with proper TypeScript typing
const transporter = nodemailer.createTransport({
  service: "gmail", // Using service name instead of host/port
  auth: {
    user: "vsoni0882@gmail.com",
    pass: "sqylamwdbvpovord" // Consider using environment variables
  }
});

// Step three: Define email options interface
// interface MailOptions {
//   from: string;
//   to: string;
//   subject: string;
//   text: string;
//   html: string;
// }

// Step four: send OTP with proper error handling
export const sendOTP = async () => {
  const mailOptions = {
    from: `YOUR BUDDY vishal <vsoni0882@gmail.com>`,
    to: "vsoni0882@gmail.com",
    subject: "Testing Purpose",
    text: `Your OTP is ${otp}`,
    html: `<h3>Your OTP is: <b>${otp}</b></h3>`
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent:", info);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error sending email:", error.message);
    } else {
      console.error("Unknown error occurred");
    }
  }
};

// // Execute the function
// sendOTP();
