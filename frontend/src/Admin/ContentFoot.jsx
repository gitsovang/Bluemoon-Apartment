import React from 'react'
import { BiBuildingHouse } from 'react-icons/bi'
import contentFoot from './style/ContentFoot.module.css'

const ContentFoot = () => {
  return (
    <div className={contentFoot.contentFoot}>
        <BiBuildingHouse className={contentFoot.bluemoonIcon}/>
        <h1>Bluemoon Apartment, The Best Apartment For You!!!</h1>
    </div>
  )
}

export default ContentFoot
