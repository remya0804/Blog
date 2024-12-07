import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {

  const categoryArray = ['Agriculture',"Nature",'Food','LifeStyle','Education','Love',"Art","Weather","Animals"]

  return (
    <div className='w-full bg-gray-800 py-5 px-14 flex flex-col justify-center pt-8'>
      
      <ul className='flex items-center justify-center gap-4 m-auto  flex-wrap '>

        {

          categoryArray.map((item,idx) => {

            return <li key={idx} className='cursor-pointer bg-gray-500 hover:text-black p-2 rounded-md text-xs md:text-sm hover:bg-white text-white transition-all duration-500'><Link to={`/post/categories/${item}`}> {item} </Link></li>


          })
        }

      
      </ul>

      <hr  className='bg-slate-200 h-[1px] mt-10 mb-5'/>

      <p className='text-center text-sm text-slate-100'>© 2024 Scriptly. All rights reserved.</p>
    </div>
  )
}

export default Footer