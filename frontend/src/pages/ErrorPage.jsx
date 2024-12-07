import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div>

      <Link to='/'>

        <button className='bg-[#ee3e18] px-2 py-1'> Home</button>
      
      </Link>
      
      
      <p>Page not found</p>
    </div>
  )
}

export default ErrorPage