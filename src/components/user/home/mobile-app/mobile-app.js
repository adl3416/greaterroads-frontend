import React from "react";
import "./mobile-app.scss";
import { Col, Container, Row } from "react-bootstrap";
import SectionHeader from "../../common/section-header/section-header";
import btnGoogle from "../../../../assets/img/buttons/google-play.svg";
import btnApple from "../../../../assets/img/buttons/app-store.svg";
import mobileApp from "../../../../assets/img/bg/mobile.png";

const MobileApp = () => {
  return (
    <Container fluid className="mobile-app">
      <Container>
        <Row className="g-5">
          <Col md={6}>
            <SectionHeader
              title="Download our app to get some goodies"
              subTitle="Download now"
              alignment="left"
            />
            <p>
              APIs. You can integrate car rental inventory via Application
              Programming Interfaces. In another article, we discussed the
              leading car rental APIs. Have a look at it for our picks of
              suppliers to integrate with.
            </p>

            <div className="app-store">
              <a href="https://play.google.com">
                <img src={btnGoogle} alt="Download from Google Play" />
              </a>

              <a href="https://apple.com">
                <img src={btnApple} alt="Download from AppStore" />
              </a>
            </div>
          </Col>
          <Col md={6} className="text-center lg:text-end">
            <img
              src={mobileApp}
              alt="Greater Roads Mobile App"
              className="img-flud"
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default MobileApp;
