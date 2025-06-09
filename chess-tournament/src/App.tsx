import { StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'

import Home from './screens/Home/Home'
import New from './screens/New/New'
import Saved from './screens/Saved/Saved'
import Tournament from './screens/Tournament/Tournament'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/new" element={<New />}/>
        <Route path="/saved" element={<Saved />}/>
        <Route path="/tournament/:tourney" element={<Tournament />}/>
      </Routes>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)