
import axios from 'axios'
import React,{ useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { Link,useNavigate, useParams } from 'react-router-dom'

function Register() {
    
    const navigate=useNavigate()
  const [name, setname] = useState("")
  const [email, setemail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState({})
  const userId = useParams();


  useEffect(() => {
    try {
      (async function () {
        const { data } = await axios.get(
          `/api/admin/edituser/${userId.userId}`
        );
        console.log(data);
        setname(data.name);
        setemail(data.email);
      })();
    } catch (error) {
      throw new error(error.response.data.message);
    }
  }, []);


  
   const submitHandler=async (e)=>{
     e.preventDefault()
     
     try{
       const config = {
         header : {
           "Content-type" : "application/json",

         }
       }
       await axios.patch (`/api/admin/edituser/${userId.userId}`,
       { name,email},
       config
       );
      //  localStorage.setItem("userInfo",JSON.stringify(data));
      //  if(localStorage.userInfo){
         navigate('/admincontrol')
      //  }
     } catch (err) {
      
      setError(err.response.data.message)
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
    (e)=>setname(e.target.value)
    }  />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => {
      setemail(e.target.value)
    }} />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
   
<Row className='py-3'>
<Col>
Existing User ? <Link to="/">Alredy user Login Here</Link>
</Col>
</Row>
</Container>
    </div>
  )
}

export default Register