import axios from 'axios'
import { getToken, getPayLoad } from './helpers/auth'
import { useEffect, useState, useRef } from 'react'
import { Container, Nav, Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'
import API_URL from '../config.js'
import Spinner from './Spinner.js'

const AllActivities = () => {
  const payLoad = getPayLoad()
  const user = payLoad.sub.toString()
  const [ activityData, setActivityData ] = useState(null)
  const [ errors, setErrors ] = useState(false)
  const [ filter, setFilter ] = useState('')
  const [ activitiesUpdated, setActivitiesUpdated ] = useState(0)
  const [ formData, setFormData ] = useState({
    due_date: '',
    notes: '',
    completed_status: '',
    category: '',
    owner: '',
    job: '',
  })
  const [ itemId, setItemId ] = useState(null)
  const isMounted = useRef(false)

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/activities/${filter}`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,  
          },
        })
        setActivityData(data)
      } catch (error) {
        setErrors(error.message)
        console.log(error.message)
      }
    } 
    getData()
  }, [filter, activitiesUpdated, itemId])

  const handleCheckBoxChange = (event, item) => {
    setItemId(item.id)
    event.target.checked
      ? setFormData({ due_date: item.due_date, notes: item.notes, completed_status: true, category: item.category, job: item.job.id.toString(), owner: user })
      : setFormData({ due_date: item.due_date, notes: item.notes, completed_status: false, category: item.category, job: item.job.id.toString(), owner: user })
  }

  useEffect(() => {
    if (isMounted.current) {
      const handleSubmit = async () => {
        try {
          await axios.put(`${API_URL}/activities/${itemId}/`, formData, {
            headers: {
              Authorization: `Bearer ${getToken()}`,  
            },
          })
          setFormData({ due_date: '', notes: '', completed_status: '', category: '', owner: '', job: '' })
        } catch (error) {
          setErrors(true)
          console.log(error)
        }
      }
      handleSubmit()
      setActivitiesUpdated(prev => prev + 1)
    } else {
      isMounted.current = true
    }
  }, [formData])

  return (
    <>
      { activityData 
        ?
        <div>
          <Container className='index-container' >
            <Nav variant="tabs">
              <Nav.Item>
                <Nav.Link onClick={() => setFilter('')} >All Activities</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={() => setFilter('today/')}>Due Today</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={() => setFilter('past/')}>Past Due</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={() => setFilter('completedFalse/')}>Incomplete</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={() => setFilter('completedTrue/')}>Completed</Nav.Link>
              </Nav.Item>
            </Nav>

            { activityData.map(item => {
              const { id } = item
              return (
                <Row 
                  className='index-row' 
                  key={id}  // ✅ Add unique key here
                  style={ item.completed_status ? { backgroundColor: '#F1F4F8', color: '#6D8CDF' } : { backgroundColor: 'white', color: '#364B85' } } 
                >
                  <Col md={1}>
                    <div className='box'>
                      <Form>
                        <Form.Check 
                          type="checkbox"
                          id={`completed_status_${id}`} // ✅ unique id for checkbox
                          checked={formData.id === item.id ? formData.completed_status : item.completed_status}
                          onChange={event => handleCheckBoxChange(event, item)}
                        />
                      </Form>
                    </div>
                  </Col>

                  <Col>
                    <Link className='index-item box' to={`/jobs/${item.job.id}/activities`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <div className='title' style={ item.completed_status ? { color: '#6D8CDF', fontWeight: 'normal' } : { color: '#364B85' }} > {item.category} </div>
                      <div>{item.job.company_name}</div>
                      <div>{item.job.title}</div>
                      <div>{item.due_date}</div>
                    </Link>
                  </Col>

                  <Col md={1}>
                    <div className='box'>
                      <Link to={`/edit-activity/${item.job.id}/${item.id}`}>
                        <i className="fa-solid fa-pen-to-square" style={{ cursor: 'pointer' }}></i>
                      </Link>
                    </div>
                  </Col>
                </Row>
              )
            })}
          </Container>
        </div>
        :
        <h2 className="text-center">
          { errors ? 'Something went wrong. Please try again later' : <Spinner /> }
        </h2>
      }
    </>
  )
}

export default AllActivities
