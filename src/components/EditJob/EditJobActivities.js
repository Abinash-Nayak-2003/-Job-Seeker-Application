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


const EditJobActivities = () => {

  const { activityId } = useParams()
  const navigate = useNavigate()
  const payLoad = getPayLoad()
  const user = payLoad.sub.toString()

  const [ formData, setFormData ] = useState({
    due_date: '',
    notes: '',
    completed_status: '',
    category: '',
    owner: '',
    job: '',
  })
  const [ errors, setErrors ] = useState(false)

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/activities/${activityId}/`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,  
          },
        })

        setFormData({ ...formData, due_date: data.due_date, notes: data.notes, completed_status: data.completed_status, category: data.category, job: data.job.toString(), owner: user })

      } catch (error) {
        setErrors(true)
      }
    }
    getData()
  }, [])


  const handleChange = (event, error) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
    // console.log(formData)
  }

  const handleCheckBoxChange = (event, error) => {
    event.target.checked ?
      setFormData({ ...formData, completed_status: 'true' })
      :
      setFormData({ ...formData, completed_status: 'false' })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      // console.log('form data ->', formData)
      const { data } = await axios.put(`${API_URL}/activities/${activityId}/`, formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,  
        },
      })
      // console.log(data)
      // console.log(('form data job', formData.job))
      navigate(`/jobs/${formData.job}/activities`)
    } catch (error) {
      setErrors(true)
      console.log(error)
    }
  }


  return (
    <>
      <div className='form-page'>
        <JobNav />
        <Container className='add-job'>
          <Row>
            <Form onSubmit={handleSubmit}>
              <div className='activity-form'>
                <Form.Group className="job-form-field" >
                  <Form.Label>Due Date</Form.Label>
                  <Form.Control  onChange={handleChange} type="date" name="due_date" placeholder='+ add Date' value={formData.due_date}  />
                </Form.Group>
                <Form.Group className="job-form-field">
                  <Form.Label>Category</Form.Label>
                  <Form.Select onChange={handleChange} name="category" value={formData.category} >
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
                  <Form.Label>Note</Form.Label>
                  <Form.Control onChange={handleChange} as="textarea" name="notes" placeholder={formData.notes} value={formData.notes} /> 
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

export default EditJobActivities 