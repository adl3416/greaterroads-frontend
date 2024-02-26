import React, { useEffect } from 'react'
import PageHeader from '../../components/user/common/page-header/page-header';
import VehicleDetails from '../../components/user/vehicle-details/vehicle-details';
import Spacer from '../../components/common/spacer/spacer';
import { getVehicle } from '../../api/vehicle-service';
import { useParams } from 'react-router-dom';

const VehicleDetailsPage = () => {
  const{  vehicleId } =useParams()  // custom-router de  home/vehicles/id seklinde cagiriyoruz gelen id yi altta backende gönderiyoruz

  const loadData = async()=>{
    try {
      const resp = await getVehicle(vehicleId); // aldigimizida burdan backende e gönderiyoruz
      console.log(resp.data)
    } catch (err) {
      console.log(err)
    }

  };


  useEffect(() => {  // loadData yi useeffect ile cagirmak zorundayiz
   loadData();
  }, [])
  

  return (


    <>
    <PageHeader/>
    <Spacer/>
    <VehicleDetails/>
    <Spacer/>
    </>
  )
}

export default VehicleDetailsPage