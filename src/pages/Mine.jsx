import BgOne from '../assets/image/bgOne.png'
import WalletIcon from '../assets/icon/walletIcon.png'
import PremiumIcon from '../assets/icon/premiumIcon.png'
import Rate from '../assets/icon/rate.gif'
import { FaAward } from 'react-icons/fa'
import { Link } from 'react-router'
import { useMyInfoQuery } from '../redux/api/UserEndPoint'
import { motion, AnimatePresence } from 'framer-motion'

const Mine = () => {
  const { data, isLoading } = useMyInfoQuery()

  const wallet = data?.data?.Wallet
  const miningAmount = data?.data?.MiningAmount
  const miningPoint = 2
  const MiningPremiumUser = data?.data?.MiningPremiumUser

  return (
    <div style={{ backgroundImage: `url(${BgOne})` }} className='bg-cover flex flex-col   bg-center h-screen w-full'>
      <div className='mt-5 flex justify-between mx-3 items-center'>
        <div className='bg-white w-fit h-10 flex items-center justify-center gap-4 p-2 rounded-2xl'>
          <img src={WalletIcon} alt='walletIcon' />
          <p className='text-black'>
            {isLoading ? 'loading' : wallet.length > 8 ? `${wallet.slice(0, 8)}...` : wallet}
          </p>
        </div>
        {isLoading ? (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className='text-gray-500 text-sm'
          >
            Loading...
          </motion.span>
        ) : (
          <motion.div
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 0.5, repeatDelay: 1.5 }}
          >
            <FaAward className={`${MiningPremiumUser ? 'text-yellow-400' : 'text-gray-500'} text-3xl font-bold`} />
          </motion.div>
        )}

        {/* Slide In & Out Text */}
        <AnimatePresence mode='wait'>
          {!isLoading && MiningPremiumUser && (
            <motion.div
              key='premium-text'
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 50, opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className='absolute right-16 px-3 py-1 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-sm rounded-xl shadow-md'
            >
              Premium User
            </motion.div>
          )}
          {!isLoading && !MiningPremiumUser && (
            <motion.div
              key='regular-text'
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 50, opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className='absolute right-12 px-3 py-1 bg-gray-500 text-white text-sm rounded-xl shadow-md'
            >
              Regular User
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className='mt-5 flex flex-col items-center justify-center gap-5 '>
        <div className='relative flex flex-col justify-center w-[90%] items-center bg-blue-200 rounded-2xl shadow-2xl shadow-gray-300 py-10'>
          <p className='font-bold text-4xl'>{isLoading ? 'Load' : miningPoint}</p>
          <div className='flex items-center justify-center mt-3'>
            <Link to='#' className='bg-[#00588D]  rounded-3xl text-white px-4 py-3 text-center'>
              Start Mining
            </Link>
          </div>
          <p className='text-black font-semibold mt-5'>Token mined will burn if not claim after 1hr</p>
        </div>
        <div className='relative flex flex-col justify-center w-[90%] items-center bg-gray-200 rounded-2xl shadow-2xl shadow-gray-300 py-10'>
          <p className='font-normal text-3xl'>Mined $ARCT</p>
          <p className='font-bold text-4xl mt-4'>{isLoading ? 'load..' : miningAmount}</p>
          <p className='font-normal text-2xl mt-4'>$ARCT Mining rate: 0.001/sec</p>
          <div className='flex items-center justify-center mt-3'>
            <Link to='#' className='bg-[#00588D]  rounded-3xl text-white px-4 py-3 text-center flex'>
              Boost mining rate
              <img src={Rate} alt='rate' className='w-5 h-5 ml-3' />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Mine
