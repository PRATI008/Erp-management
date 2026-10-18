import React, { useEffect, useState } from 'react'
import DashboardLayout from '../Components/DashboardLayout'
import "./CSS/Registration.css"
import axios from 'axios'
const Registration = () => {
  const [classDetails, setClassDetails] = useState([])
  const [selectedClass, setSelectedClass] = useState("")

  let selectedFee = classDetails.find((t)=>{
    return t.class === selectedClass
  })

  const totalFee = selectedFee?.fee?.reduce((acc,f)=>acc+f.Amount,0)
  console.log(totalFee);
  

  const fetchClassDetails = async () => {
    try {
      const res = await axios.get('/Data/classdetails.json')
      setClassDetails(res.data)
      console.log(res);

    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    fetchClassDetails()
  }, [])
  return (
    <>
      <DashboardLayout>
        <div className="erp-student-registraion-form">
          <div className='registration-main-heading'>Add Student</div>
          <div className="registration-info">
            <span>Admission Date</span>
            <span>{new Date().toISOString().split('T')[0]}</span>
            <span>Registration Number</span>
            <span>Auto</span>
            <span>Session</span>
            <span>2026-2027</span>
          </div>
          <div className="registration-container">
            <div className="registration-form-1">
              <div className="form-1">
                <label>Student Name</label>
                <input type="text" name='name' placeholder='Student Name' />

              </div>
              <div className="form-1">
                <label>Photo</label>
                <input type="file" name='photo' />
              </div>
              <div className="form-1">
                <label>Phone Number</label>
                <input type="text" name='number' placeholder='Student Phone Number' />

              </div>
            </div>
            <div className="registration-form-2">
              <div className="form-2">
                <label>Email</label>
                <input type="email" name='email' placeholder='Student Email' />

              </div>
              <div className="form-2">
                <label>DOB</label>
                <input type="date" />
              </div>

            </div>
            <div className="form-3">
              <label>Gender</label>
              <label htmlFor="">Male</label>
              <input type="radio" name='gender' value='Male' />
              <label htmlFor="">female</label>
              <input type="radio" name='gender' value='Female' />
              <label htmlFor="">Others</label>
              <input type="radio" name='gender' value='other' />

            </div>       <label>Adhar No</label>
            <input type="number" placeholder='Student Adhar Number' />
            <label>Father's Name</label>
            <input type="text" name='name' placeholder='Father`s Name' />
            <label>Mother's Name</label>
            <input type="text" name='name' placeholder='Mother`s Name' />

            <label htmlFor="">Category</label>
            <select name="" id="">
              <option value='--'>Select Category</option>
              <option value='gen'>GEN</option>
              <option value='obc'>OBC</option>
              <option value='ews'>EWS</option>
              <option value='sc'>SC</option>
              <option value='st'>ST</option>
            </select>
            <label>Address</label>
            <input type="text" name='address' placeholder='Student Address' />
            <label htmlFor="">Zip Code</label>
            <input type="text" placeholder='Zip Code' />

            <h2>Last School Information</h2>
            <label>Last School Name</label>
            <input type="text" placeholder='Last School Name' name='lastScoolName' />
            <label>Last School Class</label>
            <input type="text" placeholder='Last School Class' name='lastSchoolClass' />
            <label>Last School Code</label>
            <input type="text" placeholder='Last School Code' name='lastSchoolCode' />
            <label>Last Class Total Gained Number</label>
            <input type="text" placeholder='Enter Last Class Number' name='lastSchoolTotalGainedNumeber' />

            <h2>Other Information</h2>
            <label >Class</label>
            <select name="class" onChange={(e) => setSelectedClass(e.target.value)} value={selectedClass}>
              <option value="">Select Class</option>
              {
                classDetails.map((c) => (
                  <option key={c._id} value={c.class}>{c.class}</option>
                ))
              }
            </select>

            <h2>Fee Imformation</h2>
            {
              selectedFee?.fee.map((f)=>(
                <div key={f._id}>
                  <span> {f.FeeType} </span>
                  <span> {f.Amount} </span>
                  <span> {f.PaymentType} </span>
                </div>
              ))
            }
            <h4>{totalFee || 0}</h4>

            <button className='registration-submit'>Submit</button>
          </div>
        </div>
      </DashboardLayout>
    </>
  )
}

export default Registration