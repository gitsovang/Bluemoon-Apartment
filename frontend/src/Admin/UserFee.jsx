import React from 'react'
import userFeeStyle from './style/Userfee.module.css'
import Slidebar from './Slidebar'
import { UserTable } from './UserTable'


const UserFee = () => {
  return (
    <div className={userFeeStyle.userFeeContainer}>
    <div className={userFeeStyle.contentLeft}>
        <Slidebar/>
    </div>
    <div className={userFeeStyle.contentRight}>
        <UserTable/>
    </div>
    </div>
  )
}

export default UserFee;
