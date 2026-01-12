import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AdminLogin = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      // Put the object on a single line to avoid comma-dangle errors
      const response = await axios.post('/api/admin/login/', { username: username, password: password })
      window.localStorage.setItem('admin-token', response.data.token)
      window.localStorage.setItem('admin-user', JSON.stringify({ id: response.data.id, username: response.data.username, is_admin: response.data.is_admin }))
      navigate('/admin-dashboard')
    } catch (err) {
      console.error('Admin login error:', err)
      alert('Invalid admin credentials')
    }
  }

  return (
    <div>
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default AdminLogin
