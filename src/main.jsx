import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import WeatherApp from './forecast'
import './main.css'
import Prac from './prac'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Prac/>
  </StrictMode>
)
