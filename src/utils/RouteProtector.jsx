import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePointTableQuery } from '../redux/api/UserEndPoint'
import ArcticBgOne from '../component/background/ArcticBgOne'
import { motion } from 'framer-motion' // Make sure framer-motion is installed

const RouteProtector = ({ children }) => {
  const navigate = useNavigate()
  const { data, status, isLoading } = usePointTableQuery()
  const [isDelaying, setIsDelaying] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDelaying(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isLoading && !isDelaying) {
      if (status === 'fulfilled' && !data?.data?.userId) {
        console.log('Redirecting to splash')
        navigate('/splash')
      } else if (status === 'rejected') {
        console.log('status', status)
        navigate('/splash')
      }
    }
  }, [status, data, isLoading, navigate, isDelaying])

  const letters = 'ARCTIC'.split('')

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const letterAnimation = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  if (isLoading || isDelaying) {
    return (
      <div className='relative flex flex-col justify-center items-center h-screen w-full overflow-hidden text-white'>
        <motion.div variants={container} initial='hidden' animate='visible' className='flex'>
          {letters.map((letter, index) => (
            <motion.span key={index} variants={letterAnimation} className='text-5xl font-bold text-[#00D4FF]'>
              {letter}
            </motion.span>
          ))}
        </motion.div>
        <ArcticBgOne />
      </div>
    )
  }

  return <>{children}</>
}

export default RouteProtector
