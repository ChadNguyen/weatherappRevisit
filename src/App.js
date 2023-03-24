import logo from './logo.svg';
import './App.css';
import { useState, useContext } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { AuthContext } from './contexts/AuthProvider'
import Home from './views/Home'
import Login from './views/Login'
import CityData from './components/CityData'
import City from './views/City';

function App() {
  const { login, user, logout } = useContext(AuthContext)

  return (
    <BrowserRouter>
      <div>
        <header>
          <h1>Weather App</h1>
        </header>
        <div>
        {
          (user.loggedIn) ? 
          <>
            <button onClick={logout}>Log Out</button>
            <p>Current User: {user.displayName}</p>
          </>:
          <>
          <button onClick={login}>Log In</button>
          </>
        }
        </div>

        <Routes>
        <Route path="/" element= {<Home />} />
        <Route path="/login" element= {<Login />} />
        <Route path="/CityData" element= {<CityData />} />
        <Route path="/city/:id" element= {<City />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}


export default App;
