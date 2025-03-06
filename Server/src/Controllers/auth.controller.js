export const signup = (req, res) => {
  try{
    const { name, password } = req.body;


  } catch(err){
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const login = (req, res) => {
  res.send("login Page");
};
export const logout = (req, res) => {
  res.send("logout Page");
};