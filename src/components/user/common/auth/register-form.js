import React, { useState } from "react";
import InputMask from "react-input-mask-next";
import { Form, Button, Spinner } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import PasswordInput from "../../../common/password-input/password-input";
import { register } from "../../../../api/user-service";
import { toast } from "../../../../utils/functions/swal";



const RegisterForm = ({ setDefaultTab }) => {  // burda setDefaultTab i karsiliyoruz, register yaptiktan sonra login ekranina geciyoruz 


  const [loading, setLoading] = useState(false);

  const initialValues = {                    // Backendin bekledigi gibi yapmaliyiz.Burdan bakabiliriz=>  https://carrental-v3-backend.herokuapp.com/swagger-ui/index.html#/user-jwt-controller/registerUser
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    zipCode: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Please enter your first name"),
    lastName: Yup.string().required("Please enter your last name"),
    phoneNumber: Yup.string().required(),
    address: Yup.string().required("Please enter your address"),
    zipCode: Yup.string().required("Please enter your zip code"),
    email: Yup.string().email().required("Please enter your email"), //email formatinda olup olmadigini kontrol ediyor
    password: Yup.string()
      .required("Please enter your password")
      .min(8, "Must be at least 8 characters")  // yapilmassa eger bu mesaji vercek
      .matches(/[a-z]+/, "One lowercase character")
      .matches(/[A-Z]+/, "One uppercase character")
      .matches(/[@$!%*#?&]+/, "One special character")
      .matches(/\d+/, "One number"),
    confirmPassword: Yup.string()  //
      .required("Please re-enter your password") //2.sefer password girilcek
      .oneOf([Yup.ref("password")], "Password fields doesn't match"), // burda eslesme kontrol edilcek aynisi girilmesi zorunlu 
  });

   const onSubmit = async (values) => {                   //datayi burda backende baglanip göndercez. 
    //console.log(values);
    
    setLoading(true);                                     //önce bunu true ya cekelim
    try {
      await register(values);                              // burdaki register i api klosöründe vehicle-service.js de olusturduk.
      toast("You're registered successfully!", "success");   // toast function klasörunde swal.js olusturduk
      formik.resetForm();
      setDefaultTab("login");                            // registerden sonra ekrani login e ceviriyoruz
    } catch (err) {
      toast(err.response.data.message, "error");   // burasi backenden gelen format 
    } finally {
      setLoading(false);
    }  
    
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });



 
  return (
    <Form noValidate onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          {...formik.getFieldProps("firstName")}
          isInvalid={formik.touched.firstName && formik.errors.firstName}
          isValid={formik.touched.firstName && !formik.errors.firstName}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.firstName}
        </Form.Control.Feedback>
      </Form.Group>




      <Form.Group className="mb-3">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          {...formik.getFieldProps("lastName")}
          isInvalid={formik.touched.lastName && formik.errors.lastName}
          isValid={formik.touched.lastName && !formik.errors.lastName}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.lastName}
        </Form.Control.Feedback>
      </Form.Group>




      <Form.Group className="mb-3">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="text"
          as={InputMask}
          mask="(999) 999-9999"
          {...formik.getFieldProps("phoneNumber")}
          isInvalid={formik.touched.phoneNumber && formik.errors.phoneNumber}
          isValid={formik.touched.phoneNumber && !formik.errors.phoneNumber}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.phoneNumber}
        </Form.Control.Feedback>
      </Form.Group>





      <Form.Group className="mb-3">
        <Form.Label>Address</Form.Label>
        <Form.Control
          type="text"
          {...formik.getFieldProps("address")}
          isInvalid={formik.touched.address && formik.errors.address}
          isValid={formik.touched.address && !formik.errors.address}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.address}
        </Form.Control.Feedback>
      </Form.Group>




      <Form.Group className="mb-3">
        <Form.Label>Zip Code</Form.Label>
        <Form.Control
          type="text"
          {...formik.getFieldProps("zipCode")}
          isInvalid={formik.touched.zipCode && formik.errors.zipCode}
          isValid={formik.touched.zipCode && !formik.errors.zipCode}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.address}
        </Form.Control.Feedback>
      </Form.Group>




      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          {...formik.getFieldProps("email")}
          isInvalid={formik.touched.email && formik.errors.email}
          isValid={formik.touched.email && !formik.errors.email}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.email}
        </Form.Control.Feedback>
      </Form.Group>




      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <PasswordInput
          {...formik.getFieldProps("password")}
          isInvalid={formik.touched.password && formik.errors.password}
          isValid={formik.touched.password && !formik.errors.password}
          error={formik.errors.password}
        />
      </Form.Group>





      <Form.Group className="mb-3">
        <Form.Label>Confirm Password</Form.Label>
        <PasswordInput
          {...formik.getFieldProps("confirmPassword")}
          isInvalid={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
          isValid={
            formik.touched.confirmPassword && !formik.errors.confirmPassword
          }
          error={formik.errors.confirmPassword}
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={loading}>  {/* loading oldugunda buton disabled olsun */}
        {loading && <Spinner animation="border" size="sm" />} Register  
      </Button>           {/* loading se spinner i göster yoksa gösterme */}
    </Form>
  )
}

export default RegisterForm