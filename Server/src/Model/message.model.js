import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", //? refering the other model
      required: true
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    text: {
      type: String
    },
    image: {
      type: String
    }
  },
  { timestamps: true }
);

// const Message = mongoose.Model("Message", messageSchema);
const Message = mongoose.model("Message", messageSchema);

export default Message;
