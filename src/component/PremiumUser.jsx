import { motion, AnimatePresence } from 'framer-motion'
import { FaAward } from 'react-icons/fa'
import { Link } from 'react-router'

const PremiumUser = ({ isLoading, miningPremiumUser }) => {
  return (
    <Link to='/task/partner' className='flex items-center gap-2 relative'>
      {isLoading ? (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 1 }}
          className='text-gray-500 text-sm'
        ></motion.span>
      ) : (
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 0.5, repeatDelay: 1.5 }}
        >
          <FaAward className={`${miningPremiumUser ? 'text-[#00D4FF]' : 'text-gray-100'} text-3xl font-bold`} />
        </motion.div>
      )}

      {/* Wrap text in a flex container to prevent layout shift */}
      <div className='relative'>
        <AnimatePresence mode='wait'>
          {!isLoading && miningPremiumUser && (
            <motion.div
              key='premium-text'
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 20, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className='px-3 py-1 bg-[#00D4FF] text-black font-semibold text-sm rounded-xl shadow-md mr-3'
            >
              Premium
            </motion.div>
          )}
          {!isLoading && !miningPremiumUser && (
            <motion.div
              key='regular-text'
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 20, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className='px-3 py-1 bg-gray-100 font-semibold text-black text-sm rounded-xl shadow-md mr-3'
            >
              Regular
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Link>
  )
}

export default PremiumUser
