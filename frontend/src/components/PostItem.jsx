import React, { useContext } from 'react'

import auth_1 from '../assets/auth_1.jpeg'
import { Link } from 'react-router-dom'
import { BlogContext } from '../context/BlogContext'

const PostItem = ({id,thumbnail,title,desc,category,author_img,author,date,userId}) => {

    const d = new Date(date).toDateString()

    const {timeAgo} = useContext(BlogContext)


  return (
    <div className='flex flex-col gap-8 justify-between border border-gray-500 p-3 rounded-md hover:border-red-600 hover:scale-[1.03] transition-all duration-500'>

        <Link to={`/posts/${id}`}>
        

            <div className='cursor-pointer'>
        
                <img className='h-[150px] w-full' src={thumbnail} alt="" />

                <div className='mt-5' >

                    <h2  className='mt-2 text-lg font-semibold'>{title}</h2>

                    <div  className='text-sm mt-3'>

                        {desc.length> 120 ? desc.substr(0,120) + '...' : desc}

                        
                    </div>

                </div>

            </div>

        </Link>

            

            <div className='flex justify-between mt-6'>

                <Link to={`/post-by-author/${userId}`}>

                    <div className='flex gap-3'>

                        <img className='w-10 h-10 rounded-full' src={author_img} alt="" />

                        <div className='flex flex-col text-sm'>

                            <p className='font-semibold'>{author}</p>

                            {/* <p>{d}</p> */}
                            <p className='text-xs mt-1'>{timeAgo(date)}</p>
                        </div>

                    </div>

                </Link>

                <Link to={`/post/categories/${category}`}>

                    <p className='bg-gray-800 text-white px-2 py-2 rounded-md text-sm'>{category}</p>

                </Link>

            </div>

        
    </div>
  )
}

export default PostItem