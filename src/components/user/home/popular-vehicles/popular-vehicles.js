import React, { useEffect, useState } from "react";
import { getVehiclesByPage } from "../../../../api/vehicle-service";
import Loading from "../../../common/loading/loading";
import Spacer from "../../../common/spacer/spacer";
import SectionHeader from "../../common/section-header/section-header";
import PopularVehicle from "./popular-vehicle";
import VehicleBar from "./vehicle-bar";



const PopularVehicles = () => {

  const [vehicles, setVehicles] = useState([]); // backenden  datayi cekip saklayacagimiz usestate ihtiyacimiz var
  const [loading, setLoading] = useState(true); // spienner

  const [activeVehicle, setActiveVehicle] = useState();  // sectigimiz arabayi aktiv yapip göstercek


  const loadData = async () => { 
      try {
        const resp = await getVehiclesByPage(); // burada backen cevap veriyo onuda resp e aliyoruz, once  getVehiclesByPage() i cagiriyoruz
        const data=resp.data.content;
        setVehicles(data) // burada set le degistiriyouz gelen datayi yukluyoz

        if (data.length >0)setActiveVehicle(data[0]); // yukaridaki satirda datayi aldiktan sonra butun arabalar vehicles e yuklendi sonra gelen datayi burada  ya ilk gelen elemani setActiveVehicle  atdik.artik setActiveVehicle  nin icinde bir tane araba var
                                                      // setActiveVehicle  ilede bizim bastigimiz butonu aktif yapicagiz onuda prop olarak vehicle-bar agönderiyoruz
      } catch (err) {
        console.log(err);

      }
      finally{
        setLoading(false);  // sipinneri devre disi birakiyoruz
      }
  }


  useEffect(() => {  // sadece ilk yuklenirken  caliscak
     loadData(); // componet ilk render olunca backende  baglancak bu fonksiyonla datayi cekiyoruz 
   
  }, [])
  




  return (
    <div>

      <SectionHeader
      title="Popular Vehicle Models"
      subTitle="Lux &amp; economic"
      desc="To contribute to positive change and achieve our sustainability goals with many axtraordinary"

      />

      {loading ? (
                  <Loading/>      // loading eger true ise spinner dönsun eger falsse <VehicleBar/> ve <PopularVehicle/> calissin
                  ) : (
                                             //backentden aldigimiz data(tumarablar) vehicles in icinde bunuda props ile  VehicleBar  a gönderiyoruz
         <>                                         
              <VehicleBar vehicles={vehicles}     activeVehicle={activeVehicle}     setActiveVehicle={setActiveVehicle } />    
              <PopularVehicle activeVehicle={activeVehicle}/>
          </>
          )}

    </div>
  )
}

export default PopularVehicles


/* 
const PopularVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [activeVehicle, setActiveVehicle] = useState({});
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const resp = await getVehiclesByPage();
      const data = resp.data.content;

      setVehicles(data);
      if (data.length > 0) setActiveVehicle(data[0]);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <SectionHeader
        title="Popular Vehicle Models"
        subTitle="Lux &amp; economic"
        desc="To contribute to positive change and achieve our sustainability goals with many extraordinary"
      />
        <Spacer height={30}/>
      {loading ? (
        <Loading />
      ) : (
        <>
          <VehicleBar vehicles={vehicles} activeVehicle={activeVehicle} setActiveVehicle={setActiveVehicle}/>
          <Spacer height={50}/>
          <PopularVehicle activeVehicle={activeVehicle} />
        </>
      )}
    </div>
  );
};

export default PopularVehicles; */