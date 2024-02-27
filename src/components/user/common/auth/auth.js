import React from 'react'
import { Col, Container, Row, Tab, Tabs } from 'react-bootstrap'
import "./auth.scss";
import logo from "../../../../assets/img/logo/logo-white.png";
import { RiCloseCircleLine, RiHome7Line } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import LoginForm from './login-form';
import RegisterForm from './register-form';

const Auth = () => {
  const navigate =useNavigate();
  return (
   
    <Container fluid className='auth'>
      <Row>
        <Col md={7}>
            <img src={logo} alt='TRVLCar'/>
            <div className="toolbar"> 
            <RiCloseCircleLine onClick={() => navigate(-1)} />{" "}        {/*   //normalde  navigate("/about") diyoduk about agidiyordu */}
            {/* Tıklandığında bir önceki sayfaya yönlendirir */}
            <RiHome7Line onClick={() => navigate("/")} />
          </div>
         </Col>

        <Col md={5}>
          <Tabs
          defaultActiveKey="login" className="mb-3" >
           <Tab eventKey="login" title="login">
          <LoginForm/>
         </Tab>


         <Tab eventKey="register" title="register">
           <RegisterForm/>
          </Tab>
        </Tabs>
        </Col>
      </Row>
    </Container>
  )
}

export default Auth 