import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import About from './components/About'
import Hero from './components/Hero'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import BookService from './pages/BookService'
import Service from './pages/Service'

function App() {
 

  return (
    <>
    <BrowserRouter>
       <Routes>
         <Route path='/' element={<Home/>}/>
         <Route path='/services' element={<Service/>}/>
         {/* <Route path='/services' element={<Services/>}/> */}
         {/* <Route path='/contact' element={<Contact/>}/> */}
         {/* <Route path='/about' element={<About/>}/> */}
         <Route path='/bookservice' element={<BookService/>}/>
       </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
