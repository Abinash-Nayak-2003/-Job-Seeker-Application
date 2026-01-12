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
  const [ company, setCompany ] = useState(null)
  const [ companyDeleted, setCompanyDeleted ] = useState(0)
  const [ errors, setErrors ] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/companies/job${jobId}/`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,  
          },
        })
        setCompany(data)
        // console.log('data', data)
      } catch (error) {
        setErrors(error.message)
        console.log(error.message)
      }
    }
    getData()
  }, [jobId, companyDeleted])

  const deleteCompany = async (event, companyId) => {
    event.preventDefault()
    try {
      const { data } = await axios.delete(`${API_URL}/companies/${companyId}/`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      // console.log(data)
      setCompanyDeleted(companyDeleted + 1)
    } catch (error) {
      setErrors(true)
      console.log(error)
    }
  }

  return (
    <>
      <JobNav />
      <div>
        <Container className='job-details company-details'>
          { company ?
            (company[0]
              ?
              <div className="kitchen-sink">
                <Card>
                  {/* <Card.Img variant="top" src="" /> */}
                  <Card.Body>
                    <Card.Title className="title">{company[0].name}</Card.Title>
                    {/* <Card.Text>
                  Some quick example text to build on the card title and make up 
                    </Card.Text> */}
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item>
                      <div className="label">Industry</div>
                      <div className="content">{company[0].industry}</div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <div className="label">Location</div>
                      <div className="content">{company[0].hq_location}</div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <div className="label">Size</div>
                      <div className="content">{company[0].size}</div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <div className="label">Type</div>
                      <div className="content">{company[0].type}</div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <div className="label">Website</div>
                      <div className="content">{company[0].company_url}</div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <div className="label">Description</div>
                      <div className="content">{company[0].description}</div>
                    </ListGroup.Item>
                  </ListGroup>
                  <Card.Body className='card-buttons'>
                    <div>
                      <Link to={`/edit-company/job${company[0].job}/${company[0].id}`}>
                        <Button><i className="fa-solid fa-pen-to-square"></i></Button>
                      </Link>
                    </div>
                    <div>
                      <Button variant="danger" onClick={event => deleteCompany(event, company[0].id)}>
                        <i className="fa-solid fa-trash-can"></i>
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </div>
              :
              <div className='center-btn' style={{ marginTop: '20px' }}>
                <Link to={`/add-job/${jobId}/company`}>
                  <Button>Add Company</Button>
                </Link>
              </div>)
              
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