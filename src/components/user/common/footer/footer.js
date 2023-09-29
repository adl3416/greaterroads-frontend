import React from "react";
import logo from "../../../../assets/img/logo/logo-white.png";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import ContactInfo from "../../contact/contact-info";
import "./footer.scss";
import {settings} from "../../../../utils/settings"

const Footer = () => {
  return (
    <Container fluid className="footer ">
      <Container>  
        <Row className="g-5">
          <Col md={6} lg={3}> 
            <Link>
              <img src={logo} alt={settings.siteName} className="img-fluid" /> 
            </Link>
            <p>
              Flexible Vermietung Stornieren oder ändern Sie die meisten
              Buchungen kostenlos bis zu 48 Stunden vor der Abholung.
            </p>
          </Col>

          <Col md={6} lg={3}>
            <h2> Quick Links </h2> 
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>

              <li>
                <Link to="/vehicles">Vehicles</Link>
              </li>

              <li>
                <Link to="/about">About us</Link>
              </li>

              <li>
                <Link to="/contact"> Contact Us</Link>
              </li>
            </ul>
          </Col>
          <Col md={6} lg={3}>
            <h2> Working Hours </h2>
            <ul>
              <li>Mon-Fir: 09:00AM - 09:00 PM</li>
              <li>Saturday: 09:00AM - 07:00 PM</li>
              <li>Sunday: 09:00AM - 05:00 PM</li>
            </ul>
          </Col>

          <Col md={6} lg={3}> <h2> Contact Us </h2>
           <ContactInfo/>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Footer;
