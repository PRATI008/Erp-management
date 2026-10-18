import React, { useEffect, useState } from 'react'
import "../Pages/CSS/Dashboard.css"
import DashboardLayout from '../Components/DashboardLayout'
import { useNavigate } from 'react-router-dom'
import { FaUserGraduate } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";

const Dashboard = () => {
  const [role, setRole] = useState('')

  const navigate = useNavigate()

  useEffect(()=>{
    let token = localStorage.getItem("token")
    setRole(localStorage.getItem("role"))
    if(!token){
      navigate('/login')
    }
  },[])
  return (
   <>
   <DashboardLayout>
    {
      role == "Admin"?(
        <>
        <div className="dashboard-card-outer">
          <div className="dashboard-cards">
          <div className="dashboard-card-icon-outer">
           <div className="dashboard-card-icon">
             <FaUserGraduate/>
           </div>
          </div>
          <div className="dashboard-card-text">
            <h3>100+</h3>
<p>Student Registered</p>

          </div>
          </div>
          <div className="dashboard-cards">
            <div className="dashboard-card-icon-outer">
           <div className="dashboard-card-icon">
           <FaChalkboardTeacher/>
           </div>
          </div>
          <div className="dashboard-card-text">
<h3>70+</h3>
<p>Teachers Working</p>
          </div>
          </div>
          <div className="dashboard-cards">
            <div className="dashboard-card-icon-outer">
           <div className="dashboard-card-icon">
            <SiGoogleclassroom />
           </div>
          </div>
          <div className="dashboard-card-text">

<h3>40+</h3>
<p>Classes Provided</p>
          </div>
          </div>
        </div>
        </>

      ): role == 'SupperAdmin' ?(
        <>
        <div className="dashboard-card-outer">
          <div className="dashboard-cards">
          <div className="dashboard-card-icon-outer">
           <div className="dashboard-card-icon">
             <FaUserGraduate/>
           </div>
          </div>
          <div className="dashboard-card-text">
            <h3>100+</h3>
<p>Student Registered</p>

          </div>
          </div>
          <div className="dashboard-cards">
            <div className="dashboard-card-icon-outer">
           <div className="dashboard-card-icon">
           <FaChalkboardTeacher/>
           </div>
          </div>
          <div className="dashboard-card-text">
<h3>70+</h3>
<p>Teachers Working</p>
          </div>
          </div>
          <div className="dashboard-cards">
            <div className="dashboard-card-icon-outer">
           <div className="dashboard-card-icon">
            <SiGoogleclassroom />
           </div>
          </div>
          <div className="dashboard-card-text">

<h3>40+</h3>
<p>Classes Provided</p>
          </div>
          </div>
        </div>
        </>
      ):(
       <>
       <div className="dashboard-card-outer">
          <div className="dashboard-cards">
          <div className="dashboard-card-icon-outer">
           <div className="dashboard-card-icon">
             <FaUserGraduate/>
           </div>
          </div>
          <div className="dashboard-card-text">
            <h3>100+</h3>
<p>Total Student</p>

          </div>
          </div>
          <div className="dashboard-cards">
            <div className="dashboard-card-icon-outer">
           <div className="dashboard-card-icon">
           <FaChalkboardTeacher/>
           </div>
          </div>
          <div className="dashboard-card-text">
<h3>70+</h3>
<p>Upcoming Exams</p>
          </div>
          </div>
          <div className="dashboard-cards">
            <div className="dashboard-card-icon-outer">
           <div className="dashboard-card-icon">
            <SiGoogleclassroom />
           </div>
          </div>
          <div className="dashboard-card-text">

<h3>40+</h3>
<p>My Classes</p>
          </div>
          </div>
        </div>
       </>
      )
    }
   </DashboardLayout>
   </>
  )
}

export default Dashboard