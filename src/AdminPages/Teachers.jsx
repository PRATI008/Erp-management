import React, {useEffect, useState} from 'react'
import DashboardLayout from '../Components/DashboardLayout'
import Modal from 'react-bootstrap/Modal';
import "../AdminPages/CSS/Teachers.css"
import Table from 'react-bootstrap/Table';
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import axios from 'axios';
import { IoClose, IoMenu } from "react-icons/io5";
const Teachers = () => {
  const[modalShow, setModalShow] = useState(false);
  const[teachers, setTeacher] = useState([])
  const[loading, setLoading] = useState(true)

  const fetchTeacher = async()=>{
    try{
      const res = await axios.get('./Data/Teachers.json')
      console.log(res);
      setTeacher(res.data);
      } catch(error){
        console.log(error);
        
      }finally{
        setLoading(false)
      }
  }
  useEffect(()=>{
    fetchTeacher()
  },[])
  return (
 <>
 <DashboardLayout>
    <div className="all-teacher-header">
        <h2>All Teachers</h2>
        <button className='add-create-teacher' onClick={()=>setModalShow(true)}>Create Teachers</button>
       </div>

       


<Table striped bordered className='teacher-table' cellPadding='0' cellSpacing='0'>
  <thead>
    <tr>
      <th>SR NO</th>
      <th>Name</th>
      <th>Mobile</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {
      teachers.map((teacher)=>(
        <tr>
          <td>{teacher._id}</td>
          <td>{teacher.Name}</td>
          <td>{teacher.Mobile}</td>
          <td>
            <div className="teacher-edit-delete-btns">
                         <button className='teacher-edit-btn'><FaEdit/></button>
                        <button className='teacher-delete-btn'><AiFillDelete/></button>
                       </div>
          </td>
        </tr>
      ))
    }
  </tbody>
</Table>
       

       <Modal show={modalShow} centered   size="lg-2"
      aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header className='modal-header display-flex justify-content-between align-items-center'>
            <h1 className="fs-4">Add Teacher</h1>
            <button className="btn bg-dark text-white display-flex justify-content-center align-items-center p-2" onClick={()=> setModalShow(false)}><span className='teacher-close'><span className='teacher-modal-close'><IoClose/></span></span></button>
        </Modal.Header>
        <Modal.Body>
<div className="teacher-body">
 <div className="teacher-input-section">
   <input type="text" placeholder='Enter Teacher Name' />
  <input type="number" placeholder='Enter Mobile Number' />
 </div>
  <button>Add</button>
</div>
        </Modal.Body>
        
       </Modal>


   </DashboardLayout>
 </>
  )
}

export default Teachers