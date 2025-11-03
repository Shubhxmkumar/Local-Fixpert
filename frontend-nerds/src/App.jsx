import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import About from './components/About'
import Hero from './components/Hero'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <Navbar/>
      <Hero/>
       <About/>
      {/* <Service/> */}
    </>
  )
}

export default App
