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
import Splash from './pages/Splash'
import RouteProtector from './utils/RouteProtector'
import Start from './pages/Start'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/splash' element={<Splash />}></Route>
      </Routes>
      <Routes>
        <Route path='/new-comer' element={<StartLayout />}>
          <Route index element={<FirstPageWelcome />} />
          <Route path='pg-2' element={<SecoundPageWelcome />} />
          <Route path='pg-3' element={<ThirdPageWelcome />} />
        </Route>

        <Route path='/'>
          <Route
            index
            element={
              <RouteProtector>
                <Start />
              </RouteProtector>
            }
          />

          <Route element={<BotLayout />}>
            <Route path='/mine' element={<Mine />} />
            <Route path='/refer' element={<Refer />} />
            <Route path='/wallet' element={<Wallet />} />
          </Route>

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
