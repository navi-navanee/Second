import React, { useState, useEffect } from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { useNavigate} from "react-router-dom";


function User() {

  const [user, setUser] = useState({})
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo")
    if(userInfo){
      navigate('/user')
      setUser(JSON.parse(userInfo))
    }else{
      navigate('/')
    }
  }, [navigate])


  return (
    <Navbar bg='primary'>
    <Container>
      <Navbar.Brand >welcome {user.name}</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
      <Navbar.Brand onClick={() => {
        localStorage.clear();
        navigate('/')
      }}>Logout</Navbar.Brand>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default User