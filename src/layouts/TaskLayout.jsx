import { NavLink } from 'react-router'
import TaskAnimate from '../assets/icon/AnimatedTask.gif'

const TaskLayout = () => {
  return (
    <div className='bg-cover bg-[#BEDBED] flex flex-col min-h-screen  bg-center w-full'>
      <div className='flex flex-col items-center justify-center mt-5'>
        <img src={TaskAnimate} alt='task' className='h-14 w-14 bg-[#00588D] p-3 rounded-xl' />

        <div className='flex flex-col items-center relative top-2'>
          <p className='font-bold text-black text-4xl'>Tasks</p>
          <p className='text-xl mt-3'>Complete Task To Earn Form Token</p>
        </div>
      </div>
      <div className='flex items-center justify-center'>
        <nav className='flex justify-around items-center bg-white mt-5 py-3 w-[80%] rounded-2xl shadow-sm shadow-gray-500'>
          <NavLink
            to='#'
            className={({ isActive }) =>
              `p-2 px-3 rounded-xl ${isActive ? 'bg-blue-500 text-white' : 'bg-black text-white'}`
            }
          >
            Social
          </NavLink>
          <NavLink
            to='#'
            className={({ isActive }) =>
              `p-2 px-3 rounded-xl ${isActive ? 'bg-blue-500 text-white' : 'bg-black text-white'}`
            }
          >
            Social
          </NavLink>
          <NavLink
            to='#'
            className={({ isActive }) =>
              `p-2 px-3 rounded-xl ${isActive ? 'bg-blue-500 text-white' : 'bg-black text-white'}`
            }
          >
            Social
          </NavLink>
        </nav>
      </div>
    </div>
  )
}

export default TaskLayout
