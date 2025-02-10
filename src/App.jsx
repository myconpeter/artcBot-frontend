import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import useStore from './store/store' // Import Zustand store
import StartLayout from './layouts/StartLayout'
import FirstPageWelcome from './welcome/FirstPageWelcome'
import SecoundPageWelcome from './welcome/SecoundPageWelcome'
import ThirdPageWelcome from './welcome/ThirdPageWelcome'
import BotLayout from './layouts/BotLayout'
import Mine from './pages/Mine'
import Task from './pages/Task'
import Refer from './pages/Refer'
import Wallet from './pages/Wallet'
import TaskLayout from './layouts/TaskLayout'
import SocialTask from './taskPage/SocialTask'
import RewardTask from './taskPage/RewardTask'
import PatnerTask from './taskPage/PatnerTask'
import ErrorPage from './pages/ErrorPage'
import AdminLogin from './AdminPages/AdminLogin'
import UserPage from './AdminPages/UserPage'
import TaskPage from './AdminPages/TaskPage'
import SettingPage from './AdminPages/SettingPage'
import AdminLayout from './layouts/AdminLayout'

function App() {
  const fetchUser = useStore((state) => state.fetchUser)

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp
      tg.expand() // Expands the Telegram Mini App to full screen

      // Fetch user info from Telegram Web App
      const tgUser = tg.initDataUnsafe?.user
      if (tgUser) {
        fetchUser(tgUser)
      }
    }
  }, [fetchUser])

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<StartLayout />}>
          <Route path='/' element={<FirstPageWelcome />} />
          <Route path='welcome2' element={<SecoundPageWelcome />} />
          <Route path='welcome3' element={<ThirdPageWelcome />} />
        </Route>

        <Route path='' element={<BotLayout />}>
          <Route path='/mine' element={<Mine />} />
          <Route path='/refer' element={<Refer />} />
          <Route path='/wallet' element={<Wallet />} />

          <Route path='' element={<TaskLayout />}>
            <Route path='task' index element={<SocialTask />} />
            <Route path='reward' element={<RewardTask />} />
            <Route path='partner' element={<PatnerTask />} />
          </Route>
        </Route>

        <Route path='/admin' element={<AdminLayout />} errorElement={<ErrorPage />}>
          <Route index element={<AdminLogin />} />
          <Route path='user' element={<UserPage />} />
          <Route path='task' element={<TaskPage />} />
          <Route path='setting' element={<SettingPage />} />
        </Route>

        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
