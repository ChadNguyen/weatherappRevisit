import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { DataContext } from '../contexts/DataProvider'
import { AuthContext } from '../contexts/AuthProvider'
import PostForm from '../components/PostForm'
import CityData from '../components/CityData'
import { signOut } from 'firebase/auth'

export default function Home() {
  const { cities } = useContext(DataContext)
  const { login, user, logout } = useContext(AuthContext)

  return (
    <div>
      <h1>Welcome to the Weather App</h1>
      {user.loggedIn ? (
        <div className="main-container">
          <h2>Welcome {user.displayName}!</h2>
          <h2>Here are your cities below:</h2>
          <PostForm />
          <div>
            <button onClick={() => logout(signOut)}>Logout</button>
            <Link to="/citydata">Add City</Link>
          </div>
        </div>
      ) : (
        <div>
          <Link to="/login">Login</Link>
          <button onClick={login}>Login</button>
        </div>
      )}
      <ul>
        {cities.map(city => (
          <li key={city.id}>
            <Link to={`/city/${city.id}`}>{city.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}


