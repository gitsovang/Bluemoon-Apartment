import React from 'react'
import HeaderStyle from './style/Header.module.css'


const ContentHeader = () => {
  return (
    <div className={HeaderStyle.contentHeader}>
        <h1 className={HeaderStyle.headerTitle}>
            Dashboard
        </h1>
    </div>
  )
}
export default ContentHeader
