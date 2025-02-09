import { FaHome } from 'react-icons/fa'
import { NavLink, Outlet } from 'react-router'
import { FaTasks } from 'react-icons/fa'
import { IoIosSettings } from 'react-icons/io'

const AdminLayout = () => {
  return (
    <div className='w-screen flex bg-white min-h-screen'>
      <nav className='flex justify-around items-center fixed bottom-0 bg-[#00588D] w-screen h-[10%] pt-1'>
        <NavLink to='user'>
          {({ isActive }) => (
            <div className='flex flex-col justify-around'>
              <FaHome className={isActive ? 'text-white text-4xl' : 'text-black  text-4xl'} />
              <p className='text-white'> Home</p>
            </div>
          )}
        </NavLink>
        <NavLink to='task'>
          {({ isActive }) => (
            <div className='flex flex-col justify-around'>
              <FaTasks className={isActive ? 'text-white text-4xl' : 'text-black  text-4xl'} />
              <p className='text-white'> Task</p>
            </div>
          )}
        </NavLink>
        <NavLink to='setting'>
          {({ isActive }) => (
            <div className='flex flex-col justify-around'>
              <IoIosSettings className={isActive ? 'text-white text-4xl' : 'text-black  text-4xl'} />
              <p className='text-white'> Settings</p>
            </div>
          )}
        </NavLink>
      </nav>
      <Outlet />
    </div>
  )
}

export default AdminLayout
