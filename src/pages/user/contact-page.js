
import React from "react";
import Spacer from "../../components/common/spacer/spacer";
import PageHeader from "../../components/user/common/page-header/page-header";
import ContactForm from "../../components/user/contact/contact-form/contact-form";
import Map from "../../components/user/contact/map/map";

const ContactPage = () => {
  return (
    <>
      <PageHeader title="Contact Us" />
      <Spacer/>
      <ContactForm/>
      <Spacer/>
      <Map/> 
    </>
  );
};

export default ContactPage;