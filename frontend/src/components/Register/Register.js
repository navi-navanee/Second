
import axios from 'axios'
import React,{ useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { Link,useNavigate } from 'react-router-dom'

function Register() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState('')

   const navigate=useNavigate()
  
   const submitHandler=async (e)=>{
     e.preventDefault()
     
     try{
       const config = {
         header : {
           "Content-type" : "application/json",

         }
       }
       const {data} =await axios.post ("/api/users",
       { name,email,password},
       config
       );

         navigate('/user')

     } catch (error) {
       console.log("error......",error.response.data);
      
      setError(error.response.data)
     }


   }

  return (
    <div>
         <Container  className="my-5" style={{backgroundColor:"lightblue"}}>
        <div style={{fontSize:100}}>
          Register
        </div>
       {/* {error&& <div>
          {error}
        </div>} */}
        <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Name</Form.Label>
    <Form.Control type="text" placeholder="Enter Your Name" value={name} onChange = {
    (e)=>setName(e.target.value)
    }  />
    <Form.Label style={{color:"red"}}>{error.name ? error.name : ''}</Form.Label>
   
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => {
      setEmail(e.target.value)
    }} />
    <Form.Label style={{color:"red"}}>{error.email ? error.email : ''}</Form.Label>

   
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>{
      setPassword(e.target.value)
    }} />
     <Form.Label style={{color:"red"}}>{error.password ? error.password : ''}</Form.Label>
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
   
<Row className='py-3'>
<Col>
Existing User ? <Link style={{color:"darkgreen"}} to="/"> Alredy user Login Here</Link>
</Col>
</Row>
</Container>
    </div>
  )
}

export default Register