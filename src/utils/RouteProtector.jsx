import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePointTableQuery } from '../redux/api/UserEndPoint'
import ArcticBgOne from '../component/background/ArcticBgOne'

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
      <div className='relative flex flex-col justify-center items-center h-screen w-full overflow-hidden text-white'>
        <ArcticBgOne />
      </div>
    )
  }

  return <>{children}</>
}

export default RouteProtector
