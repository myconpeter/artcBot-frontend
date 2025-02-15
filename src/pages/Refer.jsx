import { FaUser } from 'react-icons/fa'
import { BiSolidCopy } from 'react-icons/bi'
import { IoGiftOutline } from 'react-icons/io5'
import { useFindRefererQuery } from '../redux/api/UserEndPoint'
import { useState } from 'react'
import { motion } from 'framer-motion'

const Refer = () => {
  const { data, isLoading } = useFindRefererQuery()
  const myRef = data?.data?.findme?.ReferCode || 'eee'
  const myPoint = data?.data?.findme?.ReferralPoint

  const totalRef = data?.data?.findme?.ReferralCount

  const allRef = data?.data?.findReferedUser || []

  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    const referralLink = `http://t.me/ArcticTokenBot?start=${myRef}`
    navigator.clipboard.writeText(referralLink)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 1000)
  }

  // const myPoint = 3

  return (
    <div className='bg-cover bg-[#BEDBED] flex flex-col min-h-screen  bg-center w-full'>
      <div className=''>
        <div className='flex flex-col items-center relative top-2'>
          <p className='font-bold text-black text-2xl'>Referrals</p>
          <p className='text-md'>Refer your friends get bonus</p>
        </div>
      </div>
      <div className='mt-3 flex flex-col items-center justify-center'>
        <div className='flex'>
          <button className='p-2 text-white rounded-xl text-sm transition-all duration-300 bg-blue-300 '>
            Referrals <span className='p-1 bg-white text-black rounded-3xl'>{allRef.length}</span>
          </button>
          <button className='p-1 px-2 ml-2 text-sm text-white rounded-xl transition-all duration-300 bg-blue-300 '>
            Referral Earning{' '}
            <span className='p-1 bg-white text-black rounded-3xl'>
              {myPoint} ${import.meta.env.VITE_SYMBOL}
            </span>
          </button>
        </div>

        <button
          className={`p-1 px-2 ml-2 text-white rounded-xl transition-all duration-300 mt-4 ${
            copied ? 'bg-green-500' : 'bg-blue-500'
          }`}
          onClick={handleCopy}
        >
          {copied ? 'Referral Link Copied' : 'Copy Referral link'}
        </button>
      </div>

      <div className='flex justify-center items-center '>
        <div className='bg-[#D9EEFB] mt-5 w-[95%] py-5 px-1 flex flex-col gap-4 rounded-2xl shadow-2xl shadow-gray-300'>
          <div className='relative bg-white p-2 w-[80%]  flex gap-4 ml-5 items-center rounded-2xl shadow-lg shadow-gray-500'>
            <IoGiftOutline className='text-5xl bg-[#00588D] p-2 text-white rounded-2xl' />
            <div>
              <p className='text-lg font-semibold'>Refer Friends</p>
              <p className='text-md'>
                + {import.meta.env.VITE_NORMAL_TG_USER} ${import.meta.env.VITE_SYMBOL} for you{' '}
              </p>
            </div>
          </div>

          <div className='relative bg-white p-2 w-[80%]  flex gap-4 ml-5 items-center rounded-2xl shadow-lg shadow-gray-500'>
            <IoGiftOutline className='text-5xl bg-[#00588D] p-2 text-white rounded-2xl' />
            <div>
              <p className='text-lg font-semibold'>Refer Premium Users</p>
              <p className='text-md'>
                +{import.meta.env.VITE_PREMIUM_TG_USER} ${import.meta.env.VITE_SYMBOL} for you
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='flex items-center justify-center'>
        <div className='bg-[#D9EEFB] mt-3 w-[95%] py-1 px-1 flex flex-col items-center justify-center gap-4 rounded-2xl shadow-2xl shadow-gray-300 overflow-auto mb-36'>
          <p className=''>Your Invites!</p>

          {allRef.length > 0 ? (
            allRef.map((refUser, index) => (
              <div key={index} className='flex bg-white items-center justify-evenly w-[80%] rounded-2xl p-2 mb-1'>
                <FaUser />
                <p>{refUser.Username || 'Unknown User'}</p>
                <p>
                  +
                  {refUser.TelegramPremiumUser
                    ? import.meta.env.VITE_PREMIUM_TG_USER
                    : import.meta.env.VITE_NORMAL_TG_USER || 0}{' '}
                  $ARCT
                </p>
              </div>
            ))
          ) : (
            <div>
              <div className='flex flex-col bg-white items-center justify-center w-[100%] rounded-2xl p-2'>
                <p>You have no invites yet</p>
              </div>

              <motion.div
                className='flex flex-col bg-blue-300 items-center justify-center w-[100%] mt-2 mb-3 rounded-2xl p-2 cursor-pointer text-white font-semibold text-lg shadow-lg'
                whileHover={{ scale: 1.05, backgroundColor: '#2563EB' }} // Slightly enlarges & darkens on hover
                whileTap={{ scale: 0.95 }} // Gives a pressed-down effect on click
                initial={{ opacity: 0, y: 20 }} // Subtle fade-in animation
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => {
                  const referralLink = `http://t.me/ArcticTokenBot?start=${myRef}`
                  if (navigator.share) {
                    navigator
                      .share({
                        title: 'Join Arctic Mining!',
                        text: 'Start earning $ARCT by joining through my referral!',
                        url: referralLink,
                      })
                      .catch((error) => console.log('Sharing failed', error))
                  } else {
                    navigator.clipboard.writeText(referralLink)
                    alert('Referral link copied! You can now share it manually.')
                  }
                }}
              >
                <p className='text-center'>🚀 Share Your Referrals</p>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Refer
