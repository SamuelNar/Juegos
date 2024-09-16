import { useState } from 'react'
import './App.css'

import DiceGame from './components/DiceGame'
import Roulette from './components/Roulette'

function App() {
    return (
    <>
      <div className='App'>
        <Roulette/>     
      </div>   
    </>
  )
}

export default App
