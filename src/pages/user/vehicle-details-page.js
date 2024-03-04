import React, { useEffect, useState } from 'react'
import PageHeader from '../../components/user/common/page-header/page-header';
import VehicleDetails from '../../components/user/vehicle-details/vehicle-details';
import Spacer from '../../components/common/spacer/spacer';
import { getVehicle } from '../../api/vehicle-service';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setVehicle } from '../../store/slices/reservation-slice';
import Loading from '../../components/common/loading/loading';

const VehicleDetailsPage = () => {
  const vehicle = useSelector(state=> state.reservation.vehicle); //pageheader deki araba ismi cikmasi icin yazdik
   const [loading, setLoading] = useState(true)
  const{  vehicleId } =useParams()  // custom-router de  home/vehicles/id seklinde cagiriyoruz gelen id yi altta backende gönderiyoruz
  const dispatch = useDispatch();


  const loadData = async()=>{
    try {
      const resp = await getVehicle(vehicleId); // aldigimizida burdan backende e gönderiyoruz
      dispatch(setVehicle(resp.data));
      console.log(resp.data) //data geldi 
    } catch (err) {
      console.log(err)
    }
    finally{
      setLoading(false);
    }

  };


  useEffect(() => {  // loadData yi useeffect ile cagirmak zorundayiz
   loadData();
  }, [])
  

  return (


    <>
    <PageHeader /* title={vehicle.model} *//>  {/*  title={vehicle.model} : pageheader deki araba ismi cikmasi icin yazdik */}
    <Spacer/>
    {loading ? <Loading/> : <VehicleDetails/>}
    
    <Spacer/>
    </>
  )
}

export default VehicleDetailsPage