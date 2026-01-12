import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API_URL from '../config.js'
import { setToken } from './helpers/auth'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'


const Login = () => {
  const navigate = useNavigate() 
  const [ errors, setErrors ] = useState('')
  const [ loginData, setLoginData ] = useState({
    email: '',
    password: '',
  })

  const handleChange = (event) => {
    setLoginData({ ...loginData, [event.target.name]: event.target.value  })
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await axios.post(`${API_URL}/auth/login/`, loginData)
      setToken(data.token)

      navigate('/jobs')
    } catch (error) {
      console.log(error)
      setErrors('Invalid Credentials')
    }
  }
  

  return  (     
    <main>
      <Container className='login-form'>
        <Row>
          <Form onSubmit={onSubmit} >
            <h1>Login</h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type='text' name='email' placeholder='Email' onChange={handleChange} value={loginData.email} />   
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control type='password' name='password' placeholder='Password' onChange={handleChange} value={loginData.password} />
            </Form.Group>
            <Form.Group className='reg-btn center-btn'>
              <Button type="submit"> Submit</Button>
            </Form.Group>
            { errors && <p className='error text-danger'>{errors}</p>}
          </Form>
        </Row>
      </Container>
    </main>    
  )
}

export default Login

