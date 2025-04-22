import express from "express";
import cloudinary from "../lib/cloudinary.js";
import Book from "../models/Book.js";
import protectRoute from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/",protectRoute,async(req,res)=>{
    try{

        const {title,caption,image,rating}=req.body;

        if(!title || !caption || !image || !rating || !user)return res.status(400).json({message:"All fields are required"});
        
        //save to cloudinary
        const uploadImageResponse=await cloudinary.uploader.upload(image);
        const imageUrl=uploadImageResponse.secure_url;

        //save to database
        const book=new Book(
            {
                title,
                caption,
                image:imageUrl,
                rating,
                user: req.user._id
            }
        )
        await book.save();
        res.status(201).json({message:"Book created successfully",book});
        

    }catch(error){
        console.log(error);
        res.status(500).json({message:"Error creating book",error});
    }
})


router.get("/",protectRoute,async(req,res)=>{
    try{
        
        const page=req.query.page || 1;
        const limit=req.query.limit || 5;
        const skip=(page-1)*limit;

        const books=await Book.find().sort({createdAt:-1})//descending
        .skip(skip)
        .limit(limit)
        .populate("user","username profileImage");

        const count=await Book.countDocuments();

        res.send({
            books,
            currentPage:page,
            totalPages:count,
            totalPages:Math.ceil(count/limit)
        });
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Error fetching books"});
    }
})

router.delete("/:id",protectRoute,async(req,res)=>{
    try{
        const book=await Book.findById(req.params._id);
        if(!book)return res.status(404).json({message:"Book not found"});

        if(book.user.toString()!==req.user._id)return res.status(401).json({message:"You are not authorized to delete this book"});

        //delete from cloudinary
        if(book.image && book.image.includes("cloudinary")){
            try{

                const publicId=book.image.split("/").pop().split(".")[0];
                await cloudinary.uploader.destroy(publicId);

            }catch(error){
                console.log(error);
            }
        }

        await book.deleteOne();

        res.status(200).json({message:"Book deleted successfully"});
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Error deleting book"});
    }
})

router.get("/user",protectRoute,async(req,res)=>{
    try{
        const books=await Book.find({user:req.user._id}).sort({createdAt:-1});
        res.json(books);
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Error fetching books"});
    }
})

export default router;