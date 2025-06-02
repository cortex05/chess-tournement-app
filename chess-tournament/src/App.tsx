import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'

import Home from './screens/Home/Home'
import New from './screens/New/New'
import Saved from './screens/Saved/Saved'
import Tournament from './screens/Tournament/Tournament'
import type { IPlayer } from './types/types'


function App() {
  // const [activeRoster, setActiveRoster] = useState<IPlayer[]>([])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/new" element={<New />}/>
        <Route path="/saved" element={<Saved />}/>
        <Route path="/tournament" element={<Tournament />}/>
      </Routes>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)