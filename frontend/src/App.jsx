import React from 'react'

import {Routes,Route} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import PostDetails from './pages/PostDetails'
import Register from './pages/Register'
import UserProfile from './pages/UserProfile'
import Authors from './pages/Authors'
import CreatePost from './pages/CreatePost'
import PostCategory from './pages/PostCategory'
import EditPost from './pages/EditPost'
import ErrorPage from './pages/ErrorPage'
import PostByAuthor from './pages/PostByAuthor'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditProfile from './pages/EditProfile'


const App = () => {
  return (
    <div className='w-full h-[100vh] flex flex-col justify-between'>

        <Header />

        <ToastContainer />

        <div className='py-[100px] mx-[8%]'>

          <Routes>

              <Route path='/' element={<Home />}/>
              <Route path='/all-authors' element={<Authors />}/>
              <Route path='/posts/:postId' element={<PostDetails />}/>
              <Route path='/register' element={<Register />}/>
              <Route path='/profile/:id' element={<UserProfile />}/>
              <Route path='/post-by-author/:id' element={<PostByAuthor />}/>
              <Route path='/create-post' element={<CreatePost />}/>
              <Route path='/post/categories/:category' element={<PostCategory />}/>
              <Route path='/posts/:postId/edit' element={<EditPost />}/>
              <Route path='/edit-profile' element={<EditProfile />}/>
              <Route path='/*' element={<ErrorPage />}/>



          </Routes>


          

        </div>

        <Footer />
      

    </div>
  )
}

export default App