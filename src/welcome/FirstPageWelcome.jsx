import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import ArcticBgOne from '../component/background/ArcticBgOne'
import { useState, useEffect } from 'react'

const FirstPageWelcome = () => {
  const [showFeatures, setShowFeatures] = useState(false)

  useEffect(() => {
    // Wait for the story to finish (9 seconds) before showing features
    const timer = setTimeout(() => setShowFeatures(true), 9000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className='relative flex flex-col justify-center items-center h-screen w-full overflow-hidden'>
      {/* Background Animation */}
      <ArcticBgOne className='absolute top-0 left-0 w-full h-full z-[-1]' />

      {/* Animated Text Introduction */}
      {!showFeatures && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className='text-center'
        >
          <motion.p
            className='font-bold text-4xl  text-white cursor-pointer'
            whileHover={{ scale: 1.1, rotate: 2 }}
            transition={{ duration: 0.3 }}
            onClick={() => toast.success('Welcome to the Arctic! ❄️')}
          >
            The Arctic Awaits...
          </motion.p>
        </motion.div>
      )}

      {/* Scrolling Story Section */}
      {!showFeatures && (
        <motion.div
          initial={{ opacity: 0, y: '100%' }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 5, ease: 'easeInOut' }}
          className='mt-6 px-6 text-white text-center max-w-lg overflow-hidden h-60'
        >
          <motion.p
            className='text-lg md:text-xl'
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 3, ease: 'easeInOut', delay: 1 }}
          >
            A sea of mystery, fortune, and endless possibilities.
          </motion.p>
          <motion.p
            className='mt-2 text-md md:text-lg'
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 3, ease: 'easeInOut', delay: 3 }}
          >
            Deep in the frozen tundra, an <span className='text-[#00D4FF] font-bold'>undiscovered energy source</span>{' '}
            lies beneath the ice—
            <span className='text-[#00D4FF] font-bold'>$ARCT</span>.
          </motion.p>
          <motion.p
            className='mt-2 text-md md:text-lg'
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 3, ease: 'easeInOut', delay: 5 }}
          >
            Many have tried, but only the <span className='font-bold text-[#00D4FF]'>bravest miners</span> uncover its
            full power. <span className='text-white font-bold'>Are you ready</span> to claim your share?
          </motion.p>
        </motion.div>
      )}

      {/* Animated Feature List (Appears AFTER Story) */}
      {showFeatures && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className='mt-8 flex flex-col items-center space-y-4 text-white'
        >
          {[
            { text: '⛏ Mine every 8 hours' },
            { text: '🔥 Increase your gains with tasks' },
            { text: '❄️ Build your mining empire' },
          ].map((item, index) => (
            <motion.div
              key={index}
              className='bg-white/20 backdrop-blur-md px-6 py-2 rounded-xl text-lg'
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              {item.text}
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Animated Call-to-Action Button (Appears After Features) */}
      {showFeatures && (
        <motion.div
          className='mt-10'
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <Link
            to='/new-comer/pg-2'
            className='bg-[#00D4FF] px-6 py-3 rounded-full text-xl font-bold text-black shadow-lg transition-all hover:shadow-2xl hover:bg-[#00a7cc]'
          >
            Begin Your Expedition ❄️
          </Link>
        </motion.div>
      )}
    </div>
  )
}

export default FirstPageWelcome
