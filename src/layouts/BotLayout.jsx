import { FaTasks, FaWallet } from 'react-icons/fa'
import { GoHomeFill } from 'react-icons/go'
import { MdPersonAddAlt1 } from 'react-icons/md'

import { NavLink, Outlet } from 'react-router-dom'

const BotLayout = () => {
  return (
    <div className='min-h-screen w-[100%] flex items-center justify-center'>
      <nav className='flex justify-around items-center fixed bottom-0 z-40 bg-[#06111c] w-[80%] h-[8%] pt-2 rounded-2xl'>
        <NavLink to='mine'>
          {({ isActive }) => (
            <div className='flex flex-col items-center'>
              <GoHomeFill className={`text-2xl ${isActive ? 'text-[#00D4FF]' : 'text-gray-400'}`} />
              <p className={isActive ? 'text-white text-sm' : 'text-gray-400 text-sm'}>Mine</p>
            </div>
          )}
        </NavLink>
        <NavLink to='task'>
          {({ isActive }) => (
            <div className='flex flex-col items-center'>
              <FaTasks className={`text-2xl ${isActive ? 'text-[#00D4FF]' : 'text-gray-400'}`} />
              <p className={isActive ? 'text-white text-sm' : 'text-gray-400 text-sm'}>Task</p>
            </div>
          )}
        </NavLink>
        <NavLink to='refer'>
          {({ isActive }) => (
            <div className='flex flex-col items-center'>
              <MdPersonAddAlt1 className={`text-2xl ${isActive ? 'text-[#00D4FF]' : 'text-gray-400'}`} />
              <p className={isActive ? 'text-white text-sm' : 'text-gray-400 text-sm'}>Friends</p>
            </div>
          )}
        </NavLink>
        <NavLink to='wallet'>
          {({ isActive }) => (
            <div className='flex flex-col items-center'>
              <FaWallet className={`text-2xl ${isActive ? 'text-[#00D4FF]' : 'text-gray-400'}`} />
              <p className={isActive ? 'text-white text-sm' : 'text-gray-400 text-sm'}>Wallet</p>
            </div>
          )}
        </NavLink>
      </nav>

      <Outlet />
    </div>
  )
}

export default BotLayout
