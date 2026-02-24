import { useState } from 'react';
import Navbar from './components/navbar.jsx';
import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './pages/Home.jsx';
import DailyNotes from './pages/DailyNotes.jsx';
import Setting from './pages/Setting.jsx';

function App() {
  return (
    <>

      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/daily_notes' element={<DailyNotes />} />
          <Route path='/setting' element={<Setting />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
