import { useState, useEffect } from 'react'
import { useMyInfoQuery } from '../redux/api/UserEndPoint'
import { useStartFarmingMutation } from '../redux/api/FarmingEndpoint'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import WalletIcon from '../assets/icon/walletIcon.png'
import Rate from '../assets/icon/rate.gif'

const Mine = () => {
  const { data, isLoading, refetch } = useMyInfoQuery()
  const [startFarming] = useStartFarmingMutation()

  const wallet = data?.data?.Wallet
  const miningAmount = data?.data?.MiningAmount || 0
  const miningPremiumUser = data?.data?.MiningPremiumUser
  const miningStatus = data?.data?.MiningStatus
  const burnTime = data?.data?.Burn ? new Date(data?.data?.Burn).getTime() : null
  const miningEndTime = data?.data?.MiningEndTime ? new Date(data?.data?.MiningEndTime).getTime() : null
  const miningStartTime = data?.data?.MiningStartTime ? new Date(data?.data?.MiningStartTime).getTime() : null

  const [countdown, setCountdown] = useState(null)
  const [burnCountdown, setBurnCountdown] = useState(null)
  const [liveMiningAmount, setLiveMiningAmount] = useState(miningAmount)
  const [isMiningActive, setIsMiningActive] = useState(miningStatus)
  const mineSpeed = 0.1

  useEffect(() => {
    if (miningStatus && miningStartTime) {
      const interval = setInterval(() => {
        const now = Date.now()
        const timePassed = Math.max(now - miningStartTime, 0) / 1000
        const minedTokens = timePassed * mineSpeed

        setLiveMiningAmount(miningAmount + minedTokens)

        if (miningEndTime) {
          const remainingTime = Math.max(miningEndTime - now, 0)
          setCountdown(remainingTime)

          if (remainingTime === 0) {
            clearInterval(interval)
            setIsMiningActive(false) // Stop mining when complete
            refetch()
          }
        }
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [miningStatus, miningStartTime, miningEndTime, miningAmount, refetch])

  useEffect(() => {
    if (!miningPremiumUser && burnTime) {
      const interval = setInterval(() => {
        const now = Date.now()
        const burnRemaining = Math.max(burnTime - now, 0)
        setBurnCountdown(burnRemaining)

        if (burnRemaining === 0) {
          setLiveMiningAmount(0.1) // Reset to 0.10 after burn countdown expires
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
    <div className='bg-cover flex flex-col bg-center h-screen w-full p-5'>
      <div className='flex justify-between items-center'>
        <div className='bg-white flex items-center gap-4 p-2 rounded-2xl'>
          <img src={WalletIcon} alt='walletIcon' />
          <p className='text-black'>
            {isLoading ? 'loading' : wallet?.length > 8 ? `${wallet.slice(0, 8)}...` : wallet}
          </p>
        </div>
      </div>

      <div className='mt-5 flex flex-col items-center gap-5'>
        <div className='relative flex flex-col justify-center w-[90%] items-center bg-blue-200 rounded-2xl shadow-2xl py-10'>
          <p className='font-bold text-4xl'>{isLoading ? 'Load' : liveMiningAmount.toFixed(2)}</p>

          <div className='flex items-center justify-center mt-3'>
            {isLoading ? (
              <p>Loading...</p>
            ) : isMiningActive ? (
              <motion.div
                className='bg-[#00588D] rounded-3xl text-white px-4 py-1 text-center'
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                Mining {countdown ? `(${formatTime(countdown)})` : ''}
              </motion.div>
            ) : (
              <div
                onClick={() => startFarming().then(refetch)}
                className='bg-[#00588D] rounded-3xl text-white px-4 py-3 text-center'
              >
                Start Mining
              </div>
            )}
          </div>

          {!miningPremiumUser && burnCountdown > 0 && (
            <p className='text-red-500 text-sm mt-5'>
              Token mined will burn if not claimed after {formatTime(burnCountdown)}
            </p>
          )}

          {!miningPremiumUser && burnCountdown === 0 && (
            <p className='text-red-500 font-semibold mt-5'>Tokens burned!</p>
          )}

          {!isMiningActive && miningEndTime && Date.now() >= miningEndTime && (
            <div className='bg-green-600 text-white rounded-3xl px-4 py-2 mt-4'>Claim Mining</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Mine
