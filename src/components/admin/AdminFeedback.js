import axios from 'axios'
import { useEffect, useState } from 'react'

const getAdminToken = () => window.localStorage.getItem('admin-token')

const AdminFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([])

  useEffect(() => {
    axios
      .get('/api/admin/feedback/', {
        headers: { Authorization: `Bearer ${getAdminToken()}` }
      })
      .then(res => setFeedbacks(res.data))
      .catch(err => console.error('Error fetching feedbacks:', err))
  }, [])

  return (
    <div>
      <h3>User Feedback</h3>
      {feedbacks.length === 0 ? (
        <p>No feedback yet.</p>
      ) : (
        feedbacks.map(f => (
          <p key={f.id}>
            <b>{f.user ? f.user.username : 'Guest'}</b> ({f.rating}/5): {f.message}
          </p>
        ))
      )}
    </div>
  )
}

export default AdminFeedback
