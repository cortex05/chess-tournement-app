import { useState } from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'


function App() {

  return (
    <>
      <h1>Chess Tournament!</h1>
    </>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)