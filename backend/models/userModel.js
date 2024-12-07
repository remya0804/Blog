import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({

    name:{type: String, required: true},
    email: {type:String, required:true, unique: true },
    password: {type: String, required: true},
    password_2:{type: String, required: true},
    blogs: {type: Object, default:{}},
    thumbnail:{type: String}
   
}, {minimize: false})

const userModel = mongoose.models.user || mongoose.model("user",userSchema)

export default userModel