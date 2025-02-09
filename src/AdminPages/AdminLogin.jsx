import React from 'react'

const AdminLogin = () => {
  return (
    <div className='flex flex-col justify-center items-center w-screen h-screen'>
      <h1 className='text-3xl font-bold'>Admin Login</h1>
      <form action='#' className='mt-10 flex flex-col justify-center items-center'>
        <input type='text' placeholder='Secret' className='text-center w-[100%] h-10 outline-2 outline-black' />
        <button className='bg-blue-500 p-2  rounded-2xl text-white font-bold mt-3'>Submit</button>
      </form>
    </div>
  )
}

export default AdminLogin
