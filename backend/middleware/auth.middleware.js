import jwt  from "jsonwebtoken";
import User from "../models/user.model.js";

export const validateToken = async (req,res,next)=>{
    try {
        const token = req.cookies.jwt;
        if(!token){
          return  res.status(501).json({message:"invalid token"})
        }
        const decoded = jwt.decode(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select("-password");
        if(!user){
            return res.status(404).send()
        }
        req.user=user;
        next()

        
    } catch (error) {
        console.log("middleware error" + error.message)
        res.status(500).send()
    }
}