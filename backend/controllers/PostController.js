import { response } from "express";
import postModel from "../models/postModel.js";
import userModel from "../models/userModel.js";
import cloudinary from 'cloudinary'


const createPost = async (req,res) => {

    try {

        const {userId,title,desc,category} = req.body

        const thumbnail = req.file

        let result = await cloudinary.uploader.upload(thumbnail.path,{resource_type:'image'})

        const imageUrl = result.secure_url

        const postData = {

            userId,
            title,
            desc,
            category,
            thumbnail:imageUrl,
            date: Date.now()
        }

        const newPost = new postModel(postData)

        await newPost.save()

        const userData = await userModel.findById(userId)

        let blogs = userData.blogs

        const allPosts = await postModel.find({})

        allPosts.forEach((post) => {

            if(post.userId == userId){

                if(!blogs[post._id]){

                    blogs[post._id] = postData
                }

            }

           
        })

        await userModel.findByIdAndUpdate(userId,{blogs})

        const allusers = await userModel.find({})

        res.json({success: true ,message: "Post added successfully"})
        
    } catch (error) {

        console.log(error);
        res.json({success: false,message: error.message})
        
    }
}

const getAllPosts= async (req,res) => {

    try {

        const {userId} = req.body

        const allPosts = await postModel.find({})
        res.json({success:true, allPosts})
        
    } catch (error) {

        console.log(error);
        res.json({success: false,message: error.message})
        
    }


} 

const updatePost = async (req,res) => {

    try {

        const {userId,title,desc,category,postId} = req.body

        let thumbnail = req.file

        const user = await userModel.findById(userId)


        if(typeof thumbnail === 'object'){

            let result = await cloudinary.uploader.upload(thumbnail.path,{resource_type:'image'})

            const imageUrl = result.secure_url

            await postModel.findByIdAndUpdate(postId,{title,desc,category,thumbnail: imageUrl,date: Date.now()})

            const newPostData = {
                userId,
                title,
                desc,
                category,
                thumbnail: imageUrl,
                date: Date.now()
            }


            user.blogs[postId] = newPostData

            await user.save()


        } else{

            await postModel.findByIdAndUpdate(postId,{title,desc,category,thumbnail: thumbnail,date: Date.now()})

            const newPostData = {
                userId,
                title,
                desc,
                category,
                thumbnail: thumbnail,
                date: Date.now()
            }

            user.blogs[postId] = newPostData

            await user.save()
        }

        res.json({success: true,message: "Post updated!!!!"})

    } catch (error) {
        console.log(error);
        res.json({success: false,message: error.message})
    }
}

const deletePost = async (req,res) => {

    try {

        const {postId,userId} = req.body        

        await postModel.findByIdAndDelete(postId)

        const userInfo = await userModel.findById(userId)

        let userBlogs = userInfo.blogs

        delete userBlogs[postId]

        res.json({success: true,message: "Post deleted successfully"})
        
    } catch (error) {

        console.log(error);
        res.json({success: false,message: error.message})
    }
}

export {createPost,getAllPosts,updatePost,deletePost}

