import { useState, useEffect } from 'react'
import { useMyInfoQuery } from '../redux/api/UserEndPoint'
import { useStartFarmingMutation, useClaimFarmingMutation } from '../redux/api/FarmingEndpoint'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PremiumUser from '../component/PremiumUser'
import ArcticBgTwo from '../component/background/ArcticBgTwo'
import { FaBullseye, FaShip } from 'react-icons/fa6'
import { FaClock } from 'react-icons/fa'
import { FaHandHoldingUsd } from 'react-icons/fa'
import { GiDigDug } from 'react-icons/gi'
import toast from 'react-hot-toast'
import ArcticMining from '../component/shared/ArcticMining'
import InfoPopup from '../component/model/InfoPopup'
import { FaWallet } from 'react-icons/fa'
import { FaXmark } from 'react-icons/fa6'
import { IoMdCheckmark } from 'react-icons/io'
const Mine = () => {
  const { data, isLoading, refetch } = useMyInfoQuery()
  const [startFarming] = useStartFarmingMutation()
  const [claimFarming] = useClaimFarmingMutation()
  const [showPopup, setShowPopup] = useState(false)

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('arcticPopupSeen1')
    if (!hasSeenPopup) {
      setShowPopup(true) // Show the popup only if not seen before
    }
  }, [])

  const handleClosePopup = () => {
    setShowPopup(false)
    localStorage.setItem('arcticPopupSeen1', 'true') // Store the popup state
  }
  const wallet = data?.data?.Wallet
  console.log(wallet === 'Not Connected')
  const taskEarn = data?.data?.TaskEarn
  const referralPoint = data?.data?.ReferralPoint
  const miningAmount = data?.data?.MiningAmount
  const miningPremiumUser = data?.data?.MiningPremiumUser
  const miningStatus = data?.data?.MiningStatus
  const burnTime = data?.data?.Burn ? new Date(data?.data?.Burn).getTime() : null
  const miningEndTime = data?.data?.MiningEndTime ? new Date(data?.data?.MiningEndTime).getTime() : null
  const miningStartTime = data?.data?.MiningStartTime ? new Date(data?.data?.MiningStartTime).getTime() : null
  const username = data?.data?.Username || ' '

  const allBalance = miningAmount + taskEarn + referralPoint || 0

  const [countdown, setCountdown] = useState(null)
  const [burnCountdown, setBurnCountdown] = useState(null)
  const [liveMiningAmount, setLiveMiningAmount] = useState(0)
  const [isMiningActive, setIsMiningActive] = useState(miningStatus)
  const mineSpeed = 0.001
  const totalAmountThatCanBeMined = 28.8

  useEffect(() => {
    refetch() // Fetch latest data when Mine page loads
  }, [])

  useEffect(() => {
    if (miningStatus && miningStartTime) {
      const interval = setInterval(() => {
        const now = Date.now()
        const timePassed = Math.max(now - miningStartTime, 0) / 1000
        let minedTokens = timePassed * mineSpeed

        minedTokens = Math.min(minedTokens, totalAmountThatCanBeMined)
        setLiveMiningAmount(minedTokens)

        if (miningEndTime) {
          const remainingTime = Math.max(miningEndTime - now, 0)
          setCountdown(remainingTime)

          if (remainingTime <= 0) {
            clearInterval(interval)
            setIsMiningActive(false)

            refetch()
          }
        }
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [miningStatus, miningStartTime, miningEndTime, refetch])

  useEffect(() => {
    if (!miningPremiumUser && burnTime) {
      const interval = setInterval(() => {
        const now = Date.now()
        const burnRemaining = Math.max(burnTime - now, 0)
        setBurnCountdown(burnRemaining)

        if (burnRemaining <= 0) {
          setLiveMiningAmount(0)
          clearInterval(interval)
        }
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [miningPremiumUser, burnTime])

  const formatTime = (ms) => {
    const seconds = Math.floor((ms / 1000) % 60)
    const minutes = Math.floor((ms / 1000 / 60) % 60)
    const hours = Math.floor(ms / 1000 / 3600)
    return `${hours}: ${minutes}: ${seconds}`
  }

  return (
    <div className='relative flex flex-col  h-screen w-full overflow-hidden text-white'>
      {showPopup && <InfoPopup onClose={handleClosePopup} />} {/* <ArcticMining /> */}
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
        <Link to='/wallet' className=' flex items-center gap-1 bg-transparent rounded-2xl p-2 '>
          <FaWallet className='text-white' />
          {wallet === 'Not Connected' ? (
            <FaXmark className='text-red-600 text-xs' />
          ) : (
            <IoMdCheckmark className='text-green-500 text-xs' />
          )}
        </Link>
        <PremiumUser isLoading={isLoading} miningPremiumUser={miningPremiumUser} />
      </div>
      <div className='flex justify-center items-center mt-3 '>
        <div className='w-[80%] flex flex-col items-center justify-center bg-white opacity-75 h-[130%] rounded-xl text-black'>
          <p className='text-sm text-center mt-2 font-semibold text-gray-400'>
            Total <span className='text-[#00D4FF] font-semibold'>${import.meta.env.VITE_SYMBOL}</span> mined
          </p>
          <div className='flex items-center justify-center gap-3'>
            <FaShip className=' text-black text-4xl' />
            <p className=' text-4xl font-semibold text-[#00D4FF]'>{isLoading ? ' ' : allBalance}</p>
          </div>

          <div className='flex items-center justify-center'>
            <div className='flex items-center justify-center gap-4'>
              <p className='text-sm font-semibold text-gray-400'>
                <span className='text-[#00D4FF] font-semibold'>${import.meta.env.VITE_SYMBOL}</span> per seconds
              </p>
              <p className='text-sm flex gap-1'>
                <FaShip className=' text-[#00D4FF] text-sm font-semibold mt-0.5' />{' '}
                <p className='font-bold'>{mineSpeed}</p>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='flex justify-center mt-10 h-screen w-screen '>
        <div className='h-80 w-[90%] bg-transparent rounded-4xl'>
          {' '}
          {miningStatus ? <ArcticMining /> : <p></p>}
          {/* <NotMining /> */}
        </div>
      </div>
      <div className='mt-5 flex flex-col items-center  fixed bottom-14'>
        <div className='relative flex flex-row-reverse  justify-center w-[90%]  items-center'>
          <p className='fixed flex items justify-center font-bold gap-1   mt-5 text-black bg-[#00D4FF] px-3 py-2 right-10 bottom-24 text-lg rounded-xl shadow-xl shadow-gray-800'>
            {liveMiningAmount.toFixed(3)} <FaShip className='mt-1' />
          </p>

          <div className='flex mt-3 w-72'>
            {isLoading ? (
              <p> </p>
            ) : miningStatus && countdown > 0 ? (
              <motion.div
                className='fixed flex gap-2 items-center justify-center bg-transparent outline-1 outline-[#00D4FF] left-12 bottom-24  text-white text-sm w-[50%] py-3 text-center transition font-bold rounded-xl'
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                <FaClock className='mt-1' />
                Get after <span className='text-[#00D4FF] font-bold'>{formatTime(countdown)}</span>
              </motion.div>
            ) : miningStatus && miningEndTime && Date.now() >= miningEndTime ? (
              <div
                onClick={async () => {
                  await claimFarming({
                    userId: data?.data?._id,
                    amount: liveMiningAmount,
                  })
                  setLiveMiningAmount(0)
                  toast.success('Claim Successful 😃') // Reset mined amount
                  refetch()
                }}
                className='fixed flex gap-2 items-center justify-center  bg-[#00D4FF] outline-1 outline-white left-12 bottom-24  text-black text-sm py-3 text-center transition font-bold rounded-xl shadow-lg shadow-gray-700'
              >
                <FaHandHoldingUsd className='mt-1' />
                Claim Mining
              </div>
            ) : (
              <div
                onClick={() =>
                  startFarming().then(() => {
                    refetch()
                    toast.success('Mining started 😃')
                  })
                }
                className='fixed flex gap-2 items-center justify-center  bg-transparent outline-1 outline-[#00D4FF] left-12 bottom-24  text-white text-sm py-3 text-center transition font-bold rounded-xl'
              >
                <GiDigDug className='text-[#00D4FF] font-bold mt-1' />
                Start Mining
              </div>
            )}
          </div>

          {/* Burn Timer */}
          {!miningPremiumUser && miningStatus && burnCountdown > 0 && countdown <= 0 && (
            <p className='fixed bottom-40 left-16  text-red-500 text-sm mt-5'>
              Mined will burn if not claimed after {formatTime(burnCountdown)}
            </p>
          )}

          {!miningPremiumUser && burnCountdown === 0 && (
            <p className='fixed left-32 bottom-40 text-center text-red-500 font-semibold mt-5'>Tokens burned!</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Mine
