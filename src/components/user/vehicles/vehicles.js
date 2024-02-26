import React, { useEffect, useState } from "react";
import { Col, Container, Pagination, Row } from "react-bootstrap";
import SectionHeader from "../common/section-header/section-header";
import VehicleCard from "./vehicle-card";
import { getVehiclesByPage } from "../../../api/vehicle-service";
import Spacer from "../../common/spacer/spacer";
import Loading from "../../common/loading/loading";
import "./vehicle.scss"

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]); /// API den gelen dizi kaydetmek icin usestate olusturmaliyiz
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({})
  

  const loadData = async (page) => { //page ile bu sayfada sadece 10 arac görcegiz digerlri diger sayfalarda
    try {
      const resp = await getVehiclesByPage(page,5); //API ye baglaniyoruz backenden bize data geliyor. page: sayfa sayfa olsun  3:bu sayfada 3 arac olsun

      console.log(resp.data)

      const {
        content,
        numberOfElements,
        size,
        totalElements,
        totalPages,
        pageable,
      } = resp.data;

      setVehicles(resp.data.content);
      setPagination({
        numberOfElements,
        size,
        totalElements,
        totalPages,
        pageable,
      });
    } catch (err) {
    } finally {
      setLoading(false); //data yuklenince spinner kapanacak
    }
  };



  useEffect(() => {
    // load datamizi ilk giriste cagiriyoruz
    loadData();
  }, []);



  return (
    <Container>
      <SectionHeader
        title="Vehicle Models"
        subTitle="Lux &amp; Economic"
        desc="To contribute to positive change and achieve our sustainability goals with many axtraordinary"
      />
      <Spacer height={30} />

      {loading ? (
        <Loading />
      ) : (
        <>
          <Row className="g-5">
            {vehicles.map((vehicle) => (
              <Col key={vehicle.id} sm={6} md={4} lg={3}>
                <VehicleCard {...vehicle} />   {/*  propsla gönderiyoruz. 2. yol {...vehicle} */}
              
              </Col>
            ))}
          </Row>

                {pagination.totalPages>1 && (

                    <Row className="vehicles-pagination">
                 
          <Pagination>
            <Pagination.First  onClick={()=>loadData(0)}  disabled={pagination.pageable.pageNumber<=0}/>
            <Pagination.Prev   onClick={()=>loadData(pagination.pageable.pageNumber-1)}
                               disabled={pagination.pageable.pageNumber<=0}
                            />

                {[...Array(pagination.totalPages)].map( (item,index) =>(  // map arayla calistigi icin  {[...Array(pagination.totalPages)].map( (item,index) bu sekilde bir yöntem uyguladik. 5.video1,35.dak
                      <Pagination.Item active={index === pagination.pageable.pageNumber}
                       key={index}
                            onClick={()=> loadData(index)} // 1 .2.  3.  vs sayfalara tiklayarak gidebiliriz

                      >{index+1}   
                      </Pagination.Item>
                )
                )} 

            <Pagination.Next
             onClick={()=>loadData(pagination.pageable.pageNumber+1)} 
             disabled={pagination.pageable.pageNumber>=pagination.totalPages - 1}
             />


            <Pagination.Last
             onClick={()=>loadData(pagination.totalPages -1)} 
             disabled={pagination.pageable.pageNumber>=pagination.totalPages - 1}
             />

          </Pagination>
          </Row>
          )}
          
        </>
      )}
    </Container>
  );
};

export default Vehicles;
