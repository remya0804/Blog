import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { BlogContext } from '../context/BlogContext'

const Register = () => {

  const [loginState,setLoginState] = useState("Sign Up")

  const {backend_url,setToken,navigate} = useContext(BlogContext)

  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [password_2,setPassword_2] = useState("")
  const [thumbnail,setThumbnail] = useState("")



  //************** code to send default profile image  **************/ 

  const fetchImage = async () => {

        const response = await fetch('/profile.png');
        const blob = await response.blob();

        const file = new File([blob], "thumbnail.jpg", { type: blob.type });

        setThumbnail(file)
  }


  useEffect(() => {

    fetchImage()


  },[])



  //************** code to register user data  **************/ 


  const submitHandler = async (e) => {

    e.preventDefault()

    try {

      if(loginState == "Sign Up"){

      const formData = new FormData()

      formData.append('name',name)
      formData.append('email',email)
      formData.append('password',password)
      formData.append('password_2',password_2)

     formData.append('thumbnail',thumbnail)

        const response = await axios.post(backend_url + '/api/user/register-user',formData)                

        if(response.data.success){

          toast.success("New user created successfully! Welcome aboard!")

          setToken(response.data.token)

          localStorage.setItem('token',response.data.token)

          navigate("/")

        } else{

          toast.error(response.data.message)
        }


      } else{

        const response = await axios.post(backend_url + '/api/user/user-login',{email,password})

        if(response.data.success){

          setToken(response.data.token)

          localStorage.setItem('token',response.data.token)

          navigate("/")

        } else {

          toast.error(response.data.message)
        }
      }
      
    } catch (error) {

      console.log(error);

      toast.error(error.message)

      
    }


  }

  return (

    <div className='text-center w-full '>

      <h1 className='text-2xl mb-6 font-bold'>{loginState === "Sign Up" ? "Sign Up" : "Login" }</h1>
    
      <form onSubmit={(e) => submitHandler(e)} className='m-auto flex flex-col justify-center items-center gap-3 w-full sm:w-[60%] text-xs sm:text-sm'>

        {

          loginState === "Sign Up" 

          ? <input onChange={(e) => setName(e.target.value)} value={name} name="name" className='p-3 w-full rounded outline-none focus:outline-orange-400 focus:outline-[1.5px] focus:outline-offset-0'  type="text" placeholder='Full Name' />

          : ""
        }



        <input onChange={(e) => setEmail(e.target.value)} value={email} name="email" className='p-3 w-full rounded outline-none focus:outline-orange-400 focus:outline-[1.5px] focus:outline-offset-0'  type="email" placeholder='Email' />

        <input onChange={(e) => setPassword(e.target.value)} value={password} name="password"  className='p-3 w-full rounded outline-none focus:outline-orange-400 focus:outline-[1.5px] focus:outline-offset-0'  type="password" placeholder='Password' />

        {

          loginState === "Sign Up" 

          ? <input onChange={(e) => setPassword_2(e.target.value)} value={password_2} name="password_2" className='p-3 w-full rounded outline-none focus:outline-orange-400 focus:outline-[1.5px] focus:outline-offset-0' type="password" placeholder='Confirm Password' />

          : ""
        }

        <button className='bg-blue-700 p-3 w-40 text-white mt-3 rounded' type='submit'>{loginState === "Sign Up" ? "Sign Up" : "Login"}</button>
        

      </form>

      {loginState === "Sign Up" 
            
            ? <p className='mt-3'>Already have an account <span onClick={() => setLoginState("Login")} className='text-blue-700 underline'>Login</span></p> 

            : <p className='mt-3'>Create an account <span onClick={() => setLoginState("Sign Up")}  className='text-blue-700 underline '>Sign Up</span></p> 
          
          }

    </div>
  )
}

export default Register