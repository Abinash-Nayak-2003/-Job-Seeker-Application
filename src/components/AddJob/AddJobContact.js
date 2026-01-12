import axios from 'axios'
import JobNav from './../Job/JobNav'
import { getToken, getPayLoad } from '../helpers/auth'
import { useState, useEffect } from 'react'
import  Container from 'react-bootstrap/Container'
import  Row  from 'react-bootstrap/Row'
import { useNavigate, useParams } from 'react-router-dom'
import API_URL from '../../config.js'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


const AddJobContact = () => {
  const { jobId } = useParams()
  const navigate = useNavigate()

  const [ formData, setFormData ] = useState({
    first_name: '',
    last_name: '',
    title: '',
    phone: '',
    email: '',
    owner: '',
    job: '',
  })

  useEffect(() => {
    const payLoad = getPayLoad()
    const user = payLoad.sub.toString()
    setFormData({ ...formData, owner: user, job: jobId })
  }, [])

  const [ errors, setErrors ] = useState(false)
  
  const handleChange = (event, error) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
    // console.log('form data', formData)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      // console.log('form data ->', formData)
      const { data } = await axios.post(`${API_URL}/contacts/`, formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,  
        },
      })
      // console.log(data)
      navigate(`/jobs/${jobId}/contacts`)
    } catch (error) {
      setErrors(true)
      console.log(error)
    }
  }


  return (
    <>
      <div className='form-page'>
        <JobNav />
        <Container className='add-note'>
          <Row>
            <Form onSubmit={handleSubmit}>
              <div className='job-form'>
                <Form.Group className="job-form-field" >
                  <Form.Label>First</Form.Label>
                  <Form.Control onChange={handleChange} type="text" name="first_name" placeholder="+ add First Name" value={formData.first_name} /> 
                </Form.Group>
                <Form.Group className="job-form-field" >
                  <Form.Label>Last</Form.Label>
                  <Form.Control onChange={handleChange} type="text" name="last_name" placeholder="+ add Last Name" value={formData.last_name} /> 
                </Form.Group>
                <Form.Group className="job-form-field" >
                  <Form.Label>Title</Form.Label>
                  <Form.Control onChange={handleChange} type="text" name="title" placeholder="+ add Job Title" value={formData.title} /> 
                </Form.Group>
                <Form.Group className="job-form-field" >
                  <Form.Label><i className="fa-solid fa-phone"></i> Phone</Form.Label>
                  <Form.Control onChange={handleChange} type="text" name="phone" placeholder="+ add Number" value={formData.phone} /> 
                </Form.Group>
                <Form.Group className="job-form-field" >
                  <Form.Label><i className="fa-solid fa-envelope"></i> Email</Form.Label>
                  <Form.Control onChange={handleChange} type="text" name="email" placeholder="+ add Email" value={formData.email} /> 
                </Form.Group>
              </div>
              { errors && <p className='text-danger'>{errors}</p>}
              <Form.Group className='center-btn'>
                <Button type="submit">
                  Add Contact
                </Button>
              </Form.Group>
            </Form>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default AddJobContact