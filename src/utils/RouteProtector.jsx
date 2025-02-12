import React, { useEffect } from 'react'
import { usePointTableQuery } from '../redux/api/UserEndPoint'

const RouteProtector = ({ children }) => {
  const { data, status, isLoading } = usePointTableQuery(undefined)

  useEffect(() => {
    if (status === 'fulfilled') {
      console.log(status === 'fulfilled')
      if (!data?.data?.userId) {
        console.log(!data?.data?.userId)
        window.location.href = '/splash'
      }
    } else if (status === 'rejected') {
      console.log(status === 'rejected')
      window.location.href = '/splash'
    }
  }, [status, data])

  if (isLoading) {
    return (
      <div className='bg-blue-400 min-h-screen flex justify-center items-center'>
        <h1 className='text-3xl'>From the Protector</h1>

        <span className='loading loading-spinner loading-lg'></span>
      </div>
    )
  }

  return <>{children}</>
}

export default RouteProtector
