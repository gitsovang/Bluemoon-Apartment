import React, { useEffect } from 'react'
import UserDash from './style/User.module.css'
import SlidebarUser from './SlidebarUser'

const UserDashBoard = () => {
  const password = localStorage.getItem('password');

  useEffect(() => {
    console.log(password);
  }, )
  return (
    <div className={UserDash.Usercontainer}>
      <div className={UserDash.dashboard}>
        <SlidebarUser/>
      </div>
      <div style={{
        backgroundColor: "white",
        width: "100%",
        height: "70%",
        marginRight: "30px", 
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        borderRadius: "50px", 
        flexDirection: "column",
      }}>
      <div style={{
        fontSize: "48px",
        fontWeight: "bolder",
        display: "flex",
        alignItems: "center",
        gap: "10px"
      }}>
        <img   
        src='data:image/png;base64,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'></img>
        <h1 
        style={{marginTop: "30px",
        textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5), -1px -1px 2px rgba(255, 255, 255, 0.5)"
        }}>BLUEMOON <br/><span style={{marginLeft: "50px"}}>APARTMENT</span></h1>
        <img style={{
            height: "250px",
            width: "auto"
        }} src='https://static.vecteezy.com/system/resources/thumbnails/019/837/539/small/businessman-cartoon-character-set-handsome-business-man-in-office-style-smart-suit-png.png'></img>
      </div>
      <div style={{marginTop: "50px", fontSize: "30px",
      textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5), -1px -1px 2px rgba(255, 255, 255, 0.5)",
        fontWeight: "bolder"}}>
        <h2>"Luxury place for you and your family!"</h2>
      </div>
      </div>
    </div>
  )
}

export default UserDashBoard
