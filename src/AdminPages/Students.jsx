import React, { useEffect, useState } from 'react'
import "../AdminPages/CSS/Students.css"
import DashboardLayout from '../Components/DashboardLayout'
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import { GrView } from "react-icons/gr"
const Students = () => {
const [students, setStudents] = useState([])

const fetchStudents = async () =>{
    try {
        const res = await axios.get("./Data/students.json")
        setStudents(res.data)
        console.log(res)
        
    }catch(error){
        console.log("class Error:", error);
        
    }
}

useEffect(()=>{
    fetchStudents()
},[])
  return (
  <>
  <DashboardLayout>
    <div className="student-header">
        <h3>All Students</h3>
        <input type="search" placeholder='Search by name, email, phone no.' />
    </div>
<div className="student-container">
    <Table striped bordered>
        <thead>
            <tr>
                <th>SR No.</th>
                <th>Name</th>
                <th>Mobile no.</th>
                <th>Email</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {
                students.map((s)=>(
                    <tr>
                        <td>{s._id}</td>
                        <td>{s.Name}</td>
                        <td>{s.PhoneNumber}</td>
                        <td>{s.Email}</td>
                        <td>
                             <button className='students-view-btn'>
                                                    <GrView />
                                                  </button>
                        </td>
                    </tr>
                ))
            }
        </tbody>
    </Table>

</div>
  </DashboardLayout>
  </>
  )
}

export default Students