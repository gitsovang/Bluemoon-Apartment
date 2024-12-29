import React from 'react'
import userInfoStyle from '../Admin/style/UserInfor.module.css'
import Slidebar from './Slidebar'
import UserInfoTable from './UserInfoTable'

const UserInfo = () => {
  return (
    <div className={userInfoStyle.userInfoContainer}>
    <div className={userInfoStyle.contentInfoLeft}>
        <Slidebar/>
    </div>
    <div className={userInfoStyle.contentInfoRight}>
        <UserInfoTable/>
    </div>
    </div>
  )
}

export default UserInfo
