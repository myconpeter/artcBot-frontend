import Mine from '../assets/icon/mine.png'
import Task from '../assets/icon/task.png'
import Wallet from '../assets/icon/wallet.png'
import Referral from '../assets/icon/referral.png'
import Amine from '../assets/icon/amine.gif'

import { NavLink, Outlet } from 'react-router'
const BotLayout = () => {
  return (
    <div className=' h-screen'>
      <nav className='flex justify-around items-center fixed bottom-0 bg-[#00588D] w-screen h-[10%] pt-1'>
        <NavLink to='mine'>
          {({ isActive }) => (
            <div className='flex flex-col justify-around'>
              <img src={isActive ? Mine : Mine} alt='mine' className={isActive ? 'h-10 w-10' : 'h-10 w-10'} />
              <p className='text-white'> Mine</p>
            </div>
          )}
        </NavLink>
        <NavLink to='task'>
          {({ isActive }) => (
            <div className='flex flex-col justify-around'>
              <img src={isActive ? Task : Task} alt='mine' className={isActive ? 'h-10 w-10' : 'h-10 w-10'} />
              <p className='text-white'>Task</p>
            </div>
          )}
        </NavLink>
        <NavLink to='refer'>
          {({ isActive }) => (
            <div className='flex flex-col justify-around'>
              <img src={isActive ? Referral : Referral} alt='mine' className={isActive ? 'h-10 w-10' : 'h-10 w-10'} />
              <p className='text-white'>Refer</p>
            </div>
          )}
        </NavLink>
        <NavLink to='wallet'>
          {({ isActive }) => (
            <div className='flex flex-col justify-around'>
              <img src={isActive ? Wallet : Wallet} alt='mine' className={isActive ? 'h-10 w-10' : 'h-10 w-10'} />
              <p className='text-white'>Wallet</p>
            </div>
          )}
        </NavLink>
      </nav>

      <Outlet />
    </div>
  )
}

export default BotLayout
