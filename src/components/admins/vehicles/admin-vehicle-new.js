import React, { useState, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {Form,  Button,  Row,  Col,  ButtonGroup,  Badge,  Spinner,} from "react-bootstrap";
import "./admin-vehicle.scss";
import { createVehicle, uploadVehicleImage} from "../../../api/vehicle-service";
import { toast } from "../../../utils/functions/swal";
import { useNavigate } from "react-router-dom";

const AdminVehicleNew = () => {
  const [imageSrc, setImageSrc] = useState("");
  const [loading, setLoading] = useState(false);
  const fileImageRef = useRef();
  const navigate = useNavigate();

  const initialValues = {
    model: "",
    doors: "",
    seats: "",
    luggage: "",
    transmission: "",
    airConditioning: "",
    fuelType: "",
    age: "",
    pricePerHour: "",
    image: "",
  };

  const validationSchema = Yup.object({
    model: Yup.string().required("Please enter the model"),
    doors: Yup.number().required("Please enter the number of doors"),
    seats: Yup.number().required("Please enter the number of seats"),
    luggage: Yup.number().required("Please enter the luggage capacity"),
    transmission: Yup.string().required("Please enter type of transmission"),
    airConditioning: Yup.string().required(
      "Please enter whether air conditioning exists"
    ),
    fuelType: Yup.string().required("Please enter type of fuel"),
    age: Yup.number().required("Please enter age of car"),
    pricePerHour: Yup.number().required("Please enter price per hour"),
    image: Yup.mixed().required("Please select an image"),
  });


  const onSubmit = async (values) => {
    setLoading(true);
/* 
    try {
      const formData = new FormData();
      formData.append("file", values.image);

      const resp = await uploadVehicleImage(formData);
      const imageId = resp.data.imageId;

      const payload = {...values};
      delete payload.image;

      await createVehicle(imageId, payload);
      toast("Vehicle was created", "success");
      navigate(-1);


    } catch (err) {
      console.log(err);
      toast(err.response.data.message, "error");
    }
    finally{
      setLoading(false);
    }*/

  }; 

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });



  const handleSelectImage = () => { //butona tikladigimizda mevcut deger(current) click olabilir.yani resim secilebilir hale geldi
    fileImageRef.current.click();
  };
  const handleImageChange = () => {  //önce alcagim resmi tutmak icin birtane file sabiti olusturuyorum.
    const file = fileImageRef.current.files[0];
    if (!file) return; //eger file bos ise yani false return etsin

    formik.setFieldValue("image", file);  // eger bos degilseburasi caliscak.  Resmi buraya eklemis olduk
    //formik state ini manuel olarak set ettik.Seçilen dosyayı image alanına yerleştirdik.

    const reader = new FileReader(); //Seçilen görüntüyü ekrana yerleştirdik.  
    reader.readAsDataURL(file);        //bizim dosyamizin yolunu aliyor. yani buraya gelen degeri bu fonksiyonla aldik

    reader.onloadend = () => {        
      setImageSrc(reader.result);    //görüntü ekrana yuklenme isi bittiginde
  };

};


  const isError = (field) => {
    return formik.touched[field] && formik.errors[field]; // burdaki field gönderdigimiz model. eger bu ikisi true ise return. 
  };

  return (
    <Form>
      <Row>
        <Col lg={3} className="image-area">
          <Form.Control
            type="file"
            name="image"
            className="d-none"
            onChange={handleImageChange}
            ref={fileImageRef}
          />
          <img src={imageSrc} className="img-fluid" alt="..." />
          {formik.errors.image && ( // formik.errors.image true ise  (yani isinValid) Badge caliscak
            <Badge bg="danger" className="image-area-error">
              Please select an image
            </Badge>
          )}

          <Button
            variant={formik.errors.image ? "danger" : "primary"} //formik.errors.image  tru yani hata oldugunda danger degilse primary olsun
            onClick={handleSelectImage}
          >
            Select Image
          </Button>
        </Col>

        <Col l g={9}>
          <Row>
            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>Model</Form.Label>
              <Form.Control
                type="text"
                {...formik.getFieldProps("model")}
                className={isError("model") && "is-invalid"} // isError fonksiyonuna model diye bir gönderelim eger bu true ise classname ismimiz is-invalid olsun.degelse bisey olmasin
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.model}{" "}
                {/*  //duruma göre hata mesaji ´verecek */}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>Doors</Form.Label>
              <Form.Control
                type="number"
                {...formik.getFieldProps("doors")}
                className={isError("doors") && "is-invalid"}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.doors}
              </Form.Control.Feedback>
            </Form.Group>


            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>Seats</Form.Label>
              <Form.Control
                type="number"
                {...formik.getFieldProps("seats")}
                className={isError("seats") && "is-invalid"} // burda isError fonksiyonu kullandik Burdan true gelirse classname isInvalid(hazirstilleresahip) olcak yani hata varsa buraya gircek.. dis cizgiler degiscek . Normalde soyle yapiyorduk:  isinValid={formik.touched.seats && formik.errors.seats}
              />  
                <Form.Control.Feedback type="invalid">
                {formik.errors.seats}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>Luggage</Form.Label>
              <Form.Control
                type="number"
                {...formik.getFieldProps("luggage")}
                className={isError("luggage") && "is-invalid"}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.luggage}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>Transmission</Form.Label>
              <Form.Select
                {...formik.getFieldProps("transmission")}
                className={isError("transmission") && "is-invalid"}
              >
                <option>Select</option>
                <option value="Automatic">Automatic</option>
                <option value="Manuel">Manuel</option>
                <option value="Tiptronic">Tiptronic</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {formik.errors.transmission}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>Air Conditioning</Form.Label>
              <Form.Select
                {...formik.getFieldProps("airConditioning")}
                className={isError("airConditioning") && "is-invalid"}
              >
                <option>Select</option>
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {formik.errors.airConditioning}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>Fuel Type</Form.Label>
              <Form.Select
                {...formik.getFieldProps("fuelType")}
                className={isError("fuelType") && "is-invalid"}
              >
                <option>Select</option>
                <option value="Electricity">Electricity</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Gasoline">Gasoline</option>
                <option value="Diesel">Diesel</option>
                <option value="Hydrogen">Hydrogen</option>
                <option value="LPG">LPG</option>
                <option value="CNG">CNG</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {formik.errors.fuelType}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                {...formik.getFieldProps("age")}
                className={isError("age") && "is-invalid"}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.age}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>Price Per Hour</Form.Label>
              <Form.Control
                type="number"
                {...formik.getFieldProps("pricePerHour")}
                className={isError("pricePerHour") && "is-invalid"}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.pricePerHour}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
        </Col>
      </Row>
      <div className="text-end">
        <ButtonGroup aria-label="Basic example">
          <Button variant="primary" type="submit" disabled={loading}>
            {loading && <Spinner animation="border" size="sm"/>} Create
          </Button>
          <Button variant="secondary" type="button" onClick={()=>navigate(-1)}>
            Cancel
          </Button>
        </ButtonGroup>
      </div>
    </Form>
  );
};

export default AdminVehicleNew;