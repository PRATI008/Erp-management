import React, {useState} from 'react'
import "../TeacherPages/TeacherProfile.css"
import DashboardLayout from '../Components/DashboardLayout'
import { RiEditFill } from "react-icons/ri";
import { FaUserAstronaut } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { FaPhoneVolume } from "react-icons/fa6";
import { MdOutlineSubject} from "react-icons/md";
import { GiTeacher } from "react-icons/gi";
import { FaCamera } from "react-icons/fa";

const TeacherProfile = () => {


  const [profileImage, setProfileImage] = useState(null)


  const handleImageChange=(e)=>{
    const file = e.target.files[0];

    if(file && file.type.startsWith("image/")){
      setProfileImage(URL.createObjectURL(file));
    }

  }
  return (
    <DashboardLayout>
    <div className="profile-heading">
        <h2>Teacher Profile</h2>
    </div>
      <div className="profile-outer">
       
        <div className="profile-image-section">
          <div className="profile-image">
            <label className="profile-photo-upload">
              {
                profileImage ?(
                  <img src={profileImage} alt="" />

                ):(
                  <FaCamera/>
                )}
            <input type="file" accept='image/*' onChange={handleImageChange}/>
            </label>
          <div className="profile-name">
              <h3>Pratibha Dwivedi</h3>
            <span>Active Teacher</span>
          </div>
          
          </div>
          <button><RiEditFill/> Edit Profile</button>
        </div>

        <div className="profile-info-outer">
<div className="profile-info-user">
  <div className="profile-icon">
<FaUserAstronaut/>
  </div>
  <div className="profile-user-name">
<label htmlFor="">Name</label>
<span>Pratibha Dwivedi</span>
  </div>
</div>

<div className="profile-info-user">
  <div className="profile-icon">
<MdOutlineEmail/>
  </div>
  <div className="profile-user-name">
<label htmlFor="">Email</label>
<span>prdwivedi@gmail.com</span>
  </div>
</div>

<div className="profile-info-user">
  <div className="profile-icon">
<FaPhoneVolume/>
  </div>
  <div className="profile-user-name">
<label htmlFor="">Phone No.</label>
<span>+9129937416</span>
  </div>
</div>


<div className="profile-info-user">
  <div className="profile-icon">
< MdOutlineSubject/>
  </div>
  <div className="profile-user-name">
<label htmlFor="">Subject</label>
<span>Mathmatics</span>
  </div>
</div>

<div className="profile-info-user">
  <div className="profile-icon">
< GiTeacher/>
  </div>
  <div className="profile-user-name">
<label htmlFor="">Teacher</label>
<span>Class 8-A</span>
  </div>
</div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default TeacherProfile