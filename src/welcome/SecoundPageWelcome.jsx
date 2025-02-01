import BgTwo from '../assets/image/bgTwo.png'
import CheckTwo from '../assets/icon/checkTwo.gif'
import User from '../assets/icon/user.gif'
import Secound from '../assets/image/secound.png'
import { Link } from 'react-router'

const SecoundPageWelcome = () => {
  return (
    <div
      style={{ backgroundImage: `url(${BgTwo})` }}
      className='bg-cover flex flex-col justify-center items-center  bg-center h-screen w-full'
    >
      <div className='flex bg-[#E9E9E9F2] w-[90%] h-[60%] flex-col rounded-2xl shadow-lg shadow-gray-500 '>
        <div className='flex items-center justify-center flex-col mt-10'>
          <p className='font-bold text-3xl'>Stay active to mine</p>
          <p className='font-bold text-3xl'>more token</p>
        </div>

        <div className='flex items-center justify-center mt-8'>
          <div className='bg-[#BFD3DF3D] rounded-3xl w-[80%]'>
            <p className='text-center text-[17px] font-medium p-1'>Stay Bullish!</p>
          </div>
        </div>

        <div className='mt-6 flex items-center justify-center'>
          <div className='bg-[#9DC0D680] outline-1 outline-[#88A7B9] rounded-2xl w-[80%] pb-5'>
            <div className='flex ml-5 items-center mt-3'>
              <img src={CheckTwo} className='h-10 w-10' alt='checkmark' />
              <p className='text-md font-medium'>Claim every 8 hours</p>
            </div>

            <div className='flex items-center justify-center'>
              <div className='w-[90%]  border-b-2 border-[#88A7B9]'></div>
            </div>
            <div className='flex ml-5 items-center mt-3'>
              <img src={User} className='h-10 w-10' alt='checkmark' />
              <p className='text-md font-medium'>Increase mining rate</p>
            </div>

            <div className='flex items-center justify-center'>
              <div className='w-[90%]  border-b-2 border-[#88A7B9]'></div>
            </div>
          </div>
        </div>

        <div className='flex items-center justify-center mt-3'>
          <Link to='/welcome3' className='bg-[#00588D] w-[80%] rounded-3xl text-white px-3 py-2 text-center'>
            Ready!
          </Link>
        </div>
      </div>

      <img src={Secound} alt='first' className='mt-3 absolute bottom-6' />
    </div>
  )
}

export default SecoundPageWelcome
