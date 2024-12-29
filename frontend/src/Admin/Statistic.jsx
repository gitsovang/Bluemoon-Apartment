import React from 'react'
import Slidebar from './Slidebar'
import statisticStyle from './style/Statistic.module.css'
import StatisticChart from './StatisticChart'

const Statistic = () => {
  return (
    <div className={statisticStyle.StatisticContainer}>
      <div className={statisticStyle.Staticboard}>
        <Slidebar/>
      </div>
      <div className={statisticStyle.StaticContent}>
        <StatisticChart/>
      </div>
    </div>
  )
}

export default Statistic
