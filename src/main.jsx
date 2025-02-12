import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ReduxStore from './redux/store.jsx'
import { Provider } from 'react-redux'

const root = document.getElementById('root')

ReactDOM.createRoot(root).render(
  <Provider store={ReduxStore}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>
)
