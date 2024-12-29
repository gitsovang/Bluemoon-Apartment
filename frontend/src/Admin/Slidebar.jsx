import React from 'react'
import {BiUser, BiSolidReport, BiDollar, BiChart} from 'react-icons/bi'
import  styles from '../Admin/style/Slidebar.module.css'
import {Link, useNavigate} from 'react-router-dom'

const Slidebar = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('role'); 
    navigate('/'); 
  };
  return (
    <div className={styles.menu}>
      <div className={styles.logo}>
        <h2>Admin</h2>
      </div>
      <div className={styles.menulist}>
        <a href="/userinfo" className={styles.items}>
            <BiUser className={styles.icons}/>
            User Information
        </a>
        <a href="/userfee" className={styles.items}>
            <BiDollar className={styles.icons}/>
            Fee
        </a>
        <a href = "/statistic" className={styles.items}>
            <BiChart className={styles.icons}/>
            Statistic
        </a>
        <a href = "/report" className={styles.items}>
            <BiSolidReport className={styles.icons}/>
            Report
        </a>
      </div>
      <Link to = "/admin" className={styles.bttOnclass}>
      <button className={styles.bttOn}>Home</button>
      </Link>
      <Link to = "/" className={styles.bttOffclass} onClick={handleLogout}>
      <button className={styles.bttOff}>Log Out</button>
      </Link>
    </div>
  )
}

export default Slidebar 
