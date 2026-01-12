import axios from 'axios'
import { useEffect, useState } from 'react'

const getAdminToken = () => window.localStorage.getItem('admin-token')

const AdminQuestions = () => {
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    axios
      .get('/api/admin/questions/', {
        headers: { Authorization: `Bearer ${getAdminToken()}` }
      })
      .then(res => setQuestions(res.data))
      .catch(err => console.error('Error fetching questions:', err))
  }, [])

  return (
    <div>
      <h3>User Questions</h3>
      {questions.length === 0 ? (
        <p>No questions yet.</p>
      ) : (
        questions.map(q => (
          <p key={q.id}>
            <b>{q.user ? q.user.username : 'Guest'}</b>: {q.question}
          </p>
        ))
      )}
    </div>
  )
}

export default AdminQuestions
