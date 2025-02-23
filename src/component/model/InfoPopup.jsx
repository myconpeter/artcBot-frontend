import { useState } from 'react'
import { motion } from 'framer-motion'
import { AiOutlineClose } from 'react-icons/ai'

const InfoPopup = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className='fixed flex items-center justify-center bg-transparent bg-opacity-50 z-50 bottom-0'
    >
      <div className='bg-white p-6  text-black w-screen h-52 relative rounded-t-4xl'>
        <h2 className='text-xl font-bold mb-2 text-center'>Welcome to Arctic Bot! ❄️</h2>
        <p className='text-sm text-gray-700'>
          Start mining <span className='text-[#00D4FF] font-semibold'>${import.meta.env.VITE_SYMBOL}</span> tokens by
          tapping the <span className='font-semibold'>Start Mining</span> button. Earn more by completing tasks and
          inviting friends!
        </p>
        <button onClick={onClose} className='mt-4 w-full bg-[#00D4FF] font-bold text-black py-2 rounded-md transition'>
          Got it!
        </button>
      </div>
    </motion.div>
  )
}

export default InfoPopup
