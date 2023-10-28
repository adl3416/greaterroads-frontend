import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import settings from '../../../../utils/settings';
//importlar eksik



const PopularVehicle = (props) => {
     const {activeVehicle} =props;
     const{image, model, age, airConditioning, doors,fuelType, id, luggage, pricePerHour, seats, transmission }=activeVehicle;
  return (
     <Container></Container>  
     /*
    <Container>
     <Row clasName="g-5">
          <Col md={8}> 
               <img src={`${settings.apiURL}/files/display/${image[0]}` } className='img-fluid' alt={model}/>
          </Col>

          <Col md={4}>
               <h2>
                    <sup>$</sup>
                    <span> {pricePerHour}</span>
               </h2>
               <p>rent per hour</p>
                    
           </Col>
     </Row>
     
     
     </Container>
    */
  )
}

export default PopularVehicle  