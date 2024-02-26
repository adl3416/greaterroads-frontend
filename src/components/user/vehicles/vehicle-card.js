import React from 'react'
import { Button, Card } from 'react-bootstrap';

const VehicleCard = (props) => {
    const {id,model,image,pricePerHour}=props;

    console.log(pricePerHour)

  return (

    <Card className='vehicle-card'>
    <Card.Img variant="top" src="holder.js/100px180" />
    <Card.Body>
      <Card.Title>{model}</Card.Title>
      <Card.Text>
     <sup> $ </sup>{pricePerHour}
     <span> /hour</span>
      </Card.Text>
    </Card.Body>

    <Card.Footer>
    <Button variant="dark">Rent Car</Button>
    <Button variant="primary">Details</Button>
    </Card.Footer>
  </Card>

    
  )
}

export default VehicleCard    