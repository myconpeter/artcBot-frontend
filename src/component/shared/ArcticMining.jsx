import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaWater } from 'react-icons/fa'

const ArcticMining = () => {
  const [isMining, setIsMining] = useState(false)

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-[#0A2540] text-white'>
      <button
        onClick={() => setIsMining(!isMining)}
        className='px-6 py-3 mb-6 text-lg font-bold text-white bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600 transition'
      >
        {isMining ? 'Stop Mining' : 'Start Mining'}
      </button>

      <AnimatePresence>
        {isMining && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className='relative w-32 h-64 overflow-hidden'
          >
            <motion.div
              className='absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-full bg-blue-400 rounded-full'
              animate={{ y: [0, 30, -10, 20, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            />

            {/* Water splashes */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className='absolute bottom-0 left-1/2 transform -translate-x-1/2 text-blue-300'
                animate={{
                  opacity: [0, 1, 0],
                  y: [0, -10, -20],
                  scale: [0.8, 1, 0.8],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  delay: i * 0.3,
                }}
              >
                <FaWater size={20} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ArcticMining
