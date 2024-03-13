import React, { useState } from "react";
import SectionHeader from "../common/section-header/section-header";
import { Alert, Button, ButtonGroup, FloatingLabel, Form, FormCheck, InputGroup, Spinner } from "react-bootstrap";
import * as Yup from "yup";
import {useFormik} from "formik";
import { isVehicleAvailable,createReservation, } from "../../../api/reservation-service";
import { combineDateAndTime } from "../../../utils/functions/date-time";
import { useSelector } from "react-redux";
import { toast } from "../../../utils/functions/swal";
import InputMask from "react-input-mask-next";
import {checkExpireDate,checkDates, getCurrentDate,getDate,} from "../../../utils/functions/date-time";
import { useNavigate } from "react-router-dom";


const BookingForm = () => {
  const vehicle = useSelector((state) => state.reservation.vehicle); // arabaya ulastik
  const isUserLogin = useSelector((state) => state.auth.isUserLogin); // giris yaptimi yapmadimi kontrol edicez
  const [carAvailable, setCarAvailable] = useState(false); // Backenden cevap gelcek arac musaitmi degilmi o bilgiyi burada tutcaz
  const [totalPrice, setTotalPrice] = useState()
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const initialValues = { //https://carrental-v3-backend.herokuapp.com/swagger-ui/index.html#/reservation-controller/makeReservation
    pickUpLocation: "",
    dropOffLocation: "",
    pickUpDate: "",
    pickUpTime: "",
    dropOffDate: "",
    dropOffTime: "",
    cardNo: "",
    nameOnCard: "",
    expireDate: "",
    cvc: "",
    contract: false,
  };

  const validationSchema = Yup.object({
    pickUpLocation: Yup.string().required("Enter a pick-up location"),
    dropOffLocation: Yup.string().required("Enter a drop-off location"),
    pickUpDate: Yup.string().required("Select a pick-up date"),
    pickUpTime: Yup.string().required("Select a pick-up time"),
    dropOffDate: Yup.string().required("Select a drop-off date"),
    dropOffTime: Yup.string().required("Select a drop-off time"),
    
    cardNo: Yup.string().required("Please enter the card number"),
    nameOnCard: Yup.string().required("Please enter the name on the card"),
    expireDate: Yup.string()
      .required("Please enter the expire date")
      .test("month_check", "Enter a valid expire date (MM/YY)", (value) => // test fonsiyonunun 1. degeri isim 2.degeri mesaj 3. degeride fonksiyon yaziyoruz.
        checkExpireDate(value) // bu fonksiyon utilsde function klasörunde data-time js de tanimli
      ),
    cvc: Yup.number()  // cvc number olcak
      .typeError("Must be number") //number girmesse bu mesaj verilcek
      .required()
      .min(1)
      .max(999, "Please enter CVC"),
    contract: Yup.boolean().oneOf(  //isaretlenip isaretlenmedgi kontrol edilcek, 
      [true],  //isaretlenmesi lazim yani true olmali
      "Please read the contract and check the box"
    ),
    
  });

  const onSubmit = async (values) => {
    const {
      pickUpDate,
      pickUpTime,
      dropOffDate,
      dropOffTime,
      pickUpLocation,
      dropOffLocation,
    } = values;

    setLoading(true);

    try {
      const dto = {
        pickUpTime: combineDateAndTime(pickUpDate, pickUpTime),
        dropOffTime: combineDateAndTime(dropOffDate, dropOffTime),
        pickUpLocation: pickUpLocation,
        dropOffLocation: dropOffLocation,
      };

      await createReservation(vehicle.id, dto);
      toast("Reservation created", "success");
      formik.resetForm();
      navigate("/");
    } catch (err) {
      toast(err.response.data.message);
    } finally {
      setLoading(false);
    }
    //console.log (values);
  };
    

  

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });




  const checkVehicleAvailability = async () => { //backende baglaniyoruz
    const { pickUpDate, pickUpTime, dropOffDate, dropOffTime } = formik.values;

    setLoading(true) // backende gönermeden önce


    try {   // biri birinden buyukimu diye karsilastircak ona göre hata firla

      if (!checkDates(formik.values))
      throw new Error(
        "Drop-off date should get at least 1 hour later the pick-up date"
      );

      const dto = {
        carId: vehicle.id,  
        pickUpDateTime: combineDateAndTime(pickUpDate, pickUpTime),  //backende date ve time birlesik ama bizim ekranimizda ayri, bu nedenle birlestirerek backende gönderiyoruz.

        dropOffDateTime: combineDateAndTime(dropOffDate, dropOffTime), // combinedropOffDateTime  a  (dropOffDate, dropOffTime bu ikisini gönderiyoruz o birlestircek geri vercek. combineDateAndTime funksiyonu function icinde date-time js
      };

       const resp =await isVehicleAvailable(dto);// buraya bir obje gönderecegiz. Oda bize geri cevap göndercek arac musait yada degil
    
       const {available, totalPrice}=resp.data;  // available  true  ve totalprice geldi sonra burayi yazdik. Bize gelen datayi ayirdik.
        setCarAvailable(available);
        setTotalPrice(totalPrice); //guncelledik

        if(!available) throw new Error("The vehicle you selected is not avilable. Please select different date");  //eger araba müsait degilsebu hata mesajini vericek

        //console.log(resp.data); // available : true  geldi

      }catch (err) {
         // err.message ->burdan gelen hata mesaji
         // err.response.data.message -> backend gönderirse hata nesaji
        toast(err.message  || err.response.data.message, "error")
      
    }
    finally{
      setLoading(false);
    }
  }

  const isInvalid = (field) => {
    return formik.touched[field] && formik.errors[field]; // dokunulmasi lazim
  };

  const isValid = (field) => {
    return formik.touched[field] && !formik.errors[field];
  };

  //console.log(carAvailable)
  return (
    <>
      <SectionHeader title="Booking Form" />

    	{!isUserLogin &&  (
      <Alert> Please login first to check the car is available.</Alert>   
      )}    {/* !isUserLogin true degilse yani false bir mesaj yazacak  */}



      <Form noValidate onSubmit={formik.handleSubmit}>   {/* burdaki isi submite basildiginda formige gönderiyoruz.Submit calisabilmeli */}
       <fieldset disabled={!isUserLogin || carAvailable} >    {/* sadece formlara verilir. Özel bisey eklememize olanak saglar mesela burda kullanici giris yapmadiysa ve aracmusaitse hepsi disabled olsun dedik*/}
        {/* noValidate: react bootstrap özelliklerini devre disi birakmak icin  */}
        <FloatingLabel label="Pick-up location" className="mb-3">
          <Form.Control 
          type="text"
           placeholder="Pick-up location" 
            {...formik.getFieldProps("pickUpLocation")}
            isInvalid={isInvalid("pickUpLocation")}
            isValid={isValid("pickUpLocation")}
          />
          <Form.Control.Feedback type="invalid">    {/* hata oldugunda gösterilcek */}
              {formik.errors.pickUpLocation}
            </Form.Control.Feedback>
        </FloatingLabel>

         <FloatingLabel label="Drop-off location" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Drop-off location"
              {...formik.getFieldProps("dropOffLocation")}
              isInvalid={isInvalid("dropOffLocation")}
              isValid={isValid("dropOffLocation")}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.dropOffLocation}
            </Form.Control.Feedback>
          </FloatingLabel>

          <InputGroup className="mb-3">
            <FloatingLabel label="Pick-up date">
              <Form.Control
                type="date"
                 min={getCurrentDate()} 
                placeholder="Pick-up date"
                {...formik.getFieldProps("pickUpDate")}
                isInvalid={isInvalid("pickUpDate")}
                isValid={isValid("pickUpDate")}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.pickUpDate}
              </Form.Control.Feedback>
            </FloatingLabel>

            <FloatingLabel label="Time">
              <Form.Control
                type="time"
                step={900}
                min="07:00"
                max="23:00"
                placeholder="Time"
                {...formik.getFieldProps("pickUpTime")}
                isInvalid={isInvalid("pickUpTime")}
                isValid={isValid("pickUpTime")}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.pickUpTime}
              </Form.Control.Feedback>
            </FloatingLabel>
          </InputGroup>

          <InputGroup className="mb-3">
            <FloatingLabel label="Drop-off date">
              <Form.Control
                type="date"
                placeholder="Drop-off date"
                min={getDate(formik.values.pickUpDate)}
                {...formik.getFieldProps("dropOffDate")}
                isInvalid={isInvalid("dropOffDate")}
                isValid={isValid("dropOffDate")}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.dropOffDate}
              </Form.Control.Feedback>
            </FloatingLabel>

            <FloatingLabel label="Time">
              <Form.Control
                type="time"
                placeholder="Time"
                {...formik.getFieldProps("dropOffTime")}
                isInvalid={isInvalid("dropOffTime")}
                isValid={isValid("dropOffTime")}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.dropOffTime}
              </Form.Control.Feedback>
            </FloatingLabel>
          </InputGroup>

        <Button 
        variant="secondary" 
        type="button" 
        className={`w-100 ${carAvailable ? "d-none" : "d-block"}`}    /* eger arac musaitse burasi gizlensin degilse gizlenmicek  */
        onClick={checkVehicleAvailability}
        disabled={loading}
          >
       {loading && <Spinner animation="border" size="sm" />} Check
           Availability
        </Button>




        </fieldset>

        <fieldset className={`mt-5 ${carAvailable ? "d-block" : "d-none"}`}>   {/*  araba musaitse burasida musaitolcak  */}
          <Alert variant="info"> 
          <h2> Total Price: ${totalPrice}</h2> 
          </Alert>

        <FloatingLabel label="Card number" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Card number"
              as={InputMask}
              mask="9999-9999-9999-9999"
              {...formik.getFieldProps("cardNo")}
              isInvalid={isInvalid("cardNo")}
              isValid={isValid("cardNo")}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.cardNo}
            </Form.Control.Feedback>
          </FloatingLabel>

          <FloatingLabel label="Name on card" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Name on card"
              {...formik.getFieldProps("Name on card")}
              isInvalid={isInvalid("Name on card")}
              isValid={isValid("Name on card")}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.cardNo}
            </Form.Control.Feedback>
          </FloatingLabel>
          
          <InputGroup>
            <FloatingLabel label="Expire date" className="mb-3">
              <Form.Control
                type="text"
                as={InputMask}
                mask="99/99"       //buna uygun girmek zorunda
                placeholder="Expire date"
                {...formik.getFieldProps("expireDate")}
                isInvalid={isInvalid("expireDate")}
                isValid={isValid("expireDate")}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.expireDate}
              </Form.Control.Feedback>
            </FloatingLabel>

            <FloatingLabel label="CVC" className="mb-3">
              <Form.Control
                type="text"
                as={InputMask}
                mask="999"   // //buna uygun girmek zorunda
                placeholder="CVC"
                {...formik.getFieldProps("cvc")}
                isInvalid={isInvalid("cvc")}
                isValid={isValid("cvc")}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.cvc}
              </Form.Control.Feedback>
            </FloatingLabel>
          </InputGroup>

          <FormCheck    //sozlesmeyi onaylama
            type="checkbox"
            id="contract"
            label="I have read and aggree the contract"
            {...formik.getFieldProps("contract")}
            isInvalid={isInvalid("contract")}
            isValid={isValid("contract")}
          />

        <ButtonGroup className="mt-3 w-100">
            <Button
              variant="secondary"
              type="button"
              disabled={loading}
               onClick={() => setCarAvailable(false)}   // edite basinca false cekiyoruz
            >
              Edit 
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading && <Spinner animation="border" size="sm" />}
              
               Book Now
            </Button>
          </ButtonGroup>

      
          

        </fieldset>


      </Form>
    </>
  );
};

export default BookingForm;
