import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import userRouter from './routes/UserRoute.js';
import connectCloudinary from './config/cloudinary.js';
import postRouter from './routes/PostRoute.js';

const app = express()

const port = process.env.PORT || 4000;

app.use(express.json())
app.use(cors())

connectDB()
connectCloudinary()

app.use('/api/user',userRouter)
app.use('/api/post',postRouter)

app.get("/",(req,res) => {

    res.send("API Working")
})



app.listen(port,() => {

    console.log("Server started at: ", port);
    
})


// vkI6yfzbRYvuEVmk
