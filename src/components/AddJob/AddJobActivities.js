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


const AddJobActivities = () => {
  const { jobId } = useParams()
  const navigate = useNavigate()

  const [ formData, setFormData ] = useState({
    due_date: '',
    notes: '',
    completed_status: 'false',
    category: '',
    owner: '',
    job: '',
  })
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    const payLoad = getPayLoad()
    const user = payLoad.sub.toString()
    setFormData({ ...formData, owner: user, job: jobId })
  }, [])

  const [ errors, setErrors ] = useState(false)
  
  const handleChange = (event, error) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      // console.log('form data ->', formData)
      const { data } = await axios.post(`${API_URL}/activities/`, formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,  
        },
      })
      // console.log(data)
      navigate(`/jobs/${jobId}/activities`)
    } catch (error) {
      setErrors(true)
      console.log(error)
    }
  }


  return (
    <>
      <div >
        <JobNav />
        <Container className='add-job'>
          <Row>
            <Form onSubmit={handleSubmit}>
              <div className='activity-form'>
                <Form.Group className="job-form-field">
                  <Form.Label>Category</Form.Label>
                  <Form.Select onChange={handleChange} name="category" value={formData.category} >
                    <option>+ add Category</option>
                    <option value="Job-Specific CV">Job-Specific CV</option>
                    <option value="Job-Specific Resume">Job-Specific Resume</option>
                    <option value="Apply">Apply</option>
                    <option value="Follow Up">Follow Up</option>
                    <option value="Email: Response Required">Email: Response Required</option>
                    <option value="Call: Response Required">Call: Response Required</option>
                    <option value="Documents Requested: Response Required">Documents Requested: Response Required</option>
                    <option value="Phone Interview">Phone Interview</option>
                    <option value="Video Interview">Video Interview</option>
                    <option value="Technical Interview">Technical Interview</option>
                    <option value="On Site Interview">On Site Interview</option>
                    <option value="Follow Up: Thank You">Follow Up: Thank You</option>
                    <option value="Offer: Response Required">Offer: Response Required</option>
                    <option value="Other">Other</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="job-form-field" >
                  
                  <Form.Label>Due Date</Form.Label>
                  <Form.Control  onChange={handleChange} type="date" name="due_date" placeholder='+ add Date' value={formData.due_date}  />
                </Form.Group>

                <Form.Group className="job-form-field" >
                  <Form.Label>Note</Form.Label>
                  <Form.Control onChange={handleChange} as="textarea" name="notes" placeholder="+ add Notes" value={formData.notes} /> 
                </Form.Group>
              </div>
              { errors && <p className='text-danger'>{errors}</p>}
              <Form.Group className='center-btn'>
                <Button type="submit">
                  Add Activity
                </Button>
              </Form.Group>
            </Form>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default AddJobActivities 