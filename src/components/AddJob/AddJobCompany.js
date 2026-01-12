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

const AddJobCompany = () => {

  const { jobId } = useParams()
  const navigate = useNavigate()
  const [ companyImported, setCompanyImported ] = useState(0)

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
  const [ linkedInUrl, setLinkedInUrl ] = useState({
    liUrls: [],
  })
  const [ errors, setErrors ] = useState(false)
  
  useEffect(() => {
    const payLoad = getPayLoad()
    const user = payLoad.sub.toString()
    setFormData({ ...formData, owner: user, job: jobId })
  }, [jobId, companyImported])
  
  const handleChange = (event, error) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
    console.log('form data', formData)
  }

  const handleImportChange = (event, error) => {
    setLinkedInUrl({ liUrls: [event.target.value] })
  }
  
  const handleImport = async (event) => {
    event.preventDefault()
    try {

      const { data } = await axios.post('https://linkedin-company-data.p.rapidapi.com/linkedInCompanyData', linkedInUrl, {
        headers: {
          'X-RapidAPI-KEY': process.env.REACT_APP_API_KEY,
          'X-RapidAPI-Host': 'linkedin-company-data.p.rapidapi.com', 
        },
      })
      // console.log(data[0])
      data[0].Founded 
        ? 
        setFormData({ ...formData, name: data[0].CompanyName, industry: data[0].Industries, founded: data[0].Founded, hq_location: data[0].Headquarters, size: data[0].CompanySize, type: data[0].Type, company_url: data[0].Website, description: data[0].Description })
        : 
        setFormData({ ...formData, name: data[0].CompanyName, industry: data[0].Industries, founded: '', hq_location: data[0].Headquarters, size: data[0].CompanySize, type: data[0].Type, company_url: data[0].Website, description: data[0].Description })
      

      setCompanyImported(companyImported + 1)
    } catch (error) {
      setErrors(true)
      console.log(error)
    }
  }

  useEffect(() => {
    // console.log('Change in form data', formData)
  },[formData])

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      // console.log('form data ->', formData)
      const { data } = await axios.post(`${API_URL}/companies/`, formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,  
        },
      })
      // console.log(data)
      navigate(`/jobs/${jobId}/company`)
    } catch (error) {
      setErrors(true)
      console.log(error)
    }
  }


  return (
    <>
      <div className='form-page'>
        <JobNav />
        <Container className='add-company'>
          <Row>
            <Form onSubmit={handleImport}>
              <div >
                <Form.Group className="job-form-field" >
                  <Form.Label>Import Company Info from LinkedIn</Form.Label>
                  <Form.Control onChange={handleImportChange} style={{ width: '600px', height: '150px' }} as="textarea" name="linkedInUrl" placeholder={'+ add Company LinkedIn URL  \n Format:  https://www.linkedin.com/school/generalassembly/'} value={linkedInUrl.url} /> 
                </Form.Group>
              </div>
              <Form.Group className='center-btn'>
                <Button type="submit">
                  Import Company
                </Button>
              </Form.Group>

            </Form>

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

export default AddJobCompany 