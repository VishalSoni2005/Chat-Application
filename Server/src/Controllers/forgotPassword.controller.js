import bcrypt from 'bcryptjs';
import sendOtpEmail from "../Lib/otp.js";
import User from '../Model/user.model.js';

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

export const resetPassword = async(req, res) => {
  try {

    const { email, password } = req.body;

    // console.log(email, password);
    

    const existingUser = await User.findOne({ email });
    // console.log(existingUser);
    

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // existing user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // updating user
    const updatedUser = await User.findOneAndUpdate(
      {email: email},
      {$set: { password: hashedPassword} },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }



    return res.status(200).json({ 
      success: true,
      message: "Password reset successfully"
     });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", note: "Error in forgotPassword Controller" });
  }
};
