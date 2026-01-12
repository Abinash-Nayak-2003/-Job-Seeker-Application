
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import API_URL from '../../config.js'
import Nav from 'react-bootstrap/Nav'
import { getToken } from '../helpers/auth.js'

const JobNav = () => {
  const { jobId } = useParams()
  const [ job, setJob ] = useState(null)
  const [ errors, setErrors ] = useState(false)

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/jobs/${jobId}/`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,  
          },
        })
        setJob(data)
        // console.log('nav data', data)

      } catch (error) {
        setErrors(error.message)
        console.log(error.message)
      }
    }
    getData()
  }, [])

  return (
    <div>
      { job ?
        <>
          <div className='nav-header'>
            <h1>{job.title}</h1>
            <h2>{job.company_name}</h2>
          </div>
        </>
        :
        <></>
      }
      <Nav variant="tabs" className='job-nav'>
        <Nav.Item>
          <Nav.Link as={Link} to={`/jobs/${jobId}`}>Job Details</Nav.Link> 
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to={`/jobs/${jobId}/company`} >Company</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to={`/jobs/${jobId}/activities`}>Activities</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to={`/jobs/${jobId}/notes`} >Notes</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to={`/jobs/${jobId}/contacts`} >Contacts</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  )
}
  
  
export default JobNav