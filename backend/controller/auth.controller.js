import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";
export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: " All data needed" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: " Password must be atleast 6 character" });
    }
    const user = await User.findOne({ email });
    if (user) {
      res.status(400).json({ message: "Already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const newUser = new User({
      fullName,
      email,
      password: hashed,
    });
    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid data" });
    }
  } catch (error) {
    console.log("Signup controller error" + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user =await  User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: " Invalid credentials" });
    }
   
    const isCorrect = await bcrypt.compare(password, user.password);
    if (!isCorrect){
         return res.status(400).json({ message: " Invalid credentials" });
    }
    generateToken(user._id,res);
      return res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic,
      });
   
     
   
  } catch (error) {
    console.log(" error in login" + error);
    res.status(500).json({ message: " server error" });
  }
};
export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", {
        maxAge: 0
    })
    res.status(200).json({message: "logged out"})
  }
  catch(error){
    console.log(error)
    res.status(500).json({message:"internal server error"})
  }
};
export const updateProfile = async (req,res)=>{
    try {
        
        const profilePic = req.body;
        const userId = req.user._id;
        if(!profilePic){
            return res.status(400);
        }
        const uploaded= await cloudinary.uploader.upload(profilePic)
        const updated= await User.findByIdAndUpdate(userId,{ profilePic: uploaded.secure_url}, {new: true})
        res.status(200).json(updated)
    } catch (error) {
        console.log(error);
        res.status(500);
        
    }
}

export const checkAuth = (req,res)=>{
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log("Error in auth")
        res.status(500);
    }

}
