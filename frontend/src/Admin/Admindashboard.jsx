import React from 'react'
import Slidebar from './Slidebar'
import Content from './Content'
import Admindash from './style/Admin.module.css'
import UserInfo from './UserInfo'

const Admindashboard = () => {
  return (
    <div className={Admindash.AdminContainer}>
      <div className={Admindash.dashboard}>
        <Slidebar/>
      </div>
      <div className={Admindash.dashboardContent}>
        <Content/>
      </div>
    </div>
  )
}

export default Admindashboard
