import React, { useEffect, useState } from 'react'
import axios from 'axios';
import DashboardLayout from '../Components/DashboardLayout'
import "../AdminPages/CSS/Subjects.css"
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
const Subjects = () => {
  const[modalShow, setModalShow] = useState(false);
  const[subjects, SetSubject] = useState([])
  
  const fetchSubject = async()=>{
    try{
      const res = await axios.get('/Data/Subjects.json');
      console.log(res);
      SetSubject(res.data)
      
    }catch (error){
      console.log(error);
      
    }
  }
  useEffect(()=>{
fetchSubject()
},[])
  return (
   <>
   <DashboardLayout>
    <div className="all-subjects-header">
      <h2>All Subjects</h2>
      <button className='create-subject-btn' onClick={()=>setModalShow(true)}>Add Subjects</button>
    </div>

{/* suject table */}
<Table striped bordered className='subject-table' cellPadding='0' cellSpacing='0'>
  <thead>
    <tr>
    <th>SR No</th>
    <th>Name</th>
    <th>Action</th>
  </tr>
  </thead>
  <tbody>
    {
      subjects.map((subject)=>(
        <tr>
          <td>{subject._id}</td>
          <td>{subject.name}</td>
          <td>
           <div className="subject-edit-delete-btns">
             <button className='subject-edit-btn'><FaEdit/></button>
            <button className='subject-delete-btn'><AiFillDelete/></button>
           </div>
          </td>
        </tr>
      ))
    }
  </tbody>
</Table>



    <Modal show={modalShow} centered size='lg-2' className='h-100'>
      <Modal.Header className='container-sm display-flex justify-content-between align-items-center'>
<h2 className='fs-4'>Create Subjects</h2>
<button className=' p-md-2 border ' onClick={()=> setModalShow(false)}>X</button>
      </Modal.Header>
      <Modal.Body>

<div className="subject-body">
  <input type="text" placeholder='Enter Your Subject Name' />
<button>ADD</button>
</div>
      </Modal.Body>
     
    </Modal>
   </DashboardLayout>
   </>
  )
}

export default Subjects