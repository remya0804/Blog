import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { BlogContext } from '../context/BlogContext'
import PostItem from '../components/PostItem'

const PostCategory = () => {

  const [post,setPost] = useState([])

  const {category} = useParams()
  const {postArray} = useContext(BlogContext)

  useEffect(() => {

    const categoryPosts = postArray.filter(item => item.category == category)

    setPost(categoryPosts)
  },[category])


  if(post.length == 0){

    return <div className='text-center'> No posts found!!</div>
  }
    


  return (
    
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4'>

{
        

        post.map((item,idx) => {

          return <PostItem  

                  key={idx}

                  id = {item._id}
          
                    thumbnail={item.thumbnail}
                    title= {item.title}
                    desc={item.desc}
                    category={item.category}
                    author={item.author}
                    author_img={item.author_img}
                  
                  />

           
        })
      }

    </div>
  )
}

export default PostCategory