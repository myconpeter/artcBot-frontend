import { BrowserRouter, Routes, Route } from 'react-router'
import StartLayout from './layouts/StartLayout'
import FirstPageWelcome from './welcome/FirstPageWelcome'
import SecoundPageWelcome from './welcome/SecoundPageWelcome'
import ThirdPageWelcome from './welcome/ThirdPageWelcome'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<StartLayout />}>
          <Route path='/' element={<FirstPageWelcome />} />
          <Route path='welcome2' element={<SecoundPageWelcome />} />
          <Route path='welcome3' element={<ThirdPageWelcome />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
