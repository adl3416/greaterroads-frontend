import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import "./auth.scss";
import logo from "../../../../assets/img/logo/logo-white.png";
import { RiCloseCircleLine, RiHome7Line } from "react-icons/ri";
import { useNavigate, useSearchParams } from "react-router-dom";
import LoginForm from "./login-form";
import RegisterForm from "./register-form";

const Auth = () => {
  const [searchParams] = useSearchParams(); // user-menu js. sayfasindaki butonlardan querystring burda karsiliyoruz. Keyden value yi elde ediyoruz.
  
  //console.log(searchParams.get("type"));
  const [defaultTab, setDefaultTab] = useState("login");          // useState(searchParams.get("type") || "login");     Keyden login yada registiri elde ediyoruz. Defaul da login yaptik

  const navigate = useNavigate();

  useEffect(() => {
    setDefaultTab(searchParams.get("type") || "login"); // || "login"  detault

  }, [searchParams]) // searchParam calisinca 21. satir caliscak re render olucak
  

 //console.log(defaultTab);


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
                  <RegisterForm setDefaultTab={setDefaultTab} />  {/* register yaptiktan sonra login ekranina geciyoruz  bunu register formuna gönderiyoruz orda karsilamamiz lazim*/}
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
