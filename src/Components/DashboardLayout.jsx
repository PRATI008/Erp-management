import React, { Children, useEffect, useState } from 'react'
import "../Components/CSS/DashboardLayout.css"
import { IoClose, IoMenu } from "react-icons/io5";
import { FaUserAstronaut } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom"
import { IoMdMenu } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { BiRupee } from "react-icons/bi";
import { SiGoogleclassroom } from "react-icons/si";
import { GiTeacher } from "react-icons/gi";
import { PiStudentBold } from "react-icons/pi";
import { MdOutlineSubject } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { RiAdminFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { MdAppRegistration } from "react-icons/md";
import Swal from 'sweetalert2';
// import { useNavigate, NavLink } from 'react-router-dom';
const DashboardLayout = ({ children }) => {
  const [role, setRole] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isClose, setClose] = useState()
  const navigate= useNavigate()

  useEffect(() => {
    setRole(localStorage.getItem('role') ?? "Guest")
  }, [])


  const tabs = {
    SupperAdmin: [
      { title: "Dashboard", path: "/dashboard", icon: IoSettingsOutline },
      { title: "Admins", path: "/admins", icon: RiAdminFill },

    ],

    Admin: [

      { title: "Dashboard", path: "/dashboard", icon: IoSettingsOutline },
      { title: "Registration", path: "/registration", icon: MdAppRegistration },
      { title: "Teachers", path: "/teachers", icon: GiTeacher, },
      { title: "Students", path: "/students", icon: PiStudentBold, },
      { title: "Fee", path: "/fee", icon: BiRupee, },
      { title: "Class", path: "/admin-classes", icon: SiGoogleclassroom, },
      { title: "Subjects", path: "/subjects", icon: MdOutlineSubject, },
      { title: "Settings", path: "/admin-settings", icon: IoSettingsOutline, },

    ],

    Teacher: [
      { title: "Dashboard", path: "/dashboard", icon: IoSettingsOutline },
      { title: "Students", path: "/students", icon: PiStudentBold, },
      { title: "Fee", path: "/fee", icon: BiRupee, },
      { title: "My Classes", path: "/teacher-classes", icon: SiGoogleclassroom, },
      { title: "My Subjects", path: "/my-subjects", icon: MdOutlineSubject, },
      { title: "Profile", path: "/teacher-profile", icon: CgProfile, },
    ]
  }
  const roleTabs = tabs[role] || [];

const handleLogout =()=>{
Swal.fire({
  title: "Are you sure to Logout?",
  text: "You will be logout from your dahboard!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, Logout!"
}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire({
    title: "logout",
    text: "Logout Successfully.",
    icon: "success"
  })
  localStorage.removeItem('token')
  localStorage.removeItem('role')
  navigate('/login')
}else{
  Swal.fire({
    title:"Cancelled",
    text:"You are still logged in!",
    icon: "info"
  })
}
})
}

  return (
    <>
      {/* <div className={`dashboardLayout-outer
    ${
      sidebarOpen ? "sidebar-open" : "sidebar-closed"
    }`}> */}
      <div className="dashboardLayout-outer" >
        <div className={`dashboardLayout-sidebar ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
          <div className="sidebar-top">
            <div className="sidebar-logo">
              <img src="./logo.png" alt="" /><br />
              <h3>ERP <b>MANAGEMENT</b></h3>
              {/* <img src="./logo.png" alt="" /> */}
            </div>
          </div>
          <div className="sidebar-menu">
            {/* <NavLink to='/dashboard' className={({isActive})=>`navlinks ${isActive?"sidebar-active": ""}`}>< MdDashboard/><span>Dashboard</span></NavLink> */}
            {
              roleTabs.map((tab) => {
                const Icon = tab.icon;
                return (<NavLink key={tab.path} to={tab.path} className={({ isActive }) => `navlinks ${isActive ? "sidebar-active" : ""}`}><Icon />{!isClose && (<span>{tab.title}</span>)}</NavLink>)
              })
            }
            {/* <NavLink to='/teachers' className={({isActive})=>`navlinks ${isActive?"sidebar-active": ""}`}><GiTeacher/><span> Teachers</span></NavLink>
 <NavLink to='/students' className={({isActive})=>`navlinks ${isActive?"sidebar-active": ""}`}><PiStudentBold/> <span>Students</span></NavLink>
 <NavLink to='/class' className={({isActive})=>`navlinks ${isActive?"sidebar-active": ""}`}> <SiGoogleclassroom /><span>Class</span></NavLink>
 <NavLink to='/class' className={({isActive})=>`navlinks ${isActive?"sidebar-active": ""}`}> <MdOutlineSubject /><span>Subjects</span></NavLink>
 <NavLink to='/fee' className={({isActive})=>`navlinks ${isActive?"sidebar-active": ""}`}><BiRupee/><span> Fee</span></NavLink>
 <NavLink to='/settings' className={({isActive})=>`navlinks ${isActive?"sidebar-active": ""}`}><IoSettingsOutline/><span>Settings</span></NavLink> */}

            {/* <NavLink className='navlinks'></NavLink>
<NavLink className='navlinks'> Teachers</NavLink>
<NavLink className='navlinks'> Subject</NavLink>
<NavLink className='navlinks'> Analytics</NavLink> */}
          </div>
          <div className="sidebar-bottom">
            <button className='sidebar-logout' onClick={(handleLogout)}> Logout</button>

          </div>
        </div>

        <div className="dashboardLayout-main">
          <div className="dashboardLayout-header">
            <div className="header-first">

              {!sidebarOpen && (
                <button onClick={() => setSidebarOpen(true)} className='sidebar-open-btn'><IoMdMenu />
                </button>
              )}
              {sidebarOpen && (
                <div className='sidebar-close-btn'
                  onClick={() => setSidebarOpen(false)}>
                  <IoClose /></div>
              )}
              {/* <div className="sidebar-close-btn">
<button onClick={handleSidebar}><IoClose/> </button> 
<button onClick={handleSidebar}><IoMdMenu/> </button>
        </div> */}

              <h2>Welcome to Admin! {role}</h2>
            </div>

            <div className="dashboardLayout-admin">
              <h2>Admin</h2>
              <span><FaUserAstronaut /></span>

            </div>
          </div>


          <div className="dashboardLayout-content">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardLayout