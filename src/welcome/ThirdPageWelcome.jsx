import BgThree from '../assets/image/bgThree.png'

import Third from '../assets/image/third.png'
import Trend from '../assets/icon/trend.gif'
import { Link } from 'react-router'

const ThirdPageWelcome = () => {
  return (
    <div
      style={{ backgroundImage: `url(${BgThree})` }}
      className='bg-cover flex flex-col justify-center items-center  bg-center h-screen w-full'
    >
      <div className='flex bg-[#E9E9E9F2] w-[90%] h-[40%] flex-col rounded-2xl shadow-lg shadow-gray-500 '>
        <div className='flex items-center justify-center flex-col mt-10'>
          <p className='font-bold text-3xl'>Increase mine rate</p>
        </div>

        <div className='flex items-center justify-center mt-8'>
          <div className='bg-[#BFD3DF3D] rounded-3xl w-[80%]'>
            <p className='text-center text-[17px] font-medium p-1'>Earn more token x10!</p>
          </div>
        </div>

        <div className='flex flex-col items-center justify-center mt-3'>
          <img src={Trend} alt='' className='h-10 w-20' />
          <Link to='/mine' className='bg-[#00588D] w-[80%] rounded-3xl text-white px-3 py-2 text-center'>
            MINE $ARCT
          </Link>{' '}
        </div>
      </div>

      <img src={Third} alt='first' className='mt-3 absolute bottom-6' />
    </div>
  )
}

export default ThirdPageWelcome
