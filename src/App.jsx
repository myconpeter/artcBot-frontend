import { BrowserRouter, Routes, Route } from 'react-router'
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

function App() {
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
      </Routes>
    </BrowserRouter>
  )
}

export default App
