import { getRecieverSocketId } from "../Lib/socket.js";
import Message from "../Model/message.model.js";
import User from "../Model/user.model.js";
import { v2 as cloudinary } from "cloudinary";
import { io } from "../Lib/socket.js";

// Utility function to upload files to Cloudinary
async function uploadToCloudinary(file, folder = "VishalSoni", quality) {
  try {
    const options = { folder };
    options.resource_type = "auto"; //todo: important to detect file type
    if (quality) {
      options.quality = quality; //todo: important to compress file size
    }
    return await cloudinary.uploader.upload(file.tempFilePath, options);
  } catch (error) {
    console.error("Error uploading to Cloudinary", error);
  }
}

export const getUserForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUser = await User.find({ _id: { $ne: loggedInUserId } }); // not equal to

    res.status(200).json(filteredUser);
  } catch (error) {
    console.log("Error Happened at getUserForSidebar", error);
    res.status(500).json({
      error: "Internal Error"
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    //? : The $or operator matches documents where at least one of the given conditions is true. IT ACCEPTS AND ARRAY
    const messages = await Message.find({
      $or: [
        { senderId: senderId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: senderId }
      ]
    });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({
      error: "Internal server Error"
    });
    console.log("Error in getMessages", error);
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    console.log("Request Body", req.body);
    
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    const file = req.files?.profilePic;

    let imageUrl;
    if (file) {
      const uploadResponse = await uploadToCloudinary(file);
      console.log("Upload Response", uploadResponse);

      imageUrl = uploadResponse.secure_url;

      console.log("Image URL", imageUrl);
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl
    });

    await newMessage.save();

    const receiverSocketId = getRecieverSocketId(receiverId);

    //* key funcionality to one to one personal chat at real time msg display
    if (receiverId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage", error);
    res.status(500).json({
      error: "Internal server Error"
    });
  }
};
