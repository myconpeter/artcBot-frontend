import { FaUser } from 'react-icons/fa'
import { BiSolidCopy } from 'react-icons/bi'
import { IoGiftOutline } from 'react-icons/io5'

const Refer = () => {
  return (
    <div className='bg-cover bg-[#BEDBED] flex flex-col min-h-screen  bg-center w-full'>
      <div className=''>
        <div className='flex flex-col items-center relative top-5'>
          <p className='font-bold text-black text-4xl'>Referrals</p>
          <p className='text-2xl mt-3'>Refer your friends get bonuses</p>
        </div>
      </div>

      <div className='mt-7 flex items-center justify-center  '>
        <p className='text-center bg-[#D9EEFB] w-[80%] flex items-center justify-center rounded-2xl'>
          Referral link: t:me/arct_bot/m..{' '}
          <span className='ml-5'>
            <BiSolidCopy />
          </span>
        </p>
      </div>

      <div className='flex justify-center items-center '>
        <div className='bg-[#D9EEFB] mt-5 w-[95%] py-5 px-1 flex flex-col gap-4 rounded-2xl shadow-2xl shadow-gray-300'>
          <div className='relative bg-white p-3 w-[80%]  flex gap-4 ml-5 items-center rounded-2xl shadow-lg shadow-gray-500'>
            <IoGiftOutline className='text-5xl bg-[#00588D] p-2 text-white rounded-2xl' />
            <div>
              <p className='text-lg font-semibold'>Refer Friends</p>
              <p className='text-md'>+3 $ARCT for you both</p>
            </div>
          </div>

          <div className='relative bg-white p-3 w-[80%]  flex gap-4 ml-5 items-center rounded-2xl shadow-lg shadow-gray-500'>
            <IoGiftOutline className='text-5xl bg-[#00588D] p-2 text-white rounded-2xl' />
            <div>
              <p className='text-lg font-semibold'>Refer Premium Friends</p>
              <p className='text-md'>+7 $ARCT for you both</p>
            </div>
          </div>
        </div>
      </div>
      <div className='flex items-center justify-center'>
        <div className='bg-[#D9EEFB] mt-3 w-[95%] py-1 px-1 flex flex-col items-center justify-center gap-4 rounded-2xl shadow-2xl shadow-gray-300 overflow-auto mb-36'>
          <p className=''>Your Invites!</p>
          <div className='flex bg-white items-center justify-evenly w-[80%] rounded-2xl'>
            <FaUser />
            <p>Daniel64</p>
            <p>+3 $ARCT</p>
          </div>

          <div className='flex bg-white items-center justify-evenly w-[80%] rounded-2xl'>
            <FaUser />
            <p>Daniel64</p>
            <p>+3 $ARCT</p>
          </div>
          <div className='flex bg-white items-center justify-evenly w-[80%] rounded-2xl'>
            <FaUser />
            <p>Daniel64</p>
            <p>+3 $ARCT</p>
          </div>
          <div className='flex bg-white items-center justify-evenly w-[80%] rounded-2xl'>
            <p>You have no invites yet</p>
          </div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  )
}

export default Refer
