import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { Button, Card, Container, Navbar } from 'react-bootstrap'

function Admincontrol() {
  const navigate=useNavigate()

const [userDetails, setuserDetails] = useState([])
const [refresh, setRefresh] = useState(false);
const [search, setsearch] = useState("");
const [filterValue, setfilterValue] = useState([]);

useEffect (()=>{
  const adminInfo = localStorage.getItem("adminInfo")
  if(adminInfo) {
    navigate("/admincontrol");
   ( async function() {
      try{
        const config = {
          header :{
            "Content-type " : "application/json"
          },
        };
        const { data } =await axios.get("/api/admin",config);
        console.log(data);
        setuserDetails(data)
        setfilterValue(data);


      }catch (error) {
        throw new error(error.response.data.message)
      }
    })();
  } else{
    navigate('/admin')
  }
},[refresh ,navigate])

useEffect(() => {
  const result = userDetails.filter((users) => {
    return users.name.toLowerCase().match(search.toLowerCase());
  });
  setfilterValue(result);
}, [search ,userDetails ]);


const deleteuser = async (userId) => {
  if (window.confirm(`Are you want to delete....?`)) {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    await axios.delete("/api/admin/deleteuser", {
      params: {
        id: userId,
      },
      config,
    });
    setRefresh(!refresh);
  } catch (error) {
    throw new error(error.response.data.message);
  }
}
};

const editHandler = async (userId) => {
  try {
    navigate(`/edituser/${userId}`);
  } catch (error) {
    throw new error(error.response.data.message);
  }
};



const columns = [
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Email",
    selector: (row) => row.email,
    sortable: true,
  },
  {
    name: "Options",
    cell: (row) => (
      <div>
      <Button
        onClick={() => {
        editHandler(row._id);
        }}>Edit
      </Button>

           <Button style= {{color:"red" , backgroundColor:"black",marginLeft:"5px"}}
           onClick={() => deleteuser(row._id)}
         >
           Delete
         </Button>
         </div>
    ),
  },


]

  return (
<div>
<Navbar bg='primary'>
    <Container>
      <Navbar.Brand >welcome Admin</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
      <Navbar.Brand onClick={() => {
        localStorage.clear();
        navigate('/admin')
      }}>Logout</Navbar.Brand>
      </Navbar.Collapse>
    </Container>
  </Navbar>

    <div
    className="d-flex justify-content-center mt-5"
    style={{ marginTop: "150px" }}
  >
    <Card style={{ height: "100%", width: "80%" ,backgroundColor:"rebeccapurple"}}>
      <DataTable
        title={"User Details"}
        columns={columns}
        data={filterValue}
        pagination
        fixedHeader
        highlightOnHover
        subHeader
        subHeaderComponent={
          <input
            type="text"
            placeholder="Serch here..."
            className="w-25 form-control"
            value={search}
            onChange={(e) => {
              setsearch(e.target.value);
            }}
          />
        }
      />
    </Card>
  </div>
  </div>
  )
}

export default Admincontrol