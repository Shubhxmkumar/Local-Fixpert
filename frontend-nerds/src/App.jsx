import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import About from './components/About'
import Hero from './components/Hero'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
       <Navbar/>
       <Routes>
         <Route path='/' element={<Home/>}/>
         {/* <Route path='/services' element={<Services/>}/> */}
         {/* <Route path='/contact' element={<Contact/>}/> */}
         {/* <Route path='/about' element={<About/>}/> */}
       </Routes>
      {/* <Service/> */}
      </BrowserRouter>
    </>
  )
}

export default App
