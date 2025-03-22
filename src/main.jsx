import { createRoot } from 'react-dom/client'
import AppRouter from './Router'
import { BrowserRouter } from 'react-router-dom'
import './style.css'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppRouter />
  </BrowserRouter>,
)
