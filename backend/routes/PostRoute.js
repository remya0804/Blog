import express from 'express'
import authUser from '../middlewares/userAuth.js'
import { createPost, deletePost, getAllPosts, updatePost } from '../controllers/PostController.js'
import upload from '../middlewares/multer.js'



const postRouter = express.Router()

postRouter.post('/create-post',upload.single('thumbnail'),authUser,createPost)
postRouter.post('/edit-post',upload.single('thumbnail'),authUser,updatePost)
postRouter.delete('/delete-post',authUser,deletePost)
postRouter.get('/get-all-posts',getAllPosts)

export default postRouter