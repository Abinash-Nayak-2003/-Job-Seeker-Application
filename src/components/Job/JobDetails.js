import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import API_URL from '../../config.js'
import Container from 'react-bootstrap/Container'
import ListGroup from 'react-bootstrap/ListGroup'
import Spinner from '../Spinner.js'
import JobNav from './JobNav'
import  Card  from 'react-bootstrap/Card'
import { getToken } from '../helpers/auth.js'
import  Button  from 'react-bootstrap/Button'

const JobDetails = () => {
  const { jobId } = useParams()
  const [ job, setJob ] = useState(null)
  const [ errors, setErrors ] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/jobs/${jobId}/`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,  
          },
        })
        setJob(data)
      } catch (error) {
        setErrors(error.message)
        console.log(error.message)
      }
    }
    getData()
  }, [])

  const deleteJob = async (event, jobId) => {
    event.preventDefault()
    try {
      const { data } = await axios.delete(`${API_URL}/jobs/${jobId}/`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      // console.log(data)
      navigate('/jobs')
    } catch (error) {
      setErrors(true)
      console.log(error)
    }
  }

  return (
    <>
      <JobNav />
      <div>
        <Container className='job-details'>
          { job ? 
            <div className="kitchen-sink">
              <Card>
                {/* <Card.Img variant="top" src="" /> */}
                <Card.Body>
                  <Card.Title className="title">{job.title}</Card.Title>
                  <Card.Title className="title">{job.company_name}</Card.Title>
                  {/* <Card.Text>
                Some quick example text to build on the card title and make up 
                  </Card.Text> */}
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>
                    <div className="label">Status</div>
                    <div className="content">{job.job_status}</div>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div className="label">Job Type</div>
                    <div className="content">{job.job_type}</div>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div className="label">Location</div>
                    <div className="content">{job.location}</div>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div className="label">Salary</div>
                    <div className="content">{job.salary}</div>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div className="label">Benefits</div>
                    <div className="content"> {job.benefits}</div>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div className="label">Description</div>
                    <div className="content">{job.description}</div>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div className="label">Requirements</div>
                    <div className="content">{job.requirements}</div>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div className="label">Post Date</div>
                    <div className="content">{job.post_date}</div>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div className="label">Post URL</div>
                    <div className="content">{job.job_url}</div>
                  </ListGroup.Item>
                </ListGroup>
                <Card.Body className='card-buttons'>
                  <div>
                    <Link to={`/edit-job/${jobId}/`}>
                      <Button><i className="fa-solid fa-pen-to-square"></i></Button>
                    </Link>
                  </div>
                  <div>
                    <Button variant="danger" onClick={event => deleteJob(event, jobId)}><i className="fa-solid fa-trash-can"></i></Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
            :
            <h2 className="text-center">
              { errors ? 'Something went wrong. Please try again later' : <Spinner />}
            </h2>
          } 
        </Container>
      </div>
    </>
  )
}

export default JobDetails