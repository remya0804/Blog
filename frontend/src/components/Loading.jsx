import React from 'react'

import loading from '../assets/loading.gif'

const Loading = () => {
  return (
    <div className='w-full'>

        <img className='w-[100px] m-auto' src={loading} alt="" />
    </div>
  )
}

export default Loading