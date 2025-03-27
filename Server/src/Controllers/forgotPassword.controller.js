import sendOtpEmail from "../Lib/otp.js";

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 90000);
};

export const sendOTP = async(req, res) => {
  try {
    const { email } = req.body;
    console.log(req.body);

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // const otp = generateOTP();
    const otp = await sendOtpEmail(email);
    console.log("OTP:", otp);
    
    res.status(200).json({ otp: otp });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", note: "Error in forgotPassword Controller" });
    console.error(error);
  }
};
