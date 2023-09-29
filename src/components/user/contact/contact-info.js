import React from 'react'
import {FiPhoneCall,FiHeadphones} from "react-icons/fi";
import {HiOutlineLocationMarker} from "react-icons/hi";
import {HiOutlineEnvelope} from "react-icons/hi2";
import {settings} from "../../../utils/settings";
import "./contact-info.scss";

const ContactInfo = () => {
  return (
     <ul className='contact-info'>
     <li> <FiPhoneCall/> {settings.phone1} </li>
     <li> <FiHeadphones/> {settings.phone2} </li>
     <li> <HiOutlineLocationMarker/> {settings.adress} </li>
     <li> <HiOutlineEnvelope/> {settings.email} </li>

     
   </ul>
  )
}

export default ContactInfo