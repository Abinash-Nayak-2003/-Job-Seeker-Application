import axios from 'axios'
import JobNav from '../Job/JobNav'
import { getToken, getPayLoad } from '../helpers/auth'
import { useState, useEffect } from 'react'
import  Container from 'react-bootstrap/Container'
import  Row  from 'react-bootstrap/Row'
import { useNavigate, useParams } from 'react-router-dom'
import API_URL from '../../config.js'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


const EditJobDetails = () => {

  const navigate = useNavigate()
  const { jobId } = useParams()
  const payLoad = getPayLoad()
  const user = payLoad.sub.toString()
  const [ formData, setFormData ] = useState({
    company_name: '',
    title: '',
    post_date: '',
    location: '',
    salary: '',
    benefits: '',
    requirements: '',
    description: '',
    job_type: '',
    job_url: '',
    job_status: '',
    owner: '',
  })
  const [ errors, setErrors ] = useState(false)
  
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/jobs/${jobId}/`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,  
          },
        })
        setFormData({ ...formData, company_name: data.company_name, title: data.title, post_date: data.post_date, location: data.location, salary: data.salary, benefits: data.benefits, job_url: data.job_url, requirements: data.requirements, description: data.description, job_status: data.job_status, job_type: data.job_type, owner: user })
      } catch (error) {
        setErrors(true)
      }
    }
    getData()
  }, [])

  const handleChange = (event, error) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      // console.log('form data ->', formData)
      const { data } = await axios.put(`${API_URL}/jobs/${jobId}/`, formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,  
        },
      })
      // console.log('updated data ->', data)
      navigate(`/jobs/${data.id}`)
    } catch (error) {
      setErrors(true)
      console.log(error)
    }
  }


  return (
    <>
      <JobNav { ...jobId } />
      <div className='form-page'>
        <Container className='add-note'>
          <Row>
            <Form onSubmit={handleSubmit}>
              <div className='job-form'>
                <Form.Group className="job-form-field" >
                  <Form.Label>Company Name</Form.Label>
                  <Form.Control onChange={handleChange} type="text" name="company_name" placeholder={formData.company_name} value={formData.company_name} /> 
                </Form.Group>
                <Form.Group className="job-form-field" >
                  <Form.Label>Job Title</Form.Label>
                  <Form.Control onChange={handleChange} type="text" name="title" placeholder="+ add Title" value={formData.title} /> 
                </Form.Group>
                <Form.Group className='job-form-field'>
                  <Form.Label>Job Status</Form.Label>
                  <Form.Select onChange={handleChange} name="job_status" value={formData.job_status}>
                    <option value="Saved">Saved</option>
                    <option value="Applied">Applied</option>
                    <option value="Interview">Interview</option>
                    <option value="Offer">Offer</option>
                    <option value="Declined">Declined</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="job-form-field" >
                  <Form.Label>Post Date</Form.Label>
                  <Form.Control  onChange={handleChange} type="date" name="post_date" placeholder='+ add Date' value={formData.post_date}  />
                </Form.Group>
                <Form.Group className='job-form-field'>
                  <Form.Label>Job Type</Form.Label>
                  <Form.Select onChange={handleChange} name="job_type" value={formData.job_type}>
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Temporary">Temporary</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="job-form-field" >
                  <Form.Label>Location</Form.Label>
                  <Form.Control onChange={handleChange} type="text" name="location" placeholder='+ add Location' value={formData.location} /> 
                </Form.Group>
                <Form.Group className="job-form-field" >
                  <Form.Label>Salary</Form.Label>
                  <Form.Control onChange={handleChange} type="text" name="salary" placeholder='+ add Salary' value={formData.salary}  />
                </Form.Group>
                <Form.Group className="job-form-field" >
                  <Form.Label>Benefits</Form.Label>
                  <Form.Control onChange={handleChange} type="text" name="benefits" placeholder='+ add Benefits' value={formData.benefits} /> 
                </Form.Group>
                <Form.Group className="job-form-field" >
                  <Form.Label>Post URL</Form.Label>
                  <Form.Control onChange={handleChange} type="text" name="job_url" placeholder='+ add URL' value={formData.job_url}  />
                </Form.Group>
                <Form.Group className="job-form-field" >
                  <Form.Label>Description</Form.Label>
                  <Form.Control onChange={handleChange} type="textarea" name="description" placeholder='+ add Description' value={formData.description} /> 
                </Form.Group>
                <Form.Group className="job-form-field" >
                  <Form.Label>Requirements</Form.Label>
                  <Form.Control onChange={handleChange} type="textarea" name="requirements" placeholder='+ add Requirements' value={formData.requirements} /> 
                </Form.Group>
              </div>
              { errors && <p className='text-danger'>{errors}</p>}
              <Form.Group className='center-btn'>
                <Button type="submit">
                  Save
                </Button>
              </Form.Group>
            </Form>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default EditJobDetails 