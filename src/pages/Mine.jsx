import { useState, useEffect } from 'react'
import { useMyInfoQuery } from '../redux/api/UserEndPoint'
import { useStartFarmingMutation, useClaimFarmingMutation } from '../redux/api/FarmingEndpoint'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import WalletIcon from '../assets/icon/walletIcon.png'
import Rate from '../assets/icon/rate.gif'
import PremiumUser from '../component/PremiumUser'
import BgOne from '../assets/image/bgOne.png'

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
    <div style={{ backgroundImage: `url(${BgOne})` }} className='bg-cover flex flex-col bg-center h-screen w-full'>
      <div className='flex justify-between items-center'>
        <Link to='/wallet' className='bg-white flex items-center gap-4 p-2 rounded-2xl'>
          <img src={WalletIcon} alt='walletIcon' />
          <p className='text-black'>{isLoading ? 'loading' : wallet}</p>
        </Link>
        <PremiumUser isLoading={isLoading} miningPremiumUser={miningPremiumUser} />
      </div>

      <div className='mt-5 flex flex-col items-center gap-5'>
        <div className='relative flex flex-col justify-center w-[90%] items-center bg-blue-200 rounded-2xl shadow-2xl py-10'>
          <p className='font-bold text-4xl'>{liveMiningAmount.toFixed(2)}</p>

          <div className='flex items-center justify-center mt-3'>
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
                className='bg-green-600 text-white font-bold rounded-3xl px-6 py-3 mt-4 shadow-lg hover:bg-green-700 transition'
              >
                Claim Mining
              </div>
            ) : (
              <div
                onClick={() => startFarming().then(refetch)}
                className='bg-[#00588D] rounded-3xl text-white px-4 py-3 text-center shadow-lg hover:bg-[#004477] transition'
              >
                Start Mining
              </div>
            )}
          </div>

          {/* Burn Timer */}
          {!miningPremiumUser && miningStatus && burnCountdown > 0 && countdown <= 0 && (
            <p className='text-red-500 text-sm mt-5'>
              Mined will burn if not claimed after {formatTime(burnCountdown)}
            </p>
          )}

          {!miningPremiumUser && burnCountdown === 0 && (
            <p className='text-red-500 font-semibold mt-5'>Tokens burned!</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Mine
