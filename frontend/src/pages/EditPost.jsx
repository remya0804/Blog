import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { MdAddPhotoAlternate } from "react-icons/md";
import { toast } from 'react-toastify';
import { BlogContext } from '../context/BlogContext';
import { useParams } from 'react-router-dom';

const EditPost = () => {

  const [post,setPost] = useState([])


  const [title,setTitle] = useState("")
  const [desc,setDesc] = useState("")
  const [thumbnail,setThumbnail] = useState("")
  const [category,setCategory] = useState("Uncategorized")
  const [image,setImage] = useState("")
  const [loading,setLoading] = useState(true)

  const categoryArray = ['Agriculture',"Nature",'Food','LifeStyle','Education','Love',"Art","Weather","Animals"]

  const {backend_url,token,navigate,postArray,authors} = useContext(BlogContext)

  const {postId} = useParams()

  useEffect(() => {

    const currentPost = postArray.find(item => item._id === postId)

    if(currentPost){

      setLoading(false)
      setPost(currentPost)
      setTitle(currentPost.title)
      setDesc(currentPost.desc)
      setCategory(currentPost.category)
      setThumbnail(currentPost.thumbnail)
      setImage(currentPost.thumbnail)

    }


  },[postArray,postId])


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

console.log(authors);

    // ******************** code to create post *****************************

    const submitHandler = async (e) => {

      e.preventDefault()

      try {

        const formData = new FormData()

        formData.append("title", post.title != title ? title : post.title)
        formData.append("desc",post.desc != desc ? desc : post.desc)
        formData.append("thumbnail",post.thumbnail != thumbnail ? thumbnail : post.thumbnail)
        formData.append("postId",postId)

        const response = await axios.post(backend_url + '/api/post/edit-post',formData,{headers:{token}})

        console.log(response);
        

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

  
  {
    if(loading){

      return <>Loading...............</>
    }
  }
  return (

    <div className='flex flex-col items-center gap-6 w-full'>

      <h1 className='text-xl font-semibold'>Edit Post</h1>

      <form onSubmit={(e) => submitHandler(e)} className='text-xs sm:text-sm flex flex-col items-center gap-6 w-full sm:w-[70%]'>

        <input className='p-3 w-full' onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder='Title'/>

        <textarea className='h-[200px] p-4 w-full'  value={desc} onChange={(e) => setDesc(e.target.value)} name="" id=""></textarea>

        <select className='p-1 w-full' name="" id="" onChange={(e) => setCategory(e.target.value)} value={category}>

          {

            categoryArray.map((item,idx) => {

              return <option key={idx}>{item} </option>
            })
          }


        </select>

        <label>

            <div className='flex items-end'> 

                  <img className='w-[150px]' src={image} alt="" />

                  <MdAddPhotoAlternate className='text-5xl  text-gray-400 ' />
            </div>
            

          <input className='p-3' onChange={(e) => handleImageChange(e) } type="file" id="thumbnail" hidden />


        </label>

        <button className='px-8 py-2 bg-blue-700 text-white rounded'> Post </button>

        
      </form>
      

    </div>
  )
}

export default EditPost