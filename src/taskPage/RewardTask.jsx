import { FaBookReader, FaMousePointer, FaTelegramPlane, FaUserFriends, FaYoutube } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { MdAddTask } from 'react-icons/md'
import { GiUpgrade } from 'react-icons/gi'
import { useGetIncompleteTaskListQuery } from '../redux/api/TaskEndpoint'
import TaskSkeleton from '../component/skeleton/TaskSkeleton'
import HandleTaskClaimLogic from '../component/shared/HandleTaskClaimLogic'

const getTaskIcon = (category) => {
  switch (category) {
    case 'visit':
      return <FaMousePointer className='text-2xl text-black rounded-2xl' />
    case 'x':
      return <FaXTwitter className='text-2xl text-black rounded-2xl' />
    case 'read':
      return <FaBookReader className='text-2xl text-black rounded-2xl' />
    case 'telegram':
      return <FaTelegramPlane className='text-2xl text-blue-600 rounded-2xl' />
    case 'invite':
      return <FaUserFriends className='text-2xl text-black rounded-2xl' />
    case 'youtube':
      return <FaYoutube className='text-2xl text-red-700 rounded-2xl' />
    case 'boost':
      return <GiUpgrade className='text-2xl text-black rounded-2xl' />
    default:
      return <MdAddTask className='text-2xl text-black rounded-2xl' />
  }
}

const RewardTask = () => {
  const { data, isLoading } = useGetIncompleteTaskListQuery()

  // Filter tasks to show only invite category
  const inviteTasks = data?.data?.filter((task) => task.category === 'invite') || []

  return (
    <div>
      {isLoading ? (
        <div className='flex flex-col gap-3'>
          <TaskSkeleton />
          <TaskSkeleton />
          <TaskSkeleton />
        </div>
      ) : inviteTasks.length > 0 ? (
        <div className='flex justify-center items-center'>
          <div className='bg-[#D9EEFB] mt-5 w-[95%] py-5 px-1 flex flex-col gap-4 rounded-2xl shadow-2xl shadow-gray-300'>
            {inviteTasks.map((task) => (
              <div key={task._id} className='relative flex justify-center items-center'>
                <div className='relative bg-white p-3 w-[68%] flex gap-4 ml-5 pl-5 items-center rounded-l-2xl shadow-lg shadow-gray-500'>
                  {getTaskIcon(task.category)}
                  <div>
                    <p className='text-lg font-semibold'>{task.title}</p>
                    <p className='text-md'>
                      +{task.point} {import.meta.env.VITE_SYMBOL}
                    </p>
                  </div>
                </div>

                <div className='relative bg-black p-3 w-[18%] h-18 flex gap-4 ml-2 items-center justify-center rounded-r-2xl shadow-lg shadow-gray-500'>
                  <HandleTaskClaimLogic item={task} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className='text-center text-lg font-semibold mt-5'>No Invite Tasks Available</p>
      )}
    </div>
  )
}

export default RewardTask
