import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import SideBar from '../components/admins/common/sidebar/sidebar';

const AdminTemplate = (props) => {
     const {children} =props;
  return (

   <Container fluid style={{padding:0}} >  {/* // fluid tam ekran olarak kaplar   */}
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