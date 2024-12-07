import React, { useContext, useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { BlogContext } from '../context/BlogContext';
import auth_1 from '../assets/auth_1.jpeg';
import axios from 'axios';
import { toast } from 'react-toastify';

const PostDetails = () => {
  const [post, setPost] = useState(null);
  const [isUserPost, setIsUserPost] = useState(false);
  const [loading, setLoading] = useState(true);
  const [author,setAuthor] = useState("")

  const { postId } = useParams();
  const { postArray, userData,timeAgo,authors,backend_url,token,navigate,setMenuActive,menuActive } = useContext(BlogContext);

  // console.log(token);
  
  useEffect(() => {
    if (postArray) {
      const currentPost = postArray.find((item) => item._id === postId);
      if (currentPost) {
        setPost(currentPost);
        setLoading(false);
      }
    }
  }, [postArray, postId]);

  useEffect(() => {
    if (post && userData) {
      setIsUserPost(post.userId === userData._id);
      setLoading(false)
    }
  }, [post, userData]);

  // console.log(postId);
  

  useEffect(() => {

    if(authors && post){

      const name = authors.find((auth) => auth._id === post.userId)

      if(name){
        
        setAuthor(name)

        setLoading(false)

      }

     
    }
  },[post,authors])

  const deletePost = async (e) => {

    e.preventDefault()

    try {

      const response = await axios.delete(backend_url + '/api/post/delete-post',{
        
        data: {postId},
        headers:{token},     
      
      })

      if(response.data.success){

        toast.success(response.data.message)

        navigate(`/post-by-author/${post.userId}`)

        setMenuActive("my-posts")

        window.location.reload()
        
      }
      
      
    } catch (error) {

      console.log(error);

      toast.error(error.message)   
      
    }


  }

  if (loading) {
    return <div>Loading............</div>;
  }

  if (!post) {
    return <div>Post not found.</div>;
  }

  

  return (
    <div className="w-full">
      <div className="w-full flex justify-between">
        <div className="flex gap-3 items-center">
          <img className="w-10 h-10 rounded-full" src={auth_1} alt="Author" />
          <div className="text-sm">
            <p>{author.name || 'Name'}</p>
            <p>{timeAgo(post.date) || 'Date'}</p>
          </div>
        </div>
        {isUserPost && (
          <div className="flex gap-2 mt-3">
            <Link to ={`/posts/${postId}/edit`}>

              <button className="p-2 bg-blue-600 text-white">Edit</button>

            </Link>
            <button onClick={(e) => deletePost(e)} className="p-2 bg-red-600 text-white">Delete</button>
          </div>
        )}
      </div>
      <div className="flex flex-col items-center m-auto gap-5 mt-6">
        <h1 className="text-lg font-bold mb-3">{post.title}</h1>
        <img src={post.thumbnail} alt="Post Thumbnail" />
        <p>{post.desc}</p>
      </div>
    </div>
  );
};

export default PostDetails;





