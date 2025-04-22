import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protectRoute = async (req, res, next) => {
        
    try{

        const token = req.headers("Authorization").replace("Bearer ","");
        if(!token)return res.status(401).json({message:"No authorization token, access denied"});
           
        //verify token
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        //get user
        const user=await User.findById(decoded.id).select("-password");

        if(!user)return res.status(401).json({message:"Token is not valid"});

        req.user=user;

        next();

    }catch(error){
        console.log("Error in protectRoute middleware",error);
        res.status(500).json({message:"Token is not valid"});
    }

};

export default protectRoute;