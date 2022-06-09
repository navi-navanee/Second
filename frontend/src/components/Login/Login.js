import React, { useState, useEffect } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState('')
  const navigate = useNavigate()


  const submintHandler = async (e) => {
    e.preventDefault()

    try {
      const config = {
        header: {
          "Content-type ": "application/json"
        }
      }


      const { data } = await axios.post('/api/users/login', {
        email,
        password,
      },
        config
      )

      console.log(data);
      localStorage.setItem('userInfo', JSON.stringify(data))
      if (localStorage.userInfo) {
        navigate('/user')
      }


    } catch (error) {
      console.log("eror........", error.response.data);
      setError(error.response.data)

    }

  }
  return (
    <Container className="my-5" style={{backgroundColor:"lightblue"}}>
      <div style={{ fontSize: 100 }}>
        LOGIN
      </div>
      {/* {error&& <div>
          {error}
        </div>} */}
      <Form onSubmit={submintHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => {
            setEmail(e.target.value)
          }} />
          <Form.Label style={{color:"red"}}>{error.email ? error.email : ''}</Form.Label>
    
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => {
            setPassword(e.target.value)
          }} />
          <Form.Label style={{ color: "red" }}>{error.password ? error.password : ''}</Form.Label>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          New customer? <Link to="/register">Register here</Link>
        </Col>
      </Row>
    </Container>
  )
}

export default Login