import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'
import "../Pages/CSS/Login.css"
import { NavLink } from 'react-router-dom'
import {toast} from 'react-toastify'
const Login = () => {

    const navigate = useNavigate();

    const[user,setUser]= useState()
    const[email, setEmail] = useState("")
    const[otp,setOtp] = useState("")
    const [step, setStep] = useState(1)

   const fetchData = async () => {
    const res = await axios.get("/Data/Users.json")
    console.log(res.data)
    setUser(res.data)
   }

   useEffect(() =>{
    fetchData()
   },[])

    const sendOtp= async()=>{
       let existingUser = user.find((u) =>u?.email==email)
       console.log(existingUser);


       if(email==existingUser?.email){
        setStep(2)
       }else{
        toast.warning('User Not Found!', {
});
       }

    }
   

    const verifyOtp = ()=>{
        let existingUser = user.find((u)=>u?.email==email)
        console.log(existingUser.role);
        if(existingUser.otp==otp){
            localStorage.setItem("token", existingUser.token)
            localStorage.setItem("role",existingUser.role)
            localStorage.setItem("number",existingUser?.Mobile)
           
            toast.success('Login Successfully', {

            });
             navigate('/dashboard')
        }else{
           toast.error('Invalid Password!', {
});
        }
        
    }
    
  return (
    <>
    <div className="login-main-outer">
        <div className="login-left"></div>
        <div className="login-right">
            <h1 className='login-right-heading'>Login </h1>
            <div className="login-right-card">
                <input type="email" placeholder='Enter your Email' onChange={(e)=>setEmail(e.target.value)}  />
            <br /><br />
            {
                step == 2?


                <div>
<input type="text" placeholder='Enter otp' onChange={(e)=> setOtp(e.target.value)}  />
<br /><br />
                </div>: ""
            }
    <br />

 <div className="login-buttons">
      {
    step==2?  
    <button className='login-right-btn'  onClick={verifyOtp}> Verify OTP</button>
  : <button className='login-right-btn'  onClick={sendOtp}> Send OTP</button>
  
   } </div> 

            </div>
        </div>
    </div>
    </>
  )
}

export default Login