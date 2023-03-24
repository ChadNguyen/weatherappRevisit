import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthProvider'
import LoginForm from '../components/LoginForm'

export default function Login() {
  const { user } = useContext(AuthContext)

  return (
    <div>
      <h1>Login</h1>
      {
        (user.loggedIn) ?
        <LoginForm /> :
        <></>
      }
    </div>
  )
}


