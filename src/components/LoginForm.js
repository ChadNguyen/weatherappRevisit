import { useState, useContext } from 'react'
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth'
import { AuthContext } from '../contexts/AuthProvider'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useContext(AuthContext)

  function handleSubmit(event) {
    event.preventDefault()
    const auth = getAuth()
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        login()
      })
      .catch(error => {
        console.error(error.message)
      })
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" value={email} onChange={event => setEmail(event.target.value)} />
      <label htmlFor="password">Password:</label>
      <input type="password" id="password" value={password} onChange={event => setPassword(event.target.value)} />
      <button type="submit">Login</button>
    </form>
  )
}