import React, { useContext, useEffect, useState } from 'react'
import { BlogContext } from '../context/BlogContext'
import { Link } from 'react-router-dom'
import Loading from '../components/Loading'

const Authors = () => {

  const {authors} = useContext(BlogContext)

  const [allAuthors,setAllAuthors] = useState([])

  const [loading,setLoading] = useState(true)

  const [postCount,setPostCount] = useState("")

  useEffect(() => {

    if(authors){

      setAllAuthors(authors)

      setLoading(false)
    } else{

      setLoading(true)
    }


  },[authors])
  

if(loading){

  return <Loading />
}

  return (

    <div className='grid grid-cols-1  sm:grid-cols-2 lg:sm:grid-cols-2 justify-items-stretch  gap-5'>

      {

        allAuthors.map((item,idx) => {

          return <Link to={`/post-by-author/${item._id}`} key={idx}>
          
              <div  className=' flex flex-col items-center gap-3 border border-slate-950 rounded-md bg-white p-4'> 

                <img className='w-14 h-14 rounded-full' src={item.thumbnail} alt="" />

                <div className='flex flex-col items-center'>

                  <p className='text-xs sm:text-lg font-semibold'  >{item.name}</p>

                  <p className='text-xs mt-2'>{`${Object.keys(item.blogs).length == 1 ? `${Object.keys(item.blogs).length} Post`  : `${Object.keys(item.blogs).length} Posts`} `} </p>

                </div>
              </div>

          </Link>
        })
      }
      

    </div>
  )
}

export default Authors