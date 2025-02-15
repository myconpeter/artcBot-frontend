import BgOne from '../assets/image/bgOne.png'
import Checkmark from '../assets/icon/checkmark.gif'
import CoinGrow from '../assets/icon/cionGrow.gif'
import RocketFly from '../assets/icon/rocketFly.gif'
import First from '../assets/image/first.png'
import { Link } from 'react-router'
import { useFindRefererQuery } from '../redux/api/UserEndPoint'

import { useMyInfoQuery } from '../redux/api/UserEndPoint'

const FirstPageWelcome = () => {
  const { data, isLoading } = useFindRefererQuery()
  const myRef = data?.data?.findme?.ReferCode
  console.log('myRef', myRef)
  console.log(data)
  return (
    <div
      style={{ backgroundImage: `url(${BgOne})` }}
      className='bg-cover flex flex-col justify-center items-center  bg-center h-screen w-full'
    >
      <div className='flex bg-[#E9E9E9F2] w-[90%] h-[70%] flex-col rounded-2xl shadow-lg shadow-gray-500 '>
        <div className='flex items-center justify-center flex-col mt-5'>
          <p className='font-bold text-3xl'>Mine</p>
          <p className='font-bold text-3xl'>$ARCT token</p>
        </div>

        <div className='flex items-center justify-center mt-8'>
          <div className='bg-[#BFD3DF3D] rounded-3xl w-[80%]'>
            <p className='text-center text-[17px] font-medium p-1'>Mine Real Token</p>
          </div>
        </div>

        <div className='mt-6 flex items-center justify-center'>
          <div className='bg-[#9DC0D680] outline-1 outline-[#88A7B9] rounded-2xl w-[80%] pb-5'>
            <div className='flex ml-5 items-center mt-3'>
              <img src={CoinGrow} className='h-10 w-10' alt='checkmark' />
              <p className='text-md font-medium'>Claim every 8 hours</p>
            </div>

            <div className='flex items-center justify-center'>
              <div className='w-[90%]  border-b-2 border-[#88A7B9]'></div>
            </div>
            <div className='flex ml-5 items-center mt-3'>
              <img src={RocketFly} className='h-10 w-10' alt='checkmark' />
              <p className='text-md font-medium'>Increase mining rate</p>
            </div>

            <div className='flex items-center justify-center'>
              <div className='w-[90%]  border-b-2 border-[#88A7B9]'></div>
            </div>
            <div className='flex ml-5 items-center mt-3'>
              <img src={Checkmark} className='h-16 w-10' alt='checkmark' />
              <p className='text-md font-medium'>Complete tasks</p>
            </div>

            <div className='flex items-center justify-center'>
              <div className='w-[90%]  border-b-2 border-[#88A7B9]'></div>
            </div>
          </div>
        </div>

        <div className='flex items-center justify-center mt-3'>
          <Link to='/new-comer/pg-2' className='bg-[#00588D] w-[80%] rounded-3xl text-white px-3 py-2 text-center'>
            I got it!
          </Link>
        </div>
      </div>

      <img src={First} alt='first' className='mt-3 ' />
    </div>
  )
}

export default FirstPageWelcome
