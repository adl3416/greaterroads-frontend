import React from 'react'
import { useFormik } from "formik";
import { Button, Form } from 'react-bootstrap'
import * as Yup from "yup";
import PasswordInput from '../../../common/password-input/password-input';


const LoginForm = () => {

 const initialValues={  //formumuzdaki ilgili email ve pasa port un ilk degerlerini belirliyoruz. Burda gerek yok bos olcak

      email:"",
      password:"",
 }   
 
  


 const validationSchema = Yup.object({
      email:Yup.string().required("Please enter your email"),
      password:Yup.string().required("Please enter your password"),
 })

 const onSubmit = (values) => { 
     
 }


  const formik =useFormik ({
    initialValues,
    validationSchema,
    onSubmit

  })


  return (
   
    <Form noValidate onSubmit={formik.handleSubmit}>         {/* default olan validation özelliklerini  noValidate ile devre disi birakiriyoruz */}
  
      <Form.Group className="mb-3" >
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" 
           {...formik.getFieldProps("email")}   // formik kullanicinin degerini statede gunceller ve statenin önceki degerinide input a getir.Yani getter setter gibi calisir.
           isInvalid={formik.touched.email && formik.errors.email} //isInvalid:email fail i ile sinirli kalsin, burada error durumu true olursa inputun sinirlari kirmizilasir
           isValid={formik.touched.email && !formik.errors.email} // burasi false olmasi lazim. error durumu false ise isValid true olur
           />
             <Form.Control.Feedback>{formik.errors.email}</Form.Control.Feedback>
      </Form.Group>



      <Form.Group className="mb-3" >
        <Form.Label>Password</Form.Label>

        <PasswordInput 
           {...formik.getFieldProps("password")}   // formik kullanicinin degerini statede gunceller ve statenin önceki degerinide input a getir.Yani getter setter gibi calisir.
           isInvalid={formik.touched.password && formik.errors.password} //isInvalid:email fail i ile sinirli kalsin, burada error durumu true olursa inputun sinirlari kirmizilasir
           isValid={formik.touched.password && !formik.errors.password} // burasi false olmasi lazim. error durumu false ise isValid true olur
           error={formik.errors.password}
           />
      </Form.Group>

      <Button variant='primary'> Login</Button>

    </Form>
  )
}

export default LoginForm 
