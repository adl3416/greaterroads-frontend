import React from 'react'
import "./section-header.scss";

 
const SectionHeader = (props) => {
     const{title, subTitle, desc, alignment } = props; //disardan proplar alcak
  return (
    <div className="section-header" style={{textAlign:alignment || "center"}}>      {/*  default deger center */}
    
          <h5>{subTitle}</h5>
          <h2>{title}</h2>
          <p>{desc}</p>
     </div>
  )
}

export default SectionHeader