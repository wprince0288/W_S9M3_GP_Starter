import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useInput } from '../hooks'

const BASE_URL = 'http://localhost:9009/acme/auth'

export default function Login() {
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const usernameInput = useInput('username')
  const passwordInput = useInput('password')
  const onSubmit = async e => {
    e.preventDefault()
    const payload = {
      username: usernameInput.value,
      password: passwordInput.value,
    }
    try {
      const res = await axios.post(`${BASE_URL}/login`, payload)
      localStorage.setItem('token', res.data.token)
      navigate('/')
    } catch (err) {
      localStorage.removeItem('token')
      setMessage(err.response?.data?.message || 'Something bad happened')
    }
  }
  return (
    <div className="screen">
      <h3>Login Page</h3>
      {message}
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="username"
          {...usernameInput}
        />
        <input
          type="password"
          placeholder="password"
          {...passwordInput}
        />
        <button>Login</button>
      </form>
    </div>
  )
}
