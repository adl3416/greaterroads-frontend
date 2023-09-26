import React from 'react'
import { Container } from 'react-bootstrap';
import SideBar from '../components/admins/common/sidebar/sidebar';

const AdminTemplate = (props) => {
     const {children} =props;
  return (

   <Container fluid>    

     <Row>
          <Col lg={3}>
               <SideBar/>
           </Col>   
          <Col lg={9}>
                    <Container>
                      {children}
                    </Container>
          </Col> 
                         
     </Row>  

   </Container>

  )
}

export default AdminTemplate