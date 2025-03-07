import User from "../Model/user.model.js";

export const getUserForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUser = await User.find({ _id: { $en: loggedInUserId } });

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
        const userId = req.user._id;
        
    } catch (error) {
        
    }
}