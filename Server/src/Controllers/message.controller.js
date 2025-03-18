import Message from "../Model/message.model.js";
import User from "../Model/user.model.js";
import { v2 as cloudinary } from "cloudinary";

// Utility function to upload files to Cloudinary
async function uploadToCloudinary(file, folder = "VishalSoni", quality) {
  const options = { folder };
  options.resource_type = "auto";                                   //todo: important to detect file type
  if (quality) {
    options.quality = quality;                                      //todo: important to compress file size
  }
  return await cloudinary.uploader.upload(file.tempFilePath, options);
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
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      const uploadResponse = await uploadToCloudinary(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl
    });

    await newMessage.save();

    //TODO: add real time function using socketio API

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage", error);
    res.status(500).json({
      error: "Internal server Error"
    });
  }
};
