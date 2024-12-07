import React, { useContext, useEffect, useState } from 'react'

import { TfiWrite } from "react-icons/tfi";

import {Link, NavLink } from 'react-router-dom'

import { AiOutlineMenu } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import { FaPenNib } from "react-icons/fa6";
import { BlogContext } from '../context/BlogContext';



const Header = () => {

  const {token,userData,navigate,menuActive,setMenuActive} = useContext(BlogContext)

  const [userInfo,setUserInfo] = useState(userData || null)

  const [menu,setMenu] = useState(true)
  // const [menuActive,setMenuActive] = useState("home")

  useEffect(() => {

    if(userData){

      setUserInfo(userData)
    }


  },[userData])

  const logOut = () => {

    if(token){

      localStorage.removeItem('token')

      navigate('/')

      window.location.reload();
    }


  }
  

  return (
    
  <div className='py-5 px-[8%] w-full bg-[#e5e4e4] border-b border-gray-400 fixed z-50'> 

      <div className="flex justify-between items-center">

        {/* logo */}


        <Link to='/'>

          <div className="flex items-center gap-1">

            <div >

              <FaPenNib className='text-2xl text-[#ee3e18]'/>

            </div>

            <p className="text-2xl font-semibold ">

              Scriptly

            </p>


          </div>

        </Link>

        {/* menu */}

        <ul className= " hidden md:flex md:items-center gap-5 text-[16px] text-gray-700">

          <li onClick={() => setMenuActive("home")} className={`cursor-pointer ${menuActive == "home" ? 'border-b-2 border-red-600' : ""}`}><Link to='/'> Home </Link></li>

          {

            token 

            ? <li onClick={() => setMenuActive("profile")} className={`cursor-pointer ${menuActive == "profile" ? 'border-b-2 border-red-600' : ""}`}><Link to={`/profile/${userInfo._id}`}>My Profile </Link></li>

            : ""

          }
          {

            token 

            ? <li onClick={() => setMenuActive("my-posts")} className={`cursor-pointer ${menuActive == "my-posts" ? 'border-b-2 border-red-600' : ""}`}><Link to={`/post-by-author/${userInfo._id}`}>My Posts </Link></li>

            : ""

          }
          {

            token 

            ?   <li onClick={() => setMenuActive("create")} className={`cursor-pointer ${menuActive == "create" ? 'border-b-2 border-red-600' : ""}`}><Link to='/create-post'> Create Post </Link></li>


            : ""

          }
          
          
          <li onClick={() => setMenuActive("authors")} className={`cursor-pointer ${menuActive == "authors" ? 'border-b-2 border-red-600' : ""}`}><Link to='/all-authors'> Authors </Link></li>

        </ul>


        {

          token 

          ? <button onClick={() => logOut()} className='cursor-pointer p-3 bg-blue-700 text-white hidden md:block rounded px-3 py-2'> Logout </button>

          : <button className='cursor-pointer p-3 bg-blue-700 text-white hidden md:block rounded px-3 py-2'><Link to='/register'> Login </Link></button>
        }

        <div className='md:hidden'>

          { menu

            ? <AiOutlineMenu  className='text-xl' onClick={() => setMenu(false)}/>

            : <MdClose onClick={() => setMenu(true)}  className='text-xl' />
            
            }

      </div>

        
      </div>

      <div className={`md:hidden flex flex-col items-center text-center absolute bg-slate-100 text-gray-700 h-[100vh] top-0 right-0 overflow-hidden ${menu ? 'w-0' : 'w-full'}`}>

        <ul className= " mt-[100px] flex flex-col gap-5 text-[16px] text-gray-700">

          <button onClick={() => setMenu(true)}   className='cursor-pointer text-gray-700 py-2 rounded-md w-[160px] border border-gray-400'><Link to='/'>Back to home</Link>  </button>

          {

            token 

            ? <NavLink onClick={() => setMenu(true)} to={`/profile/${userInfo._id}`} className='cursor-pointer py-2 rounded-md'>My Profile </NavLink>

            : ""

          }
          {

            token 

            ? <NavLink onClick={() => setMenu(true)} to={`/post-by-author/${userInfo._id}`} className='cursor-pointer py-2 rounded-md'>My Posts </NavLink>

            : ""

          }

          {

            token 

            ?  <NavLink onClick={() => setMenu(true)} to='/create-post' className='cursor-pointer py-2 rounded-md'> Create Post </NavLink>


            : ""

          }

          <NavLink onClick={() => setMenu(true)} to='/all-authors' className='cursor-pointer py-2 rounded-md'> Authors </NavLink>

          {

            token 

            ? <li onClick={() => logOut()} className='cursor-pointer '> Logout </li>

            : <NavLink onClick={() => setMenu(true)}  to='/register' className='cursor-pointer py-2 rounded-md'> Login </NavLink>

          }

        </ul>

      </div>

    </div>
  )
}

export default Header