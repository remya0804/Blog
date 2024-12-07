import React, { useContext, useEffect, useState } from 'react'

import loading from '../assets/loading.gif'


import { MdAddPhotoAlternate } from "react-icons/md";
import { Link, useParams } from 'react-router-dom';
import { BlogContext } from '../context/BlogContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const UserProfile = () => {

  const {token,backend_url,navigate} = useContext(BlogContext)

  const [userData,setUserData] =useState( [])

  const [userInfo,setUserInfo] = useState(userData || null)

  const {id} = useParams()

  useEffect(() => {

    if(userData){

      setUserInfo(userData)
    }


  },[userData])


 
// ************************* code to  get userinfo

  const getUserInfo = async () => {

    try {

        const response = await axios.post(backend_url + '/api/user/get-user-info',{},{headers:{token}})

        if(response.data.success){

            setUserData(response.data.userInfo)      

        }
 
        
    } catch (error) {

        console.log(error);

        toast.error(error.message)
        
    }


}

const deleteProfile = async (e) => {

  e.preventDefault()

    try {

      const response = await axios.delete(backend_url + '/api/user/delete-profile',{headers:{token}})

      console.log(response);
      

      if(response.data.success){

        toast.success(response.data.message)   

        localStorage.removeItem('token')

        navigate('/')

        window.location.reload()
        

      }
    
  } catch (error) {

    console.log(error);

    toast.error(error.message)
    
  }
}

useEffect(() => {

  if(token){

    getUserInfo()

  }


},[token])



  return (

    <form onSubmit={(e) => submitHandler(e)} className='m-auto flex flex-col items-center gap-3 w-[60%]'>

  
        
        {
          userInfo.thumbnail

          ? <img className='w-35' src={ userInfo.thumbnail} alt="" />

          : <img className='w-10' src={ loading } alt="" />
          
        }

        <div className='mt-4 mb-4 flex flex-col items-center gap-2'>

          <p className=' font-semibold text-[16px] sm:text-lg'>{userInfo.name} </p>

          <p>{userInfo.email}</p>
          
        </div>
 
        <div className='flex items-center gap-4'>

          <Link to='/edit-profile'>

            <button className='py-2 px-5 text-sm bg-blue-700 text-white rounded' type='submit'>Edit</button>

          </Link>

        
          <button onClick={(e) => deleteProfile(e)} className='py-2 px-5 text-sm bg-red-700 text-white rounded'>Delete</button>   


        </div>

        
      
    </form>
  )
}

export default UserProfile