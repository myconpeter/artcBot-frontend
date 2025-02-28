import { FaAward } from 'react-icons/fa'
import toast from 'react-hot-toast'
import { useGetIncompletePartnerTaskListQuery } from '../redux/api/PartnerTaskEndpoint'
import TaskSkeleton from '../component/skeleton/TaskSkeleton'

import { FaWallet } from 'react-icons/fa'
import HandlePartnerTaskClaim from '../component/shared/HandlePartnerTaskClaim'
import HandleWalletPayment from '../component/shared/HandleWalletPayment'

const getTaskIcon = (category) => {
  switch (category) {
    case 'connect':
      return <FaWallet className='text-xl text-black' />
    case 'transaction':
      return <FaAward className='text-xl text-yellow-500 rounded-2xl' />
  }
}

const PatnerTask = () => {
  const { data, isLoading } = useGetIncompletePartnerTaskListQuery()

  const allPartnerTask = data?.data?.filter((task) => task.category !== 'transaction') || []
  const TransactionTask = data?.data?.filter((task) => task.category !== 'connect') || []

  return (
    <div className='text-black'>
      {isLoading ? (
        <div className='flex flex-col gap-3'>
          <TaskSkeleton />
          <TaskSkeleton />
          <TaskSkeleton />
        </div>
      ) : data.data.length > 0 ? (
        <div className='flex justify-center items-center '>
          <div className=' mt-5 w-[95%] py-5 px-1 flex flex-col gap-4'>
            {allPartnerTask.map((task) => (
              <div key={task._id} className='relative flex justify-center items-center'>
                <div className='relative bg-white p-1 w-[68%] flex gap-4 ml-5 pl-5 items-center rounded-l-2xl shadow-lg shadow-gray-500'>
                  {getTaskIcon(task.category)}
                  <div>
                    <p className='text-sm font-semibold'>{task.title}</p>
                    <p className='text-xs'>
                      +{task.point} {import.meta.env.VITE_SYMBOL}
                    </p>
                  </div>
                </div>

                <div className='relative bg-[#00D4FF] p-1 w-[18%] h-12  flex gap-4 ml-2 items-center justify-center rounded-r-2xl shadow-lg shadow-gray-500'>
                  <HandlePartnerTaskClaim item={task} />
                </div>
              </div>
            ))}
            {TransactionTask.map((task) => (
              <div key={task._id} className='relative flex justify-center items-center'>
                <div className='relative bg-white p-1 w-[68%] flex gap-4 ml-5 pl-5 items-center rounded-l-2xl shadow-lg shadow-gray-500'>
                  {getTaskIcon(task.category)}
                  <div>
                    <p className='text-sm font-semibold'>{task.title}</p>
                    <p className='text-xs'>
                      {task.point} <span className='text-black font-semibold'>$Ton</span>
                    </p>
                  </div>
                </div>

                <div className='relative bg-[#00D4FF] p-1 w-[18%] h-12  flex gap-4 ml-2 items-center justify-center rounded-r-2xl shadow-lg shadow-gray-500'>
                  <HandleWalletPayment item={task} />
                </div>
              </div>
            ))}
            {/* <div className='relative flex justify-center items-center '>
              <div className='relative bg-white p-3 w-[68%]  flex gap-4 ml-5 items-center rounded-l-2xl shadow-lg shadow-gray-500'>
                <FaAward className='text-2xl text-yellow-400  rounded-2xl' />
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
            </div> */}
          </div>
        </div>
      ) : (
        <p className='text-center text-lg font-semibold mt-10'>No Partners Tasks Currently</p>
      )}
    </div>
  )
}

export default PatnerTask
