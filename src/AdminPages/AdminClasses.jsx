import React, { useEffect, useState } from 'react'
import DashboardLayout from '../Components/DashboardLayout'
import "./CSS/AdminClasses.css"
import axios from 'axios'
import Modal from 'react-bootstrap/Modal'
import { IoClose } from "react-icons/io5"
import Table from 'react-bootstrap/Table'
import { AiFillDelete } from "react-icons/ai"
import { FaEdit } from "react-icons/fa"
import { GrView } from "react-icons/gr"
import { CiCirclePlus } from "react-icons/ci";


const AdminClasses = () => {

  const [modalShow, setModalShow] = useState(false)
  const [modalClass, setModalClass] = useState(false)
  const [subjects, setSubject] = useState([])
  const [teachers, setTeacher] = useState([])
  const [classes, setClasses] = useState([])

  // const [handleShow, setHandleShow] = useState(false)
  const [selectedClass, setSelectedClass] = useState(null)
  const [modalClassData, setModalClassData] = useState([])
  const [loading, setLoading]= useState(true)

  const [rows, setRows] = useState([
    {
      teacher: "",
      subject: ""
    }
  ])
  const [rows1, setRows1] = useState([
    {
      fee:"" 
    }
  ])

  const fetchClasses = async () => {
    try {
      const res = await axios.get('./Data/classdetails.json')
      setClasses(res.data)
      console.log("Class Data:", res.data)
    } catch (error) {
      console.log("Class Error:", error)
    }
  }

  const fetchSubject = async () => {
    try {
      const res = await axios.get('./Data/Subjects.json')
      console.log("Subject Data:", res.data)
      setSubject(res.data)
    } catch (error) {
      console.log("Subject Error:", error)
    }
  }

  const fetchTeacher = async () => {
    try {
      const res = await axios.get('./Data/Teachers.json')
      console.log("Teacher Data:", res.data)
      setTeacher(res.data)
    } catch (error) {
      console.log("Teacher Error:", error)
    }
  }

  useEffect(() => {
    setTimeout(()=>{
 fetchSubject()
    fetchTeacher()
    fetchClasses()
    },2000)
   
  }, [])

  const addMore = () => {
    setRows([
      ...rows,
      {
        teacher: "",
        subject: ""
      }
    ])
  }

  const addMore1 = ()=>{
    setRows1([
    ...rows1,{
      fee:""
    }

  ])
}

  const handleShow = (data) =>{
    setModalClass(true)
    console.log(data);
    setModalClassData(data)
    
  }

  return (
    <>
      <DashboardLayout>

        <div className="all-classes-header">

          <h2>All Classes</h2>

          <button
            className="add-create-class"
            onClick={() => setModalShow(true)}
          >
            Create Class
          </button>

        </div>


        <div className="all-classes-table">

          <Table striped bordered cellPadding='0' cellSpacing='0'>

            <thead>

              <tr>
                <th>SR No.</th>
                <th>Class</th>
                <th>Action</th>
              </tr>

            </thead>


            <tbody>

              {classes.map((c) => (

                <tr key={c._id}>

                  <td>{c._id}</td>

                  <td>{c.class}</td>

                  <td>

                    <div className="classes-edit-delete-btns">

                      <button className='classes-edit-btn'>
                        <FaEdit />
                      </button>

                      <button className='classes-delete-btn'>
                        <AiFillDelete />
                      </button>

                      <button
                        className='classes-view-btn'
                        onClick={() => {
                          // setSelectedClass(c)
                          // setHandleShow(true)
                          handleShow(c)
                        }}
                      >
                        <GrView />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </Table>

        </div>


        {/* VIEW CLASS MODAL */}

        <Modal
          show={modalClass}
          centered
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
        >

          <Modal.Header className="modal-header display-flex justify-content-between align-items-center">

            <h1 className="fs-4">
              View Class
            </h1>

            <button
              className="all-classes-btn btn bg-dark text-white display-flex justify-content-center align-items-center p-2"
              onClick={() => setModalClass(false)
                // setSelectedClass(null)
              }
            >

              <span className='all-classes-icon'>
                <IoClose />
              </span>

            </button>

          </Modal.Header>


          <Modal.Body>

            {/* {selectedClass && ( */}

              

                <div className="mb-3">

                  <h4 className='main-class-name'>
                    Class: {modalClassData?.class ?? "Class Name"}
                  </h4>

                </div>


                <Table bordered striped style={{textAlign:"center"}}>

                  <thead>

                    <tr>
                      {/* <th>SR No.</th> */}
                       {/*<th>Class</th> */}
                     
                      <th>Subject</th>
                      <th>Teacher</th>
                    </tr>

                  </thead>


                  <tbody>{modalClassData?.subjects?.map((d) => (
                    <tr>

                        {/* <td>{index + 1}</td> */}

                        {/* <td>{selectedClass.class}</td> */}
                        {/* <td>{d._id}</td> */}

                        <td>{d.subject}</td>

                        <td>{d.teacher}</td>

                      </tr>

                    ))}

                  </tbody>

                </Table>

              <h3>Fee</h3>
              <Table striped bordered style={{textAlign:"center"}}>
                <thead>
                  <tr>
                    <th>Fee Type</th>
                    <th>Fee Amount</th>
                    <th>Payment Type</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    modalClassData?.fee?.map((f)=>(
                      <tr>
                        <td>{f.FeeType}</td>
                        <td>{f.Amount}</td>
                        <td>{f.PaymentType}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>

            

          </Modal.Body>

        </Modal>


        {/* CREATE CLASS MODAL */}

        <Modal
          show={modalShow}
          centered
          aria-labelledby="contained-modal-title-vcenter"
        >

          <Modal.Header className="modal-header display-flex justify-content-between align-items-center">

            <h1 className="fs-4">
              Create Class
            </h1>


            <button
              className="btn bg-dark text-white display-flex justify-content-center align-items-center p-2"
              onClick={() => setModalShow(false)}
            >

              <span className="allclass-close">

                <span className="class-modal-close">
                  <IoClose />
                </span>

              </span>

            </button>

          </Modal.Header>


          <Modal.Body>

            <div className="adminclass-input">

              <input
                type="text"
                placeholder="Enter your Class"
              />


              <div>

                {rows.map((data, index) => (

                  <div
                    key={index}
                    className='adminclass-select-box'
                  >

                    <select className="subjects-select">

                      <option value="">
                        Select Subject
                      </option>

                      {subjects.map((subject) => (

                        <option
                          key={subject._id}
                          value={subject._id}
                        >
                          {subject.name}
                        </option>

                      ))}

                    </select>


                    <select className="teacher-select">

                      <option value="">
                        Select Teacher
                      </option>

                      {teachers.map((teacher) => (

                        <option
                          key={teacher._id}
                          value={teacher._id}
                        >
                          {teacher.Name}
                        </option>

                      ))}

                    </select>

                  </div>

                ))}

              </div>


              <button onClick={addMore}>
               <span><CiCirclePlus/></span> Add More
              </button>

<div className="class-fee-type">
  <h1 className='class-fee-heading'>Fee</h1>
{
  rows1.map((data,index)=>(
    <div key={index}>
<select className='class-fee-select'>
  <option value="--">Select Fee Type</option>
  <option value="">Tution Fee</option>
  <option value="">Exam Fee</option>
  <option value="">Admission Fee</option>
  <option value="">Other</option>
</select>
<br /> <br />
  <input type="text" name='fee' placeholder='Enter Fee in rupees' className='class-fee-rupee' />
<div className="class-fee-type-input">
<input type="radio" value='Monthly' name='{paymentType-${index}}' />Monthly
<input type="radio" value='Yearly' name='{paymentType-${index}}' />Yearly
<input type="radio" value='onetime' name='{paymentType-${index}}' />One Time
</div>
    </div>
  ))
}
</div>
<button onClick={addMore1}>
<span> <CiCirclePlus/></span> Add More</button>

              <div className="admin-save">

                <button>
                  Save
                </button>

              </div>

            </div>

          </Modal.Body>

        </Modal>

      </DashboardLayout>
    </>
  )
}

export default AdminClasses