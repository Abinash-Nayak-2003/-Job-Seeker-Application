import { useEffect, useState, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import API_URL from '../../config.js'
import Container from 'react-bootstrap/Container'
import Spinner from '../Spinner.js'
import JobNav from './JobNav'
import { getToken, getPayLoad } from '../helpers/auth.js'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'

const JobActivities = () => {
  const { jobId } = useParams()
  const payLoad = getPayLoad()
  const user = payLoad.sub.toString()
  const [activityData, setActivityData] = useState(null)
  const [activitiesRemoved, setActivitiesRemoved] = useState(0)
  const [activitiesUpdated, setActivitiesUpdated] = useState(0)
  const [errors, setErrors] = useState(false)
  const [formData, setFormData] = useState({
    due_date: '',
    notes: '',
    completed_status: '',
    category: '',
    owner: '',
    job: '',
  })
  const [itemId, setItemId] = useState(null)
  const isMounted = useRef(false)

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/activities/job${jobId}/`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        })
        setActivityData(data)
      } catch (error) {
        setErrors(error.message)
        console.log(error.message)
      }
    }
    getData()
  }, [jobId, activitiesRemoved, activitiesUpdated, itemId])

  const handleCheckBoxChange = (event, item) => {
    setItemId(item.id)
    setFormData({
      due_date: item.due_date,
      notes: item.notes,
      completed_status: event.target.checked,
      category: item.category,
      job: item.job.toString(),
      owner: user,
    })
  }

  useEffect(() => {
    if (isMounted.current) {
      const handleSubmit = async () => {
        try {
          await axios.put(`${API_URL}/activities/${itemId}/`, formData, {
            headers: { Authorization: `Bearer ${getToken()}` },
          })
          setFormData({
            due_date: '',
            notes: '',
            completed_status: '',
            category: '',
            owner: '',
            job: '',
          })
          setActivitiesUpdated(prev => prev + 1)
        } catch (error) {
          setErrors(true)
          console.log(error)
        }
      }
      handleSubmit()
    } else {
      isMounted.current = true
    }
  }, [formData, itemId])

  const deleteActivity = async (event, activityId) => {
    event.preventDefault()
    try {
      await axios.delete(`${API_URL}/activities/${activityId}/`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      setActivitiesRemoved(prev => prev + 1)
    } catch (error) {
      setErrors(true)
      console.log(error)
    }
  }

  return (
    <>
      {activityData ? (
        <>
          <JobNav />
          <Container className='contact-container activity-container'>
            {activityData.map(item => {
              return (
                <Row
                  className='index-row'
                  key={item.id}
                  style={
                    item.completed_status
                      ? { backgroundColor: '#F1F4F8', color: '#6D8CDF' }
                      : { backgroundColor: 'white', color: '#364B85' }
                  }
                >
                  <Col md={1}>
                    <div className='box'>
                      <Form>
                        <Form.Check
                          type='checkbox'
                          id={`completed_status_${item.id}`}
                          checked={formData.id === item.id ? formData.completed_status : item.completed_status}
                          onChange={event => handleCheckBoxChange(event, item)}
                        />
                      </Form>
                    </div>
                  </Col>

                  <Col>
                    <div className='index-item box'>
                      <div
                        className='title'
                        style={
                          item.completed_status
                            ? { color: '#6D8CDF', fontWeight: 'normal' }
                            : { color: '#364B85' }
                        }
                      >
                        {item.category}
                      </div>
                      <div>{item.notes}</div>
                      <div>Due: {item.due_date}</div>
                    </div>
                  </Col>

                  <Col md={2}>
                    <div className='box'>
                      <Link to={`/edit-activity/job${jobId}/${item.id}`}>
                        <Button>
                          <i className='fa-solid fa-pen-to-square'></i>
                        </Button>
                      </Link>
                      <Button variant='danger' onClick={event => deleteActivity(event, item.id)}>
                        <i className='fa-solid fa-trash-can'></i>
                      </Button>
                    </div>
                  </Col>
                </Row>
              )
            })}
            <div className='center-btn' style={{ marginTop: '20px' }}>
              <Link to={`/add-job/${jobId}/activities`}>
                <Button>Add An Activity</Button>
              </Link>
            </div>
          </Container>
        </>
      ) : (
        <h2 className='text-center'>
          {errors ? 'Something went wrong. Please try again later' : <Spinner />}
        </h2>
      )}
    </>
  )
}

export default JobActivities
