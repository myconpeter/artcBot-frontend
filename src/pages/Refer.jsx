import { IoGiftOutline } from 'react-icons/io5'
import { useFindRefererQuery } from '../redux/api/UserEndPoint'
import { useState } from 'react'
import ArcticBgTwo from '../component/background/ArcticBgTwo'
import { FaShip } from 'react-icons/fa6'
import PremiumUser from '../component/PremiumUser'
import toast from 'react-hot-toast'

// import { useMyInfoQuery } from '../redux/api/UserEndPoint'

const Refer = () => {
  // const { dataa, isLoadingg, refetch } = useMyInfoQuery()
  const { data, isLoading } = useFindRefererQuery()
  const myRef = data?.data?.findme?.ReferCode || 'eee'
  const myPoint = data?.data?.findme?.ReferralPoint || 0

  const totalRef = data?.data?.findme?.ReferralCount

  const allRef = data?.data?.findReferedUser || []

  const [copied, setCopied] = useState(false)

  const miningPremiumUser = data?.data?.findme?.MiningPremiumUser
  const username = data?.data?.findme?.Username || ' '

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
    <div className='relative flex flex-col  h-screen w-full overflow-hidden text-black'>
      <ArcticBgTwo />
      <div className='flex justify-between items-center mt-2'>
        <div
          onClick={() => {
            toast.success(`Hello ${username}, Welcome to the ARCTIC`)
          }}
          className=' flex items-center gap-2 p-2 rounded-2xl'
        >
          <div className='bg-gray-100 h-10 w-10 flex items-center justify-center rounded-2xl'>
            <FaShip className=' text-black text-2xl' />
          </div>
          <p className='text-white font-semibold'>{isLoading ? ' ' : username}</p>
        </div>
        <PremiumUser isLoading={isLoading} miningPremiumUser={miningPremiumUser} />
      </div>

      <div className='mt-3 flex flex-col items-center justify-center '>
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
          className={` fixed bottom-24 p-3 px-20 ml-2 text-black font-bold text-xl rounded-xl   transition-all duration-300 mt-4 ${
            copied ? 'bg-green-500' : 'bg-[#00D4FF]'
          }`}
          onClick={handleCopy}
        >
          {copied ? 'Referral Link Copied' : 'Copy Referral link'}
        </button>
      </div>

      <div className='flex justify-center items-center '>
        <div className='bg mt-5 w-[95%] py-5 px-1 flex flex-col gap-4'>
          <div className='relative p-2 w-[80%]  bg-white  flex gap-4 ml-5 items-center rounded-2xl opacity-80'>
            <IoGiftOutline className='text-4xl bg-[#00D4FF] p-2 text-white rounded-2xl' />
            <div>
              <p className='text-sm font-semibold text-gray-400'>Refer Friends</p>
              <p className='text-sm text-gray-400'>
                + {import.meta.env.VITE_NORMAL_TG_USER}{' '}
                <span className='text-[#00D4FF] font-bold'>${import.meta.env.VITE_SYMBOL}</span> for you{' '}
              </p>
            </div>
          </div>

          <div className='relative  p-2 w-[80%]  bg-white  flex gap-4 ml-5 items-center rounded-2xl opacity-80'>
            <IoGiftOutline className='text-4xl bg-[#00D4FF] p-2 text-white rounded-2xl' />
            <div>
              <p className='text-sm font-semibold text-gray-400'>Refer Premium Friends</p>
              <p className='text-sm text-gray-400'>
                +{import.meta.env.VITE_PREMIUM_TG_USER}{' '}
                <span className='text-[#00D4FF] font-bold'>${import.meta.env.VITE_SYMBOL}</span> for you
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='flex items-center justify-center'>
        <div className=' mt-3 w-[95%] py-1 px-1 flex flex-col items-center justify-center gap-4 overflow-auto mb-36'>
          <p className='text-[#00D4FF] font-bold'>Your Invites</p>

          {allRef.length > 0 ? (
            allRef.map((refUser, index) => (
              <div key={index} className='flex  items-center justify-between w-[80%] rounded-2xl p-2 mb-1'>
                {/* <FaUser /> */}
                <p className='text-sm text-white font-semibold'>{refUser.Username || 'Unknown User'}</p>
                <p className='text-sm text-white'>
                  +
                  {refUser.TelegramPremiumUser
                    ? import.meta.env.VITE_PREMIUM_TG_USER
                    : import.meta.env.VITE_NORMAL_TG_USER || 0}{' '}
                  <span className='text-[#00D4FF] font-bold'>${import.meta.env.VITE_SYMBOL}</span>
                </p>
              </div>
            ))
          ) : (
            <div>
              <div className='flex flex-col items-center justify-center w-[100%] rounded-2xl p-2'></div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Refer
