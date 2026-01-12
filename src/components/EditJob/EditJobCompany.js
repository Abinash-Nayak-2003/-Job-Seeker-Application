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


const EditJobCompany = () => {

  const { jobId, companyId } = useParams()
  const navigate = useNavigate()
  const payLoad = getPayLoad()
  const user = payLoad.sub.toString()

  const [ formData, setFormData ] = useState({
    name: '',
    industry: '',
    hq_location: '',
    size: '',
    type: '',
    company_url: '',
    description: '',
    owner: '',
    job: '',
  })
  const [ errors, setErrors ] = useState(false)
  
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/companies/${companyId}/`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,  
          },
        })
        setFormData({ ...formData, name: data.name, industry: data.industry, hq_location: data.hq_location, size: data.size, type: data.type, company_url: data.company_url, description: data.description, job: data.job.toString(), owner: user })
      } catch (error) {
        setErrors(true)
      }
    }
    getData()
  }, [])

  const handleChange = (event, error) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
    // console.log('form data', formData)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      // console.log('form data ->', formData)
      const { data } = await axios.put(`${API_URL}/companies/${companyId}/`, formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,  
        },
      })
      // console.log(data)
      navigate(`/jobs/${formData.job}/company`)
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
                  <Form.Label>Company Name</Form.Label>
                  <Form.Control onChange={handleChange} type="text" name="name" placeholder="+ add Name" value={formData.name} /> 
                </Form.Group>
                <Form.Group className="job-form-field" >
                  <Form.Label>Industry</Form.Label>
                  <Form.Control onChange={handleChange} type="text" name="industry" placeholder="+ add Industry" value={formData.industry} /> 
                </Form.Group>
                <Form.Group className="job-form-field" >
                  <Form.Label>Headquarters Location</Form.Label>
                  <Form.Control onChange={handleChange} type="text" name="hq_location" placeholder='+ add Location' value={formData.hq_location} /> 
                </Form.Group>
                <Form.Group className="job-form-field" >
                  <Form.Label>Size</Form.Label>
                  <Form.Control onChange={handleChange} type="text" name="size" placeholder='+ add Number of Employees' value={formData.size} /> 
                </Form.Group>
                <Form.Group className="job-form-field" >
                  <Form.Label>Type</Form.Label>
                  <Form.Control onChange={handleChange} type="text" name="type" placeholder='+ add Type' value={formData.type}  />
                </Form.Group>
                <Form.Group className="job-form-field" >
                  <Form.Label>Website</Form.Label>
                  <Form.Control onChange={handleChange} as="textarea" name="company_url" placeholder='+ add URL' value={formData.company_url} /> 
                </Form.Group>
                <Form.Group className="job-form-field" >
                  <Form.Label>Description</Form.Label>
                  <Form.Control onChange={handleChange} as="textarea" name="description" placeholder='+ add Description' value={formData.description} /> 
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

export default EditJobCompany