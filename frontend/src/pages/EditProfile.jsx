import React, { useContext, useEffect, useState } from 'react'


import { MdAddPhotoAlternate } from "react-icons/md";
import { Link, useParams } from 'react-router-dom';
import { BlogContext } from '../context/BlogContext';
import axios from 'axios';
import { toast } from 'react-toastify';

import loading from '../assets/loading.gif'


const EditProfile = () => {

  const {backend_url,token,navigate,userData} = useContext(BlogContext)
  
  const [name,setName] = useState(userData.name || "")
  const [email,setEmail] = useState(userData.email || "")
  const [password,setPassword] = useState("")
  const [new_password,setNewPassword] = useState("")
  const [new_password_1,setNewPassword_1] = useState("")
  const [thumbnail,setThumbnail] =useState(userData.thumbnail)
  const [image,setImage] =useState(userData.thumbnail || loading)

  

useEffect(() => {

  if(userData){

    setName(userData.name)
    setEmail(userData.email)

    setThumbnail(userData.thumbnail)}

    setImage(userData.thumbnail)

},[userData])


// ************************ code to display selected image ***************************

const handleImageChange = (e) => {

  const file = e.target.files[0];

  if (file) {

    setThumbnail(file)
      const reader = new FileReader();

      reader.onload = (e) => {

          setImage(e.target.result);
      };

      reader.readAsDataURL(file);

  } else {

      setImage(userData.thumbnail || false); 
  }
};

console.log(thumbnail);

// *************************** code to send edited data ***********************************
  

  const submitHandler = async (e) => {

    e.preventDefault()

    try {

      const formData = new FormData()

      formData.append('name',name !== userData.name ? name : userData.name)
      formData.append('email',email !== userData.email ? email : userData.email )
      formData.append ('password',password)
      formData.append('new_password',new_password)
      formData.append('new_password_1',new_password_1)
      formData.append('thumbnail',thumbnail !== userData.thumbnail ? thumbnail : userData.thumbnail)

      const response = await axios.post(backend_url + '/api/user/edit-profile',formData,{headers:{token}})

      if(response.data.success){

        console.log("hi");
        
        toast.success("Updated Successfully!")

        navigate(`/profile/${userData._id}`)
        
      }
      
    } catch (error) {

      console.log(error);

      toast.error(error.message)    
      
    }

  }

  
  return (

    <form onSubmit={(e) => submitHandler(e)} className='m-auto flex flex-col items-center gap-4 w-[90%] sm:w-[60%]'>
      
      <label htmlFor="profile_pic">

        <div>
    
            <div className='flex items-end'> 

                  <img className='w-35' src={ image  } alt="" />

                  <MdAddPhotoAlternate className='text-5xl text-gray-500 ' />
            </div>
            
        </div>

        <input onChange={(e) =>handleImageChange(e)}  type="file" id='profile_pic' hidden />


      </label>

      <h1 className='text-xl font-bold mt-5'>{userData.name}</h1>

      <input onChange={(e) => setName(e.target.value)} className='w-full p-3 rounded outline-none focus:outline-orange-600 focus:outline-[1px] focus:outline-offset-0 text-sm md:text-lg ' type="name"   value={name || ""}  placeholder = "Full Name"/>
      <input onChange={(e) => setEmail(e.target.value)} className='w-full p-3 rounded outline-none focus:outline-orange-600 focus:outline-[1px] focus:outline-offset-0 text-sm md:text-lg ' type="email" value={email || ""}  placeholder='Email'/>
      <input onChange={(e) => setPassword(e.target.value)} className='w-full p-3 rounded outline-none focus:outline-orange-600 focus:outline-[1px] focus:outline-offset-0 text-sm md:text-lg ' type="Password" value={password} placeholder='Current password'/>
      <input onChange={(e) => setNewPassword(e.target.value)} className='w-full p-3 rounded outline-none focus:outline-orange-600 focus:outline-[1px] focus:outline-offset-0 text-sm md:text-lg ' type="Password" value={new_password}  placeholder='New password'/>
      <input onChange={(e) => setNewPassword_1(e.target.value)} className='w-full p-3 rounded outline-none focus:outline-orange-600 focus:outline-[1px] focus:outline-offset-0 text-sm md:text-lg ' type="Password" value={new_password_1}  placeholder='Confirm password'/>

      <button className='p-4 text-sm bg-blue-700 text-white' type='submit'>Update</button>
      
    </form>
  )
}

export default EditProfile