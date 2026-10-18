import React, { useEffect, useState } from 'react'
import DashboardLayout from '../Components/DashboardLayout'
import "../AdminPages/CSS/Fee.css"
import axios from 'axios'
import { MdOutlinePersonSearch } from "react-icons/md";
import { Table } from 'react-bootstrap';
import { MdOutlineCollectionsBookmark } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaRupeeSign } from "react-icons/fa";
import { GrDocumentVerified } from "react-icons/gr";
const Fee = () => {
  const [Students, setStudents] = useState()
  const [search, setSearch] = useState([])
  const [searchStudent, setSearchStudent] = useState()
  const [allfee, setAllFee] = useState([])
  const [searchedfee, setSearchedFee] = useState(null)
  const [duePay, setduePay] = useState("")
  const [dueFee, setDueFee] = useState("")
  const fetchStudents = async () => {
    try {
      const res = await axios.get("./Data/students.json")
      setStudents(res.data)

    } catch (error) {
      console.log(error);
    }
  }


   const fetchFee = async () => {
    try {
      const res = await axios.get("/Data/fee.json")
      setAllFee(res.data)
      console.log(res.data);


    } catch (error) {
      console.log(res.data);

    }
  }

  const handleSearch = () => {
    let st = Students?.find((t) => {
      return t.PhoneNumber === search || t.Email === search || t.RegNo === search
    })
    console.log(st);
    


    const fee = allfee.filter((f) => {
      return f.RegNo === st?.RegNo
    })
    setSearchedFee(fee)


    console.log("dgb",fee);

    setSearchStudent(st)

  }


 




  //   if (st){
  // setSearchStudent(st)
  //   }else{
  //     setSearchStudent(null)
  //   }



  useEffect(()=>{
    fetchStudents()
    fetchFee()
  },[])

  const handleSetPay = (f) =>{
    setduePay(f)
    setDueFee(String(Number(f.Amount)-Number(f.paidAmount)))
  }

  const collectfee = () =>{
    const option = {
      key:"rzp_test_6kz5nGEzi8uXRw",
      amount:Number(dueFee)*100,
      currency:'INR',
      name:"ERP-PORTAL",
      description:"Fee Payment",
      image:"./logo.png",
      handler:function(respose){
        alert("Payment Suceesfull")
      },
      modal:{
        ondismiss:function(r){
          console.log(r);
          alert("Payment Cancelled");
          
        }
      },

       theme:{
color:"green"
    }
    }
   

    const rzpay = new window.Razorpay(option);
    rzpay.open();
  }
  return (
    <>
      <DashboardLayout>

        <div className="fee-collect-container">
          <h2><span><MdOutlineCollectionsBookmark/></span> Fee Collection</h2>
          <p>Search Students and View fee details</p>
          <div className="fee-collect-header">
            <span><MdOutlinePersonSearch /></span>
            <input type="text" placeholder='Search by Mobile/Email/Reg No' onChange={(e) => setSearch(e.target.value)} value={search} />
            <button onClick={handleSearch}>Search</button>
          </div>

          
          <div className="fee-collect-details">
            <div className="fee-collect-heading">
  <h3><span>< FaUser/></span>Student Details</h3>
            </div>
          <div className="user-profile">
            <div className="student-profile"></div>
             <label>Student's Profile</label>
          </div>
            <div className="fees">
              <div className="fee-1">
                <div className="fee">
                 <p>Registration Number:</p>
             <label>{searchStudent?.RegNo}</label>
                </div>
            <div className="fee">
               <p>Student Name:</p>
            <label>{searchStudent?.Name}</label>
            </div>
           </div>
            <div className="fee-2">
              <div className="fee-2-1">
                <p>Student Father's Name</p>
                <label>{searchStudent?.FatherName}</label>
              </div>
              <div className="fee-2-1">
                <p> Student Current Class:</p>
                <span>{searchStudent?.currentClass}</span>
              </div>
               
           
            </div>
           <div className="fee-3">
              <span className='ruppe'><span><FaRupeeSign/></span>Due Fee</span>
            <span className='remark'><span><GrDocumentVerified /></span>Remark</span>
            </div>
          
          </div>
            

               </div>



                  <div className="fee-table">
<Table responsive bordered hover style={{textAlign:"center"}}>
  <thead>
    <tr>
      <th>Reg No</th>
      <th>Fee Name</th>
      <th>Fee Month</th>
      <th>Paid Amount</th>
      <th>Due Amount</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {
      searchedfee?.map((f)=>(
        <tr key={f._id}>
          <td>{f.RegNo}</td>
          <td>{f.FeeType}</td>
          <td>{f.PaymentType}({f?.FeeMonth})</td>
          <td>{f.paidAmount}</td>
          <td>{f.Amount-f.paidAmount}</td>
          <td>{(f.Amount - f.paidAmount === 0) ? "No Dues" : <button onClick={()=> handleSetPay(f)} className='pay-btn'>Pay</button>}</td>
        </tr>
      ))
    }
  </tbody>
</Table>

        </div>

<div className="collect-fee-section-title">
<h3>₹ Fee Details</h3>
               
               <div className="collect-fee-field">
               <div className='total-fee'>
                 <label>Total Fee (₹)</label>
                <input type="text"
                id='collect-fee-due'
                value={duePay?.Amount} />
               </div>
              <div className='fee-type'>
                  <label>Fee Type</label>
                <input type="text"
                value={duePay?.PaymentType}
                readOnly />
                
              </div>
               </div>

              <div className="ammount-pay">
                 <div className="paid-amount">
                <label htmlFor="">₹ Paid Amount</label>
                <input type="text" placeholder='Enter Amount to collect'
                value={duePay?.paidAmount}
                 />
               </div>
               <div className="due-amount">
                <label htmlFor="">₹ Due Amount</label>
              <input type="number" placeholder='Enter amount to collect'
              step="0.01" min="0.01" readOnly
              value={duePay?.Amount - duePay?.paidAmount}
              onChange={(e)=>setDueFee(e.target.value)} 
              required/>
               </div>
              </div>

               <div className="remark-message">
                <label htmlFor="">Remark</label>
                <textarea name="" id="" placeholder='Enter payment remark'>

                </textarea>
               </div>
              <div className="remaing-collect">
               <div className="remaining-due">
                 <h3>Remaning Due</h3>
                <span>₹ 00</span>
               </div>
                 <button onClick={collectfee} className='collect-btn'>Collect Fee</button>
              </div>
</div>
        </div>


      </DashboardLayout>
    </>
  )
}

export default Fee