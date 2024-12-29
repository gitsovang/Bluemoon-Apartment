import React from 'react'
import ContentHeader from '../Admin/ContentHeader'
import Card from '../Admin/Card'
import ContentFoot from '../Admin/ContentFoot'
import ContentStyle from './style/Content.module.css'

const Content = () => {
  return (
    <div className={ContentStyle.content}>
      <ContentHeader/>
      <Card/>
      <ContentFoot/>
    </div>
  )
}

export default Content
