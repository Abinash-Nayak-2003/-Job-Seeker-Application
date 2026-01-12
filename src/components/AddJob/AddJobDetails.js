import axios from 'axios'
import { getToken, getPayLoad } from '../helpers/auth'
import { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { useNavigate } from 'react-router-dom'
import API_URL from '../../config.js'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const AddJobDetails = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    company_name: '',
    title: '',
    location: '',
    salary: '',
    benefits: '',
    requirements: '',
    description: '',
    job_type: '',
    job_url: '',
    job_status: 'Saved',
    owner: '',
    post_date: '', // added to prevent uncontrolled input warning
  })

  const [errors, setErrors] = useState(false)

  // Set owner from token
  useEffect(() => {
    const payLoad = getPayLoad()
    if (payLoad && payLoad.sub) {
      const user = payLoad.sub.toString()
      setFormData(prev => ({ ...prev, owner: user }))
    }
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await axios.post(`${API_URL}/jobs/`, formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      navigate(`/jobs/${data.id}`)
    } catch (error) {
      setErrors(true)
      console.log('Error:', error)
      if (error.response && error.response.data) {
        console.log('Backend Response:', error.response.data)
      }
    }
  }

  return (
    <div className='form-page'>
      <Container className='add-job'>
        <Form onSubmit={handleSubmit}>
          <div className='job-form'>
            <Form.Group className="job-form-field">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                name="company_name"
                placeholder="+ add Name"
                value={formData.company_name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="job-form-field">
              <Form.Label>Job Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="+ add Title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="job-form-field">
              <Form.Label>Post Date</Form.Label>
              <Form.Control
                type="date"
                name="post_date"
                placeholder='+ add Date'
                value={formData.post_date}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="job-form-field">
              <Form.Label>Job Type</Form.Label>
              <Form.Select
                name="job_type"
                value={formData.job_type}
                onChange={handleChange}
                required
              >
                <option value="">+ add Job Type</option>
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Temporary">Temporary</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="job-form-field">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                placeholder='+ add Location'
                value={formData.location}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="job-form-field">
              <Form.Label>Salary</Form.Label>
              <Form.Control
                type="text"
                name="salary"
                placeholder='+ add Salary'
                value={formData.salary}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="job-form-field">
              <Form.Label>Benefits</Form.Label>
              <Form.Control
                type="text"
                name="benefits"
                placeholder='+ add Benefits'
                value={formData.benefits}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="job-form-field">
              <Form.Label>Post URL</Form.Label>
              <Form.Control
                type="text"
                name="job_url"
                placeholder='+ add URL'
                value={formData.job_url}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="job-form-field">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                style={{ height: '150px' }}
                name="description"
                placeholder='+ add Description'
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="job-form-field">
              <Form.Label>Requirements</Form.Label>
              <Form.Control
                as="textarea"
                style={{ height: '150px' }}
                name="requirements"
                placeholder='+ add Requirements'
                value={formData.requirements}
                onChange={handleChange}
              />
            </Form.Group>
          </div>

          {errors && <p className='text-danger'>Something went wrong. Please check your input.</p>}

          <Form.Group className='center-btn mt-3'>
            <Button type="submit">Save</Button>
          </Form.Group>
        </Form>
      </Container>
    </div>
  )
}

export default AddJobDetails
