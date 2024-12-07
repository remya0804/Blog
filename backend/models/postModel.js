import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({

    userId: {type:String, required: true},
    title: {type:String, required: true},
    desc: {type:String, required: true},
    thumbnail: {type:String,required:true},
    category: {type:String, required: true},
    date: {type:Number, required: true}

})

const postModel = mongoose.models.post || mongoose.model('post',postSchema)

export default postModel