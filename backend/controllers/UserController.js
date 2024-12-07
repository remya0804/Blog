import userModel from "../models/userModel.js";
import cloudinary from 'cloudinary'
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const createToken = (id) => {

    return jwt.sign({id},process.env.JWT_SECRET)
}


// path : api/user/register-user
const registerUser = async (req,res) => { 

    try {

        const {name,email,password,password_2}  = req.body;

        const thumbnail = req.file

        let result = await cloudinary.uploader.upload(thumbnail.path,{resource_type:'image'})

        const imageUrl = result.secure_url

        const userExists = await userModel.findOne({email})

        if(userExists){

            return res.json({success:false, message: "User Already Exists"})
        }

        if(password !== password_2){

            return res.json({success:false, message: "Passwords doesnt match"})
        }

        if(!validator.isEmail(email)){
    
            return res.json({success: false, message: "Please enter a valid email" }) 
        }

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password,salt);
        const hashedPassword_2 = await bcrypt.hash(password_2,salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
            password_2: hashedPassword_2,
            thumbnail: imageUrl
        })  
        
        const addedUser = await newUser.save();

        const token = createToken(addedUser._id)

        res.json({success: true, token }) 


    } catch (error) {

        console.log(error);
        res.json({success: false,message: error.message})
        
        
    }

   
}


// path : api/user/user-login

const userLogin = async (req,res) => {

    try {

        const {email,password} = req.body;

        const userExists = await userModel.findOne({email})

        if(!userExists){
            
            res.json({success: false,message: "User doesn't Exists"})

        }

        const passwordMatch = await bcrypt.compare(password,userExists.password)

        if(passwordMatch){

            const token = createToken(userExists._id)
            return res.json({success:true, token})

        } else{

            return res.json({success:false, message: "Invalid credentials"})
        }
        


        
    } catch (error) {

        console.log(error);
        res.json({success: false,message: error.message})
        
        
    }

   
}



// path : api/user/get-authors



const getAuthors = async (req,res) => {

    try {

        const allAuthors = await userModel.find({})

        res.json({success: true,allAuthors})
        
    } catch (error) {

        console.log(error);
        res.json({success: false,message: error.message})
        
        
    }

   
}

// path : api/user/edit-profile

const getCurrentUserInfo = async (req,res) => {

    try {

        const {userId} = req.body

        const userInfo = await userModel.findById(userId)

        res.json({success: true,userInfo})
        
    } catch (error) {

        console.log(error);
        res.json({success: false,message: error.message})
        
        
    }

   
}


const editProfile = async (req,res) => {

    try {

        const {userId,name,email,password,new_password,new_password_1} = req.body

        let thumbnail = req.file

        if(!validator.isEmail(email)){
    
            return res.json({success: false, message: "Please enter a valid email" }) 
        }

        const salt = await bcrypt.genSalt(10);

        const hashedOldPassword = await bcrypt.hash(password,salt);

        const userInfo = await userModel.find({userId})

        // if(userInfo.password !== hashedOldPassword){

        //     return res.json({success: false, message: "Wrong password" })
        // }

        if(new_password !== new_password_1){

            return res.json({success: false, message: "Password doesn't match" })
        }

        const hashedNewPassword = await bcrypt.hash(new_password,salt);
        const hashedNewPassword_1 = await bcrypt.hash(new_password_1,salt);

        if(typeof thumbnail === 'object'){

            let result = await cloudinary.uploader.upload(thumbnail.path,{resource_type:'image'})

            const imageUrl = result.secure_url

            await userModel.findByIdAndUpdate(userId,{name,email,password: hashedNewPassword,password_2: hashedNewPassword_1,thumbnail: imageUrl})
        } else{

            await userModel.findByIdAndUpdate(userId,{name,email,password: hashedNewPassword,password_2: hashedNewPassword_1,thumbnail: thumbnail})
        }

        // return res.json({success: true,message: "Profile Updated" })
        return res.json({success: true, message: "Profile Updated" })
        
    } catch (error) {

        console.log(error);
        res.json({success: false,message: error.message})      
        
    }
   
}



const deleteProfile = async (req,res) => {
    try {

        const {userId} = req.body        

        await userModel.findByIdAndDelete(userId)

        res.json({success: true,message: "Profile Deleted Successfully"})
        
    } catch (error) {

        console.log(error);
        res.json({success: false,message: error.message})
        
        
    }

   
}

export  {registerUser,userLogin,deleteProfile,getAuthors,editProfile,getCurrentUserInfo}

