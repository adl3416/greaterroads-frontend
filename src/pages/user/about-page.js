import React from 'react'
import PageHeader from '../../components/user/common/page-header/page-header'
import RentPath from '../../components/user/about/rent-path/rent-path'
import Spacer from '../../components/common/spacer/spacer'

const AboutPage  = () => {
  return (
    <div>
       <PageHeader title="About Us"/> 
       <Spacer />
       <RentPath/>
       </div>
  )
}

export default AboutPage 