import React from 'react'
import PageHeader from '../../components/user/common/page-header/page-header'
import RentPath from '../../components/user/about/rent-path/rent-path'
import Spacer from '../../components/common/spacer/spacer'
import WhyChooseUs from '../../components/user/about/why-choose-us/why-choose-us'

const AboutPage  = () => {
  return (
    <div>
       <PageHeader title="About Us"/> 
       <Spacer />
       <RentPath/>
       <Spacer/>
       <WhyChooseUs/>
       <Spacer/>
       </div>
  )
}

export default AboutPage 