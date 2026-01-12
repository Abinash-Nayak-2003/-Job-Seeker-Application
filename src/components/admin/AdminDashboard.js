import axios from 'axios'
import { useEffect, useState } from 'react'

const getAdminToken = () => window.localStorage.getItem('admin-token')

const AdminDashboard = () => {
  const [data, setData] = useState({ total_users: 0, logged_in_users: 0 })
  const [error, setError] = useState(null)

  useEffect(() => {
    axios.get('/api/admin/dashboard/', {
      headers: { Authorization: `Bearer ${getAdminToken()}` }
    })
      .then(res => setData(res.data))
      .catch(err => {
        console.error('AdminDashboard error:', err)
        setError(err)
      })
  }, [])

  if (error) return <div>Access denied or server error (403)</div>

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p>Total Users: {data.total_users}</p>
      <p>Logged Users: {data.logged_in_users}</p>
    </div>
  )
}

export default AdminDashboard
