import axios from 'axios'
import { getToken } from './helpers/auth'
import { useEffect, useState } from 'react'
import { Container, Nav, Row, Col, Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import API_URL from '../config.js'
import Spinner from './Spinner.js'

const JobIndex = () => {
  const [jobData, setJobData] = useState(null)
  const [errors, setErrors] = useState(false)
  const [filter, setFilter] = useState('ALL')
  const [searchTerm, setSearchTerm] = useState('')

  // 🔹 FETCH JOBS
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/jobs/`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        })
        setJobData(data)
      } catch (error) {
        setErrors(true)
      }
    }
    getData()
  }, [])

  // 🔹 UPDATE JOB STATUS
  const handleStatusChange = async (jobId, newStatus) => {
    try {
      const job = jobData.find(j => j.id === jobId)

      await axios.put(
        `${API_URL}/jobs/${jobId}/`,
        {
          company_name: job.company_name,
          title: job.title,
          job_type: job.job_type,
          job_status: newStatus,
          owner: job.owner.id,
        },
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      )

      setJobData(prev =>
        prev.map(j => (j.id === jobId ? { ...j, job_status: newStatus } : j))
      )

      setFilter(newStatus)
    } catch (error) {
      console.error('Status update error:', error.response?.data || error.message)
    }
  }

  // 🔹 DELETE JOB
  const handleDelete = async jobId => {
    if (!window.confirm('Are you sure you want to delete this job?')) return

    try {
      await axios.delete(`${API_URL}/jobs/${jobId}/`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })

      setJobData(prev => prev.filter(j => j.id !== jobId))
    } catch (error) {
      console.error('Delete error:', error.response?.data || error.message)
    }
  }

  // 🔹 FILTERED JOBS BASED ON TAB + SEARCH
  const filteredJobs =
    jobData &&
    jobData
      .filter(job => filter === 'ALL' || job.job_status === filter)
      .filter(job =>
        searchTerm === ''
          ? true
          : job.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.title.toLowerCase().includes(searchTerm.toLowerCase())
      )

  return (
    <>
      {jobData ? (
        <Container className='job-index index-container'>
          {/* 🔹 FILTER TABS */}
          <Nav variant='tabs' className='mb-3'>
            {['ALL', 'Applied', 'Interview', 'Offer', 'Declined'].map(status => (
              <Nav.Item key={status}>
                <Nav.Link active={filter === status} onClick={() => setFilter(status)}>
                  {status}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>

          {/* 🔹 SEARCH BAR */}
          <Form className='mb-3 d-flex' onSubmit={e => e.preventDefault()}>
            <Form.Control
              type='text'
              placeholder='Search by company or job title...'
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <Button variant='primary' className='ms-2' onClick={() => setFilter('ALL')}>
              Search
            </Button>
          </Form>

          {/* 🔹 HEADER */}
          <Row className='fw-bold border-bottom pb-2 mb-2 text-center'>
            <Col md={1}></Col>
            <Col md={2}>Company</Col>
            <Col md={2}>Job Title</Col>
            <Col md={2}>Type</Col>
            <Col md={2}>Status</Col>
            <Col md={3}>Activities</Col>
          </Row>

          {/* 🔹 JOB LIST */}
          {filteredJobs && filteredJobs.length > 0 ? (
            filteredJobs.map(job => (
              <Row key={job.id} className='py-2 border-bottom align-items-center text-center'>
                <Col md={1} className='d-flex justify-content-center gap-2'>
                  {/* EDIT BUTTON */}
                  <Link to={`/edit-job/${job.id}`}>
                    <Button size='sm' variant='primary'>
                      <i className='fa-solid fa-pen-to-square'></i>
                    </Button>
                  </Link>

                  {/* DELETE BUTTON */}
                  <Button size='sm' variant='danger' onClick={() => handleDelete(job.id)}>
                    <i className='fa-solid fa-trash'></i>
                  </Button>
                </Col>

                <Col md={2}>{job.company_name}</Col>
                <Col md={2}>{job.title}</Col>
                <Col md={2}>{job.job_type}</Col>

                {/* STATUS DROPDOWN */}
                <Col md={2}>
                  <Form.Select
                    value={filter === 'ALL' ? '' : job.job_status}
                    onChange={e => handleStatusChange(job.id, e.target.value)}
                  >
                    {filter === 'ALL' && <option value='' disabled>Select Status</option>}
                    <option value='Applied'>Applied</option>
                    <option value='Interview'>Interview</option>
                    <option value='Offer'>Offer</option>
                    <option value='Declined'>Declined</option>
                  </Form.Select>
                </Col>

                {/* ACTIVITIES */}
                <Col md={3} className='text-start'>
                  {job.activities && job.activities.length > 0 ? (
                    <ul className='mb-0 ps-3'>
                      {job.activities.map(activity => (
                        <li key={activity.id}>
                          {activity.category} — {activity.due_date}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <Link to={`/add-job/${job.id}/activities`}>
                      <Button size='sm'>Add Activity</Button>
                    </Link>
                  )}
                </Col>
              </Row>
            ))
          ) : (
            <p className='text-center'>No jobs found.</p>
          )}

          <div className='text-center mt-3'>
            <Link to='/add-job'>
              <Button>Add A Job</Button>
            </Link>
          </div>
        </Container>
      ) : (
        <h2 className='text-center'>{errors ? 'Something went wrong.' : <Spinner />}</h2>
      )}
    </>
  )
}

export default JobIndex
