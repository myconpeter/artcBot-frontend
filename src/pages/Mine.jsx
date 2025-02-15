import BgOne from '../assets/image/bgOne.png'
import WalletIcon from '../assets/icon/walletIcon.png'
import PremiumIcon from '../assets/icon/premiumIcon.png'
import Rate from '../assets/icon/rate.gif'
import { FaAward } from 'react-icons/fa'
import { Link } from 'react-router'
import { useMyInfoQuery } from '../redux/api/UserEndPoint'

const Mine = () => {
  const { data, isLoading } = useMyInfoQuery()

  const wallet = data?.data?.Wallet
  const miningAmount = data?.data?.MiningAmount

  return (
    <div style={{ backgroundImage: `url(${BgOne})` }} className='bg-cover flex flex-col   bg-center h-screen w-full'>
      <div className='mt-5 flex justify-between mx-3 items-center'>
        <div className='bg-white w-fit h-14 flex items-center justify-center gap-4 p-2 rounded-2xl'>
          <img src={WalletIcon} alt='walletIcon' />
          <p className='text-black font-semibold'>{isLoading ? 'loading' : wallet}</p>
        </div>
        <div className='bg-white rounded-2xl  flex items-center justify-center p-2 h-14'>
          <FaAward className='text-yellow-300 text-2xl font-bold' />
        </div>
      </div>

      <div className='mt-5 flex flex-col items-center justify-center gap-5 '>
        <div className='relative flex flex-col justify-center w-[90%] items-center bg-blue-200 rounded-2xl shadow-2xl shadow-gray-300 py-10'>
          <p className='font-bold text-4xl'>0.000</p>
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
