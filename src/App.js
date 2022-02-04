import * as React from 'react';
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom';


import Cards from './components/Cards.js'
import Signup from './components/Signup'
import Login from './components/Login'

import NavBar from './components/NavBar';

import { AuthProvider } from './utils/AuthContext'


function App() {
    return (
        <AuthProvider>
                <NavBar/>
                <div className='app'>
                <Routes>
                    <Route path="/" exact element={<Navigate to="/login"/>}/>
                    <Route path="/login" exact element={<Login />}/>
                    <Route path="/signup" exact element={<Signup />}/>
                    <Route path="/lobby" exact element={<Cards />}/>
                    {/* <Route path="/profile" element={<App />}/> */}
                </Routes>
            </div>
        </AuthProvider>
    )
}

export default App
