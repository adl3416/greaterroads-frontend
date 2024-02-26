import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import "./vehicle-bar.scss";
import { useRef } from "react";

 

const VehicleBar = (props) => {
    const {vehicles,activeVehicle, setActiveVehicle  }= props;   //PopularVehicles den gönderdigimiz datayi burada props karsiladik
    console.log(vehicles)

    const swiperRef = useRef(null);
    const[isEnd ,setIsEnd]=useState(false);
    const[isBeginning ,setIsBeginning]=useState(true);




    const handlePrev = () => {
      swiperRef.current.swiper.slidePrev();
    };
  
    const handleNext = () => {
      swiperRef.current.swiper.slideNext();
    };
    
    const handleChange= (e) =>{
      console. log(e);
      setIsBeginning(e.isBeginning);
      setIsEnd(e.isEnd); 
    }


  return (
    <Container className="vehicle-bar">
       <div className={`arrow ${isBeginning ? "passive" : ""}` } onClick={handlePrev}> <IoIosArrowDropleft /> </div> 
 
       <Swiper  // swiperden hazir olark aldik
       onSlideChange={handleChange}
       ref={swiperRef}
     // spaceBetween={20}    // herbr elemanin arasindaki bosluk
     // slidesPerView={5}     // ayni anda kac araba olcak
      
      //onSwiper={(swiper) => console.log(swiper)}

      breakpoints={{
        0: {
          spaceBetween: 10,
          slidesPerView: 1,
        },
        576: {
          spaceBetween: 20,
          slidesPerView: 2,
        },
        768: {
          spaceBetween: 20,
          slidesPerView: 3,
        },
        992: {
          spaceBetween: 20,
          slidesPerView: 5,
        },
        1200: {
          spaceBetween: 20,
          slidesPerView: 6,
        },
      }}
    >
     
      {vehicles.map((vehicle)=>( 
      <SwiperSlide className={vehicle.id === activeVehicle.id ?  "active" : ""}
        onClick={()=> setActiveVehicle(vehicle)} //vehicle yi setActiveVehicle(PopularVehicles deki)  ye gönderiyoruz hangisine basarsak o aktif olsun diyoruz. eger sana tiklanirsa  o vehicle yi aktif vehicle olarak degistir 
       key={vehicle.id}> 
       {vehicle.model} </SwiperSlide>  // vehicle de herdönen arabanin id si ile activeVehicle id sini karsilastirsin dogru ise class a "active" eklesin  
      ))}                                                                                                         
   
    </Swiper>
    <div className={`arrow ${isEnd ? "passive" : ""}` } onClick={handleNext}> <IoIosArrowDropright /> </div> 
      
      
    </Container>
  )
}

export default VehicleBar


/* const VehicleBar = (props) => {
  const { vehicles, activeVehicle, setActiveVehicle } = props;
  const [isEnd, setIsEnd] = useState(false);
  const [isBeginning, setIsBeginning] = useState(true);
  const swiperRef = useRef(null);

  const handlePrev = () => {
    swiperRef.current.swiper.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current.swiper.slideNext();
  };

  const handleChange = (e) => {
    setIsBeginning(e.isBeginning);
    setIsEnd(e.isEnd);
  };

  return (
    <Container className="vehicle-bar">
      <div
        className={`arrow ${isBeginning ? "passive" : ""}`}
        onClick={handlePrev}
      >
        <IoIosArrowDropleft />
      </div>
      <Swiper
        onSlideChange={handleChange}
        ref={swiperRef}
        breakpoints={{
          0: {
            spaceBetween: 10,
            slidesPerView: 1,
          },
          576: {
            spaceBetween: 20,
            slidesPerView: 2,
          },
          768: {
            spaceBetween: 20,
            slidesPerView: 3,
          },
          992: {
            spaceBetween: 20,
            slidesPerView: 5,
          },
          1200: {
            spaceBetween: 20,
            slidesPerView: 6,
          },
        }}
      >
        {vehicles.map((vehicle) => (
          <SwiperSlide
            className={vehicle.id === activeVehicle.id ? "active" : ""}
            onClick={() => setActiveVehicle(vehicle)}
            key={vehicle.id}
          >
            {vehicle.model}
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={`arrow ${isEnd ? "passive" : ""}`} onClick={handleNext}>
        <IoIosArrowDropright />
      </div>
    </Container>
  );
};

export default VehicleBar; */