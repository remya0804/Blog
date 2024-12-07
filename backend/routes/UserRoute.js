import express from 'express'
import {registerUser,userLogin,getAuthors,editProfile,getCurrentUserInfo, deleteProfile} from '../controllers/UserController.js'
import authUser from '../middlewares/userAuth.js'
import upload from '../middlewares/multer.js'

const userRouter = express.Router()

userRouter.post('/register-user',upload.single('thumbnail'),registerUser)
userRouter.post('/user-login',userLogin)
userRouter.get('/get-authors',getAuthors)
userRouter.post('/edit-profile',upload.single('thumbnail'),authUser,editProfile)
userRouter.post('/get-user-info',authUser,getCurrentUserInfo)
userRouter.delete('/delete-profile',authUser,deleteProfile)

export default userRouter