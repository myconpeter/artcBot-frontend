import { FaUser } from 'react-icons/fa'
import { BiSolidCopy } from 'react-icons/bi'
import { FaAward } from 'react-icons/fa'
const PatnerTask = () => {
  return (
    <div>
      <div className='flex justify-center items-center '>
        <div className='bg-[#D9EEFB] mt-5 w-[95%] py-5 px-1 flex flex-col gap-4 rounded-2xl shadow-2xl shadow-gray-300'>
          <div className='relative flex justify-center items-center '>
            <div className='relative bg-white p-3 w-[68%]  flex gap-4 ml-5 items-center rounded-l-2xl shadow-lg shadow-gray-500'>
              <FaAward className='text-5xl text-yellow-400  rounded-2xl' />
              <div>
                <p className='text-sm font-semibold'>Become a Premium Users</p>
                <p className='text-md'>1.5 $ton</p>
              </div>
            </div>

            <div className='relative bg-black p-3 w-[18%] h-18  flex gap-4 ml-2 items-center justify-center rounded-r-2xl shadow-lg shadow-gray-500'>
              <p className='text-lg font-semibold text-center text-white'>Join</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PatnerTask
