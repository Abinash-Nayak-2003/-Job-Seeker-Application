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
import Form from 'react-bootstrap/Form'

const JobNote = () => {
  const { jobId } = useParams()
  const [ noteData, setNoteData ] = useState(null)
  const [ noteRemoved, setNoteRemoved ] = useState(0)
  const [ errors, setErrors ] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/notes/job${jobId}/`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,  
          },
        })
        setNoteData(data)
      } catch (error) {
        setErrors(error.message)
        console.log(error.message)
      }
    }
    getData()
  }, [jobId, noteRemoved])

  const deleteNote = async (event, noteId) => {
    event.preventDefault()
    try {
      const { data } = await axios.delete(`${API_URL}/notes/${noteId}/`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      // console.log(data)
      setNoteRemoved(noteRemoved + 1)
    } catch (error) {
      setErrors(true)
      console.log(error)
    }
  }


  return (
    <>
      <JobNav />
      <div className='note-container'>
        { noteData ?
          (noteData[0]
            ?
            <>
              <div className='note-details'>
                <Container className='job-details'>
                  {  noteData.map(note => {
                    const { id } = note
                    return (
                      <>
                        <div className="kitchen-sink">
                          <Card>
                            <Card.Body>
                              <ListGroup className="list-group-flush">
                                <ListGroup.Item>
                                  <div className="title">Notes</div>
                                  <div className="content">{note.notes}</div>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                  <div className="label">Excitement Level</div>
                                  <div>
                                    <Form.Group>
                                      <Form.Control  type="range" min="0" max="100" step="10" name="excitement" value={note.excitement} />
                                    </Form.Group>
                                  </div>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                  <div className="label">Questions</div>
                                  <div className="content">{note.questions}</div>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                  <div className="label">Pros</div>
                                  <div className="content">{note.pros}</div>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                  <div className="label">Cons</div>
                                  <div className="content">{note.cons}</div>
                                </ListGroup.Item>
                              </ListGroup>
                            </Card.Body>
                            <Card.Body className='card-buttons'>
                              <div>
                                <Link to={`/edit-note/job${jobId}/${note.id}`}>
                                  <Button><i className="fa-solid fa-pen-to-square"></i></Button>
                                </Link>
                              </div>
                              <div>
                                <Button variant="danger" onClick={event => deleteNote(event, note.id)}><i className="fa-solid fa-trash-can"></i></Button>
                              </div>
                            </Card.Body>
                          </Card>
                        </div>
                      </>
                    )
                  }
                  )}
                </Container>
              </div>
            </>
            :   
            <div className='center-btn' style={{ marginTop: '20px' }}>            
              <Link to={`/add-job/${jobId}/note`}>
                <Button>Add A Note</Button>
              </Link>
            </div>)
          :
          <h2 className="text-center">
            { errors ? 'Something went wrong. Please try again later' : <Spinner />}
          </h2>
        }
      </div>
    </>
  )
}

export default JobNote