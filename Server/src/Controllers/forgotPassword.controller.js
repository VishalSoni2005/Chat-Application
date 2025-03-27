import { send_otp_via_nodemailer } from "../Lib/otp.js";

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 90000);
};

export const sendOTP = (req, res) => {
  try {
    const { email } = req.body;
    console.log(req.body);
    

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    send_otp_via_nodemailer(email);

    const otp = generateOTP();
    res.status(200).json({ otp: otp });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", note: "Error in forgotPassword Controller" });
    console.error(error);
  }
};
