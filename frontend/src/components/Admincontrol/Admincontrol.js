import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { Button, Card } from 'react-bootstrap'

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
}, [search]);


const deleteuser = async (userId) => {
  if (window.confirm(`Sure to Delete?`)) {
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
    name: "",
    cell: (row) => (
      <Button
        variant="outlined"
        color="primary"
        
        onClick={() => {
          editHandler(row._id);
        }}
      >
        Edit
      </Button>
    ),
  },
  {
    name: "",
    cell: (row) => (
      <Button
        variant="outlined"
        color="error"
        onClick={() => deleteuser(row._id)}
      >
        Delete
      </Button>
    ),
  },

]

  return (
    <div
    className="d-flex justify-content-center"
    style={{ marginTop: "150px" }}
  >
    <Card style={{ height: "100%", width: "80%" }}>
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
  )
}

export default Admincontrol