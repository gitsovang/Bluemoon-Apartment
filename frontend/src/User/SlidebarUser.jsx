import React from 'react'
import styles from './style/Slidebar.module.css'
import {BiUser, BiSolidReport, BiDollar, BiChart} from 'react-icons/bi'
import {Link, useNavigate} from 'react-router-dom'

const SlidebarUser = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('role');
    navigate('/'); 
  };
  return (
    <div className={styles.menu}>
    <div className={styles.logo}>
      <h2>User</h2>
    </div>
    <div className={styles.menulist}>
      <a href="/info" className={styles.items}>
          <BiUser className={styles.icons}/>
          Profile
      </a>
      <a href="/fee" className={styles.items}>
          <BiDollar className={styles.icons}/>
          Fee
      </a>
    </div>
    <Link to = "/user" className={styles.bttOnclass}>
    <button className={styles.bttOn}>Home</button>
    </Link>
    <Link to = "/" className={styles.bttOffclass} onClick={handleLogout}>
    <button className={styles.bttOff}>Log Out</button>
    </Link>
  </div>
  )
}

export default SlidebarUser
