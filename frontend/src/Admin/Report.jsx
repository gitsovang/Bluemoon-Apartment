import React from 'react'
import ReportStyle from '../Admin/style/Report.module.css'
import Slidebar from './Slidebar'
import Invoice from './Invoice'

const Report = () => {
  return (
    <div className={ReportStyle.reportContainer}>
    <div className={ReportStyle.contentreportLeft}>
        <Slidebar/>
    </div>
    <div className={ReportStyle.contentreportRight}>
      <Invoice/>
    </div>
    </div>
  )
}

export default Report
