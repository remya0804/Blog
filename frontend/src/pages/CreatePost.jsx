import axios from 'axios';
import React, { useContext, useRef, useState } from 'react'
import { BiImageAdd } from "react-icons/bi";
import { toast } from 'react-toastify';
import { BlogContext } from '../context/BlogContext';

const CreatePost = () => {

  const [title,setTitle] = useState("")
  const [desc,setDesc] = useState("")
  const [thumbnail,setThumbnail] = useState("")
  const [category,setCategory] = useState("Uncategorized")
  const [image,setImage] = useState("")

  const categoryArray = ['Agriculture',"Nature",'Food','LifeStyle','Education','Love',"Art","Weather","Animals"]

  const {backend_url,token,navigate} = useContext(BlogContext)


  // ******************** code to change image thumbtnail *****************************

  const handleImageChange = (e) => {

    const file = e.target.files[0];
  
    if (file) {
  
      setThumbnail(file)

        const reader = new FileReader();
  
        reader.onload = (e) => {
  
            setImage(e.target.result);
        };
  
        reader.readAsDataURL(file);
  
    } 
    
  }


    // ******************** code to create post *****************************

    const submitHandler = async (e) => {

      e.preventDefault()

      try {

        const formData = new FormData()

        formData.append("title",title)
        formData.append("desc",desc)
        formData.append("thumbnail",thumbnail)
        formData.append("category",category)

        const response = await axios.post(backend_url + '/api/post/create-post',formData,{headers:{token}})

        if(response.data.success){

          toast.success(response.data.message)

          setTitle("")
          setDesc("")
          setCategory("")
          setThumbnail("")
          setImage("")

          navigate('/')

          window.location.reload()
        }
        
        
      } catch (error) {

        console.log(error);

        toast.error(error.message)  
        
      }
    }

  
  return (

    <div className='flex flex-col items-center gap-6 w-full '>

      <h1>Create Post</h1>

      <form onSubmit={(e) => submitHandler(e)} className='w-[90%] md:w-[80%] flex flex-col items-center gap-6  text-sm text-gray-700 '>

        <input className='w-full p-3 outline-[0.1px] bg-transparent  outline-gray-400 rounded outline-none focus:outline-orange-400' onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder='Title'/>

        <textarea className='w-full h-60 p-3 outline-[0.1px] bg-transparent  outline-gray-400 rounded outline-none focus:outline-orange-400'  value={desc} onChange={(e) => setDesc(e.target.value)} name="" id="" placeholder='Enter description here...'></textarea>

        <select className='w-full p-1 outline-[0.1px] bg-transparent  outline-gray-400 rounded outline-none focus:outline-orange-400 ' name="" id="" onChange={(e) => setCategory(e.target.value)} value={category}>

          {

            categoryArray.map((item,idx) => {

              return <option key={idx}>{item} </option>
            })
          }


        </select>

        <label >

          {

            image 

            ?  <div className=' mt-10 flex flex-col md:flex-row items-center md:items-end md:justify-center'> 

                  <img className='w-[250px]' src={image} alt="" />

                  <BiImageAdd className={`text-gray-400 text-[50px]`}/>

              </div>

              :  <BiImageAdd className={` text-gray-400 text-[100px]`}/>
          }

            
            

          <input className='p-3' onChange={(e) => handleImageChange(e) } type="file" id="thumbnail" hidden />


        </label>

        <button className='p-3 bg-blue-700 w-[40%] rounded-md text-white'> Post </button>

        
      </form>
      

    </div>
  )
}

export default CreatePost