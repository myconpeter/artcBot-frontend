import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ArcticBgOne from '../component/background/ArcticBgOne'
import ArcticBgTwo from '../component/background/ArcticBgTwo'
import { useState, useEffect } from 'react'
import { useSplashSeenMutation } from '../redux/api/UserEndPoint'
import { useNavigate } from 'react-router'

const FirstPageWelcome = () => {
  const [step, setStep] = useState(1) // Tracks story progress
  const navigate = useNavigate()
  const [TriggerSplash] = useSplashSeenMutation()

  const handleSplashSeen = async () => {
    const token = sessionStorage.getItem('token')
    if (!token) return alert('User not authenticated!')

    await TriggerSplash(token) // Send token with request
    navigate('/mine', { replace: true }) // Redirect user
  }

  useEffect(() => {
    // Timed transitions for each step
    const timers = [
      setTimeout(() => setStep(2), 8000), // Move to Discovery
      setTimeout(() => setStep(3), 16000), // Move to Expedition Begins
      setTimeout(() => setStep(4), 24000), // Show Features
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div className='relative flex flex-col justify-center items-center h-screen w-full overflow-hidden text-white'>
      {/* Background Animation */}
      <ArcticBgTwo className='absolute top-0 left-0 w-full h-screen z-[-1]' />

      {/* Welcome Page 1: The Arctic Awaits */}
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className='text-center px-6 max-w-lg'
        >
          <motion.p
            className='font-bold text-3xl cursor-pointer'
            whileHover={{ scale: 1.1, rotate: 2 }}
            transition={{ duration: 0.3 }}
          >
            The Arctic Awaits...
          </motion.p>
          <p className='mt-4 text-lg md:text-xl'>
            The Arctic is vast, untouched, and full of secrets. The frozen tundra stretches endlessly, hiding something
            beneath its icy surface—something powerful.
          </p>
          <p className='mt-2 text-md md:text-lg'>
            For centuries, explorers have ventured into this land, but few have returned with more than frostbitten
            fingers and stories of an <span className='text-[#00D4FF] font-bold'>undiscovered energy source</span> deep
            beneath the permafrost.
          </p>
          <p className='mt-2 text-md md:text-lg'>
            Now, a new generation of miners has arrived, driven by whispers of an element unlike any other—
            <span className='text-[#00D4FF] font-bold'>${import.meta.env.VITE_SYMBOL}</span>.
          </p>
          <p className='mt-4 text-lg font-bold'>Do you have what it takes to unearth it?</p>
        </motion.div>
      )}

      {/* Welcome Page 2: The Discovery */}
      {step === 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className='text-center px-6 max-w-lg'
        >
          <motion.p
            className='font-bold text-3xl mb-10 cursor-pointer'
            whileHover={{ scale: 1.1, rotate: 2 }}
            transition={{ duration: 0.3 }}
          >
            The Discovery
          </motion.p>
          <p className='text-lg md:text-xl'>
            Beneath the ice lies a hidden force, waiting to be unlocked.{' '}
            <span className='text-[#00D4FF] font-bold'>But you are not alone</span>
          </p>
          <p className='mt-2 text-md md:text-lg'>
            The Arctic is home to other miners, all seeking the same treasure. Some work together, others forge their
            own paths, but one thing is certain:
          </p>
          <p className='mt-2 text-md md:text-lg font-bold'>
            Only the <span className='text-[#00D4FF] font-bold'>bravest and smartest</span> will claim the greatest
            rewards.
          </p>
          <p className='mt-4 text-lg  font-bold'>Your pickaxe is ready. Your journey begins now.</p>
          <p className='mt-2 text-md text-[#00D4FF] font-bold'>
            Will you mine alone, or will you build your mining empire?
          </p>
        </motion.div>
      )}

      {/* Welcome Page 3: The Expedition Begins */}
      {step === 3 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className='text-center px-6 max-w-lg'
        >
          <motion.p
            className='font-bold text-3xl mb-10 cursor-pointer'
            whileHover={{ scale: 1.1, rotate: 2 }}
            transition={{ duration: 0.3 }}
          >
            The Expedition Begins
          </motion.p>
          <p className='text-lg md:text-xl'>
            The Arctic is harsh, but <span className='text-[#00D4FF] font-bold'>fortune favors the bold.</span>
          </p>
          <p className='mt-2 text-md md:text-lg'>
            You must <span className='text-[#00D4FF] font-bold'>mine strategically</span> —tap every 8 hours, complete
            missions to boost your mined token, and recruit a powerful mining team to maximize your rewards.
          </p>
          <p className='mt-2 text-md md:text-lg font-bold'>The deeper you go, the richer the rewards.</p>
          <p className='mt-2 text-md md:text-lg'>But beware—those who hesitate will be left in the cold.</p>
          <p className='mt-4 text-lg font-bold'>Are you ready to begin your expedition?</p>
        </motion.div>
      )}

      {/* Features Section (Appears Last) */}
      {step === 4 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className='mt-8 flex flex-col items-center space-y-4 text-white'
        >
          <motion.div
            className='mt-10'
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <p className='bg-[#00D4FF] px-6 py-3 rounded-full text-xl font-bold text-black shadow-lg transition-all hover:shadow-2xl hover:bg-[#00a7cc]'>
              Welcome to the Arctic
            </p>
          </motion.div>
          {[
            { text: ' ⛏ Mine every 8 hours' },
            { text: ' 🔥 Boost your mining rate with tasks' },
            { text: ' ❄️ Build your mining empire' },
          ].map((item, index) => (
            <motion.div
              key={index}
              className='bg-white/20 backdrop-blur-md px-6 py-2 rounded-xl text-lg'
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              {item.text}
            </motion.div>
          ))}

          {/* Final Call-to-Action Button */}
          <motion.div
            className='mt-10'
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <div
              onClick={handleSplashSeen}
              className='bg-[#00D4FF] px-6 py-3 rounded-full text-xl font-bold text-black shadow-lg shadow-gray-900 transition-all '
            >
              Begin Your Expedition ❄️
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default FirstPageWelcome
