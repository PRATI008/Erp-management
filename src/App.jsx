import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import DashboardLayout from './Components/DashboardLayout'
import Dashboard from './Pages/Dashboard'
import Login from './Pages/Login'
import AdminSettings from './AdminPages/AdminSettings'
import Teachers from './AdminPages/Teachers'
import Registration from './AdminPages/Registration'
import Fee from './AdminPages/Fee'
import Subjects from './AdminPages/Subjects'
import AdminClasses from './AdminPages/AdminClasses'

import {ToastContainer} from 'react-toastify'
import Students from './AdminPages/Students'
import TeacherClasses from './TeacherPages/TeacherClasses'
import TeacherProfile from './TeacherPages/TeacherProfile'

const App = () => {
  return (
    <>
    <Router>
      <Routes>

<Route path='/' element={<Login/>} />
<Route path='/login' element={<Login/>} />
<Route path='/dashboard-layout' element={<DashboardLayout/>} />
<Route path='/dashboard' element={<Dashboard/>} />

{/* Admin Routes start */}
<Route path='/admin-settings' element={<AdminSettings/>} />
<Route path='/teachers' element={<Teachers/>} />
<Route path='/registration' element={<Registration/>} />
<Route path='/fee' element={<Fee/>} />
<Route path='/subjects' element={<Subjects/>} />
<Route path='/admin-classes' element={<AdminClasses/>} />
<Route path='/students' element={<Students/>} />
{/* Admin Routes end */}

{/* Teacher Route start */}
<Route path='/teacher-classes' element={<TeacherClasses/>} />
<Route path='/teacher-profile' element={<TeacherProfile/>} />

{/* Teacher Route start */}
      </Routes>
    </Router>


    <ToastContainer
position="top-right"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>

    </>
  )
}

export default App