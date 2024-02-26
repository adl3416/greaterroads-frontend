import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import SectionHeader from '../common/section-header/section-header'
import VehicleCard from './vehicle-card'
import { getVehiclesByPage } from '../../../api/vehicle-service'

const Vehicles = () => {
    const[vehicles,setVehicles]=useState([]);   /// API den gelen dizi kaydetmek icin usestate olusturmaliyiz
    const [loading, setLoading] = useState(true)

    const loadData = async (page) => { 

        try {
            const resp= await getVehiclesByPage(page)   //API ye baglaniyoruz backenden bize data geliyor
            setVehicles(resp.data.content);
        } catch (err) {
            
        }

        finally{
            setLoading(false);  //data yuklenince spinner kapanacak
        }


     }

     useEffect(() => { // load datamizi ilk giriste cagiriyoruz
       loadData()
     }, [])
       




  return (
    <Container>
        <SectionHeader
          title="Vehicle Models"
          subTitle="Lux &amp; Economic"
          desc="To contribute to positive change and achieve our sustainability goals with many axtraordinary"
        />

        <Row>
            {vehicles.map(vehicle=>  <Col key={vehicle.id} md={3}>
                 <VehicleCard {...vehicle} /> {/*  propsla gönderiyoruz. 2. yol {...vehicle} */}
                 </Col> )} 
           
        </Row>
    </Container>
  )
}

export default Vehicles