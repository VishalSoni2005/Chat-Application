import { v2 as cloudinary } from "cloudinary";

import { config } from "dotenv";

config();

export const cloudinaryConnection = () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    });
    console.log("Cloudinary connected 💥");
  } catch (error) {
    console.error("Error connecting to Cloudinary:", error);
  }
};

