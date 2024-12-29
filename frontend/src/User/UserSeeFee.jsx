import React from 'react'
import styles from './style/UserUseFee.module.css'
import SlidebarUser from './SlidebarUser'
import UserSeeFeeTable from './UserSeeFeeTable'


const UserSeeFee = () => {
  return (
    <div className={styles.userUseFeeContainer}>
      <div className={styles.UseFeecontentLeft}>
        <SlidebarUser/>
      </div>
      <div className={styles.UseFeecontentRight}>
      <UserSeeFeeTable/>
      </div>
    </div>
  )
}

export default UserSeeFee
