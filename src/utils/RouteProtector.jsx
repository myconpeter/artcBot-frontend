import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePointTableQuery } from '../redux/api/UserEndPoint'

const RouteProtector = ({ children }) => {
  const navigate = useNavigate()
  const { data, status, isLoading } = usePointTableQuery()

  useEffect(() => {
    if (!isLoading) {
      if (status === 'fulfilled' && !data?.data?.userId) {
        console.log('Redirecting to splash')
        navigate('/splash') // ✅ Use navigate instead of window.location.href
      } else if (status === 'rejected') {
        console.log('status', status)
        navigate('/splash')
        console.log('splash')
      }
    }
  }, [status, data, isLoading, navigate])

  if (isLoading) {
    return (
      <div className='bg-blue-400 min-h-screen flex justify-center items-center'>
        <h1 className='text-3xl'>Loading...</h1>
        <span className='loading loading-spinner loading-lg'></span>
      </div>
    )
  }

  return <>{children}</>
}

export default RouteProtector
