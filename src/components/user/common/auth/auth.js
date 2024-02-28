import React, { useState } from "react";
import { Card, Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import "./auth.scss";
import logo from "../../../../assets/img/logo/logo-white.png";
import { RiCloseCircleLine, RiHome7Line } from "react-icons/ri";
import { useNavigate, useSearchParams } from "react-router-dom";
import LoginForm from "./login-form";
import RegisterForm from "./register-form";



const Auth = () => {
  
  const [searchParams] = useSearchParams();

  const [defaultTab, setDefaultTab] =  useState(searchParams.get("type") || "login");   //useState("login"); 

  const navigate = useNavigate();




  return (
    <Container fluid className="auth">
      <Row>
        <Col lg={7}>
          <img src={logo} alt="TRVLCar" />
          <div className="toolbar">
            <RiCloseCircleLine onClick={() => navigate(-1)} />{" "}
            {/*   //normalde  navigate("/about") diyoduk about agidiyordu */}
            {/* Tıklandığında bir önceki sayfaya yönlendirir */}
            <RiHome7Line onClick={() => navigate("/")} />
          </div>
        </Col>

        <Col lg={5}>
          <Card>
            <Card.Body>
              <Tabs 
              activeKey={defaultTab}
              onSelect={(k) => setDefaultTab(k)}
              className="mb-3">
                 
                <Tab eventKey="login" title="login">
                  <LoginForm />
                </Tab>

                <Tab eventKey="register" title="register">
                  <RegisterForm setDefaultTab={setDefaultTab} />
                </Tab>
              </Tabs>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Auth;
