import React, { useState } from "react";
import SectionHeader from "../common/section-header/section-header";
import { Alert, Button, FloatingLabel, Form, InputGroup } from "react-bootstrap";
import * as Yup from "yup";
import {useFormik} from "formik";
import { isVehicleAvailable } from "../../../api/reservation-service";
import { combineDateAndTime } from "../../../utils/functions/date-time";
import { useSelector } from "react-redux";

const BookingForm = () => {
  const vehicle = useSelector((state) => state.reservation.vehicle); // arabaya ulastik
  const isUserLogin = useSelector((state) => state.auth.isUserLogin); // giris yaptimi yapmadimi kontrol edicez
  const [isVehicleAvilable, setIsVehicleAvilable] = useState(false); // Backenden cevap gelcek arac musaitmi degilmi o bilgiyi burada tutcaz
  const [totalPrice, setTotalPrice] = useState()

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
    /*
    cardNo: Yup.string().required("Please enter the card number"),
    nameOnCard: Yup.string().required("Please enter the name on the card"),
    expireDate: Yup.string()
      .required("Please enter the expire date")
      .test("month_check", "Enter a valid expire date (MM/YY)", (value) =>
        checkExpireDate(value)
      ),
    cvc: Yup.number()
      .typeError("Must be number")
      .required()
      .min(1)
      .max(999, "Please enter CVC"),
    contract: Yup.boolean().oneOf(
      [true],
      "Please read the contract and check the box"
    ),
    */
  });

  const onSubmit = ()=>{

  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });




  const checkVehicleAvailability = async () => { //backende baglaniyoruz
    const { pickUpDate, pickUpTime, dropOffDate, dropOffTime } = formik.values;

    try {
      const dto = {
        carId: vehicle.id,  
        pickUpDateTime: combineDateAndTime(pickUpDate, pickUpTime),  //backende date ve time birlesik ama bizim ekranimizda ayri, bu nedenle birlestirerek backende gönderiyoruz.

        dropOffDateTime: combineDateAndTime(dropOffDate, dropOffTime), // combinedropOffDateTime  a  (dropOffDate, dropOffTime bu ikisini gönderiyoruz o birlestircek geri vercek. combineDateAndTime funksiyonu function icinde date-time js
      };

       const resp =await isVehicleAvailable(dto);// buraya bir obje gönderecegiz. Oda bize geri cevap göndercek arac musait yada degil
    
        console.log(resp.data); // available : true  geldi

      }catch (err) {
      
    }
     
  }

  const isInvalid = (field) => {
    return formik.touched[field] && formik.errors[field]; // dokunulmasi lazim
  };

  const isValid = (field) => {
    return formik.touched[field] && !formik.errors[field];
  };

  return (
    <>
      <SectionHeader title="Booking Form" />

    	{!isUserLogin &&  <Alert> Please login first to check the car is available.</Alert>}    {/* !isUserLogin true degilse yani false bir mesaj yazacak  */}

      <Form noValidate>
       <fieldset disabled={!isUserLogin} >    {/* sadece formlara verilir. Özel bisey eklememize olanak saglar mesela burda kullanici giris yapmadiysa hepsi disabled olsun dedik*/}
        {/* noValidate: react bootstrap özelliklerini devre disi birakmak icin  */}
        <FloatingLabel label="Pick-up location" className="mb-3">
          <Form.Control type="text" placeholder="Pick-up location" 
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
               /*  min={getCurrentDate()} */
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
                /* min={getDate(formik.values.pickUpDate) }*/
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

        <Button variant="secondary" type="button" className="w-100" onClick={checkVehicleAvailability}> Check Availability</Button>
        </fieldset>
      </Form>
    </>
  );
};

export default BookingForm;
