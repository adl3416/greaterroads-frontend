import React, { useState } from "react";
import { useFormik } from "formik";
import { Form, Button, Spinner } from "react-bootstrap";
import * as Yup from "yup";
import PasswordInput from "../../../common/password-input/password-input";
import { getUser, login } from "../../../../api/user-service";
import { toast } from "../../../../utils/functions/swal";
import secureLocalStorage from "react-secure-storage";
import { useDispatch } from "react-redux";
import { loginFailed, loginSuccess } from "../../../../store/slices/auth-slice";
import { useNavigate } from "react-router-dom";

 const LoginForm = () => {
  const [ loading,setLoading] =useState(false)

  

  const initialValues = {
     email: "",
     password: "",
  };

  const validationSchema = Yup.object({
     email: Yup.string().email().required("Please enter your email"),
    password: Yup.string().required("Please enter your password"),
   });

   const onSubmit = async (values) => {
    //console.log(values);

    setLoading(true)

    try {
      const respAuth = await login(values) // login service yi cagiralim
      //console.log(respAuth.data); //to ken veriyo
      secureLocalStorage.setItem("token", respAuth.data.token); // guvenlik icin. Burasi  respAuth.data standart token  ismi
      
      //Bundan sonra kullanici bilgilerini almaliyiz getUser ile, bunun hicbir parametresi yok backenden bakabiliriz
      const respUser = await getUser(); //Artik  token siz calismicak hep token isticek. aut-heeader dan cekiyoruz
      dispatch(loginSuccess(respUser.data));
      
      navigate("/");

    } catch (err) {
      toast(err.response.data.message, "error") //err.response.data.message, bu backend in hata mesaji ve  "error" de Sweet in hata mesaji
    } 

    finally{
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
       <Button variant="primary" type="submit">
    Login
       </Button>
    </Form>  );
 };

export default LoginForm;












/* import React, { useState } from "react";
import { useFormik } from "formik";
import { Form, Button, Spinner } from "react-bootstrap";
import * as Yup from "yup";
import PasswordInput from "../../../common/password-input/password-input";
import { getUser, login } from "../../../../api/user-service";
import { toast } from "../../../../utils/functions/swal";
import secureLocalStorage from "react-secure-storage";
import { useDispatch } from "react-redux";
import { loginFailed, loginSuccess } from "../../../../store/slices/auth-slice";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
 
  

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string().required("Please enter your password"),
  });

  const onSubmit = async (values) => {
    console.log(values);
   
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });


  return (
    <Form noValidate onSubmit={formik.handleSubmit}>
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
      <Button variant="primary" type="submit"  >
      Login
      </Button>
    </Form>
  );
};

export default LoginForm; */