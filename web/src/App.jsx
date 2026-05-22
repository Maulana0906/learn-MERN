  import { useState } from 'react';
  import Navbar from './components/navbar.jsx';
  import './App.css'
  import {BrowserRouter, Route, Routes} from 'react-router-dom';
  import Home from './pages/Home.jsx';
  import DailyNotes from './pages/DailyNotes.jsx';
  import Setting from './pages/Setting.jsx';
  import Login from './pages/Login.jsx';
  import {NotesProvider} from './context/NotesProvider.jsx'
  import MainLayout from './layouts/MainLayout.jsx';
  import AuthLayout from './layouts/AuthLayout.jsx';
  import { AuthProvider } from './context/AuthContext.jsx';
  import AuthGuard from './components/guards/AuthGuard.jsx';
  import GuestGuard from './components/guards/GuestGuard.jsx';
  import { AuthUtils } from './utils/AuthUtils.jsx';

  function App() {

    return (
      <>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route element={
                <AuthGuard>
                  <NotesProvider>
                    <MainLayout/>
                  </NotesProvider>
                </AuthGuard>
                  }>
                <Route path='/' element={<Home />} />
                <Route path='/daily_notes' element={<DailyNotes/>} />
                <Route path='/setting' element={<Setting />} />
              </Route>

              <Route element={
                <GuestGuard>
                  <AuthLayout/>
                </GuestGuard>
                }>
                <Route path='/login' element={<Login />} />
              </Route>
            </Routes>
          </AuthProvider>
        </BrowserRouter>

      </> 
    )
  }

  export default App


