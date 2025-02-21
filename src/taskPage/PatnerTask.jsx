import { FaAward } from 'react-icons/fa'
import toast from 'react-hot-toast'

const PatnerTask = () => {
  return (
    <div className='text-black'>
      <div className='flex justify-center items-center '>
        <div className=' mt-5 w-[95%] py-5 px-1 flex flex-col gap-4'>
          <div className='relative flex justify-center items-center '>
            <div className='relative bg-white p-3 w-[68%]  flex gap-4 ml-5 items-center rounded-l-2xl shadow-lg shadow-gray-500'>
              <FaAward className='text-5xl text-yellow-400  rounded-2xl' />
              <div>
                <p className='text-sm font-semibold text-black'>Become a Premium Users</p>
                <p className='text-md'>1.5 $ton</p>
              </div>
            </div>

            <div
              onClick={() => toast.success('Task Coming Soon 🚀', { position: 'top-center' })}
              className='relative bg-[#00D4FF] p-1 w-[18%] h-12  flex gap-4 ml-2 items-center justify-center rounded-r-2xl shadow-lg shadow-gray-500'
            >
              <p className='text-lg font-semibold text-center text-white'>Join</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PatnerTask
