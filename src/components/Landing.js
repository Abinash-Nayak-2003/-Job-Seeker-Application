import { useState } from 'react'
import '../styles/main.css'
import { Link } from 'react-router-dom'
import computerImg from '../img/computer.jpg'
import handshakeImg from '../img/handshake.jpg'

const Landing = () => {
  const [question, setQuestion] = useState('')
  const [feedback, setFeedback] = useState('')
  const [questionMessage, setQuestionMessage] = useState('')
  const [feedbackMessage, setFeedbackMessage] = useState('')

  // Submit Question (works for any user)
  const submitQuestion = async (e) => {
    e.preventDefault()
    if (!question.trim()) return

    try {
      const res = await fetch('http://127.0.0.1:8000/api/questions/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ question })
      })

      if (res.ok) {
        setQuestion('')
        setQuestionMessage('Question sent successfully!')
        setTimeout(() => setQuestionMessage(''), 3000)
      } else {
        const data = await res.json()
        setQuestionMessage(data.detail || 'Failed to send question')
      }
    } catch (err) {
      console.error(err)
      setQuestionMessage('Server error. Please try again.')
    }
  }

  // Submit Feedback (works for any user)
  const submitFeedback = async (e) => {
    e.preventDefault()
    if (!feedback.trim()) return

    try {
      const res = await fetch('http://127.0.0.1:8000/api/feedback/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: feedback })
      })

      if (res.ok) {
        setFeedback('')
        setFeedbackMessage('Feedback submitted successfully!')
        setTimeout(() => setFeedbackMessage(''), 3000)
      } else {
        const data = await res.json()
        setFeedbackMessage(data.detail || 'Failed to submit feedback')
      }
    } catch (err) {
      console.error(err)
      setFeedbackMessage('Server error. Please try again.')
    }
  }

  return (
    <main className="landing-pro">

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Track Your Job Search Smarter</h1>
          <p>
            Seeker helps you manage job applications, interviews, and follow-ups
            — all in one secure place.
          </p>

          <div className="hero-buttons">
            <Link to="/register">
              <button className="primary-btn">Get Started</button>
            </Link>
            <Link to="/login">
              <button className="secondary-btn">Login</button>
            </Link>
          </div>

          <p className="demo-text">
            Email: <strong>admin21@gmail.com</strong> | Password: <strong>abinash@2003</strong>
          </p>
        </div>

        <div className="hero-image">
          <img src={computerImg} alt="Job tracking dashboard" />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Everything You Need to Stay Organized</h2>

        <div className="features-grid">
          <div className="feature-card">
            <h3>Application Tracking</h3>
            <p>Keep all job applications organized with status updates.</p>
          </div>

          <div className="feature-card">
            <h3>Company Research</h3>
            <p>Store company details, notes, and contacts in one place.</p>
          </div>

          <div className="feature-card">
            <h3>Reminders & Follow-ups</h3>
            <p>Never miss interviews or follow-up deadlines.</p>
          </div>

          <div className="feature-card">
            <h3>Activity Timeline</h3>
            <p>Track interviews, calls, and tasks related to each job.</p>
          </div>
        </div>
      </section>

      {/* Ask a Question */}
      <section className="user-form-section">
        <h2>Ask a Question</h2>
        <form onSubmit={submitQuestion}>
          <textarea
            placeholder="Write your question here..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
          <button type="submit" className="primary-btn">
            Submit Question
          </button>
        </form>
        {questionMessage && <p className="success-msg">{questionMessage}</p>}
      </section>

      {/* Give Feedback */}
      <section className="user-form-section">
        <h2>Give Feedback</h2>
        <form onSubmit={submitFeedback}>
          <textarea
            placeholder="Write your feedback here..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
          />
          <button type="submit" className="secondary-btn">
            Submit Feedback
          </button>
        </form>
        {feedbackMessage && <p className="success-msg">{feedbackMessage}</p>}
      </section>

      {/* Trust Section */}
      <section className="trust-section">
        <div className="trust-image">
          <img src={handshakeImg} alt="Professional meeting" />
        </div>

        <div className="trust-content">
          <h2>Built for Job Seekers</h2>
          <p>
            Whether you are a student, fresher, or experienced professional,
            Seeker helps you stay focused and confident throughout your job search.
          </p>
        </div>
      </section>

    </main>
  )
}

export default Landing
