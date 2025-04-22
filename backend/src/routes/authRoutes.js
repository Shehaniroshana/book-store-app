import express from "express";
import User from "../models/User.js";
const router = express.Router();
import jwt from "jsonwebtoken"

const generateToken=(id)=>{
   return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"15d"});
}


router.post("/login", async (req, res) => {
   
    try{

        const {email,password}=req.body;

        if(!email || !password){
            return res.status(400).send({message:"All fields are required"})  
        }

        //check if user exists
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).send({message:"User does not exist"})  
        }

        //check if password is correct
        const isPasswordCorrect=await user.comparePassword(password);
        if(!isPasswordCorrect){
            return res.status(400).send({message:"Password is incorrect"})  
        }

        const token=generateToken(user._id);
        res.status(200).send({user:{
         _id:user._id,
         username:user.username,
         email:user.email,
         profileImage:user.profileImage
        },token});

    }catch(error){
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
    }
    
   
})

router.post("/register", async (req, res) => {
    try{

        const {email,username,password}=req.body
        if(!email || !username || !password){
            return res.status(400).send("All fields are required")
        }

        if(password.length<6){
            return res.status(400).send("Password must be at least 6 characters")   
        }

        if(username.length<3){
            return res.status(400).send("Username must be at least 3 characters")
        }

        //check if user already exists
            const existingEmail=await User.findOne({email});
            if(existingEmail){
                return res.status(400).send("User already exists")    
            }

            const existingUsername=await User.findOne({username});
            if(existingUsername){
                return res.status(400).send("User already exists")    
            }
           
            //generate profile image
           const profileImage=`https://api.dicebear.com/6.x/initials/svg?seed=${username}`;

           const user= new User({
             email,
             username,
             password,
             profileImage,
           })

           
           await user.save();
            
           const token=generateToken(user._id);
           res.status(201).send({user:{
            _id:user._id,
            username:user.username,
            email:user.email,
            profileImage:user.profileImage
           },token});
      
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
    }
})

export default router
