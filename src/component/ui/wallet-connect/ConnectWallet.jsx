import { useTonConnectUI } from '@tonconnect/ui-react'
import { FaWallet } from 'react-icons/fa'
import { AiOutlineDisconnect } from 'react-icons/ai'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useConnectWalletMutation } from '../../../redux/api/WalletApi'
import { useDisconnectWalletMutation } from '../../../redux/api/WalletApi'

const ConnectWallet = () => {
  const navigate = useNavigate()
  const [tonConnectUI] = useTonConnectUI()
  const [isConnected, setIsConnected] = useState(tonConnectUI?.connected)

  const [ConnectWallet] = useConnectWalletMutation()
  const [DisconnectWallet] = useDisconnectWalletMutation()

  useEffect(() => {
    if (tonConnectUI?.connected) {
      setIsConnected(true)

      const walletData = tonConnectUI?.account?.address // Correct format

      //   console.log(walletData)

      ConnectWallet({ walletData }) // Send correct payload
        .unwrap()
        .then(() => {})
        .catch((error) => {
          console.error('Backend error:', error)
        })
    }
  }, [tonConnectUI?.connected])

  const handleConnect = async () => {
    try {
      await tonConnectUI.openModal()
      navigate('/mine')
    } catch (error) {
      toast.error('Wallet Connection Failed')
    }
  }

  const handleDisconnect = async () => {
    try {
      await tonConnectUI.disconnect()
      toast.success('Wallet disconnected successfully!')
      DisconnectWallet()
      navigate('/mine', { replace: true })
    } catch (error) {
      toast.error('Failed to disconnect wallet!')
      console.error('Disconnect error:', error)
    }
  }

  return (
    <div className='flex items-start justify-center h-screen w-screen '>
      {isConnected ? (
        <div className='bg-white h-[30%] w-[90%] mt-10 rounded-2xl opacity-85'>
          <p className='text-black text-center font-semibold text-2xl mt-5'>You can now connect wallet</p>

          <div className='flex flex-col justify-center relative mt-3'>
            <div className='text-black flex justify-around items-center'>
              <p className='font-semibold'>Status:</p>
              <p>Connected</p>
            </div>
            <div className='text-black flex justify-around items-center mt-4'>
              <p className='font-semibold'>Wallet: </p>
              <p>{String(tonConnectUI?.account?.publicKey).slice(0, 8) + '...'}</p>
            </div>
          </div>

          <div
            onClick={handleDisconnect}
            className='bg-red-400 mt-4 bg-opacity-40 w-[60%] text-white font-poppins text-sm font-normal flex items-center justify-center p-3 rounded-full mx-auto my-2 gap-2 cursor-pointer'
          >
            <AiOutlineDisconnect className='text-xl text-black' />
            <p className='text-white font-semibold'>Disconnect Wallet</p>
          </div>
        </div>
      ) : (
        <div className='bg-white h-[30%] w-[90%] mt-10 rounded-2xl opacity-85'>
          <p className='text-black text-center font-semibold text-2xl mt-5'>You can now connect wallet</p>

          <div className='flex flex-col justify-center relative mt-3'>
            <div className='text-black flex justify-around items-center'>
              <p className='font-semibold'>Status:</p>
              <p>Not Connected</p>
            </div>
            <div className='text-black flex justify-around items-center mt-4'>
              <p className='font-semibold'>Wallet: </p>
              <p>Not Connected</p>
            </div>
          </div>

          <div
            onClick={handleConnect}
            className='bg-[#00D4FF] mt-4 bg-opacity-40 w-[60%] text-white font-poppins text-sm font-normal flex items-center justify-center p-3 rounded-full mx-auto my-2 gap-2 cursor-pointer'
          >
            <FaWallet className='text-xl text-black' />
            <p className='text-black font-semibold'>Connect Wallet</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default ConnectWallet
