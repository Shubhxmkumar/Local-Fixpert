import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import About from './components/About'
import Hero from './components/Hero'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Footer from './components/Footer'
import Service from './pages/Service'
import RegisterPage from './components/RegisterPage'
import LoginPage from './components/LoginPage'

function App() {
 
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/service' elememt={<Service/>}/>
          <Route path='/signup' element={<RegisterPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
