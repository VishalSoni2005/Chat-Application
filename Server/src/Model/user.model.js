import mongoose from "mongoose";

const avatars = [
  "https://api.dicebear.com/7.x/adventurer/png?seed=Sunshine",
  "https://api.dicebear.com/7.x/micah/png?seed=BraveHero",
  "https://api.dicebear.com/7.x/lorelei/png?seed=SkyDreamer",
  "https://api.dicebear.com/7.x/big-smile/png?seed=HappySoul",
  "https://api.dicebear.com/7.x/avataaars/png?seed=CoolVibes",
  "https://api.dicebear.com/7.x/bottts/png?seed=TechieMind",
  "https://api.dicebear.com/7.x/thumbs/png?seed=ChillPerson"
];
const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    profilePic: {
      type: String,
      default: () => {
        return avatars[Math.floor(Math.random() * avatars.length)];
      }
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
