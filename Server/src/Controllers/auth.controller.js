import { generateToken } from "../Lib/utils.js";
import User from "../Model/user.model.js";

import bcrypt from "bcryptjs";
export const signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    // validate inputs
    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hashing passsword
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user

    const newUser = new User({ email: email, password: hashedPassword, fullname: fullname });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
    }

    res.status(201).json({
      fullname: newUser.fullname,
      email: newUser.email,
      _id: newUser._id,
      profilePic: newUser.profilePic
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate inputs
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // password match
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    generateToken(existingUser._id, res);
    res.status(200).json({
      _id: existingUser._id,
      fullname: existingUser.fullname,
      email: existingUser.email,
      profilePic: existingUser.profilePic
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 }); //! note how to delete cookies
    res.status(200).json({ message: "Logged Out" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProfilePicture = async(req, res) => {}
