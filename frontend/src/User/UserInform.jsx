import React, { useEffect, useState, useContext} from 'react'
import SlidebarUser from './SlidebarUser'
import styles from './style/UserInfo.module.css'
import axios from 'axios'
import { BiSolidInbox, BiUser, BiIdCard, BiDoorOpen, BiArea, BiLogIn} from 'react-icons/bi'
import { useLocation } from 'react-router-dom'

const UserInform = () => {

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData]  = useState([])
  const location = useLocation();
  const password = localStorage.getItem('password');
  const [userId, setUserId] = useState(null)

  console.log(password)

  useEffect(() => {
    fetchUserData();
    console.log(userData._id)
    console.log(userData)
  }, [])

  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/get_info', {
        params: {
          userId: password
        }
      });
      setUserData(response.data);
      console.log(userData);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.UserInfoContainer}>
      <div className={styles.contentUserInfoLeft}>
        <SlidebarUser/>
      </div>
      <div className={styles.contentUserInfoRight}> 
      <div>
      <h1 style={{textAlign: "center", fontSize: "30px", fontWeight: "bold"}}>Your Information</h1>
      </div>
      <div>
      {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          <>
          {userData.map((row, index) => (
          <ul key={index} style = {{ padding: 0}}>
            <li style={{ fontSize: "18px", marginBottom: "5px", display: "flex", alignItems: "center", gap: "10px"}}>
            <BiIdCard/> 
              <span style={{fontWeight: "bold"}}>
              User ID :
              </span> {password}
            </li>
            <li style={{ fontSize: "18px", marginBottom: "5px", display: "flex", alignItems: "center", gap: "10px"}}>
            <BiUser/> 
            <span style={{fontWeight: "bold"}}>Name :  </span>{row.name}</li>
            <li style={{ fontSize: "18px", marginBottom: "5px", display: "flex", alignItems: "center", gap: "10px"}}>
            <BiSolidInbox/> 
            <span style={{fontWeight: "bold"}}>Email : </span>{row.email}</li>
            <li style={{ fontSize: "18px", marginBottom: "5px", display: "flex", alignItems: "center", gap: "10px"}}>
            <BiArea/> 
            <span style={{fontWeight: "bold"}}>Room area : </span>{row.roomarea}</li>
            <li style={{ fontSize: "18px", marginBottom: "5px" , display: "flex", alignItems: "center", gap: "10px"}}>
            <BiDoorOpen/>
            <span style={{fontWeight: "bold"}}>Room number : </span>{row.roomnumber}</li>
            <li style={{ fontSize: "18px", marginBottom: "5px", display: "flex", alignItems: "center", gap: "10px"}}>
            <BiLogIn/>
            <span style={{fontWeight: "bold"}}>Registeration date/Time : </span>{row.registerdate}</li>
          </ul>
          ))}
          </>
        )}
        </div>
      </div>
    </div>
  )
}

export default UserInform
