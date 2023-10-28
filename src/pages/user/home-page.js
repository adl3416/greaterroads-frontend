import React from 'react'
import Slider from '../../components/user/home/slider/slider'
import Spacer from '../../components/common/spacer/spacer'
import MobileApp from '../../components/user/home/mobile-app/mobile-app'
import PopularVehicles from '../../components/user/home/popular-vehicles/popular-vehicles'

const HomePage = () => {
  return (
    <> 
        <Slider/>
        <Spacer/>
        <PopularVehicles/>
        <Spacer/>
        <MobileApp/>
        <Spacer/>


    </>
  )
}

export default HomePage