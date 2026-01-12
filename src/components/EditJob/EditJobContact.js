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


const AddJobContact = () => {

  const { contactId } = useParams()
  const navigate = useNavigate()
  const payLoad = getPayLoad()
  const user = payLoad.sub.toString()

  const [ formData, setFormData ] = useState({
    first_name: '',
    last_name: '',
    title: '',
    phone: '',
    email: '',
    owner: '',
    job: '',
  })
  const [ errors, setErrors ] = useState(false)
  

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/contacts/${contactId}/`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,  
          },
        })

        setFormData({ ...formData, first_name: data.first_name, last_name: data.last_name, title: data.title, phone: data.phone, email: data.email, job: data.job.toString(), owner: user })
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
      const { data } = await axios.put(`${API_URL}/contacts/${contactId}/`, formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,  
        },
      })
      // console.log(data)
      navigate(`/jobs/${formData.job}/contacts`)
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

export default AddJobContact