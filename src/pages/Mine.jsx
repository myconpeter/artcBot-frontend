import { useState, useEffect } from 'react'
import { useMyInfoQuery } from '../redux/api/UserEndPoint'
import { useStartFarmingMutation, useClaimFarmingMutation } from '../redux/api/FarmingEndpoint'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import WalletIcon from '../assets/icon/walletIcon.png'
import Rate from '../assets/icon/rate.gif'
import PremiumUser from '../component/PremiumUser'
import BgOne from '../assets/image/bgOne.png'
import ArcticBgOne from '../component/background/ArcticBgOne'
import ArcticBgTwo from '../component/background/ArcticBgTwo'
import { FaShip } from 'react-icons/fa6'

const Mine = () => {
  const { data, isLoading, refetch } = useMyInfoQuery()
  const [startFarming] = useStartFarmingMutation()
  const [claimFarming] = useClaimFarmingMutation()

  const wallet = data?.data?.Wallet
  const miningPremiumUser = data?.data?.MiningPremiumUser
  const miningStatus = data?.data?.MiningStatus
  const burnTime = data?.data?.Burn ? new Date(data?.data?.Burn).getTime() : null
  const miningEndTime = data?.data?.MiningEndTime ? new Date(data?.data?.MiningEndTime).getTime() : null
  const miningStartTime = data?.data?.MiningStartTime ? new Date(data?.data?.MiningStartTime).getTime() : null

  const [countdown, setCountdown] = useState(null)
  const [burnCountdown, setBurnCountdown] = useState(null)
  const [liveMiningAmount, setLiveMiningAmount] = useState(0)
  const [isMiningActive, setIsMiningActive] = useState(miningStatus)
  const mineSpeed = data?.data?.miningLevel
  const totalAmountThatCanBeMined = 100

  useEffect(() => {
    if (miningStatus && miningStartTime) {
      const interval = setInterval(() => {
        const now = Date.now()
        const timePassed = Math.max(now - miningStartTime, 0) / 1000 // Convert ms to sec
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
    return `${hours}h ${minutes}m ${seconds}s`
  }

  return (
    <div className='relative flex flex-col  h-screen w-full overflow-hidden text-white'>
      <ArcticBgOne />
      <ArcticBgTwo />
      <div className='flex justify-between items-center'>
        <Link to='/wallet' className='bg-white flex items-center gap-4 p-2 rounded-2xl'>
          <img src={WalletIcon} alt='walletIcon' />
          <p className='text-black'>{isLoading ? 'loading' : wallet}</p>
        </Link>
        <PremiumUser isLoading={isLoading} miningPremiumUser={miningPremiumUser} />
      </div>

      <div className='mt-5 flex flex-col items-center  fixed bottom-14'>
        <div className='relative flex flex-row-reverse  justify-center w-[90%]  items-center'>
          <p className='fixed flex items justify-center gap-1 font-bold mt-5 text-black bg-[#00D4FF] px-3 py-2 right-8 bottom-14 text-lg rounded-2xl'>
            {liveMiningAmount.toFixed(2)} <FaShip className='mt-1' />
          </p>

          <div className='flex mt-3 w-72'>
            {isLoading ? (
              <p>Loading...</p>
            ) : miningStatus && countdown > 0 ? (
              <motion.div
                className='bg-[#00588D] rounded-3xl text-white px-4 py-1 text-center'
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                Mining {formatTime(countdown)}
              </motion.div>
            ) : miningStatus && miningEndTime && Date.now() >= miningEndTime ? (
              <div
                onClick={async () => {
                  await claimFarming({
                    userId: data?.data?._id,
                    amount: liveMiningAmount,
                  })
                  setLiveMiningAmount(0) // Reset mined amount
                  refetch()
                }}
                className='bg-[#00D4FF] text-white font-bold rounded-3xl px-6 py-3 mt-4 shadow-lg hover:bg-green-700 transition'
              >
                Claim Mining
              </div>
            ) : (
              <div
                onClick={() => startFarming().then(refetch)}
                className='fixed bg-transparent outline-1 outline-[#00D4FF] left-10 bottom-14 rounded-3xl text-white px-16 py-2 text-center transition'
              >
                Miner ${import.meta.env.VITE_SYMBOL}
              </div>
            )}
          </div>

          {/* Burn Timer */}
          {/* {!miningPremiumUser && miningStatus && burnCountdown > 0 && countdown <= 0 && (
            <p className='text-red-500 text-sm mt-5'>
              Mined will burn if not claimed after {formatTime(burnCountdown)}
            </p>
          )}

          {!miningPremiumUser && burnCountdown === 0 && (
            <p className='text-red-500 font-semibold mt-5'>Tokens burned!</p>
          )} */}
        </div>
      </div>
    </div>
  )
}

export default Mine
